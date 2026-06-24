/**
 * Import + embed curated resources from the seed CSV into Supabase.
 *
 *   npm run embed:resources
 *
 * Reads supabase/seed/resources.sample.csv, embeds "name. description"
 * for each row, and upserts with the vector. Idempotent on name+category.
 * Uses the service-role client — run server-side only.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseAdmin } from '../lib/supabase.js';
import { embed, usingFakeEmbeddings } from '../lib/embeddings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '..', '..', '..', 'supabase', 'seed', 'resources.sample.csv');

/** Minimal CSV parser that handles quoted fields and {a,b} array columns. */
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (field !== '' || row.length > 0) { row.push(field); rows.push(row); row = []; field = ''; }
      if (c === '\r' && text[i + 1] === '\n') i++;
    } else field += c;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }

  const [header, ...body] = rows;
  return body
    .filter((r) => r.some((v) => v.trim() !== ''))
    .map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

function parsePgArray(value: string): string[] {
  if (!value) return [];
  return value.replace(/^\{|\}$/g, '').split(',').map((s) => s.trim()).filter(Boolean);
}

async function main() {
  if (usingFakeEmbeddings) {
    console.warn('⚠  No embeddings key set — using deterministic stub vectors. Set OPENAI_API_KEY or VOYAGE_API_KEY for real RAG.');
  }

  const rows = parseCsv(readFileSync(csvPath, 'utf8'));
  console.log(`Embedding ${rows.length} resources from ${csvPath}…`);

  let ok = 0;
  for (const row of rows) {
    const embedding = await embed(`${row.name}. ${row.description ?? ''}`.trim());
    const { error } = await supabaseAdmin.from('resources').upsert(
      {
        name: row.name,
        category: row.category || null,
        description: row.description || null,
        phone: row.phone || null,
        url: row.url || null,
        address: row.address || null,
        zip_codes: parsePgArray(row.zip_codes),
        states: parsePgArray(row.states),
        embedding,
        verified_at: null, // must be human-verified before launch (no dead numbers)
      },
      { onConflict: 'name' },
    );
    if (error) console.error(`✗ ${row.name}: ${error.message}`);
    else ok++;
  }
  console.log(`✓ upserted ${ok}/${rows.length} resources`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
