import Link from "next/link";
import { Icon } from "@/components/ui";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "Research",
  description:
    "AfterCare research & evidence: the aging-out data, the accessibility gap, and what we measure.",
};

// Figures are supplied estimates used for planning. No primary-source
// citations or links are claimed for them — those are still being verified.
const STATS = [
  { n: "~20,000", l: "youth age out of US foster care every year" },
  { n: "20%", l: "become homeless the day they turn 18" },
  { n: "Under 3%", l: "ever earn a college degree" },
  { n: "17%", l: "of people in US prisons spent time in foster care" },
];

export default function Research() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            Research &amp; evidence
          </span>
          <h1 className="mk-h1">
            The gap is real. <em>So is the data.</em>
          </h1>
          <p className="mk-sub">
            AfterCare is built on what the evidence actually says about aging
            out — and on the gap between help existing and help reaching
            someone.
          </p>
        </div>
      </header>

      {/* ── The data ── */}
      <section className="mk-section mk-section-dark" id="data">
        <div className="mk-wrap">
          <p className="mk-kicker">The data</p>
          <h2 className="mk-h2">What happens when the system stops calling.</h2>
          <div className="mk-stats">
            {STATS.map((s) => (
              <div className="mk-stat" key={s.l}>
                <div className="mk-stat-n">{s.n}</div>
                <div className="mk-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.65)", marginTop: 18, maxWidth: 44 }}>
            These figures are supplied estimates used for planning.
            Primary-source citations are still being verified, so no source
            links are claimed for them here. We will not ship a citation we
            have not checked.
          </p>
        </div>
      </section>

      {/* ── The accessibility gap ── */}
      <section className="mk-section" id="gap">
        <div className="mk-wrap">
          <p className="mk-kicker">The accessibility gap</p>
          <h2 className="mk-h2">Help exists. Reaching it is the problem.</h2>
          <p className="mk-lead">
            The help is scattered across hundreds of websites, state portals,
            PDFs, and overworked caseworkers&rsquo; heads — and none of it is
            written for a 17-year-old holding a phone.
          </p>
          <blockquote className="mk-quote" style={{ borderLeftColor: "var(--sky)" }}>
            <p style={{ color: "var(--ink)" }}>
              Knowledge and accessibility are the real barriers. Everything is on
              their phone, via text, apps, and links.
            </p>
            <cite style={{ color: "var(--ink-soft)" }}>— APHSA, 2024</cite>
          </blockquote>
          <p className="mk-lead">
            The federal government&rsquo;s answer is a transition toolkit written
            for caseworkers. Nobody under 25 reads a PDF. That gap — between
            help existing and help reaching someone — is the entire reason
            AfterCare exists.
          </p>
        </div>
      </section>

      {/* ── How the evidence shapes the product ── */}
      <section className="mk-section mk-band-mint" id="approach">
        <div className="mk-wrap">
          <p className="mk-kicker">Our approach</p>
          <h2 className="mk-h2">Built for how young people actually get help.</h2>
          <ul className="mk-checklist">
            <li><b>Phone-first.</b> Everything lives where young people already are — on their phone, in plain language.</li>
            <li><b>Answers, then action.</b> Knowing isn&rsquo;t doing. Every answer ends in steps that finish a real task.</li>
            <li><b>Never invented.</b> The navigator recommends only from a fixed catalog of real listings — it cannot invent a hotline or an office.</li>
            <li><b>Honest about limits.</b> It is not a lawyer, a doctor, or a caseworker — and it says so, then points you to a real one.</li>
            <li><b>Private by design.</b> No selling data, ever. Nothing you ask is used to profile you.</li>
          </ul>
          <div className="mk-cta-row">
            <Link href="/impact" className="mk-btn mk-btn-sky">
              How we measure impact <Icon name="arrowR" size={19} color="#fff" sw={2.6} />
            </Link>
            <Link href="/programs" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
              See the programs
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
