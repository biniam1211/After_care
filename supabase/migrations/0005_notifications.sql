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
