# Resource seed

`resources.sample.csv` is the curated starter set of California foster-youth
resources used to seed the `resources` table and the RAG index.

## ⚠️ Verification gate (do not skip before launch)

Every row is imported with `verified_at = NULL`. **A wrong phone number or dead
link in a crisis app is harmful** — it's the fastest way to lose a foster kid's
trust on day one (see the PRD/build-plan risk table).

Policy used when building this seed:
- **Phone numbers are included only for nationally established lines** we're
  confident about (988, 211, Covenant House, Trevor Project, SAMHSA, etc.).
- For organization-specific local numbers we were unsure of, the **phone is left
  blank and only the URL is provided** rather than risk a wrong number.

### The `verified` column
Each row has a `verified` flag. `verified=true` means **the URL was confirmed to
resolve to the correct official organization** (e.g. via an automated fetch).
`embedResources.ts` translates that into `verified_at = now()`.

**`verified=true` does NOT mean the phone line was confirmed live, or that the
org serves the listed ZIP.** Those remain a human gate. Currently confirmed:
988, 211 California, The Trevor Project, Covered California, iFoster, and Just in
Time for Foster Youth. Automated checks couldn't reach several others (JS-rendered
or bot-blocked sites) — that's not evidence they're dead, just unverified.

**Before beta launch**, a human must verify each remaining resource (call the
number, open the link, confirm it serves the listed ZIP/state), then flip
`verified` to true. Consider hiding or labeling `verified_at IS NULL` rows in
production.

## Import

```bash
cd api
npm run embed:resources   # parses the CSV, embeds each row, upserts with vectors
```

Requires `SUPABASE_SERVICE_ROLE_KEY` and an embeddings key
(`OPENAI_API_KEY` or `VOYAGE_API_KEY`). Without an embeddings key the script
still runs using deterministic stub vectors (plumbing only — not semantic).

## Growing the set

The build plan targets ~200 hand-picked CA resources. Add rows to the CSV
(category, ZIP/state arrays, description) and re-run `embed:resources`; upserts
are idempotent on `name`.
