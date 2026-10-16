import Link from "next/link";
import { OrgArt } from "@/components/org-art";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
  VERIFIED_MEANING,
} from "@/components/site-chrome";
import "./marketing.css";

export const metadata = {
  title: "AfterCare — For everyone, every ZIP code, every day",
  description:
    "AfterCare is the life navigator for foster youth — housing, health, work, money, and community, for everyone, every ZIP code, every day. Free, always.",
  openGraph: {
    title: "AfterCare — For everyone, every ZIP code, every day",
    description:
      "AfterCare is the life navigator for foster youth — housing, health, work, money, and community, for everyone, every ZIP code, every day. Free, always.",
    type: "website",
  },
};

const PILLARS = [
  {
    title: "Housing",
    body: "A safe place to sleep tonight, and a path to a stable one next month — shelter, transitional housing, and the numbers that actually pick up.",
  },
  {
    title: "Health",
    body: "Coverage that follows you, care you can actually reach, and help in a crisis — including Medi-Cal to age 26 in California.",
  },
  {
    title: "Work & Money",
    body: "First bank account, first job, benefits you qualify for — including the Chafee Grant, up to $5,000 a year for school or training.",
  },
  {
    title: "Community & Belonging",
    body: "People who get it. Guidance from lived experience, not lectures — and a community that does not end when you turn 18.",
  },
];

