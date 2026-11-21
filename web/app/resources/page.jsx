import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  VERIFIED_MEANING,
  UNVERIFIED_LABEL,
} from "@/components/site-chrome";
import { PROGRAMS } from "@/components/programs-data";
import "../marketing.css";

export const metadata = {
  title: "Resources",
  description:
    "AfterCare resources hub: crisis lines, California services directory, and program guides for foster youth.",
  openGraph: {
    title: "Resources · AfterCare",
    description:
      "Crisis help, services directory, and program guides — honestly labeled.",
    type: "website",
  },
};

const CRISIS = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 · 24/7", href: "tel:988" },
  { name: "211", detail: "Local community resources", href: "tel:211" },
  { name: "Covenant House", detail: "1-800-388-3888 · shelter for youth", href: "tel:18003883888" },
  { name: "The Trevor Project", detail: "1-866-488-7386 · LGBTQ+ youth", href: "tel:18664887386" },
  { name: "Emergency", detail: "Call 911 if someone is being hurt", href: "tel:911" },
];

export default function ResourcesHubPage() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Resources</p>
          <h1 className="mk-h1">
            Help you can use <em>today.</em>
          </h1>
          <p className="mk-deck">
            Crisis lines, the California services directory, and program guides
            — with honest labels about what has and hasn&rsquo;t been verified.
          </p>
        </div>
      </header>

      <section className="mk-section" id="crisis">
        <div className="mk-wrap">
          <p className="mk-kicker">Crisis</p>
          <h2 className="mk-h2">If you need help right now</h2>
          <p className="mk-lead">
            AfterCare is not a crisis line and does not monitor messages 24/7.
            Use these numbers first when you are in danger or need a bed tonight.
          </p>
          <div className="mk-grid-2">
            {CRISIS.map((c) => (
              <a key={c.name} href={c.href} className="mk-tile">
                <h3>{c.name}</h3>
                <p>{c.detail}</p>
                <span className="mk-tile-link">Call / open →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="directory">
        <div className="mk-wrap">
          <p className="mk-kicker">Directory</p>
          <h2 className="mk-h2">California services directory</h2>
          <p className="mk-lead">
            Dozens of listings across housing, health, school, money, and legal
            help — including iFoster&rsquo;s Peers Paving the Path (official page
            confirmed). Only a subset are verified. {VERIFIED_MEANING} Everything
            else is labeled <strong>{UNVERIFIED_LABEL}</strong>.
          </p>
          <div className="mk-cta-row">
            <Link href="/services" className="mk-btn mk-btn-primary">
              Browse services
            </Link>
            <Link href="/app" className="mk-btn mk-btn-ghost">
              Find help in the app
            </Link>
            <Link href="/start-here" className="mk-btn mk-btn-ghost">
              Start here path
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section" id="peers">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Featured listing</p>
            <h2 className="mk-h2">iFoster — Peers Paving the Path</h2>
            <p className="mk-lead">
              Free Medi-Cal Certified Peer Support Specialists with lived
              foster-care experience for eligible California youth ages 16–26
              enrolled in a Medi-Cal Managed Care Plan. Separate organization —
              AfterCare is not affiliated.
            </p>
            <ul className="mk-checklist">
              <li>Call or text 530-550-8001</li>
              <li>support@ifoster.org</li>
              <li>Official page confirmed (Verified listing)</li>
            </ul>
            <div className="mk-cta-row">
              <a
                className="mk-btn mk-btn-primary"
                href="https://www.ifoster.org/peers-paving-the-path/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open iFoster page
              </a>
              <Link href="/programs/health" className="mk-btn mk-btn-ghost">
                Health program
              </Link>
            </div>
          </div>
          <div className="mk-tile" style={{ alignSelf: "start" }}>
            <span className="mk-badge mk-badge-flagship">Policy</span>
            <h3>Fostering the Future (EO 14359)</h3>
            <p>
              November 2025 White House order on tools for youth transitioning
              from foster care. Cited for context only — AfterCare is not a
              federal deliverable.
            </p>
            <Link href="/research#policy" className="mk-tile-link">
              Research note →
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="guides-federal">
        <div className="mk-wrap">
          <p className="mk-kicker">Guides &amp; context</p>
          <h2 className="mk-h2">Federal toolkit + national peer network</h2>
          <p className="mk-lead">
            Two more Verified listings (official pages confirmed). Separate
            orgs / agencies — AfterCare is not affiliated with either.
          </p>
          <div className="mk-grid-2">
            <a
              className="mk-tile"
              href="https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="mk-badge mk-badge-live">Verified listing</span>
              <h3>ED Foster Care Transition Toolkit</h3>
              <p>
                Public-domain U.S. Department of Education guide (May 2016) on
                planning, school, jobs, money, documents, housing, health, and
                transportation. Confirm current local rules — some links age.
              </p>
              <span className="mk-tile-link">Open PDF →</span>
            </a>
            <a
              className="mk-tile"
              href="https://www.fosterclub.com/whos-foster-care"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="mk-badge mk-badge-live">Verified listing</span>
              <h3>FosterClub — Who&rsquo;s in Foster Care?</h3>
              <p>
                National primer with links to AFCARS and NYTD. We cite their
                page for context and do not republish those figures as
                AfterCare stats.
              </p>
              <span className="mk-tile-link">Open FosterClub →</span>
            </a>
          </div>
          <div className="mk-cta-row" style={{ marginTop: 22 }}>
            <Link href="/research#toolkit" className="mk-btn mk-btn-ghost">
              Research notes
            </Link>
            <Link href="/services" className="mk-btn mk-btn-ghost">
              Full directory
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section" id="guides">
        <div className="mk-wrap">
          <p className="mk-kicker">Program guides</p>
          <h2 className="mk-h2">Step-by-step life navigation</h2>
          <div className="mk-grid-3">
            {PROGRAMS.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="mk-tile">
                {p.flagship && <span className="mk-badge mk-badge-flagship">Flagship</span>}
                <h3>{p.shortTitle}</h3>
                <p>{p.tagline}</p>
                <span className="mk-tile-link">Open guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
