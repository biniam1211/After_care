# AfterCare — Go-Live Runbook (current stack)

> Rewritten Oct 13, 2026. The previous version of this file described an
> old architecture (standalone native app + Railway Express API + a
> Supabase project) that no longer matches the repo. If you are reading a
> cached copy or an old printout, throw it away — this is the current one.
>
> 🔐 Secrets live in Vercel project settings / a gitignored `.env.local`,
> never in chat, commits, or screenshots.

## What "live" means now

One deploy, two surfaces:

| Surface | Code | Ships to |
|---|---|---|
| Org marketing site (`/`, `/services`, `/download`, `/privacy`, `/terms`) + product app (`/app`) | `web/` (Next.js) | Vercel |
| iPhone / Android shell (WebView around `/app`) | `app/` (Expo SDK 57) | EAS → TestFlight / Play (not submitted yet) |

`api/` (Express + Supabase) is **dormant**: its Railway service is gone
and nothing depends on it. Do not stand it up as part of go-live. The
decision is revive-or-delete — see
[`docs/ARCHITECTURE-SEPARATION.md`](./ARCHITECTURE-SEPARATION.md).

## 1. Deploy the web app (Vercel)

1. Import the repo into Vercel (or use the existing project). Root
   directory: `web/`.
2. Set the environment variables below in **Vercel → Project → Settings →
   Environment Variables** (Production). Every one is optional — with
   none set, the app runs end to end on `localStorage` + scripted chat
   replies. That is the demo mode, not the live mode.

| Variable | Effect when set | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI Chat calls Claude live (server-side only) | console.anthropic.com → API keys |
| `ANTHROPIC_MODEL` | Override model (default `claude-opus-5`) | — |
| `DATABASE_URL` | Postgres: magic-link sign-in + cross-device state sync | Any hosted Postgres (Neon / Supabase / Railway) |
| `RESEND_API_KEY` | Real "text my caseworker" + magic-link emails | resend.com → API keys |
| `RESEND_FROM` | From address for Resend (use a verified domain) | Your domain DNS |
| `APP_URL` | Canonical site URL for sign-in links | Your deployed URL |
| `CRON_SECRET` | Guards `/api/cron/reminders` | Generate: `openssl rand -hex 32` |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` | Resource directory served from Sanity instead of the bundled seed | sanity.io |
| `BETTERSTACK_SOURCE_TOKEN` | Structured server logs | Better Stack |
| `CONTACT_EMAIL` | Contact address shown on Privacy/Terms | Your inbox |

3. Deploy. Confirm: `/` renders the org landing, `/app` loads the
   product, `/services` lists programs, `/api/chat` returns
   `{ configured: false }` when no Anthropic key is set (expected) or a
   live reply when one is.

## 2. Turn on the live paths (in order)

1. **Chat:** set `ANTHROPIC_API_KEY` → ask "I need housing in Anaheim"
   → the reply must cite only catalog ids, and unverified listings must
   be presented with "call to confirm" (see §4).
2. **Accounts:** set `DATABASE_URL` + `RESEND_API_KEY` → Settings →
   Account → request a magic link → sign in on a second device → quest
   progress follows you.
3. **Caseworker messages:** set `RESEND_API_KEY` + a caseworker email in
   Settings → Panic → "Send this text" sends a real email.
4. **Reminders:** set `CRON_SECRET` + repo secrets `APP_URL` /
   `CRON_SECRET` → `.github/workflows/aftercare-web-reminders.yml` hits
   `/api/cron/reminders` hourly (panic 6-hour check-in + quest nudges).

## 3. iPhone / Android (separate track)

The native shell is build-ready, not published. Owner-only steps —
full checklist in
[`docs/IPHONE-SHIP-CHECKLIST.md`](./IPHONE-SHIP-CHECKLIST.md):
Apple Developer Program ($99/yr) → EAS preview build → TestFlight →
store listing + published privacy URL → App Store review (WebView-only
apps face Apple guideline 4.2; the review note must argue the native
dialer handling + offline crisis screen).

Until TestFlight ships, the real install path is **Add to Home Screen**
(see `/download`): Safari → Share → Add to Home Screen. No store, no
account, works today.

## 4. Before real users (non-negotiable)

- **Verify resources.** The catalog is 65 listings; only 6 have their
  official page confirmed (`verified: true` in
  `supabase/seed/resources.sample.csv`). "Verified" means official page
  confirmed — NOT a tested-live phone line (see
  `supabase/seed/README.md`). Do NOT flip a row to `verified: true`
  without a human confirming it, and do NOT describe the directory as
  "verified" in general. The UI already labels every unverified row
  "Unverified — call to confirm." The remaining ~59 rows still need
  human verification calls.
- **Legal.** `docs/legal/PRIVACY.md` + `TERMS.md` and the `/privacy` +
  `/terms` pages are plain-English drafts with placeholders — not
  lawyer-reviewed. Get a review and publish the privacy policy at a real
  URL before store submission.
- **Nonprofit status.** There is no 501(c)(3) / EIN / registration doc in
  the repo. Call AfterCare a "social-impact project working toward
  nonprofit status" — never a registered nonprofit — until a filing
  exists.
- **Custom domain.** The deploy still lives on a `vercel.app` URL. Point
  your domain at the Vercel project before promoting it widely, and
  update `APP_URL` / the sitemap base URL to match.
- **Stale duplicates.** If the old duplicate Vercel projects
  (`after-care`, `after-care-q5b1`, `after-care-zrtw`) still exist,
  delete them so nobody lands on a stale deploy.

## 5. Verify after deploy (smoke checklist)

- [ ] `/` — org landing renders; footer says "social-impact project
      working toward nonprofit status" and links Privacy/Terms as drafts.
- [ ] `/services` — programs list; Verified filter shows only the 6
      verified listings; unverified cards say "Unverified — call to
      confirm"; benefits screener shows matches only after all three
      questions are answered.
- [ ] `/app` — onboarding → chat (scripted fallback with no key, live
      Claude with key) → quest → resources → panic. Panic plan always
      shows 988 / Covenant House / 911.
- [ ] `/download` — states the App Store listing is NOT live and gives
      the Add-to-Home-Screen steps.
- [ ] `/api/chat` with no key → `{ configured: false }`.
