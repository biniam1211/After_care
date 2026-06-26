-- AfterCare — combined migrations 0001–0005
-- Paste this whole file into Supabase → SQL Editor → Run.
-- Generated 2026-06-26T20:52:18Z

-- ============================================================
-- supabase/migrations/0001_init.sql
-- ============================================================
-- AfterCare — initial schema
-- Postgres (Supabase). Run via the SQL editor or `supabase db push`.
--
-- Notes:
--   * Row-level security is enabled on every table holding user data.
--   * pgvector is used for resource RAG (can be swapped for Pinecone).
--   * Keep PII out of AI logs; `messages.content` is user-facing only.

create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- ---------------------------------------------------------------------------
-- USERS
-- Mirrors auth.users (Supabase Auth). `id` should equal auth.uid().
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id           uuid primary key references auth.users (id) on delete cascade,
  phone        text unique,
  zip_code     text,
  state        text,
  age          int check (age between 14 and 26),
  foster_status text check (foster_status in ('in_care', 'aged_out', 'extended_care')),
  age_out_date date,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- CONVERSATIONS + MESSAGES
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  role            text not null check (role in ('user', 'assistant')),
  content         text not null,
  resources_cited jsonb default '[]'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);

-- ---------------------------------------------------------------------------
-- QUESTS
-- ---------------------------------------------------------------------------
create table if not exists public.quests (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,          -- 'first-bank-account'
  title       text not null,
  description text,
  steps       jsonb not null default '[]'::jsonb,  -- ordered array of step objects
  created_at  timestamptz not null default now()
);

create table if not exists public.user_quests (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users (id) on delete cascade,
  quest_id     uuid not null references public.quests (id) on delete cascade,
  current_step int not null default 1,
  started_at   timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, quest_id)
);

-- ---------------------------------------------------------------------------
-- RESOURCES (curated, RAG-backed)
-- ---------------------------------------------------------------------------
create table if not exists public.resources (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  category    text,                          -- 'housing' | 'finance' | 'mental_health' | 'legal' | ...
  description text,
  phone       text,
  url         text,
  address     text,
  zip_codes   text[] default '{}',
  states      text[] default '{}',
  age_range   int4range,
  embedding   vector(1536),                  -- for RAG (Voyage/OpenAI dims)
  verified_at timestamptz,                   -- when a human last checked this is live
  created_at  timestamptz not null default now()
);

create index if not exists resources_category_idx on public.resources (category);
create index if not exists resources_states_idx on public.resources using gin (states);
-- Approximate-nearest-neighbour index for vector search:
create index if not exists resources_embedding_idx
  on public.resources using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ---------------------------------------------------------------------------
