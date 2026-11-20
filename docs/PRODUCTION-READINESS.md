# AfterCare web — production readiness

Audit and hardening of `web/` (the live Next.js product). Last updated with the
production-readiness PR. Product scope, “free forever,” and safety principles are
unchanged.

## What this pass fixed

### 1. Crisis safety

- **Panic Button** always renders a hardcoded national strip: **988**, **Covenant House** (`1-800-388-3888`), **The Trevor Project** (`1-866-488-7386`), and **911** — independent of `RESOURCES`, Sanity, DB, or network (`lib/crisis.js`, `components/panic.jsx`).
- **Server-side crisis detection** on `/api/chat` (ported from dormant `api/`) forces `panic: true`, injects crisis resource ids, and prepends national hotline copy even when the model under-reports crisis.
- **Client scripted fallback** runs the same detector when Claude is unset/down, including a dedicated `CHAT_REPLIES.crisis` path for self-harm phrasing (no more silent fall-through to “default”).
- **Resource lock** remains: JSON-schema enum + server re-validation; unknown ids are stripped. Clinical/legal advice banned in the system prompt; inventing hotlines forbidden.
- Org **CrisisStrip** now includes Trevor Project alongside 988 / Covenant / 911.

### 2. Security & privacy (minors)

- **`/api/notify` closed as an open relay**: recipient is taken only from the signed-in user’s server-stored `profile.caseworkerEmail`. Guests get optimistic UI only; no arbitrary `to`.
- **Rate limits** (in-memory per isolate): chat 30/min/IP, auth request 5/15min/IP (+ per-email), notify 10/min/IP, resources 60/min/IP.
- **Cron** fails closed in production / when `DATABASE_URL` is set without `CRON_SECRET`; **Bearer-only** (no `?secret=`).
- **`APP_URL` required** in production for magic-link origin (blocks Host-header phishing).
- **Profile PII stripped** before Anthropic: only `learningStyle` / `feeling` / `zip`. Client no longer posts name or caseworker email to `/api/chat`.
- **Error `detail` strings** no longer returned to clients on chat/auth/state/notify/checkin.
- **Security headers + CSP** via `next.config.mjs` (frame deny, nosniff, referrer, permissions-policy, HSTS, CSP).
- **Sanity cannot overwrite** national crisis names/phones; seed `verified` flags preserved.
- **`app_state` payloads** size-capped; notify messages length-capped.

### 3. Reliability

- Timeouts on Claude (25s SDK), Resend (10s), and Sanity (8s).
- Claude refusal on a crisis message returns a minimal safe reply with national lines instead of a bare 502.
- **`GET /api/health`** reports integration status (no secrets) and DB reachability.
- Startup **`instrumentation.js`** logs production env warnings without crashing.
- Panic “send caseworker” shows a gentle note pointing back to 988 if the real send did not go through.

### 4. Quality gates

- CI for `web/`: **lint + test + build** (`.github/workflows/ci.yml`).
- Focused Vitest coverage: crisis detection, resource lock / crisis injection, rate limit, profile sanitization, magic-link origin pinning, Sanity merge pins.

### 5. Production basics

- `.env.example` updated with production requirements and safety notes.
- Accessibility: aria-labels on SOS FAB, panic dialog/close, chat input/send, tab bar; 44px touch targets on key controls; crisis regions labeled.
- Sitemap / metadataBase no longer hardcode a personal Vercel preview hostname (use `APP_URL`).

## Owner-gated remaining work

These need a human with keys, legal, or operational access — not code in this repo:

| Item | Why it still needs you |
|------|-------------------------|
| Set `ANTHROPIC_API_KEY`, `APP_URL`, `DATABASE_URL`, `RESEND_API_KEY` + verified `RESEND_FROM`, `CRON_SECRET` in Vercel | Secrets stay out of git |
| Confirm Vercel Cron / GitHub Actions send `Authorization: Bearer $CRON_SECRET` (no query string) | Cron now rejects `?secret=` |
| **Verify the ~59 unverified resource listings** (flip `verified` in CSV, re-run `node scripts/build-resources.mjs`) | Human confirmation of official pages |
| Legal review of Privacy / Terms for foster minors & crisis disclosures | Counsel |
| App Store / Play accounts + Expo EAS for the `app/` shell | Store enrollment |
| Optional: Upstash/Redis (or Vercel WAF) for **multi-isolate** rate limits | In-memory limits reset per serverless isolate |
| Prefer CA-verified Postgres SSL (`rejectUnauthorized: true` + CA) when your host supports it | Current default matches common serverless Postgres |
| Point production `APP_URL` / DNS at the real domain; update share cards | SEO / magic links |
| Betterstack (or similar) source token for structured logs | Ops visibility |
| Nonprofit registration / EIN if you will claim 501(c)(3) status on the site | Copy currently refuses to claim it |
| Periodically `npm audit` / upgrade Next (production deps were clean after bumping to Next 16.4.6 in this PR; Vitest remains a devDependency with known advisories) | Ongoing patching |

## Deliberately left alone

- **`api/` + `supabase/`** — dormant; CI still typechecks/tests `api/` only to stay green. No feature investment.
- **Product scope** — still AI Chat + 1 Quest + Panic + Resources; no new product surfaces.
- **Optimistic “Sent” on caseworker text** — kept so a youth in crisis never waits on the network; failure note + national strip are the safety backstop.
- **Magic-link token still in query string** — tightening to POST/fragment needs a small UX redesign; noted as follow-up, not blocking this pass.
- **JS (not TypeScript) in `web/`** — matches the existing live codebase; do not rewrite for readiness.

## How to verify locally

```bash
cd web
npm ci
npm run lint
npm test
npm run build
npm run dev   # optional — Panic + chat work with zero env vars
curl -s localhost:3000/api/health | jq .
```
