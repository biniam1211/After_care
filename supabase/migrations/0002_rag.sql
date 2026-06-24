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
