# AfterCare — mobile app (`app/`)

The native shell for AfterCare. It wraps the live web app at
`https://aftercare-biniam1211s-projects.vercel.app/app` in a full-screen
WebView, so the phone app and the website are always the same product and
there is only one codebase to keep correct.

**Expo SDK 57 · React Native 0.86 · managed workflow**

## Why a shell and not a second app

There used to be a second, separate native implementation here — its own chat,
quests, panic and resource screens, talking to a Node API on Railway and a
Supabase project. That backend no longer exists, and the web app had already
overtaken it feature for feature. Maintaining two divergent versions of the
same product is how both ended up half-finished. The old implementation is
still in git history if it is ever wanted back (see the commit that introduced
this shell).

## What the shell actually adds

A browser tab could load the same URL. The shell exists for the parts a tab
gets wrong:

- **A home-screen icon and no browser chrome** — it looks and launches like an app.
- **`tel:` / `sms:` / `mailto:` links open the real dialer.** This is the
  important one. The Panic Button's promise is that tapping a shelter's number
  calls it; inside a naive WebView those links do nothing at all.
- **Outside links open in the system browser**, where the address bar tells you
  whose site you have landed on.
- **Android back button** walks web history instead of quitting.
- **An offline screen that still lists 988, Covenant House and 911** — the one
  place where "try again later" is not an acceptable answer by itself.

## Run it

```bash
cd app
npm install
npx expo start          # scan the QR code with Expo Go
```

Point the shell somewhere else (a preview deploy, a local `web/`) by editing
`expo.extra.appUrl` in `app.json`.

## Build an installable app

Builds run on EAS and need a free Expo account — `npx eas login` first.

```bash
npm install -g eas-cli
eas login
eas build:configure

# Android: a .apk you can download and sideload / hand to someone
eas build --profile preview --platform android

# iOS: needs a paid Apple Developer account ($99/yr) to install on a device
eas build --profile preview --platform ios
```

`preview` is set to `buildType: apk` so Android produces a directly
installable file. `production` builds an `app-bundle` (`.aab`), which is what
Google Play requires but which **cannot** be sideloaded — use `preview` for
anything you want to hand to a person.

## Before submitting to the stores

Not done yet, and each item needs an account only the owner can create:

- [ ] Apple Developer Program ($99/yr) and Google Play Console ($25 one-time)
- [ ] Store listing copy, screenshots, and a privacy-policy URL
      (`docs/legal/PRIVACY.md` needs to be published at a real address first)
- [ ] Verify safe-area behaviour on a real device — Android draws edge-to-edge
      in SDK 57, and the tab bar's spacing against a gesture-nav pill has not
      been checked on hardware
- [ ] Apple review note: a WebView-only app can be rejected under guideline
      4.2 ("minimum functionality"). The shell's native dialer handling and
      offline crisis screen are the argument against that, and it is worth
      making it explicitly in the review notes
