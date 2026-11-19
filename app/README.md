# AfterCare — mobile app (`app/`)

The native shell for AfterCare. It wraps the live web app (see
`expo.extra.appUrl` in `app.json`) in a full-screen WebView so the phone
app and the website stay one product — with **real native surfaces** so
Apple guideline 4.2 (minimum functionality) has something concrete to
point at.

**Expo SDK 57 · React Native 0.86 · managed workflow · bundle id `ai.aftercare.app`**

## Why a shell (and why it is not “just a WebView”)

There used to be a second, separate native implementation here. That backend
is gone; the web app is the product. The shell exists for the parts a browser
tab gets wrong, and for App Store–ready native value:

| Native surface | Why it matters |
|----------------|----------------|
| **Offline crisis screen** | 988, Covenant House, Trevor Project, 911 with the real dialer/SMS — works with airplane mode and if the site never loads |
| **SOS FAB** | Always opens the native crisis screen (not the web Panic UI) |
| **Push notifications** | Local panic check-ins + Expo remote push for cron reminders/quest nudges (`/api/devices` + `/api/cron/reminders`) |
| **Face ID / passcode lock** | Optional privacy lock (SecureStore). Crisis help stays reachable while locked |
| **Magic-link deep links** | `aftercare://` + associated domains into `/api/auth/verify` |
| **In-app browser** | Outside https links open in `expo-web-browser` (visible address bar) |
| **Safe area + pull-to-refresh + loading/error** | Status bar / notch / home indicator; PTR; offline fallback with crisis CTA |

`tel:` / `sms:` / `mailto:` still go to the OS dialer — the Panic Button’s
promise.

## Run it

```bash
cd app
npm install
npx expo start          # scan the QR with Expo Go (push/Face ID limited in Expo Go)
```

Point at a different deploy by editing `expo.extra.appUrl` in `app.json`.

## Verify before an EAS build

```bash
npm run typecheck
npm run doctor
npx expo prebuild --platform ios --no-install   # generates ios/ (gitignored)
```

`prebuild` needs a macOS host for a full Xcode compile; on Linux it still
validates config and generates the project tree when native tooling allows.

## Build an installable app (EAS)

Needs a free Expo account (`npx eas login`) and — for iOS devices / TestFlight —
a paid Apple Developer account ($99/yr).

```bash
npm install -g eas-cli
eas login
eas init                 # writes a real projectId into app.json extra.eas
# replace REPLACE_WITH_EAS_PROJECT_ID if init did not rewrite it

# Android sideloadable APK (no Apple account)
eas build --profile preview --platform android

# iOS TestFlight / device (needs Apple Developer)
eas build --profile preview --platform ios

# App Store archive
eas build --profile production --platform ios
eas submit --profile production --platform ios
```

`eas.json` already defines `development`, `preview`, and **`production`**
(iOS + Android). Submit placeholders (`ascAppId`, `appleTeamId`) must be
filled by the owner after App Store Connect setup.

## Owner-gated before App Store

See [`docs/IPHONE-SHIP-CHECKLIST.md`](../docs/IPHONE-SHIP-CHECKLIST.md) for the
exact checklist. Short version:

1. Apple Developer Program enrollment
2. `eas init` + credentials + real `projectId`
3. App Store Connect listing, screenshots, privacy nutrition labels
4. Host `apple-app-site-association` for universal links on the production domain
5. Age rating questionnaire (expect 12+ / 17+ — do not game it)
6. Review notes arguing 4.2 with the native crisis dialer + offline SOS + push + lock

## Privacy / permissions

- Face ID: `NSFaceIDUsageDescription` — optional lock only
- Notifications: panic check-ins + quest nudges; user can deny
- `PrivacyInfo.xcprivacy` + `ios.privacyManifests` — no tracking domains
- Push tokens sync to `/api/devices` only for **signed-in** users
