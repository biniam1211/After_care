import Link from "next/link";
import { Icon } from "@/components/ui";
import { OrgArt } from "@/components/org-art";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "Impact",
  description:
    "How AfterCare measures impact — honestly, with no numbers we have not measured.",
};

export default function Impact() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            Impact
          </span>
          <h1 className="mk-h1">
            One youth, <em>one finished thing.</em>
          </h1>
          <p className="mk-sub">
            We measure what matters — and we say plainly what we have not
            measured yet.
          </p>
        </div>
      </header>

      {/* ── What we measure ── */}
      <section className="mk-section" id="measure">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">What we measure</p>
            <h2 className="mk-h2">Finished things, not page views.</h2>
            <p className="mk-lead">
              The goal we measure ourselves against is simple: does a foster
              kid open this app a second time within 7 days — and does one
              real thing get finished, like a bank account opened, a grant
              applied for, or a shelter reached?
            </p>
            <ul className="mk-checklist">
              <li>Return visits — does a young person come back within 7 days?</li>
              <li>Finished tasks — did one real thing get done?</li>
              <li>Directory health — are listings verified, or honestly labeled unverified?</li>
            </ul>
          </div>
          <div className="mk-art">
            <OrgArt kind="growth" />
          </div>
        </div>
      </section>

      {/* ── Real counts ── */}
      <section className="mk-section mk-band-sky" id="counts">
        <div className="mk-wrap">
          <p className="mk-kicker">Real counts, today</p>
          <h2 className="mk-h2">What exists right now.</h2>
          <div className="mk-grid3">
            <div className="mk-card">
              <h3>65 listings</h3>
              <p>California programs in the services directory across housing, health, school, money, and legal help.</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse the directory →</Link></p>
            </div>
            <div className="mk-card">
              <h3>6 verified</h3>
              <p>Listings whose official page we confirmed. The rest say “Unverified — call to confirm,” so you always know what&rsquo;s checked.</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse the directory →</Link></p>
            </div>
            <div className="mk-card">
              <h3>1 navigator, live</h3>
              <p>The app runs in your browser today and installs to your Home Screen in under a minute. Free forever.</p>
              <p><Link href="/app" style={{ fontWeight: 700 }}>Open the app →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we don't publish ── */}
      <section className="mk-section" id="not-yet">
        <div className="mk-wrap">
          <p className="mk-kicker">What we don&rsquo;t publish — yet</p>
          <h2 className="mk-h2">No impact numbers we haven&rsquo;t measured.</h2>
          <p className="mk-lead">
            We do not publish impact numbers yet, because we don&rsquo;t track
            youth to produce them. No invented percentages, no invented member
            counts, no stories presented as real people&rsquo;s words. When we
            have real outcomes to report, we will report them — with the
            method, not just the number.
          </p>
          <div className="mk-cta-row">
            <Link href="/research" className="mk-btn mk-btn-sky">
              See the research <Icon name="arrowR" size={19} color="#fff" sw={2.6} />
            </Link>
            <Link href="/get-involved" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
              Get involved
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
