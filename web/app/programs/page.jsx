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
  title: "Programs",
  description:
    "AfterCare programs: Housing, Health, Work & Money, Community & Belonging — plus the Navigator app and the Services directory.",
};

const PILLARS = [
  {
    id: "housing",
    icon: "home",
    tint: "var(--sky)",
    bg: "var(--sky-soft)",
    title: "Housing",
    body: "A safe place to sleep tonight, and a path to a stable one next month. Emergency shelter, transitional housing, and the numbers that actually pick up — plus the steps to keep a roof over your head once you have one.",
    items: ["Emergency shelter near you", "Transitional housing options", "What to ask before you sign a lease"],
  },
  {
    id: "health",
    icon: "health",
    tint: "var(--panic-deep)",
    bg: "var(--panic-soft)",
    title: "Health",
    body: "Coverage that follows you and care you can actually reach. In California, former foster youth keep free Medi-Cal to age 26 — most never find out. We make sure you do, and we help in a crisis.",
    items: ["Medi-Cal to age 26 in California", "Finding a doctor or clinic near you", "Crisis help: 988, shelter, 911"],
  },
  {
    id: "work-money",
    icon: "cash",
    tint: "var(--warm-deep)",
    bg: "var(--warm-soft)",
    title: "Work & Money",
    body: "First bank account, first job, benefits you qualify for. The Chafee Grant offers up to $5,000 a year for college or job training if you were in care between 16 and 18 — the navigator walks you through claiming it.",
    items: ["First bank account, step by step", "Chafee Grant — up to $5,000/yr", "Job search and career readiness"],
  },
  {
    id: "community",
    icon: "heart",
    tint: "var(--mint)",
    bg: "var(--mint-soft)",
    title: "Community & Belonging",
    body: "People who get it. Guidance from lived experience, not lectures — and a community that does not end when you turn 18. You never age out of belonging here.",
    items: ["Guidance from lived experience", "A community that does not end at 18", "Help asking for help"],
  },
];

export default function Programs() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            Programs
          </span>
          <h1 className="mk-h1">
            Four pillars, <em>one navigator.</em>
          </h1>
          <p className="mk-sub">
            Housing, health, work &amp; money, and community — plus the
            navigator app and the services directory that hold them together.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
            </Link>
            <Link href="/services" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
              Find services
            </Link>
          </div>
        </div>
      </header>

      {/* ── Four pillars ── */}
      <section className="mk-section" id="pillars">
        <div className="mk-wrap">
          <p className="mk-kicker">The four pillars</p>
          <h2 className="mk-h2">Everything a young person needs to stand on their own.</h2>
          <div className="mk-grid3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {PILLARS.map((p) => (
              <div className="mk-card" key={p.id} id={p.id}>
                <span className="mk-tile" style={{ background: p.bg }}>
                  <Icon name={p.icon} size={26} color={p.tint} sw={2.1} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul className="mk-checklist">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigator program ── */}
      <section className="mk-section mk-band-sky" id="navigator">
        <div className="mk-wrap mk-split">
          <div>
            <span className="mk-badge mk-badge-live">Live now</span>
            <h2 className="mk-h2">The Navigator app.</h2>
            <p className="mk-lead">
              The navigator is one program of AfterCare — the one that turns
              information into finished things. Ask anything, get a plain-language
              answer, and follow steps until the task is done. It runs in your
              browser today and installs to your Home Screen in under a minute.
            </p>
            <ul className="mk-checklist">
              <li>Ask anything — judgment-free answers, any hour.</li>
              <li>Quests that finish the job — bank account, Chafee Grant, coverage past 18.</li>
              <li>Panic button that does something — shelter, a number that picks up, a message already written.</li>
              <li>Recommendations only from our fixed catalog — never invented listings.</li>
            </ul>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-sky">
                Open the app <Icon name="arrowR" size={19} color="#fff" sw={2.6} />
              </Link>
              <Link href="/download" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
                Get it on your phone
              </Link>
            </div>
          </div>
          <div className="mk-art">
            <OrgArt kind="compass" />
          </div>
        </div>
      </section>

      {/* ── Directory program ── */}
      <section className="mk-section" id="directory">
        <div className="mk-wrap mk-split">
          <div className="mk-art">
            <OrgArt kind="map" />
          </div>
          <div>
            <span className="mk-badge mk-badge-live">Live now</span>
            <h2 className="mk-h2">The Services directory.</h2>
            <p className="mk-lead">
              65 California listings across housing, health, school, money, and
              legal help — each labeled Verified or “Unverified — call to
              confirm,” so you always know what has and hasn&rsquo;t been checked
              yet.
            </p>
            <p className="mk-lead">
              <Link href="/services" style={{ fontWeight: 700 }}>Browse the directory →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="mk-section mk-band-warm" id="roadmap">
        <div className="mk-wrap">
          <span className="mk-badge mk-badge-roadmap">Roadmap — not live yet</span>
          <h2 className="mk-h2">The road ahead: every ZIP code in America.</h2>
          <p className="mk-lead">
            California today. Then state by state, until a young person anywhere
            in America can find help near home. Along the way: community
            features and mentor connections — planned, clearly labeled as
            roadmap, and never presented as live before they exist.
          </p>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
              Help us get there
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
