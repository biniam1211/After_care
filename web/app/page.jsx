import Link from "next/link";
import { Icon } from "@/components/ui";
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
};

// The numbers below come from AfterCare's own planning docs. They are
// supplied estimates used for planning — primary-source citations are
// still being verified, so no source links are claimed for them here.
const STATS = [
  { n: "~20,000", l: "youth age out of US foster care every year" },
  { n: "20%", l: "become homeless the day they turn 18" },
  { n: "Under 3%", l: "ever earn a college degree" },
  { n: "17%", l: "of people in US prisons spent time in foster care" },
];

const PILLARS = [
  {
    icon: "home",
    tint: "var(--sky)",
    bg: "var(--sky-soft)",
    title: "Housing",
    body: "A safe place to sleep tonight, and a path to a stable one next month — shelter, transitional housing, and the numbers that actually pick up.",
  },
  {
    icon: "health",
    tint: "var(--panic-deep)",
    bg: "var(--panic-soft)",
    title: "Health",
    body: "Coverage that follows you, care you can actually reach, and help in a crisis — including Medi-Cal to age 26 in California.",
  },
  {
    icon: "cash",
    tint: "var(--warm-deep)",
    bg: "var(--warm-soft)",
    title: "Work & Money",
    body: "First bank account, first job, benefits you qualify for — including the Chafee Grant, up to $5,000 a year for school or training.",
  },
  {
    icon: "heart",
    tint: "var(--mint)",
    bg: "var(--mint-soft)",
    title: "Community & Belonging",
    body: "People who get it. Guidance from lived experience, not lectures — and a community that does not end when you turn 18.",
  },
];

const SCENARIOS = [
  {
    tag: "Illustrative example",
    title: "“I have nowhere to sleep tonight.”",
    body: "A young person opens AfterCare at 9pm. In minutes they have the nearest shelter, the number that picks up, and a message to their caseworker already written.",
  },
  {
    tag: "Illustrative example",
    title: "“Can I afford this apartment?”",
    body: "They type the rent and their income. AfterCare walks through the real monthly math — deposit, utilities, food — before they sign anything.",
  },
  {
    tag: "Illustrative example",
    title: "“Am I still covered?”",
    body: "They ask about health insurance after 18. AfterCare explains Medi-Cal to 26 in California and what to do to keep it active.",
  },
  {
    tag: "Illustrative example",
    title: "“What do I do first?”",
    body: "They just aged out and feel lost. AfterCare turns one giant worry into a short list: ID, bank account, benefits, housing — one finished thing at a time.",
  },
];