export default function Home() {
  return (
    <div className="mk">
      <OrgNav />

      {/* ── Front page ── */}
      <header className="mk-hero">
        <div className="mk-wrap">
          <div>
            <p className="mk-kicker">The life navigator for foster youth</p>
            <h1 className="mk-h1">
              No one should have to figure out adulthood <em>alone.</em>
            </h1>
            <p className="mk-deck">
              AfterCare is the guide that should have existed at 18 —
              housing, health, work, money, and community, in one place,
              whenever you need it.
            </p>
            <div className="mk-cta-row">
              <Link href="/services" className="mk-btn mk-btn-primary">
                Find services →
              </Link>
              <Link href="/programs" className="mk-btn mk-btn-ghost">
                Explore programs
              </Link>
            </div>
            <div className="mk-hero-meta">
              <span>Free forever</span>
              <span>No caseworker required</span>
              <span>Works in your browser</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── The problem, as a ledger ── */}
      <section className="mk-section" id="problem">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — Why this exists</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">
                Aging out is a cliff, and almost nobody catches you.
              </h2>
            </div>
            <div>
              <p className="mk-lead" style={{ marginTop: 0 }}>
                The help is real and it is out there. The problem is that
                it&rsquo;s scattered across websites, state portals, PDFs
                and overworked caseworkers&rsquo; heads — and none of it is
                written for a 17-year-old holding a phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four pillars, as numbered ledger rows ── */}
      <section className="mk-section" id="pillars">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — What we do</p>
          <h2 className="mk-h2">Four pillars, one navigator.</h2>
          <p className="mk-deck">
            Everything a young person needs to stand on their own — held
            together by one guide that answers, then walks with you until
            the thing is actually done.
          </p>
          <div className="mk-ledger">
            {PILLARS.map((f, i) => (
              <div className="mk-ledger-row" key={f.title}>
                <div className="mk-ledger-num accent">0{i + 1}</div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mk-lead">
            <Link href="/programs">Explore all programs →</Link>
          </p>
        </div>
      </section>

      {/* ── Navigator: split with figure ── */}
      <section className="mk-section" id="navigator">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">03 — The navigator</p>
            <h2 className="mk-h2">One place that does the whole job.</h2>
            <p className="mk-lead">
              Ask anything, judgment-free. Finish real tasks step by step.
              Find help that&rsquo;s actually near you. And in a crisis, get
              a real plan in seconds — not a lecture.
            </p>
            <ul className="mk-checklist">
              <li>Ask anything — straight answers, in plain language, at 2am if that&rsquo;s when you need them.</li>
              <li>Quests that finish the job — bank account, Chafee Grant, health coverage past 18.</li>
              <li>A panic button that does something — shelter, a number that picks up, a message already written.</li>
              <li>Help that&rsquo;s actually near you — recommendations only from our fixed catalog, never invented.</li>
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
              <b>Fig. 2 —</b> The navigator. One guide, every direction
              a young person needs to go.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── What's happening: bulletin ledger ── */}
      <section className="mk-section" id="happening">
        <div className="mk-wrap">
          <p className="mk-kicker">04 — What&rsquo;s happening</p>
          <h2 className="mk-h2">Real things you can use today.</h2>
          <div className="mk-ledger">
            <div className="mk-ledger-row">
              <div className="mk-ledger-num">A</div>
              <div>
                <span className="mk-badge mk-badge-live">Live now</span>
                <h3>Services directory</h3>
                <p>65 California listings across housing, health, school, money, and legal help. {VERIFIED_MEANING}</p>
                <Link href="/services" className="mk-ledger-link">Browse services →</Link>
              </div>
            </div>
            <div className="mk-ledger-row">
              <div className="mk-ledger-num">B</div>
              <div>
                <span className="mk-badge mk-badge-live">Live now</span>
                <h3>The navigator app</h3>
                <p>Runs in your browser today, installs to your Home Screen in under a minute. No account, no download, no cost.</p>
                <Link href="/app" className="mk-ledger-link">Open the app →</Link>
              </div>
            </div>
            <div className="mk-ledger-row">
              <div className="mk-ledger-num">C</div>
              <div>
                <span className="mk-badge mk-badge-roadmap">Roadmap</span>
                <h3>Nationwide, every ZIP</h3>
                <p>The directory grows state by state until a young person anywhere in America can find help near them. That&rsquo;s the road ahead.</p>
                <Link href="/programs" className="mk-ledger-link">See the roadmap →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact preview: figure + text ── */}
      <section className="mk-section" id="impact-preview">
        <div className="mk-wrap mk-split flip">
          <figure className="mk-art" aria-hidden="true">
            <OrgArt kind="growth" />
            <figcaption>
              <b>Fig. 3 —</b> One finished thing at a time. That is the
              whole measurement.
            </figcaption>
          </figure>
          <div>
            <p className="mk-kicker">05 — Impact</p>
            <h2 className="mk-h2">One youth, one finished thing.</h2>
            <p className="mk-lead">
              We don&rsquo;t publish impact numbers yet, because we don&rsquo;t
              track youth to produce them. The goal we measure ourselves
              against is simple: does a foster kid open this app a second time
              within 7 days — and does one real thing get finished?
            </p>
            <p className="mk-lead">
              <Link href="/impact">How we measure impact →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Get involved: ink band ── */}
      <section className="mk-section mk-section-ink" id="involved-preview">
        <div className="mk-wrap">
          <p className="mk-kicker">06 — Get involved</p>
          <h2 className="mk-h2">There&rsquo;s a place for you in this.</h2>
          <p className="mk-deck">
            Whether you&rsquo;re a young person who needs help, an adult who
            wants to show up, or an organization that serves youth — you
            belong here.
          </p>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn mk-btn-primary">
              Get involved →
            </Link>
            <Link href="/about" className="mk-btn mk-btn-ghost" style={{ color: "var(--paper)", borderColor: "var(--paper)" }}>
              Our story
            </Link>
          </div>
          <p className="mk-cta-note" style={{ color: "rgba(250,246,238,.6)" }}>{ORG_STATUS}</p>
        </div>
      </section>

      {/* ── Final ── */}
      <section className="mk-final">
        <div className="mk-wrap">
          <p className="mk-kicker">Start here</p>
          <h2 className="mk-h2">
            You shouldn&rsquo;t have to figure this out alone.
          </h2>
          <p className="mk-deck">
            No sign-up wall, no caseworker referral, no cost. Open it and ask the
            first thing that&rsquo;s been on your mind.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app →
            </Link>
            <Link href="/download" className="mk-btn mk-btn-ghost">
              Get it on your phone
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
