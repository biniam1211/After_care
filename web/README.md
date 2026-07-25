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
| AI Chat        | Replace scripted `CHAT_REPLIES` with the Claude API + RAG   |
| Content/CMS    | Sanity (resources directory, quests, copy)                  |
| Email          | Resend (OTP / magic-link, caseworker drafts, reminders)     |
| Logging        | Betterstack                                                 |
| Scheduled jobs | Vercel Cron **or** GitHub Actions (follow-ups, reminders)   |

These are additive to the UI in this directory and are intentionally **not** wired up
yet — the priority for this milestone was an amazing, error-free UI/UX demo.
