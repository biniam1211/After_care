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
