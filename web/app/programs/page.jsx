import Link from "next/link";
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
    art: "door",
    caption: "A door that opens. Shelter tonight, stability next month.",
    title: "Housing",
    body: "A safe place to sleep tonight, and a path to a stable one next month. Emergency shelter, transitional housing, and the numbers that actually pick up — plus the steps to keep a roof over your head once you have one.",
    items: ["Emergency shelter near you", "Transitional housing options", "What to ask before you sign a lease"],
  },
  {
    id: "health",
    art: "letter",
    caption: "The paperwork, made plain. Coverage you keep, care you reach.",
    title: "Health",
    body: "Coverage that follows you and care you can actually reach. In California, former foster youth keep free Medi-Cal to age 26 — most never find out. We make sure you do, and we help in a crisis.",
    items: ["Medi-Cal to age 26 in California", "Finding a doctor or clinic near you", "Crisis help: 988, shelter, 911"],
  },
  {
    id: "work-money",
    art: "ledger",
    caption: "The ledger. Every dollar accounted for, every benefit claimed.",
    title: "Work & Money",
    body: "First bank account, first job, benefits you qualify for. The Chafee Grant offers up to $5,000 a year for college or job training if you were in care between 16 and 18 — the navigator walks you through claiming it.",
    items: ["First bank account, step by step", "Chafee Grant — up to $5,000/yr", "Job search and career readiness"],
  },
  {
    id: "community",
    art: "table",
    caption: "The table. Belonging does not end at 18.",
    title: "Community & Belonging",
    body: "People who get it. Guidance from lived experience, not lectures — and a community that does not end when you turn 18. You never age out of belonging here.",
    items: ["Guidance from lived experience", "A community that does not end at 18", "Help asking for help"],
  },
];

const ROADMAP = [
  { step: "Now", text: "California — 65 listings in the directory, each labeled Verified or “Unverified — call to confirm.”" },
  { step: "Next", text: "State by state. The directory grows until help near home is findable anywhere in America." },
  { step: "Along the way", text: "Community features and mentor connections — planned, clearly labeled as roadmap, never presented as live before they exist." },
  { step: "The destination", text: "Every ZIP code in America. A young person anywhere can find help near them, any hour of the day." },
];

export default function Programs() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Programs</p>
          <h1 className="mk-h1">
            Four pillars, <em>one navigator.</em>
          </h1>
          <p className="mk-deck">
            Housing, health, work &amp; money, and community — plus the
            navigator app and the services directory that hold them together.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app →
            </Link>
            <Link href="/services" className="mk-btn mk-btn-ghost">
              Find services
            </Link>
          </div>
        </div>
      </header>

      {/* ── Four pillars: alternating full-width splits ── */}
      <section className="mk-section" id="pillars">
        <div className="mk-wrap">
          <p className="mk-kicker">The four pillars</p>
          <h2 className="mk-h2">Everything a young person needs to stand on their own.</h2>
        </div>
        {PILLARS.map((p, i) => (
          <div className="mk-section" key={p.id} id={p.id} style={{ borderTop: "1px solid var(--line)" }}>
            <div className="mk-wrap">
              <div className={`mk-split ${i % 2 === 1 ? "flip" : ""}`}>
                <figure className="mk-art" aria-hidden="true">
                  <OrgArt kind={p.art} />
                  <figcaption>
                    <b>Fig. {i + 1} —</b> {p.caption}
                  </figcaption>
                </figure>
                <div>
                  <p className="mk-kicker">Pillar 0{i + 1}</p>
                  <h3 style={{ fontFamily: "var(--serif)", fontWeight: 900, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.05, letterSpacing: "-0.6px", margin: 0 }}>{p.title}</h3>
                  <p className="mk-lead">{p.body}</p>
                  <ul className="mk-checklist">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Navigator program ── */}
      <section className="mk-section" id="navigator">
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
              <Link href="/app" className="mk-btn">
                Open the app →
              </Link>
              <Link href="/download" className="mk-btn mk-btn-ghost">
                Get it on your phone
              </Link>
            </div>
          </div>
          <figure className="mk-art" aria-hidden="true">
            <OrgArt kind="compass" />
            <figcaption>
              <b>Fig. 5 —</b> The navigator. One guide, every direction
              a young person needs to go.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Directory program ── */}
      <section className="mk-section" id="directory">
        <div className="mk-wrap mk-split flip">
          <figure className="mk-art" aria-hidden="true">
            <OrgArt kind="map" />
            <figcaption>
              <b>Fig. 6 —</b> The map. Real programs, real places,
              honestly labeled.
            </figcaption>
          </figure>
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
              <Link href="/services">Browse the directory →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Roadmap: road figure + milestone ledger ── */}
      <section className="mk-section" id="roadmap">
        <div className="mk-wrap">
          <span className="mk-badge mk-badge-roadmap">Roadmap — not live yet</span>
          <h2 className="mk-h2">The road ahead: every ZIP code in America.</h2>
          <figure className="mk-art" style={{ marginTop: 36 }} aria-hidden="true">
            <OrgArt kind="road" />
            <figcaption>
              <b>Fig. 7 —</b> The road ahead. California today; every ZIP
              code in America at the destination.
            </figcaption>
          </figure>
          <div className="mk-ledger">
            {ROADMAP.map((r) => (
              <div className="mk-ledger-row" key={r.step}>
                <div className="mk-ledger-num accent" style={{ fontSize: "clamp(16px, 2vw, 20px)", letterSpacing: "0.04em" }}>{r.step}</div>
                <div>
                  <p style={{ margin: 0 }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn">
              Help us get there →
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
