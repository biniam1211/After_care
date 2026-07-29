# AfterCare — Go-Live Runbook (N4)

Everything in the app runs today on mock fakes. This is the checklist to switch
it to **live** against your Supabase project (`nbtxnkdjfsxfiwgbucbs`) + Claude.

> 🔐 Put secrets in the **gitignored** `api/.env` / `app/.env` — never in chat,
> commits, or screenshots.

---

## 1. Collect keys

Into `api/.env`:

| Key | Where to get it |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` (secret) |
| `SUPABASE_DB_PASSWORD` | Supabase → Project Settings → Database → password |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API keys |
| `OPENAI_API_KEY` *(or `VOYAGE_API_KEY`)* | platform.openai.com → API keys (embeddings) |
| `CRON_SECRET` | make one: `openssl rand -hex 32` |
| `TWILIO_*` *(optional)* | twilio.com console (panic SMS + reminders) |

`SUPABASE_URL` + `SUPABASE_ANON_KEY` are already set. Keep `EMBEDDING_PROVIDER`
matching the key you chose (`openai` → 1536 dims, matches the schema).

---

## 2. Apply the database migrations (0001 → 0005)

Pick **one** path. All five files live in `supabase/migrations/`.

**A. Supabase dashboard (no tooling needed)**
Open Supabase → SQL Editor → paste each migration file in order (0001 → 0005) →
Run. This also creates the `user-documents` storage bucket (0004).

**B. Supabase CLI**
```bash
npm i -g supabase     # not preinstalled here
supabase link --project-ref nbtxnkdjfsxfiwgbucbs   # prompts for DB password
supabase db push
```

**C. psql / connection string**
```bash
psql "postgresql://postgres:<DB_PASSWORD>@db.nbtxnkdjfsxfiwgbucbs.supabase.co:5432/postgres" \
  -f supabase/migrations/0001_init.sql \
  -f supabase/migrations/0002_rag.sql \
  -f supabase/migrations/0003_panic.sql \
  -f supabase/migrations/0004_documents.sql \
  -f supabase/migrations/0005_notifications.sql
```

---

## 3. Seed quests + embed resources

```bash
cd api
npm run seed:quests       # loads all 4 quests
npm run embed:resources   # embeds + upserts the 65 curated CA resources
```

(Needs `SUPABASE_SERVICE_ROLE_KEY` + an embeddings key. Without an embeddings key
it still runs with stub vectors — fine for plumbing, not real RAG.)

---

## 4. Run + verify the API

```bash
cd api && npm run dev      # http://localhost:4000
curl http://localhost:4000/health
```

With a real signed-in user's access token (`Authorization: Bearer <jwt>`):
- `POST /me` with `{ "zip_code": "92805", "age": 17, "foster_status": "extended_care" }`
  → state derives to `CA`.
- `POST /chat` `{ "message": "I need housing in Anaheim" }` → 3-part reply citing
  **CA-only** resources.
- `GET /quests` → 4 quests; advance one.
- `POST /panic` `{ "scenario": "homeless" }` → 988 always present.
- `POST /documents` then upload → `GET /documents` lists it.

✅ **RAG correctness gate:** confirm a CA user never receives an out-of-state
resource (enforced by the `match_resources` state filter in `0002_rag.sql`).

---

## 5. Run the app

```bash
cd app
npx expo start            # scan QR with Expo Go
```

Full flow: onboard (email magic-link → ZIP→state → consent) → chat with resource
cards → complete a quest with AI check-in → Panic plan + caseworker SMS → browse
resources → upload a doc.

> Auth is **email magic-link** (PKCE). In Supabase → Auth → Providers, enable
> **Email**; under Auth → URL Configuration add the app deep link
> `aftercare://onboarding` (and the Expo dev URL) to **Redirect URLs** so the
> link reopens the app and the session is exchanged. Twilio is only for panic
> SMS + reminders, not sign-in.

---

## 6. Schedule background jobs (optional)

Set repo secrets `API_URL` + `CRON_SECRET`; `.github/workflows/cron.yml` then
hits `POST /internal/cron` hourly (panic follow-ups + quest reminders). Railway
cron works too.

---

## 7. Before real users (non-negotiable)

- **Verify resources** — flip `verified` to true in the CSV only after a human
  confirms each number/link (see `supabase/seed/README.md`). Consider hiding
  `verified_at IS NULL` rows in production.
- **Legal** — fill + lawyer-review `docs/legal/PRIVACY.md` + `TERMS.md`.
- **Twilio A2P** registration for SMS; Apple/Google accounts for store builds
  (`app/eas.json`).
