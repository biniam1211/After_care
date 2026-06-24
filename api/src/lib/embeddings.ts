import { env } from './env.js';

/**
 * Embeddings client for the resource RAG layer. Provider-pluggable:
 *   - 'openai' → text-embedding-3-small (1536 dims)  [matches the schema default]
 *   - 'voyage' → voyage-3 family
 *
 * With no key (CI / local dev), returns a deterministic pseudo-embedding so the
 * RAG pipeline and tests run end-to-end without network access. These stub
 * vectors are NOT semantically meaningful — they only exercise the plumbing.
 */

const hasKey = env.embeddingProvider === 'voyage' ? !!env.voyageApiKey : !!env.openaiApiKey;
export const usingFakeEmbeddings = !hasKey;

export async function embed(text: string): Promise<number[]> {
  if (!hasKey) return fakeEmbedding(text);
  return env.embeddingProvider === 'voyage' ? embedVoyage(text) : embedOpenAI(text);
}

async function embedOpenAI(text: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.openaiApiKey}`,
    },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: text }),
  });
  if (!res.ok) throw new Error(`OpenAI embeddings failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
}

async function embedVoyage(text: string): Promise<number[]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.voyageApiKey}`,
    },
    body: JSON.stringify({ model: 'voyage-3', input: text }),
  });
  if (!res.ok) throw new Error(`Voyage embeddings failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
}

/** Deterministic, seeded-by-text pseudo-vector of length EMBEDDING_DIM. */
function fakeEmbedding(text: string): number[] {
  let seed = 0;
  for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  const out = new Array<number>(env.embeddingDim);
  for (let i = 0; i < env.embeddingDim; i++) {
    seed = (1103515245 * seed + 12345) >>> 0;
    out[i] = (seed / 0xffffffff) * 2 - 1; // [-1, 1)
  }
  return out;
}
