# Run AfterCare locally & test on your phone

> Rewritten Oct 13, 2026. The previous version of this file described an
> old architecture (a standalone Express API on port 4000, a Supabase
> project, `EXPO_PUBLIC_API_URL`, a `claude/...` branch) that no longer
> matches the repo. The current stack is: `web/` (Next.js — the whole
> product) + `app/` (Expo WebView shell around the web app). `api/` is
> dormant and is not part of local development.

## 0. Prerequisites

- **Node 22** and npm (CI uses Node 22; Node 20 also works for `web/`).
- A browser. For phone testing: Expo Go (App Store / Play Store).
- Phone + laptop on the **same Wi-Fi network** for the Expo-shell test.

## 1. Get the code

```bash
git clone https://github.com/biniam1211/After_care.git aftercare
cd aftercare
git checkout ship/separate-marketing-app   # or main, once this branch lands
```

## 2. Run the web app (the whole product)

No keys, no database, no backend to start. With zero env vars the app
runs end to end on `localStorage` + scripted chat replies.

```bash
cd web
npm ci
npm run dev          # → http://localhost:3000
```

- Org landing: http://localhost:3000/
- Product app: http://localhost:3000/app
- Services directory: http://localhost:3000/services
- Download page: http://localhost:3000/download

### Optional: turn on the live paths locally

```bash
cd web
cp .env.example .env.local
# then fill in what you want to test:
#   ANTHROPIC_API_KEY=...   live Claude chat (else scripted fallback)
#   DATABASE_URL=...        Postgres: magic-link sign-in + cross-device sync
#   RESEND_API_KEY=...      real caseworker + magic-link emails (else simulated)
#   CRON_SECRET=...         guards /api/cron/reminders
```

`.env.local` is gitignored. Never commit keys.

## 3. Test the phone shell (Expo Go)

The `app/` shell loads the web app in a WebView. By default it loads the
**deployed** site (`app.json` → `extra.appUrl`). To point it at your
local `web/` dev server:

1. Find your laptop's LAN IP (your phone cannot reach `localhost` on
   another machine):
   - macOS: `ipconfig getifaddr en0`
   - Linux: `ip addr | grep "inet "` (pick the `192.168.x.x` / `10.x.x.x`)
   - Windows: `ipconfig` → IPv4 Address
2. Temporarily edit `app/app.json` → `extra.appUrl` to
   `http://<YOUR-LAN-IP>:3000/app` (do NOT commit this change).
3. Start Expo:

```bash
cd app
npm ci
npx expo start
```

4. Scan the QR code with **Expo Go**. The shell loads your local web
   app. Revert `app.json` when you are done.

## 4. What to test

- **Landing (`/`):** mission, founder-story placeholder, services
  preview, download CTA, footer status line ("social-impact project
  working toward nonprofit status").
- **Services (`/services`):** search + category + ZIP filters;
  "Verified only" shows only the 6 verified listings; every unverified
  card says "Unverified — call to confirm"; benefits screener shows
  matches only after all three questions are answered and never asserts
  eligibility ("worth checking", not "you qualify").
- **App (`/app`):** onboarding → chat (scripted fallback with no key;
  live Claude with key) → quest → resources (verification badges) →
  panic. Panic plan always shows 988 / Covenant House / 911.
- **Chat honesty:** ask for a resource — the reply must never call an
  unverified listing "verified" and must say "call to confirm" for
  unverified ones.
- **Download (`/download`):** states the App Store listing is NOT live
  and gives Add-to-Home-Screen steps.
- **Panic in the shell:** in Expo Go, tapping a phone number must open
  the real dialer (this is the main thing the shell adds over a browser
  tab). Turn on airplane mode: the shell's offline screen must still
  list 988 / Covenant House / 911.

## 5. Regenerating the resource catalog

The web catalog is generated from the CSV — never hand-edit
`web/components/resources.generated.js`:

```bash
cd web
node scripts/build-resources.mjs
# → "Wrote 65 resources (6 verified) to ..."
```

To mark a listing verified, flip its `verified` to `true` in
`supabase/seed/resources.sample.csv` **only after a human confirms it**
(see `supabase/seed/README.md` for the exact definition), then
re-run the script and commit both files.

## 6. Checks before you push

```bash
cd web && npm ci && npm run build     # production build = the real gate
cd ../app && npm ci && npm run typecheck
```

CI runs the same two jobs (plus `api/` typecheck + tests) on every push.