export default function Home() {
  return (
    <div className="mk">
      <OrgNav />

      {/* ── Hero ── */}
      <header className="mk-hero">
        <div className="mk-wrap mk-hero-grid">
          <div>
            <span className="mk-eyebrow">
              <span className="mk-dot" />
              For everyone · Every ZIP code · Every day
            </span>
            <h1 className="mk-h1">
              No one should have to figure out adulthood <em>alone.</em>
            </h1>
            <p className="mk-sub">
              AfterCare is the life navigator for foster youth — housing,
              health, work, money, and community, in one place, whenever you
              need it. Built by someone who went through foster care, for the
              people coming after him.
            </p>
            <div className="mk-cta-row">
              <Link href="/services" className="mk-btn mk-btn-primary">
                Find services <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
              </Link>
              <Link href="/programs" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
                Explore programs
              </Link>
              <Link href="/app" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
                Open the app
              </Link>
            </div>
            <p className="mk-cta-note">
              Free forever · No caseworker required · Works in your browser
            </p>
          </div>

          <div className="mk-art" aria-hidden="true">
            <OrgArt kind="sunrise" />
          </div>
        </div>
      </header>

      {/* ── Nationwide banner ── */}
      <section className="mk-section mk-band-warm" style={{ padding: "28px 0" }}>
        <div className="mk-wrap">
          <p style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, margin: 0 }}>
            Built for every ZIP code in America.{" "}
            <span style={{ fontWeight: 500, color: "var(--ink-soft)" }}>
              Our directory covers California today — 65 listings — and the
              road ahead is nationwide. <Link href="/programs" style={{ fontWeight: 700 }}>See the roadmap →</Link>
            </span>
          </p>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="mk-section mk-section-dark" id="problem">
        <div className="mk-wrap">
          <p className="mk-kicker">Why this exists</p>
          <h2 className="mk-h2">
            Aging out is a cliff, and almost nobody catches you.
          </h2>
          <p className="mk-lead">
            The help is real and it is out there. The problem is that it&rsquo;s
            scattered across hundreds of websites, state portals, PDFs and
            overworked caseworkers&rsquo; heads — and none of it is written for a
            17-year-old holding a phone.
          </p>

          <div className="mk-stats">
            {STATS.map((s) => (
              <div className="mk-stat" key={s.l}>
                <div className="mk-stat-n">{s.n}</div>
                <div className="mk-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)", marginTop: 16 }}>
            Figures are supplied estimates used for planning; primary-source
            citations are still being verified. See <Link href="/research" style={{ color: "#9ad4ff" }}>Research</Link>.
          </p>

          <blockquote className="mk-quote">
            <p>
              Knowledge and accessibility are the real barriers. Everything is on
              their phone, via text, apps, and links.
            </p>
            <cite>— APHSA, 2024</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Four pillars preview ── */}
      <section className="mk-section" id="pillars">
        <div className="mk-wrap">
          <p className="mk-kicker">What we do</p>
          <h2 className="mk-h2">Four pillars, one navigator.</h2>
          <p className="mk-lead">
            Everything a young person needs to stand on their own — held
            together by one guide that answers, then walks with you until the
            thing is actually done.
          </p>
          <div className="mk-grid3">
            {PILLARS.map((f) => (
              <div className="mk-card" key={f.title}>
                <span className="mk-tile" style={{ background: f.bg }}>
                  <Icon name={f.icon} size={26} color={f.tint} sw={2.1} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="mk-lead">
            <Link href="/programs" style={{ fontWeight: 700 }}>Explore all programs →</Link>
          </p>
        </div>
      </section>

      {/* ── Navigator preview ── */}
      <section className="mk-section mk-band-sky" id="navigator">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">The navigator</p>
            <h2 className="mk-h2">One place that does the whole job.</h2>
            <p className="mk-lead">
              Ask anything, judgment-free. Finish real tasks step by step.
              Find help that&rsquo;s actually near you. And in a crisis, get a
              real plan in seconds — not a lecture.
            </p>
            <ul className="mk-checklist">
              <li>Ask anything — straight answers, in plain language, at 2am if that&rsquo;s when you need them.</li>
              <li>Quests that finish the job — bank account, Chafee Grant, health coverage past 18.</li>
              <li>A panic button that does something — shelter, a number that picks up, a message already written.</li>
              <li>Help that&rsquo;s actually near you — recommendations only from our fixed catalog, never invented.</li>
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

      {/* ── What's happening ── */}
      <section className="mk-section" id="happening">
        <div className="mk-wrap">
          <p className="mk-kicker">What&rsquo;s happening</p>
          <h2 className="mk-h2">Real things you can use today.</h2>
          <div className="mk-grid3">
            <div className="mk-card">
              <span className="mk-badge mk-badge-live">Live now</span>
              <h3>Services directory</h3>
              <p>65 California listings across housing, health, school, money, and legal help. {VERIFIED_MEANING}</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse services →</Link></p>
            </div>
            <div className="mk-card">
              <span className="mk-badge mk-badge-live">Live now</span>
              <h3>The navigator app</h3>
              <p>Runs in your browser today, installs to your Home Screen in under a minute. No account, no download, no cost.</p>
              <p><Link href="/app" style={{ fontWeight: 700 }}>Open the app →</Link></p>
            </div>
            <div className="mk-card">
              <span className="mk-badge mk-badge-roadmap">Roadmap</span>
              <h3>Nationwide, every ZIP</h3>
              <p>The directory grows state by state until a young person anywhere in America can find help near them. That&rsquo;s the road ahead.</p>
              <p><Link href="/programs" style={{ fontWeight: 700 }}>See the roadmap →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Everyday scenarios ── */}
      <section className="mk-section mk-band-mint" id="everyday">
        <div className="mk-wrap">
          <p className="mk-kicker">Every day</p>
          <h2 className="mk-h2">What a day with AfterCare looks like.</h2>
          <p className="mk-lead">
            These are illustrative examples of how the navigator helps — not
            stories from real people.
          </p>
          <div className="mk-grid3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {SCENARIOS.map((s) => (
              <div className="mk-scenario" key={s.title}>
                <span className="mk-scenario-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact preview ── */}
      <section className="mk-section" id="impact-preview">
        <div className="mk-wrap mk-split">
          <div className="mk-art">
            <OrgArt kind="growth" />
          </div>
          <div>
            <p className="mk-kicker">Impact</p>
            <h2 className="mk-h2">One youth, one finished thing.</h2>
            <p className="mk-lead">
              We don&rsquo;t publish impact numbers yet, because we don&rsquo;t
              track youth to produce them. The goal we measure ourselves
              against is simple: does a foster kid open this app a second time
              within 7 days — and does one real thing get finished?
            </p>
            <p className="mk-lead">
              <Link href="/impact" style={{ fontWeight: 700 }}>How we measure impact →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Get involved preview ── */}
      <section className="mk-section mk-section-dark" id="involved-preview">
        <div className="mk-wrap">
          <p className="mk-kicker">Get involved</p>
          <h2 className="mk-h2">There&rsquo;s a place for you in this.</h2>
          <p className="mk-lead">
            Whether you&rsquo;re a young person who needs help, an adult who
            wants to show up, or an organization that serves youth — you
            belong here.
          </p>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn mk-btn-primary">
              Get involved <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
            </Link>
            <Link href="/about" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
              Our story
            </Link>
          </div>
          <p className="mk-cta-note">{ORG_STATUS}</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mk-final">
        <div className="mk-wrap">
          <h2 className="mk-h2" style={{ color: "#fff" }}>
            You shouldn&rsquo;t have to figure this out alone.
          </h2>
          <p className="mk-lead" style={{ margin: "20px auto 0", color: "rgba(255,255,255,.74)" }}>
            No sign-up wall, no caseworker referral, no cost. Open it and ask the
            first thing that&rsquo;s been on your mind.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
            </Link>
            <Link href="/download" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
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
