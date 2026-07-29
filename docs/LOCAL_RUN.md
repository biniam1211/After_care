# Run AfterCare locally & test on your phone

The backend (Supabase DB, quests, resources, Claude) is already **live**. This
guide gets the **API + Expo app running on your own machine** so you can test on
your phone with Expo Go. Your phone and laptop must be on the **same Wi-Fi**.

> Why local? Your phone can't reach `localhost` on another machine. You run the
> API on your laptop and point the app at your laptop's **LAN IP**.

---

## 0. Prerequisites
- **Node 20+** and npm.
- **Expo Go** app on your phone (App Store / Play Store).
- Phone + laptop on the **same Wi-Fi network**.

## 1. Get the code
```bash
git clone <your repo url> aftercare    # or: git pull
cd aftercare
git checkout claude/eloquent-gates-pglr0r
```

## 2. Configure the API (`api/.env`)
`api/.env` is gitignored, so create it from the example and paste in the same keys
you used to go live (Supabase service-role + DB password, Anthropic, OpenAI):
```bash
cd api
cp .env.example .env
# then edit .env and fill:
#   SUPABASE_URL=https://nbtxnkdjfsxfiwgbucbs.supabase.co
#   SUPABASE_ANON_KEY=sb_publishable_...           (already in .env.example header)
#   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
#   SUPABASE_DB_PASSWORD=...
#   ANTHROPIC_API_KEY=sk-ant-...
#   OPENAI_API_KEY=sk-proj-...     (optional — RAG works without it via location fallback)
```

## 3. Start the API
```bash
cd api
npm install
npm run dev          # → http://localhost:4000
```
Confirm in another terminal:
```bash
curl http://localhost:4000/health     # {"status":"ok",...}
```

## 4. Point the app at your laptop's LAN IP
Find your laptop's local IP:
- **macOS:** `ipconfig getifaddr en0`
- **Linux:** `ip addr | grep "inet "` (pick the `192.168.x.x` / `10.x.x.x`)
- **Windows:** `ipconfig` → IPv4 Address

Edit `app/.env`:
```dotenv
EXPO_PUBLIC_API_URL=http://<YOUR-LAN-IP>:4000     # e.g. http://192.168.1.23:4000
# Supabase public vars are already correct in app/.env
```
> `localhost` here will NOT work from the phone — it must be the LAN IP.

## 5. Start the app
```bash
cd app
npm install
npx expo start
```
Scan the QR code with **Expo Go**. The app loads on your phone.

---

## 6. Make sign-in (email magic-link) work
Auth is **email magic-link**. Two one-time Supabase settings:

1. **Supabase → Authentication → Providers → Email:** enable it.
2. **Supabase → Authentication → URL Configuration → Redirect URLs:** add the URL
   the app uses to reopen after you tap the email link. In **Expo Go** that looks
   like:
   ```
   exp://<YOUR-LAN-IP>:8081/--/onboarding
   ```
   The app **prints the exact URL** to the Expo terminal/console when you tap
   "Send link" (look for `[auth] magic-link redirect URL …`). Copy that exact
   value into the allowlist. Also add `aftercare://onboarding` for future
   standalone/dev builds. (A wildcard like `exp://*` also works for dev.)

Then: enter your email → tap the link in your inbox **on the same phone** → it
reopens Expo Go, establishes your session, and drops you into the app.

> Magic-link + Expo Go deep-linking can be finicky on some networks. If the link
> doesn't reopen the app, see the fallback below — the rest of the app still works
> once you have a session.

---

## 7. What to test
- **Onboarding:** email → consent (14+) → ZIP (try `92805` Anaheim) → age → status.
- **Chat (the heart):** ask *"I need housing in Anaheim"* → real Claude reply with
  **CA-only** resource cards (tap to call/open).
- **Quests:** open Quests → start "Get Your First Bank Account" → mark a step →
  "Ask AfterCare about this" deep-links into chat.
- **Panic:** tap Panic → 988 + crisis lines always present; local CA resources.
- **Resources:** browse/filter; tel:/url/maps deep links.
- **Vault:** upload a photo/PDF (private, signed URLs).

## 8. Fallback — test the API without the app
If phone deep-linking is troublesome, you can hit the live API directly. Mint a
JWT with the service-role key (server-side only), then:
```bash
TOKEN=...   # a Supabase access_token for a test user
curl -s http://localhost:4000/quests        -H "Authorization: Bearer $TOKEN"
curl -s -X POST http://localhost:4000/chat   -H "Authorization: Bearer $TOKEN" \
     -H 'Content-Type: application/json' -d '{"message":"I need housing in Anaheim"}'
curl -s -X POST http://localhost:4000/panic  -H "Authorization: Bearer $TOKEN" \
     -H 'Content-Type: application/json' -d '{"scenario":"homeless"}'
```

## Notes
- **Semantic search:** resources currently load **without embeddings** (the OpenAI
  key had no quota). RAG falls back to a location-filtered query, so results are
  still correct CA resources. Add OpenAI billing (or a Voyage key) and re-run
  `npm run embed:resources` to turn on semantic ranking.
- **Push notifications** are limited in Expo Go; a dev/standalone build is needed
  for full push. The app degrades gracefully without it.
- **Security:** never commit `api/.env`. Rotate any keys that passed through chat.
