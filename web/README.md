# AfterCare — Web app (`web/`)

The AfterCare mobile experience, implemented as a **Next.js (App Router)** web app and
deployable to **Vercel** as a single project. This is the re-platform of the design
prototype from Claude Design (`AfterCare_Standalone`) onto the target stack.

## What's here

A faithful, fully-interactive port of every screen from the design:

- **Onboarding** — welcome → name → phone → OTP → ZIP → age → foster status → learning
  style / feeling → done (dark ocean welcome, progress bar, big inputs).
- **Home** — greeting, active-quest hero with progress ring, quick-help tiles, "people
  your age are asking" chips, recommended quests carousel, safety CTA.
- **AI Chat** — the hero. Scripted 3-part answers (answer → next steps → real resources),
  typing indicator, panic CTA, and "turn this into a Quest" follow-ups. Adapts to the
  user's learning style / feeling from onboarding.
- **Quests** — list + interactive step-by-step quest detail with AI check-ins and a
  completion celebration. Progress persists in `localStorage`.
- **Resources** — ZIP-flavored finder with search + category filters, and a resource
  detail with call / directions / "text my caseworker" actions.
- **Panic Button** — emergency triage → per-scenario action plan (shelter, hotline,
  pre-written caseworker text). 911 / 988 always surfaced.
- **Settings** — revisit learning style / feeling.

State (onboarding, profile, quest progress) persists in `localStorage` under
`aftercare_state_v1`, so the app is a self-contained interactive demo with no backend
required.

## Live AI chat (Claude API)

The AI Chat is wired to the **Claude API** through a server route at `app/api/chat/route.js`:

- Set `ANTHROPIC_API_KEY` (see `.env.example`) and the chat calls Claude live — the key
  stays server-side and never reaches the browser.
- With **no key set**, the endpoint reports `configured: false` and the client falls back
  to the built-in scripted replies, so the demo keeps working with zero configuration.
- Any upstream error also falls back to scripted replies — the chat never hard-fails.

The model returns the exact 3-part shape the UI renders (`answer` → `steps` → `resources`
→ optional `followup`/`quest` → `panic`) via structured outputs, and the server validates
every `resources`/`quest` id against the known catalog before sending it to the client.
Crisis messages set `panic: true`, which surfaces the Panic Button inline. Override the
model with `ANTHROPIC_MODEL` (defaults to `claude-opus-5`).

## Caseworker messaging (Resend)

The Panic Button's "Send this text" and each resource's "Text my caseworker" send a real
email via **Resend** when `RESEND_API_KEY` is set and the youth has added a caseworker
email in Settings. The UI always shows an optimistic "Sent" first (a youth in crisis
never waits), then the real send fires best-effort. With no key configured the send is
simulated. Route: `app/api/notify/route.js`.

## Accounts & cross-device sync (Postgres + magic link)

Set `DATABASE_URL` (any hosted Postgres — Vercel/Neon/Supabase/Railway) to turn on:

- **Magic-link sign-in** — Settings → Account → enter email → Resend emails a one-time
  link (`/api/auth/request` → `/api/auth/verify`), which sets an httpOnly session cookie.
- **Server-side state** — onboarding, profile, and quest progress persist per user in
  Postgres (`/api/state`) and sync across devices; localStorage stays the offline mirror.

The schema (`users`, `sessions`, `login_tokens`, `app_state`) is created automatically on
first use. With **no** `DATABASE_URL`, all of this is inert and the app runs on
localStorage exactly as the standalone demo — the build and demo never depend on it.
See `.env.example` for every variable.

## Design system

Ported verbatim from the prototype's tokens (see `app/globals.css`):

- **Colors** — harbor/ocean navy, sky blue, warm orange, mint, panic red, foam bg.
- **Type** — Bricolage Grotesque (display) + Plus Jakarta Sans (body), via `next/font`.
- **Primitives** (`components/ui.jsx`) — `Icon` (custom 24-grid stroke set), `Phone`
  frame + `StatusBar`, `Screen`, `Button`, `Card`, `Badge`, `IconTile`, `Ring`,
  `ProgressBar`, `DetailHeader`.

## Run it

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (0 errors)
npm run start    # serve the production build
```

## Deploying to Vercel

Point a Vercel project at this repo with **Root Directory = `web/`**. Framework preset
Next.js. No environment variables are required for the demo build.

## Backend re-platform — next phase (the "napkin" architecture)

The design is currently client-only (scripted AI + `localStorage`). The target
architecture adds:

| Concern        | Plan                                                         |
| -------------- | ----------------------------------------------------------- |
| Database       | ✅ Done — Postgres (users, sessions, profiles, quest progress) via `lib/db.js` |
| Auth           | ✅ Done — magic-link email sign-in + session cookies (`app/api/auth/*`)        |
| AI Chat        | ✅ Done — live Claude API via `app/api/chat`; RAG next       |
| Email          | ✅ Done — Resend (magic links + caseworker messages); reminders next          |
| Content/CMS    | Sanity (resources directory, quests, copy) — still a static seed              |
| Logging        | Betterstack                                                 |
| Scheduled jobs | Vercel Cron **or** GitHub Actions (follow-ups, reminders)   |

Everything above degrades gracefully: with no env vars set, the app runs entirely on
localStorage + scripted content as a self-contained demo. Remaining: Sanity CMS,
Betterstack logging, scheduled reminders, and RAG over the resource DB.
