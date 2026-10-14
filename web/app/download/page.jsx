import Link from "next/link";
import { Icon } from "@/components/ui";
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
export default function Download() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            Get AfterCare on your phone
          </span>
          <h1 className="mk-h1">
            The app, on your home screen, <em>today.</em>
          </h1>
          <p className="mk-sub">
            The App Store listing isn&rsquo;t live yet — we won&rsquo;t
            pretend it is. But you don&rsquo;t have to wait: the full app
            runs in your browser and installs to your Home Screen in under
            a minute, with no account and no download.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app now <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
            </Link>
          </div>
          <p className="mk-cta-note">
            Free forever · No sign-up wall · Works in your browser
          </p>
        </div>
      </header>

      {/* ── Option 1: Add to Home Screen (works now) ── */}
      <section className="mk-section" id="home-screen">
        <div className="mk-wrap">
          <p className="mk-kicker">Option 1 — works right now</p>
          <h2 className="mk-h2">Add AfterCare to your Home Screen.</h2>
          <p className="mk-lead">
            This installs the web app like a real app: its own icon, no
            browser address bar, and it opens straight into AfterCare.
            Nothing to download from a store.
          </p>
          <div className="mk-cards">
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--sky-soft)" }}>
                <Icon name="phone" size={26} color="var(--sky)" sw={2.1} />
              </span>
              <h3>1 · Open it in Safari</h3>
              <p>
                On your iPhone, open Safari and go to this site, then tap{" "}
                <b>Open the app</b>. (On Android, use Chrome.)
              </p>
            </div>
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--warm-soft)" }}>
                <Icon name="send" size={26} color="var(--warm-deep)" sw={2.1} />
              </span>
              <h3>2 · Tap Share</h3>
              <p>
                In Safari, tap the <b>Share</b> button (the square with the
                arrow pointing up) at the bottom of the screen.
              </p>
            </div>
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--mint-soft)" }}>
                <Icon name="plus" size={26} color="var(--mint)" sw={2.1} />
              </span>
              <h3>3 · Add to Home Screen</h3>
              <p>
                Scroll down and tap <b>Add to Home Screen</b>, then tap{" "}
                <b>Add</b>. The AfterCare icon appears next to your other
                apps. Open it like any app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Option 2: TestFlight / App Store (not yet) ── */}
      <section className="mk-section" id="testflight" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <p className="mk-kicker">Option 2 — coming next</p>
          <h2 className="mk-h2">iPhone app via TestFlight, then the App Store.</h2>
          <p className="mk-lead">
            The iPhone build exists as an Expo shell that wraps this same
            web app — one product, one codebase — with real dialer handling
            for the Panic Button and an offline crisis screen. It is{" "}
            <b>not yet submitted</b> to Apple. What stands between here and
            TestFlight is owner-only setup, not more code:
          </p>
          <div className="mk-promises">
            <div className="mk-promise">
              <b>Apple Developer Program — $99/year</b>
              <span>Only the founder can enroll. No build can reach a real iPhone without it.</span>
            </div>
            <div className="mk-promise">
              <b>TestFlight build via EAS</b>
              <span>Run the preview build, install it on test phones, and check the Panic Button dials for real.</span>
            </div>
            <div className="mk-promise">
              <b>Store listing + privacy URL</b>
              <span>Screenshots, listing copy, and a published privacy policy (currently a lawyer-unreviewed draft).</span>
            </div>
          </div>
          <p className="mk-lead" style={{ marginTop: 24 }}>
            Full step-by-step: see <code>docs/IPHONE-SHIP-CHECKLIST.md</code>{" "}
            in the repo. {ORG_STATUS}
          </p>
        </div>
      </section>

      {/* ── Android ── */}
      <section className="mk-section" id="android" style={{ paddingTop: 0 }}>
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
