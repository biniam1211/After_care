import Link from "next/link";
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
  { n: "~20,000", what: "Youth age out of US foster care", meaning: "Every year, twenty thousand young people leave care and lose the system that — imperfectly — was their safety net." },
  { n: "20%", what: "Become homeless the day they turn 18", meaning: "One in five has nowhere to sleep on their first night of legal adulthood." },
  { n: "Under 3%", what: "Ever earn a college degree", meaning: "The education pipeline breaks early and stays broken without intervention." },
  { n: "17%", what: "Of people in US prisons spent time in foster care", meaning: "The pipeline from care to incarceration is one of the most expensive failures in American public life." },
];

const PRINCIPLES = [
  { t: "Phone-first.", b: "Everything lives where young people already are — on their phone, in plain language." },
  { t: "Answers, then action.", b: "Knowing isn’t doing. Every answer ends in steps that finish a real task." },
  { t: "Never invented.", b: "The navigator recommends only from a fixed catalog of real listings — it cannot invent a hotline or an office." },
  { t: "Honest about limits.", b: "It is not a lawyer, a doctor, or a caseworker — and it says so, then points you to a real one." },
  { t: "Private by design.", b: "No selling data, ever. Nothing you ask is used to profile you." },
];

export default function Research() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Research &amp; evidence</p>
          <h1 className="mk-h1">
            The gap is real. <em>So is the data.</em>
          </h1>
          <p className="mk-deck">
            AfterCare is built on what the evidence actually says about aging
            out — and on the gap between help existing and help reaching
            someone.
          </p>
        </div>
      </header>

      {/* ── The data: a real table ── */}
      <section className="mk-section" id="data">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — The data</p>
          <h2 className="mk-h2">What happens when the system stops calling.</h2>
          <table className="mk-table">
            <thead>
              <tr>
                <th>Figure</th>
                <th>What it says</th>
                <th>What it means</th>
              </tr>
            </thead>
            <tbody>
              {STATS.map((s) => (
                <tr key={s.what}>
                  <td>{s.n}</td>
                  <td style={{ color: "var(--ink)", fontWeight: 600 }}>{s.what}</td>
                  <td>{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mk-caption">
            These figures are supplied estimates used for planning.
            Primary-source citations are still being verified, so no source
            links are claimed for them here. We will not ship a citation we
            have not checked.
          </p>
        </div>
      </section>

      {/* ── The accessibility gap: pull quote + essay ── */}
      <section className="mk-pull" id="gap">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — The accessibility gap</p>
          <blockquote>
            <p>
              “Knowledge and accessibility are the real barriers.
              Everything is on their phone, via text, apps, and links.”
            </p>
            <cite>— APHSA, 2024</cite>
          </blockquote>
          <p className="mk-pull-note">
            The help is scattered across hundreds of websites, state portals,
            PDFs, and overworked caseworkers&rsquo; heads — and none of it is
            written for a 17-year-old holding a phone.
          </p>
          <p className="mk-pull-note">
            The federal government&rsquo;s answer is a transition toolkit written
            for caseworkers. Nobody under 25 reads a PDF. That gap — between
            help existing and help reaching someone — is the entire reason
            AfterCare exists.
          </p>
        </div>
      </section>

      {/* ── Approach: numbered principles ── */}
      <section className="mk-section" id="approach">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — Our approach</p>
          <h2 className="mk-h2">Built for how young people actually get help.</h2>
          <div className="mk-ledger">
            {PRINCIPLES.map((p, i) => (
              <div className="mk-ledger-row" key={p.t}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-cta-row">
            <Link href="/impact" className="mk-btn mk-btn-primary">
              How we measure impact →
            </Link>
            <Link href="/programs" className="mk-btn mk-btn-ghost">
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
