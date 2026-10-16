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
    "AfterCare research & evidence: the accessibility gap, and what we measure.",
  openGraph: {
    title: "Research · AfterCare",
    description:
      "AfterCare research & evidence: the accessibility gap, and what we measure.",
    type: "website",
  },
};

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
            The gap is real. <em>Closing it is the work.</em>
          </h1>
          <p className="mk-deck">
            AfterCare exists because of the gap between help existing and
            help reaching someone — and because everything a young person
            needs should be on their phone, in plain language.
          </p>
        </div>
      </header>

      {/* ── The accessibility gap: essay ── */}
      <section className="mk-pull" id="gap">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — The accessibility gap</p>
          <p className="mk-pull-note">
            Help exists — but it lives across websites, state portals, PDFs,
            and overworked caseworkers&rsquo; heads, and almost none of it is
            written for a 17-year-old holding a phone.
          </p>
          <p className="mk-pull-note">
            That gap — between help existing and help reaching someone — is
            the entire reason AfterCare exists.
          </p>
        </div>
      </section>

      {/* ── Approach: numbered principles ── */}
      <section className="mk-section" id="approach">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — Our approach</p>
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
