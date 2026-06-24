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
