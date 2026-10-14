import Link from "next/link";
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

const MEASURES = [
  { m: "Return visits", how: "Does a young person come back within 7 days?", why: "A guide nobody returns to is a guide nobody trusts." },
  { m: "Finished tasks", how: "Did one real thing get done?", why: "A bank account opened, a grant applied for, a shelter reached — that is the unit of impact." },
  { m: "Directory health", how: "Are listings verified, or honestly labeled unverified?", why: "A directory that lies about its own accuracy is worse than no directory at all." },
];

const COUNTS = [
  { n: "65", l: "California listings in the services directory — housing, health, school, money, and legal help.", href: "/services", link: "Browse the directory" },
  { n: "6", l: "Listings whose official page we confirmed. The rest say “Unverified — call to confirm.”", href: "/services", link: "Browse the directory" },
  { n: "1", l: "Navigator, live. Runs in your browser today, installs to your Home Screen in under a minute. Free forever.", href: "/app", link: "Open the app" },
];

export default function Impact() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Impact</p>
          <h1 className="mk-h1">
            One youth, <em>one finished thing.</em>
          </h1>
          <p className="mk-deck">
            We measure what matters — and we say plainly what we have not
            measured yet.
          </p>
        </div>
      </header>

      {/* ── What we measure: metric / how / why ledger ── */}
      <section className="mk-section" id="measure">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — What we measure</p>
          <h2 className="mk-h2">Finished things, not page views.</h2>
          <p className="mk-deck">
            The goal we measure ourselves against is simple: does a foster
            kid open this app a second time within 7 days — and does one
            real thing get finished?
          </p>
          <div className="mk-ledger">
            {MEASURES.map((x) => (
              <div className="mk-ledger-row three" key={x.m}>
                <div>
                  <h3>{x.m}</h3>
                </div>
                <div>
                  <p style={{ margin: 0 }}>{x.how}</p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>{x.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real counts: big numbers, rules, no cards ── */}
      <section className="mk-section" id="counts">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — Real counts, today</p>
          <h2 className="mk-h2">What exists right now.</h2>
          <div className="mk-ledger">
            {COUNTS.map((c) => (
              <div className="mk-ledger-row" key={c.n + c.l.slice(0, 12)}>
                <div className="mk-ledger-num accent">{c.n}</div>
                <div>
                  <p style={{ margin: 0 }}>{c.l}</p>
                  <Link href={c.href} className="mk-ledger-link">{c.link} →</Link>
                </div>
              </div>
            ))}
          </div>
          <figure className="mk-art" style={{ marginTop: 48 }} aria-hidden="true">
            <OrgArt kind="growth" />
            <figcaption>
              <b>Fig. 1 —</b> Growth, one finished thing at a time. No
              invented curve, no projected hockey stick.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── What we don't publish: ink band ── */}
      <section className="mk-section mk-section-ink" id="not-yet">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — What we don&rsquo;t publish, yet</p>
          <h2 className="mk-h2">No impact numbers we haven&rsquo;t measured.</h2>
          <p className="mk-lead">
            We do not publish impact numbers yet, because we don&rsquo;t track
            youth to produce them. No invented percentages, no invented member
            counts, no stories presented as real people&rsquo;s words. When we
            have real outcomes to report, we will report them — with the
            method, not just the number.
          </p>
          <div className="mk-cta-row">
            <Link href="/research" className="mk-btn mk-btn-primary">
              See the research →
            </Link>
            <Link href="/get-involved" className="mk-btn mk-btn-ghost" style={{ color: "var(--paper)", borderColor: "var(--paper)" }}>
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
