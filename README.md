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
├── app/              # Expo native shell — wraps web/ in a WebView (iOS + Android)
│   └── App.tsx       # the whole app: WebView + native dialer + offline screen
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

**Mobile (build-ready, not published):** `app/` is a thin Expo shell around the
same live web app, so there is one product and one codebase — not two versions
drifting apart.

```
Expo shell (app/)  ──WebView──▶  /app on the live site
                   ──native──▶  tel: / sms: / mailto: → the real dialer
                   ──native──▶  offline screen with 988 / Covenant House / 911
```

See [`app/README.md`](./app/README.md) for how to produce an installable build.

**Why the resource list is locked:** A vanilla LLM will tell a kid in
California to call a New York hotline. The chat endpoint constrains the model's
`resources` field to an enum of known ids and re-validates every id server-side,
so the AI **cannot** return a resource that isn't in the verified catalog.

**`api/` is dormant.** The standalone Node/Express + Supabase backend is still
in the tree and still has the RAG, quest and document-vault work in it, but the
Railway service behind it is gone and nothing currently depends on it.

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

## Mobile app (Expo shell)

```bash
cd app
npm install
npx expo start             # scan the QR code with Expo Go
```

It loads the live web app, so there is nothing else to stand up. Point it at a
different deploy by editing `expo.extra.appUrl` in `app/app.json`.

Producing an installable `.apk` (and what still stands between here and the app
stores) is documented in [`app/README.md`](./app/README.md).

---

## The dormant backend (`api/` + `supabase/`)

Nothing currently runs this — the web app carries its own API routes and the
Railway service is gone. It is kept because the RAG pipeline, quest seeds,
document vault and curated CA resource set are real work worth keeping. To
bring it back you would need a Supabase project, migrations `0001` → `0005`
applied, an Anthropic key, an embeddings key, and a host:

```bash
cd api
cp .env.example .env       # fill in your keys
npm install && npm run dev # http://localhost:4000
npm run seed:quests
npm run embed:resources
```

See `supabase/seed/README.md` for the **resource verification gate** (no dead
numbers before launch).

---

## Deploy

**Web → Vercel (primary).** Vercel project `aftercare`, linked to this repo with
**Root Directory = `web/`** and production branch `main`. Every push to `main`
deploys. Set `ANTHROPIC_API_KEY` in the project's environment variables to turn
on live Claude chat; everything else is optional.

**App → EAS.** `app/eas.json` has `preview` (Android `.apk`, sideloadable) and
`production` (`.aab` for Play). Not published to any store yet — see
[`app/README.md`](./app/README.md).

**API → Railway (Docker), if ever revived:** `api/Dockerfile` + `api/railway.json`
are ready. Create a Railway service from the repo (root `api/`), set the env vars
from `api/.env.example`, and it deploys with a `/health` check.

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
