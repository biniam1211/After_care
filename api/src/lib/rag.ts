import { supabaseAdmin } from './supabase.js';

export interface Resource {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  phone: string | null;
  url: string | null;
  address: string | null;
  zip_codes: string[] | null;
  states: string[] | null;
}

/**
 * Retrieve the top-K curated resources for a chat message.
 *
 * MVP strategy: filter by state/ZIP first (correctness > recall — a kid in CA
 * must never get an NY hotline), then rank. Vector similarity is layered in once
 * embeddings are populated; until then this falls back to a category/text match.
 *
 * TODO(week 2): embed `query` (Voyage), call the pgvector `match_resources` RPC
 * with the embedding + state filter, and merge with the keyword path below.
 */
export async function retrieveResources(opts: {
  query: string;
  state?: string | null;
  zip?: string | null;
  limit?: number;
}): Promise<Resource[]> {
  const limit = opts.limit ?? 5;

  let q = supabaseAdmin
    .from('resources')
    .select('id, name, category, description, phone, url, address, zip_codes, states')
    .limit(limit);

  // Hard location filter — never surface out-of-state resources.
  if (opts.state) {
    q = q.contains('states', [opts.state]);
  }

  const { data, error } = await q;
  if (error) {
    console.error('[rag] retrieveResources failed:', error.message);
    return [];
  }
  return (data ?? []) as Resource[];
}
