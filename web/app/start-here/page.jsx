import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { FounderFigure } from "@/components/founder-photos";
import "../marketing.css";

export const metadata = {
  title: "Start here",
  description:
    "Not sure where to begin? A simple path through AfterCare — crisis first, then documents, money, license, benefits, and school.",
  openGraph: {
    title: "Start here · AfterCare",
    description:
      "A clear path for foster youth: safety first, then the adulting steps that unlock everything else.",
    type: "website",
  },
};

const PATH = [
  {
    n: "00",
    title: "If you are in danger or need a bed tonight",
    body: "Stop here first. Call or text 988. Shelter: Covenant House 1-800-388-3888. Local help: 211. LGBTQ+ youth: Trevor Project 1-866-488-7386. Or open the app Panic Button.",
    href: "/resources#crisis",
    cta: "Crisis resources",
    urgent: true,
  },
  {
    n: "01",
    title: "Get your vital documents",
    body: "Birth certificate, SSN card, and state ID unlock bank accounts, jobs, DMV, and benefits.",
    href: "/programs/vital-documents",
    cta: "Vital documents",
    quest: true,
  },
  {
    n: "02",
    title: "Open a bank account",
    body: "No parent required at 18. Fee-free account so your paycheck stays yours.",
    href: "/programs/money",
    cta: "Money & banking",
    quest: true,
  },
  {
    n: "03",
    title: "Learner’s permit & driver’s license",
    body: "California DMV steps for foster youth — who can sign, driver’s ed, insurance pointers.",
    href: "/programs/drivers-license",
    cta: "Driver’s license flagship",
    quest: true,
  },
  {
    n: "04",
    title: "Lock in benefits & health coverage",
    body: "Medi-Cal to 26 for eligible former foster youth, CalFresh, and peer support options like iFoster’s Peers Paving the Path.",
    href: "/programs/benefits",
    cta: "Benefits",
    quest: true,
  },
  {
    n: "05",
    title: "School, work, and housing",
    body: "Chafee Grant, first job, and a housing plan — finish one Quest at a time.",
    href: "/programs",
    cta: "All programs",
  },
];

export default function StartHerePage() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Start here</p>
          <h1 className="mk-h1">
            Not sure where to begin? <em>Follow this path.</em>
          </h1>
          <p className="mk-deck">
            Safety first. Then the papers and accounts that unlock everything
            else. Each step links to a program guide — and most have a Quest in
            the app.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Get help now
            </Link>
            <Link href="/programs/drivers-license" className="mk-btn mk-btn-ghost">
              Jump to driver’s license
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div className="mk-steps" style={{ marginTop: 0 }}>
            {PATH.map((p) => (
              <div className="mk-step" key={p.n}>
                <div className="mk-step-index" style={p.urgent ? { color: "var(--crisis)" } : undefined}>
                  {p.n}
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <p style={{ marginTop: 10 }}>
                    <Link href={p.href} className="mk-tile-link">
                      {p.cta} →
                    </Link>
                    {p.quest && (
                      <>
                        {" · "}
                        <Link href="/app" className="mk-tile-link">
                          Start Quest
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <FounderFigure photoId="grad-dad" sizes="(max-width: 860px) 100vw, 420px" />
        </div>
      </section>

      <section className="mk-section mk-section-alt">
        <div className="mk-wrap">
          <p className="mk-kicker">Also worth knowing</p>
          <div className="mk-grid-2">
            <Link href="/programs/health" className="mk-tile">
              <span className="mk-badge mk-badge-live">Partner resource</span>
              <h3>Peer support (iFoster)</h3>
              <p>
                Peers Paving the Path pairs eligible CA youth with a Medi-Cal
                Certified Peer Support Specialist who has lived foster-care
                experience. Separate from AfterCare — official page confirmed.
              </p>
              <span className="mk-tile-link">Health program →</span>
            </Link>
            <Link href="/research#policy" className="mk-tile">
              <span className="mk-badge mk-badge-flagship">Policy context</span>
              <h3>Why this moment matters</h3>
              <p>
                A November 2025 White House executive order calls for tools that
                help youth transitioning from foster care find housing, school,
                work, and health supports — the same gap AfterCare was built to close.
              </p>
              <span className="mk-tile-link">Read the research note →</span>
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