-- PANIC EVENTS
-- ---------------------------------------------------------------------------
create table if not exists public.panic_events (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.users (id) on delete set null,
  scenario        text check (scenario in ('homeless', 'kicked_out', 'abuse', 'eviction', 'other')),
  resources_shown jsonb default '[]'::jsonb,
  resolved        boolean default false,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- ROW-LEVEL SECURITY
-- Each user can only read/write their own rows. Resources + quests are public-read.
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.user_quests enable row level security;
alter table public.panic_events enable row level security;
alter table public.quests enable row level security;
alter table public.resources enable row level security;

-- users: self only
create policy "users self read"  on public.users for select using (auth.uid() = id);
create policy "users self write" on public.users for all    using (auth.uid() = id) with check (auth.uid() = id);

-- conversations: owner only
create policy "conversations owner" on public.conversations for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- messages: via owned conversation
create policy "messages owner" on public.messages for all
  using (exists (select 1 from public.conversations c where c.id = conversation_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.conversations c where c.id = conversation_id and c.user_id = auth.uid()));

-- user_quests: owner only
create policy "user_quests owner" on public.user_quests for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- panic_events: owner only (null user_id rows are insert-only, handled server-side)
create policy "panic owner" on public.panic_events for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- quests + resources: readable by any authenticated user, writes are service-role only
create policy "quests public read"    on public.quests    for select using (true);
create policy "resources public read" on public.resources for select using (true);

-- ============================================================
-- supabase/migrations/0002_rag.sql
-- ============================================================
-- AfterCare — RAG search over curated resources (pgvector).
--
-- The embedding column is created in 0001 as vector(1536), matching the default
-- provider (OpenAI text-embedding-3-small). If you switch to Voyage, change the
-- column dimension here AND set EMBEDDING_DIM in the API env to match.

-- Unique name so the embed/import script can upsert idempotently.
alter table public.resources add constraint resources_name_key unique (name);

-- match_resources: cosine-similarity search with a HARD location filter.
-- Correctness rule (from the docs): a kid in CA must never receive an
-- out-of-state resource, even if it's semantically similar. So the state/ZIP
-- filters are applied as WHERE clauses, not just ranking signals.
create or replace function public.match_resources(
  query_embedding vector(1536),
  match_count int default 5,
  filter_state text default null,
  filter_zip text default null
)
returns table (
  id uuid,
  name text,
  category text,
  description text,
  phone text,
  url text,
  address text,
  zip_codes text[],
  states text[],
  similarity float
)
language sql
stable
as $$
  select
    r.id, r.name, r.category, r.description, r.phone, r.url, r.address,
    r.zip_codes, r.states,
    1 - (r.embedding <=> query_embedding) as similarity
  from public.resources r
  where r.embedding is not null
    and (filter_state is null or r.states @> array[filter_state])
    and (filter_zip is null or r.zip_codes @> array[filter_zip])
  order by r.embedding <=> query_embedding
  limit match_count;
$$;

-- Allow authenticated users to call it (reads are already RLS-public on resources).
grant execute on function public.match_resources(vector, int, text, text) to anon, authenticated, service_role;

-- ============================================================
-- supabase/migrations/0003_panic.sql
-- ============================================================
-- AfterCare — emergency contact for one-tap Panic SMS, and follow-up tracking.

alter table public.users
  add column if not exists emergency_contact_name text,
  add column if not exists emergency_contact_phone text;

-- Track whether the opt-in "You good?" follow-up has been sent for a panic event.
alter table public.panic_events
  add column if not exists followup_sent_at timestamptz;

create index if not exists panic_events_followup_idx
  on public.panic_events (created_at)
  where followup_sent_at is null and resolved = false;

-- ============================================================
-- supabase/migrations/0004_documents.sql
-- ============================================================
-- AfterCare — V2 Document Vault.
-- Encrypted-at-rest private storage for birth certificate, SSN card, ID, school,
-- medical, and court records. This is the retention hook: once docs are in, kids
-- don't switch apps. Handles minor PII → private bucket + RLS + signed URLs only.

create table if not exists public.documents (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users (id) on delete cascade,
  kind       text not null,        -- 'birth_certificate' | 'ssn' | 'id' | 'school' | 'medical' | 'court' | 'other'
  filename   text not null,
  file_path  text not null,        -- storage object path: <user_id>/<doc_id>/<filename>
  created_at timestamptz not null default now()
);

create index if not exists documents_user_idx on public.documents (user_id, created_at);

alter table public.documents enable row level security;
create policy "documents owner" on public.documents for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Private storage bucket (not public; access only via signed URLs).
insert into storage.buckets (id, name, public)
values ('user-documents', 'user-documents', false)
on conflict (id) do nothing;

-- Storage RLS: a user can only touch objects under their own <user_id>/ prefix.
create policy "user docs select" on storage.objects for select
  using (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "user docs insert" on storage.objects for insert
  with check (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "user docs update" on storage.objects for update
  using (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "user docs delete" on storage.objects for delete
  using (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================================
-- supabase/migrations/0005_notifications.sql
-- ============================================================
-- AfterCare — V2 push notification tokens for quest nudges + panic follow-ups.

create table if not exists public.device_tokens (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users (id) on delete cascade,
  token      text not null unique,        -- Expo push token
  platform   text,                         -- 'ios' | 'android'
  created_at timestamptz not null default now(),
  last_seen  timestamptz not null default now()
);

create index if not exists device_tokens_user_idx on public.device_tokens (user_id);

-- Track when we last nudged a quest so reminders don't spam.
alter table public.user_quests
  add column if not exists last_nudged_at timestamptz;

alter table public.device_tokens enable row level security;
create policy "device_tokens owner" on public.device_tokens for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

