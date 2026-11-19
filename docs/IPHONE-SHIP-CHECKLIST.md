# AfterCare — iPhone ship checklist

> Status: the iPhone app is **code-ready for TestFlight / App Store review
> prep, not submitted**. Nothing below has been done for you — every step
> needs the founder (Binyam) or a physical device. Do NOT claim the app is
> "on the App Store" until the last step is done.

## Where things stand (code)

- `app/` is an Expo SDK 57 / React Native 0.86 shell that loads the live
  web app at `app.json` → `extra.appUrl`.
- Bundle id: **`ai.aftercare.app`**. Scheme: **`aftercare`**. Version
  `0.1.0`, iOS build number `1`.
- **Native surfaces (guideline 4.2 argument):**
  - Fully offline **crisis screen** — 988, Covenant House
    (`1-800-388-3888`), Trevor Project (`1-866-488-7386`), 911 — native
    dialer + SMS, SOS FAB always reachable, works if the site never loads
  - **Push** — local panic check-ins + Expo remote push via
    `/api/devices` + `/api/cron/reminders`
  - **Optional Face ID / passcode lock** (crisis help still works locked)
  - Magic-link **deep links** (`aftercare://` + associated domains),
    safe-area, pull-to-refresh, in-app browser for outside https,
    loading / offline error states
- `PrivacyInfo.xcprivacy` + `ios.privacyManifests` in `app.json`
- EAS profiles: `development`, `preview`, **`production`** (iOS) in
  `eas.json`
- Splash / icon assets present under `app/assets/images/`

Verify locally (no Apple account required):

```bash
cd app && npm ci && npm run typecheck && npm run doctor
npx expo prebuild --platform ios --no-install
```

## Owner-only steps (Binyam)

### 1. Apple Developer Program — $99/year

- [ ] Enroll at [developer.apple.com](https://developer.apple.com) with the
      Apple ID that will own the listing. Use **organization** enrollment
      if AfterCare will list as an org (needs D-U-N-S; slower).
- [ ] Accept the Apple Developer Program License Agreement.
- [ ] Note your **Team ID** — paste into `app/eas.json` →
      `submit.production.ios.appleTeamId`.

### 2. Expo / EAS project

- [ ] `npm install -g eas-cli` then `eas login` (free Expo account).
- [ ] From `app/`: `eas init` — replaces
      `REPLACE_WITH_EAS_PROJECT_ID` in `app.json` → `extra.eas.projectId`.
      Push tokens need a real project id.
- [ ] `eas credentials` — let EAS manage distribution certs + provisioning
      (recommended) or upload your own.
- [ ] Confirm `eas.json` `production` profile (already present) before the
      first archive build.

### 3. Domain + universal links

- [ ] Set production `expo.extra.appUrl` (and associated domain / Android
      intent filter hosts) to the **real** public domain — not only the
      Vercel preview hostname.
- [ ] Host Apple App Site Association at
      `https://<domain>/.well-known/apple-app-site-association`
      (no file extension, `application/json`). A starter file lives at
      `web/public/.well-known/apple-app-site-association` — update
      `appID` with `TEAMID.ai.aftercare.app` after enrollment.
- [ ] Verify universal links open the app for
      `/api/auth/verify` and `/app` on a real device.

### 4. Preview / TestFlight builds

- [ ] Android sanity (optional):  
      `eas build --profile preview --platform android` → sideloadable `.apk`.
- [ ] iOS preview:  
      `eas build --profile preview --platform ios`  
      (needs Apple Developer from step 1).
- [ ] Install via TestFlight on 2–3 real iPhones. Test:
  - [ ] Panic / SOS → native dialer for 988 / Covenant / Trevor / 911
  - [ ] Airplane mode → offline crisis screen still dials
  - [ ] Face ID lock on/off; crisis reachable while locked
  - [ ] Magic-link email opens app and signs in
  - [ ] Outside resource link opens in-app browser
  - [ ] Panic plan schedules a local check-in notification (~test with a
        short interval in a debug build if needed)
  - [ ] Safe-area / notch / home-indicator spacing
- [ ] Fix what breaks. Rebuild. Repeat.

### 5. App Store Connect listing

- [ ] Create the app record (bundle id `ai.aftercare.app`).
- [ ] Paste **App Store Connect App ID** into `eas.json` →
      `submit.production.ios.ascAppId`.
- [ ] Screenshots: iPhone 6.9" + 6.5" (+ older sizes if required). Capture
      from TestFlight — not browser mockups.
- [ ] Listing copy: name, subtitle, description, keywords, support URL,
      marketing URL. **Do NOT** call AfterCare a registered nonprofit
      (no filing — see `docs/GO_LIVE.md`).
- [ ] Privacy policy URL — public, lawyer-reviewed, real contact address
      (today `/privacy` is still a draft).
- [ ] **Privacy nutrition labels** in App Store Connect (Data Collection):
      be honest about email (accounts), product interaction, and that
      crash/diagnostics may apply if you add them later. This app does
      **not** track across apps; Face ID stays on-device.
- [ ] **Age rating** questionnaire: youth audience, crisis content,
      user-generated chat with AI. Expect **12+** or **17+** — do not game
      it. Keep a short internal note of the answers you selected.
- [ ] App Review notes for **guideline 4.2** (minimum functionality).
      Explicitly list native value:
      1. Offline crisis screen with OS dialer/SMS (988 / Covenant / Trevor / 911)
      2. Always-on native SOS independent of WebView load
      3. Push check-ins for panic + quest reminders
      4. Optional Face ID privacy lock
      5. Universal-link magic-link sign-in  
      Link TestFlight notes to the Panic / SOS flow.

### 6. Submit

- [ ] `eas build --profile production --platform ios`
- [ ] `eas submit --profile production --platform ios`  
      (or upload the `.ipa` in App Store Connect).
- [ ] Respond to App Review. Common first-pass issues: 4.2, privacy URL,
      age rating, claiming to be an emergency service or nonprofit (the
      app must not — Terms already say so).

## What is NOT done (do not claim otherwise)

- No Apple Developer enrollment from this repo state.
- No real EAS `projectId` (placeholder in `app.json`).
- No TestFlight build, no App Store submission, no screenshots uploaded.
- Until TestFlight ships, the real install path for youth is still
  **Add to Home Screen** — see `/download`.
