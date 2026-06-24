/**
 * Seed the quests table from the JSON files in src/data/quests.
 *
 *   npm run seed:quests
 *
 * Uses the service-role client (bypasses RLS) — run server-side only.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseAdmin } from '../lib/supabase.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const questsDir = join(__dirname, '..', 'data', 'quests');

async function main() {
  const files = readdirSync(questsDir).filter((f) => f.endsWith('.json'));
  if (files.length === 0) {
    console.log('No quest JSON files found.');
    return;
  }

  for (const file of files) {
    const quest = JSON.parse(readFileSync(join(questsDir, file), 'utf8'));
    const { error } = await supabaseAdmin
      .from('quests')
      .upsert(
        {
          slug: quest.slug,
          title: quest.title,
          description: quest.description,
          steps: quest.steps,
        },
        { onConflict: 'slug' },
      );

    if (error) {
      console.error(`✗ ${quest.slug}: ${error.message}`);
    } else {
      console.log(`✓ seeded quest "${quest.slug}" (${quest.steps.length} steps)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
