# AfterCare — Ship package build report

> Branch: `ship/separate-marketing-app` (local only — NOT pushed, NOT
> merged). Base: `main` @ `5cf4492` (Oct 12, 2026). Date: Oct 13, 2026.

## What this branch does

Separates the org marketing site from the product app inside the single
`web/` Next.js deploy, makes every verification / nonprofit / install
claim honest, rewrites the two stale runbooks, and adds the iPhone ship
checklist + download page. No secrets added. No `verified` flags changed
in the data (CSV untouched; generated file re-ran to identical data).

## Build results (all run locally, Oct 13, 2026)

| Check | Result |
|---|---|
| `web/`: `npm ci` | **PASS** after resyncing `web/package-lock.json` (see note). Was failing on the pristine tree: lockfile missing `@emnapi/*` entries. |
| `web/`: `npm run build` | **PASS** — compiled, 12 static pages, routes: `/`, `/services`, `/download`, `/app`, `/privacy`, `/terms`, `/sitemap.xml`, 10 API routes. |
| `app/`: `npm ci` + `npm run typecheck` | **PASS** — zero errors. |
| `web/`: `node scripts/build-resources.mjs` | **PASS** — "Wrote 65 resources (6 verified)". Data identical; only the banner comment changed. |
| Smoke test (prod server, no env vars) | **PASS** — `/`, `/download`, `/services`, `/app`, `/privacy`, `/terms` all 200; `/api/chat` → `{"configured":false}`; `/api/resources` → seed, 65 total, 6 verified; sitemap lists `/services` + `/download`. |
| Link audit | **PASS** — every `href` in `web/app` + `web/components` resolves to an existing route/anchor. |
| Secrets scan of diff | **PASS** — no keys/tokens (one `ANTHROPIC_API_KEY=<redacted>` placeholder line in a doc). |

### Lockfile note (pre-existing, now fixed)

`web/package-lock.json` was out of sync with `web/package.json` on the
pristine tree, so `npm ci` failed — which also means CI's web job would
fail on `main`. `npm install --package-lock-only` resynced it: 64 diff
lines, all `@emnapi/*` entries, no dependency version changes
(Next stays 16.2.11). Kept in this branch as a fix, not a workaround.

## What is now truly ready to ship

- **Org marketing site** (`/`, `/services`, `/download`, `/privacy`,
  `/terms`): renders, honest copy, shared chrome, crisis strip on every
  page. Deployable today via the existing Vercel project.
- **Product app** (`/app`): builds and runs; onboarding → chat (scripted
  fallback with no key, live Claude with key) → quests → resources with
  verification badges → panic with 988 / Covenant House / 911.
- **iPhone shell** (`app/`): typechecks; `app.json` / `eas.json` /
  `App.tsx` consistent (bundle id `ai.aftercare.app`, same `appUrl`,
  same crisis numbers). **Not built, not submitted** — see blockers.
- **Install path that works today:** Add to Home Screen (`/download`
  explains it). No store, no account.

## Still blocked — whose action unblocks it

| Blocker | Owner | Unblocks |
|---|---|---|
| Apple Developer Program ($99/yr) + enrollment | **Binyam only** | Any EAS iOS build, TestFlight, App Store |
| EAS login + first preview/TestFlight build | Binyam (his Expo/Apple accounts) | Real-device testing, store submission |
| Custom domain | Binyam (domain + DNS) | Org site on a real domain; `APP_URL` update |
| Prod keys: `ANTHROPIC_API_KEY`, `DATABASE_URL`, `RESEND_API_KEY`, `CRON_SECRET` | Binyam (his accounts) | Live chat, accounts/sync, real caseworker mail, reminders |
| 59 unverified resource rows | Human verification calls (Binyam or a volunteer) | Calling the directory "verified" in general; safe promotion to youth |
| Lawyer review of Privacy/Terms + real contact email | Lawyer + Binyam | Store listing privacy URL; relying on the legal pages |
| Founder story in his own words | Binyam | Replacing the `/` story placeholder with real biography |
| `api/` revive-or-delete decision | Binyam + maintainer | Whether the dormant backend lives or is removed |

## Next commands

```bash
# Preview locally (no keys needed)
cd web && npm ci && npm run dev        # http://localhost:3000

# Production build check
cd web && npm run build

# iPhone shell typecheck
cd ../app && npm ci && npm run typecheck

# Phone test via Expo Go (see docs/LOCAL_RUN.md §3 for the LAN-IP step)
cd ../app && npx expo start
```

To ship this branch: review the diff, then (Binyam or maintainer)
`git checkout main && git merge ship/separate-marketing-app` and push —
or open a PR from the branch. Do NOT force-push; `main` is untouched.
