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
            65 listings across housing, health, school, money, and legal help.
            Only a subset are verified. {VERIFIED_MEANING} Everything else is
            labeled <strong>{UNVERIFIED_LABEL}</strong>.
          </p>
          <div className="mk-cta-row">
            <Link href="/services" className="mk-btn mk-btn-primary">
              Browse services
            </Link>
            <Link href="/app" className="mk-btn mk-btn-ghost">
              Find help in the app
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
