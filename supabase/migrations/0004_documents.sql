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
