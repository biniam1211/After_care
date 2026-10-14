# AfterCare — iPhone ship checklist

> Added Oct 13, 2026. Status: the iPhone app is **build-ready, not
> submitted**. Nothing in this file has been done for you — every step
> below needs the founder (Binyam) or a device. Do NOT claim the app is
> "on the App Store" until the last step is done.

## Where things stand

- `app/` is an Expo SDK 57 / React Native 0.86 WebView shell that loads
  the live web app at the URL in `app.json` → `extra.appUrl`
  (`https://aftercare-biniam1211s-projects.vercel.app/app`).
- Bundle id: `ai.aftercare.app` (iOS + Android match). App name:
  `AfterCare`. Scheme: `aftercare`. Version `0.1.0`, iOS build number `1`.
- The shell adds: home-screen icon, no browser chrome, real dialer
  handling for `tel:` / `sms:` / `mailto:` (the Panic Button's promise),
  outside links in the system browser, Android back-button history, and
  an offline screen that still lists 988 / Covenant House / 911.
- `app.json`, `eas.json`, and `App.tsx` are consistent (verified Oct 13):
  same bundle id, same `appUrl`, same crisis numbers, splash/icon assets
  present in `app/assets/images/`.
- What the shell does NOT add: push notifications, offline data beyond
  `localStorage` + the offline crisis screen, or any native screens.

## Owner-only steps (Binyam)

### 1. Apple Developer Program — $99/year

- [ ] Enroll at developer.apple.com with the Apple ID that will own the
      listing. Only the founder can do this — it needs identity
      verification and payment. Use an **organization** enrollment if
      AfterCare will list as an org; that needs a D-U-N-S number and
      takes longer than individual enrollment.
- [ ] Accept the Apple Developer Program License Agreement when prompted.

### 2. EAS account + first preview build

- [ ] `npm install -g eas-cli` then `npx eas login` (free Expo account).
- [ ] From `app/`: `eas build:configure` (writes `eas.json` if needed —
      it already exists; confirm, don't overwrite blindly).
- [ ] Android sanity build first (no Apple account needed):
      `eas build --profile preview --platform android` → sideloadable
      `.apk` to hand to someone.
- [ ] iOS preview build: `eas build --profile preview --platform ios`
      (needs the Apple Developer account from step 1).

### 3. TestFlight (test on real iPhones)

- [ ] Install the preview build on 2–3 real iPhones via TestFlight
      (internal testers first).
- [ ] Test the flows in `docs/LOCAL_RUN.md` §4 on-device, especially:
      Panic Button numbers actually dial; offline screen shows
      988 / Covenant House / 911 with airplane mode on; safe-area /
      gesture-nav spacing (SDK 57 draws Android edge-to-edge; iOS
      notch / home-indicator spacing is unverified on hardware).
- [ ] Fix what breaks. Rebuild. Repeat until the flows pass.

### 4. Store listing (before submission)

- [ ] Screenshots: iPhone 6.9" + 6.5" + 5.5" sizes (App Store requires
      them; generate from the TestFlight build, not from a browser
      mockup).
- [ ] Listing copy: name, subtitle, description, keywords, support URL,
      marketing URL. Do NOT call AfterCare a registered nonprofit in
      the listing (no filing exists — see `docs/GO_LIVE.md` §4).
- [ ] Privacy policy at a real, public URL. Today `/privacy` is a
      lawyer-unreviewed draft with a placeholder contact address. It
      needs lawyer review + a real contact address + the custom domain
      before it can be the listing's privacy URL.
- [ ] Age rating: answer the questionnaire honestly (youth 14+, crisis
      content, user-generated chat). Expect 12+ or 17+ depending on
      answers — do not game it.
- [ ] App Review note for guideline 4.2 ("minimum functionality"):
      Apple can reject WebView-only apps. Argue explicitly: the shell's
      native dialer handling (Panic Button calls the real dialer, which
      a browser tab cannot do) + the native offline crisis screen are
      the native functionality. Link the TestFlight notes to the panic
      flow.

### 5. Submit

- [ ] `eas build --profile production --platform ios` (archive for the
      store, not a sideloadable file).
- [ ] `eas submit --platform ios` (or submit via App Store Connect).
- [ ] Respond to App Review. Common first-review issues for this app:
      4.2 (WebView-only), privacy-policy URL, age rating, and any claim
      in the listing that the app is a registered nonprofit or an
      emergency service (it is neither — the app must say so, and it
      does in Terms).

## What is NOT done (do not claim otherwise)

- No Apple Developer enrollment. No EAS build has been run from this
  repo state. No TestFlight build. No App Store submission.
- Until TestFlight ships, the real install path is **Add to Home
  Screen** — see `/download`.
