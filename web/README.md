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
| Database       | Postgres (users, profiles, quest progress, conversations)   |
| AI Chat        | ✅ Done — live Claude API via `app/api/chat`; RAG next       |
| Content/CMS    | Sanity (resources directory, quests, copy)                  |
| Email          | Resend (OTP / magic-link, caseworker drafts, reminders)     |
| Logging        | Betterstack                                                 |
| Scheduled jobs | Vercel Cron **or** GitHub Actions (follow-ups, reminders)   |

These are additive to the UI in this directory and are intentionally **not** wired up
yet — the priority for this milestone was an amazing, error-free UI/UX demo.
