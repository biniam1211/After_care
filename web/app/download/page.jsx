import Link from "next/link";
import { OrgNav, OrgFooter, CrisisStrip, ORG_STATUS } from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "Download the app",
  description:
    "Get AfterCare on your phone today — add the web app to your Home Screen, or wait for TestFlight. The App Store listing is not live yet.",
};

// ───────────────────────────────────────────────────────────
// AfterCare — /download (org surface)
//
// Honest status page. The iPhone app is NOT on the App Store yet —
// no page may claim otherwise. What works TODAY is the web app
// (Add to Home Screen, below). TestFlight is the next step and is
// blocked on owner-only actions listed in
// docs/IPHONE-SHIP-CHECKLIST.md (Apple Developer Program, EAS build).
// ───────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "1",
    t: "Open it in Safari",
    b: "On your iPhone, open Safari and go to this site, then tap Open the app. (On Android, use Chrome.)",
  },
  {
    n: "2",
    t: "Tap Share",
    b: "In Safari, tap the Share button (the square with the arrow pointing up) at the bottom of the screen.",
  },
  {
    n: "3",
    t: "Add to Home Screen",
    b: "Scroll down and tap Add to Home Screen, then tap Add. The AfterCare icon appears next to your other apps. Open it like any app.",
  },
];

const BLOCKERS = [
  {
    t: "Apple Developer Program — $99/year",
    b: "Only the founder can enroll. No build can reach a real iPhone without it.",
  },
  {
    t: "TestFlight build via EAS",
    b: "Run the preview build, install it on test phones, and check the Panic Button dials for real.",
  },
  {
    t: "Store listing + privacy URL",
    b: "Screenshots, listing copy, and a published privacy policy (currently a lawyer-unreviewed draft).",
  },
];

export default function Download() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Get AfterCare on your phone</p>
          <h1 className="mk-h1">
            The app, on your home screen, <em>today.</em>
          </h1>
          <p className="mk-deck">
            The App Store listing isn&rsquo;t live yet — we won&rsquo;t
            pretend it is. But you don&rsquo;t have to wait: the full app
            runs in your browser and installs to your Home Screen in under
            a minute, with no account and no download.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app now →
            </Link>
          </div>
          <p className="mk-cta-note">
            Free forever · No sign-up wall · Works in your browser
          </p>
        </div>
      </header>

      {/* ── Option 1: numbered steps ledger ── */}
      <section className="mk-section" id="home-screen">
        <div className="mk-wrap">
          <p className="mk-kicker">Option 1 — Works right now</p>
          <h2 className="mk-h2">Add AfterCare to your Home Screen.</h2>
          <p className="mk-deck">
            This installs the web app like a real app: its own icon, no
            browser address bar, and it opens straight into AfterCare.
            Nothing to download from a store.
          </p>
          <div className="mk-ledger">
            {STEPS.map((s) => (
              <div className="mk-ledger-row" key={s.n}>
                <div className="mk-ledger-num accent">{s.n}</div>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Option 2: blockers ledger ── */}
      <section className="mk-section" id="testflight">
        <div className="mk-wrap">
          <p className="mk-kicker">Option 2 — Coming next</p>
          <h2 className="mk-h2">iPhone app via TestFlight, then the App Store.</h2>
          <p className="mk-deck">
            The iPhone build exists as an Expo shell that wraps this same
            web app — one product, one codebase — with real dialer handling
            for the Panic Button and an offline crisis screen. It is{" "}
            <b>not yet submitted</b> to Apple. What stands between here and
            TestFlight is owner-only setup, not more code:
          </p>
          <div className="mk-ledger">
            {BLOCKERS.map((b, i) => (
              <div className="mk-ledger-row" key={b.t}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <h3>{b.t}</h3>
                  <p>{b.b}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mk-caption">
            Full step-by-step: see <code>docs/IPHONE-SHIP-CHECKLIST.md</code>{" "}
            in the repo. {ORG_STATUS}
          </p>
        </div>
      </section>

      {/* ── Android: short note ── */}
      <section className="mk-section" id="android">
        <div className="mk-wrap">
          <p className="mk-kicker">Android</p>
          <h2 className="mk-h2">Same app, same steps.</h2>
          <p className="mk-lead">
            On Android, open this site in Chrome, tap the menu, and choose{" "}
            <b>Add to Home screen</b> / <b>Install app</b>. A sideloadable
            preview APK can also be produced with EAS when the team is ready
            to hand a file to someone directly.
          </p>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
