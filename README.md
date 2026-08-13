# AfterCare

> The AI life navigator built by foster kids, for foster kids.

A mobile-first AI assistant that guides foster youth aged 16–24 through every
"I don't know how to adult" moment: opening a bank account, building credit,
finding housing, applying for benefits, and not falling through the cracks at 18.

**Founder:** Biniam · **Stack:** Next.js (web) + React Native/Expo (mobile) + Postgres + Claude API · **Status:** web app live, mobile app build-ready

---

## The MVP (ships in 6 weeks)

The golden rule: ship the **AI Chat + 1 Quest + Panic Button** first. Everything
else waits.

1. **Onboarding** — phone OTP, ZIP code, age, foster status
2. **AI Chat** — Claude-powered navigator with RAG over a curated resource DB
3. **One flagship Quest** — "Get Your First Bank Account" (5 steps)
4. **Panic Button** — emergency triage (homeless tonight / kicked out / abuse / eviction)
5. **Resource Finder** — ZIP-based list of local resources

The single metric of success: *does a foster kid open this app a second time within 7 days?*

---

## Repository layout

There are two shipping surfaces and one shared backend lineage. **`web/` is the
primary product today** — it is the most complete implementation and the one
that is deployed.

```
After_care/
├── web/              # ⭐ Next.js web app — THE LIVE PRODUCT (deploys to Vercel)
│   ├── app/          # App Router pages + /api routes (chat, auth, state,
│   │                 #   resources, notify, checkin, cron)
│   ├── components/   # every screen: onboarding, home, chat, quests,
│   │                 #   resources, panic, settings + the ui.jsx primitives
│   └── lib/          # db (Postgres), auth (magic link), log (Betterstack)
├── app/              # React Native (Expo) mobile app — iOS + Android
│   ├── app/          # expo-router file-based routes
│   │   ├── onboarding/   # phone → ZIP → age → status
│   │   └── (tabs)/       # Chat | Quests | Panic | Profile
│   ├── components/   # shared UI
│   └── lib/          # API client, supabase, theme
├── api/              # Node.js + Express backend
│   └── src/
│       ├── routes/   # auth, chat, conversations, quests, resources, panic,
│       │             #   documents, devices, internal(cron), health
│       ├── lib/      # supabase, claude, embeddings, rag, geo, crisis,
│       │             #   crisisDetect, twilio, expoPush, auth, env
│       ├── jobs/      # followups, reminders (run via /internal/cron)
│       ├── prompts/  # the AfterCare system prompt
│       ├── scripts/  # seedQuests, embedResources
│       └── data/     # quest seeds
├── supabase/
│   ├── migrations/   # 0001 schema → 0005 notifications
│   └── seed/         # curated CA resources (CSV) + verification policy
├── .github/workflows # ci.yml (typecheck+test), cron.yml (scheduled jobs)
└── docs/             # PRD, build plan, master context, legal/ (privacy, terms)
```

## Architecture

**Web (live):** a single Next.js app — the UI and the API routes ship together,
so there is no separate backend to keep alive.

```
Next.js (web/)  ──▶  /api/chat       ──▶  Claude API (structured 3-part replies)
                ──▶  /api/state      ──▶  Postgres (profile + quest progress)
                ──▶  /api/auth/*     ──▶  magic link via Resend
                ──▶  /api/resources  ──▶  Sanity CMS (falls back to bundled seed)
                ──▶  /api/notify     ──▶  Resend (caseworker messages)
                ──▶  /api/cron/*     ──▶  reminders + panic follow-ups
```

Every integration **degrades gracefully**: with no env vars set, the app runs
entirely on `localStorage` with scripted replies and still works end to end.

**Mobile (build-ready):** the Expo app in `app/` talks to the standalone
Node/Express API in `api/`.

