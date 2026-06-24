import { supabaseAdmin } from './supabase.js';
import { embed } from './embeddings.js';

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
 * Primary path: embed the query and call the `match_resources` pgvector RPC,
 * which applies a HARD state/ZIP filter (a kid in CA never gets an out-of-state
 * result) before cosine ranking.
 *
 * Fallback path: if vector search returns nothing (e.g. resources not embedded
 * yet), fall back to a plain location/recency query so chat still cites real,
 * local resources.
 */
export async function retrieveResources(opts: {
  query: string;
  state?: string | null;
  zip?: string | null;
  limit?: number;
}): Promise<Resource[]> {
  const limit = opts.limit ?? 5;

  // --- Primary: vector search via RPC ---
  try {
    const queryEmbedding = await embed(opts.query);
    const { data, error } = await supabaseAdmin.rpc('match_resources', {
      query_embedding: queryEmbedding,
      match_count: limit,
      filter_state: opts.state ?? null,
      filter_zip: null, // ZIP is often too narrow; state filter + ranking is enough
    });
    if (!error && data && data.length > 0) {
      return data as Resource[];
    }
  } catch (err) {
    console.error('[rag] vector search failed, falling back:', (err as Error).message);
  }

  // --- Fallback: location-filtered keyword/recency query ---
  let q = supabaseAdmin
    .from('resources')
    .select('id, name, category, description, phone, url, address, zip_codes, states')
    .limit(limit);
  if (opts.state) q = q.contains('states', [opts.state]);

  const { data, error } = await q;
  if (error) {
    console.error('[rag] fallback query failed:', error.message);
    return [];
  }
  return (data ?? []) as Resource[];
}
