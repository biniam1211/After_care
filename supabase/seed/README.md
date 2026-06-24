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

**Before beta launch**, a human must verify each resource (call the number, open
the link, confirm it serves the listed ZIP/state), then set `verified_at = now()`.
Consider hiding `verified_at IS NULL` rows from production, or labeling them
"unverified" in the UI.

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