```
React Native (Expo)  ──HTTPS──▶  Node/Express API  ──▶  Supabase (Postgres + Auth + RLS)
                                       │             ──▶  Claude API (chat + reasoning)
                                       │             ──▶  pgvector (RAG)
                                       └─────────────▶  Twilio (crisis SMS)
```

**Why RAG matters:** A vanilla LLM will tell a kid in California to call a New
York hotline. RAG over a curated, ZIP-filtered resource DB = trust. The AI can
**never** return a resource that isn't in the verified DB.

---

## Getting started

### The web app (start here)

```bash
cd web
npm install
npm run dev               # http://localhost:3000
```

That's it — no env vars, no database, no keys required. Copy `.env.example` to
`.env.local` and fill in `ANTHROPIC_API_KEY` when you want live Claude chat
instead of the scripted replies. See [`web/README.md`](./web/README.md) for
every variable.

---

## Mobile app (Expo)

### Prerequisites
- Node 20+
- A [Supabase](https://supabase.com) project (URL + keys)
- An [Anthropic](https://console.anthropic.com) API key
- (Optional for full RAG) Pinecone or pgvector, Twilio, Voyage AI embeddings

### 1. Backend API

```bash
cd api
cp .env.example .env      # fill in your keys
npm install
npm run dev               # starts on http://localhost:4000
curl http://localhost:4000/health
```

### 2. Database

Apply all migrations in `supabase/migrations/` (0001 → 0005) via the Supabase
SQL editor or CLI:

```bash
supabase link --project-ref <ref>
supabase db push
```

Then seed quests and the resource RAG index (needs the service-role key, and an
embeddings key for real vectors):

```bash
cd api
npm run seed:quests        # loads the bank-account quest
npm run embed:resources    # embeds + upserts the curated CA resources
```

See `supabase/seed/README.md` for the **resource verification gate** (no dead
numbers before launch).

### 3. Mobile app

```bash
cd app
cp .env.example .env       # point EXPO_PUBLIC_API_URL at your API
npm install
npx expo start
```

Scan the QR code with Expo Go, or run on a simulator.

---

## Deploy

**Web → Vercel (primary).** Vercel project `aftercare`, linked to this repo with
**Root Directory = `web/`** and production branch `main`. Every push to `main`
deploys. Set `ANTHROPIC_API_KEY` in the project's environment variables to turn
on live Claude chat; everything else is optional.

**API → Railway (Docker):** `api/Dockerfile` + `api/railway.json` are ready.
Create a Railway service from the repo (root `api/`), set the env vars from
`api/.env.example`, and it deploys with a `/health` check.

**Scheduled jobs:** `.github/workflows/cron.yml` hits `POST /internal/cron`
hourly (panic follow-ups + quest reminders). Set repo secrets `API_URL` and
`CRON_SECRET` (the latter must match the API env). Railway cron works too.

**App → EAS / stores:** `app/eas.json` defines development / preview / production
profiles.

```bash
cd app
npx eas build --profile preview --platform all      # internal testing
npx eas submit --profile production                  # needs Apple/Google accounts
```

> Store submission, Twilio A2P registration, and the resource-verification pass
> are user-gated steps — see the build plan.

## Build plan & docs

The full product thinking lives in [`docs/`](./docs):

- [`docs/AfterCare_PRD.md`](./docs/AfterCare_PRD.md) — product requirements
- [`docs/AfterCare_MVP_Build_Plan.md`](./docs/AfterCare_MVP_Build_Plan.md) — 6-week sprint plan
- [`docs/AfterCare_Master_Context.md`](./docs/AfterCare_Master_Context.md) — the complete A-to-Z context

---

## Safety guardrails (non-negotiable)

- **RAG-only resources.** The AI cannot return a resource outside the curated DB.
- **Crisis routing.** Emergencies always surface 988, Covenant House, and the
  Trevor Project — even with zero account data.
- **No clinical or legal advice.** Always refer to professionals / legal aid.
- **Minor data privacy.** Row-level security on every table, no PII in AI logs.
- **Free forever for foster youth.** Always.
