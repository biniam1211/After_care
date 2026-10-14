import Link from "next/link";
import { Icon } from "@/components/ui";
import { Logo } from "@/components/onboarding";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
  VERIFIED_MEANING,
} from "@/components/site-chrome";
import "./marketing.css";

export const metadata = {
  title: "AfterCare — The missing parent in your pocket",
  description:
    "The AI life navigator built by foster kids, for foster kids. Money, housing, school, health and paperwork — figured out step by step. Free, always.",
};

// The numbers below are the ones in docs/AfterCare_PRD.md. They are the whole
// argument for the product, so they are stated plainly and sourced.
const STATS = [
  { n: "~20,000", l: "youth age out of US foster care every year" },
  { n: "20%", l: "become homeless the day they turn 18" },
  { n: "Under 3%", l: "ever earn a college degree" },
  { n: "17%", l: "of people in US prisons spent time in foster care" },
];

const FEATURES = [
  {
    icon: "sparkle",
    tint: "var(--sky)",
    bg: "var(--sky-soft)",
    title: "Ask anything, judgment-free",
    body: "A real answer to the question you were embarrassed to ask an adult — what an SSN card is for, how to read a lease, what to do when the money runs out. Straight answers, in plain language, at 2am if that's when you need them.",
  },
  {
    icon: "flag",
    tint: "var(--warm-deep)",
    bg: "var(--warm-soft)",
    title: "Quests that finish the job",
    body: "Knowing isn't doing. Each quest breaks one grown-up task — first bank account, the Chafee Grant, keeping health insurance past 18 — into steps you actually complete, with a check-in after each one.",
  },
  {
    icon: "shield",
    tint: "var(--panic-deep)",
    bg: "var(--panic-soft)",
    title: "A panic button that does something",
    body: "Nowhere to sleep tonight. Being kicked out. Being hurt. One tap gives you a real plan in seconds: the nearest shelter, a number that picks up, and a message to your caseworker already written for you.",
  },
  {
    icon: "pin",
    tint: "var(--mint)",
    bg: "var(--mint-soft)",
    title: "Help that's actually near you",
    body: "Every listing is tied to a real place, and the AI can only recommend listings from that fixed catalog — it cannot invent a hotline or send you to an office three states away. Listings marked Verified had their official page confirmed; the rest say “Unverified — call to confirm,” so you always know what has and hasn't been checked yet.",
  },
];

const PROMISES = [
  {
    b: "Free forever, for youth",
    s: "No paywall, no trial, no upsell. If you've been in care, the whole thing is yours.",
  },
  {
    b: "Your business stays yours",
    s: "No selling your data, ever. Your number is never shared, and nothing you ask is used to profile you.",
  },
  {
    b: "It won't pretend to be a professional",
    s: "It's not a lawyer, a doctor, or a caseworker — and it says so, then points you to a real one.",
  },
];

export default function Home() {
  return (
    <div className="mk">
      {/* ── Nav ── */}
      <OrgNav />

      {/* ── Hero ── */}
      <header className="mk-hero">
        <div className="mk-wrap mk-hero-grid">
          <div>
            <span className="mk-eyebrow">
              <span className="mk-dot" />
              Built by foster kids, for foster kids
            </span>
            <h1 className="mk-h1">
              The missing parent in your <em>pocket.</em>
            </h1>
            <p className="mk-sub">
              At 18 the system stops calling and everyone assumes you know how to
              adult. AfterCare is the thing that should have existed then — money,
              housing, school, health and paperwork, figured out one step at a
              time, by people who have actually been there.
            </p>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-primary">
                Open the app <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
              </Link>
              <Link href="/download" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
                Get it on your phone
              </Link>
              <Link href="/services" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
                Find local services
              </Link>
            </div>
            <p className="mk-cta-note">
              Free forever · No caseworker required · Works in your browser
            </p>
          </div>

          <div className="mk-shot" aria-hidden="true">
            <div className="mk-shot-inner">
              <Logo size={46} r={14} glow />
              <h2 className="mk-shot-title">
                The missing parent in your pocket.
              </h2>
              <p className="mk-shot-body">
                Adulting after foster care — figured out, step by step, by people
                who&rsquo;ve actually been there.
              </p>
              <div className="mk-shot-pill">Get started</div>
            </div>
          </div>
        </div>
      </header>

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

          <blockquote className="mk-quote">
            <p>
              Knowledge and accessibility are the real barriers. Everything is on
              their phone, via text, apps, and links.
            </p>
            <cite>— APHSA, 2024</cite>
          </blockquote>

          <p className="mk-lead" style={{ marginTop: 34 }}>
            The federal government&rsquo;s answer is a transition toolkit written
            for caseworkers. Nobody under 25 reads a PDF. That gap — between help
            existing and help reaching someone — is the entire reason AfterCare
            exists.
          </p>
        </div>
      </section>

      {/* ── What it does ── */}
      <section className="mk-section" id="what">
        <div className="mk-wrap">
          <p className="mk-kicker">What it does</p>
          <h2 className="mk-h2">Four things, done properly.</h2>
          <p className="mk-lead">
            Not a directory. Not another portal. A navigator that answers, then
            walks with you until the thing is actually done.
          </p>

          <div className="mk-cards">
            {FEATURES.map((f) => (
              <div className="mk-card" key={f.title}>
                <span className="mk-tile" style={{ background: f.bg }}>
                  <Icon name={f.icon} size={26} color={f.tint} sw={2.1} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ──
          Founder story placeholder. The detailed timeline that used to
          live here asserted specific biographical facts (birthplace, age
          of arrival, age of aging out) that Binyam has not confirmed in
          his own words. Until he writes it, this section says only what
          he has stated himself: that he went through foster care and is
          building the thing he needed. Do not re-add biographical
          details without Binyam's own words. */}
      <section className="mk-section" id="story" style={{ background: "#fff" }}>
        <div className="mk-wrap mk-story">
          <div>
            <p className="mk-kicker">Our story</p>
            <h2 className="mk-h2">This isn&rsquo;t charity work.</h2>
            <p className="mk-lead">
              AfterCare is being built by someone who went through foster
              care and is building the thing he needed when he was in it.
              The full founder story — in Binyam&rsquo;s own words — is
              coming soon.
            </p>
            <p className="mk-lead">
              {ORG_STATUS} That is the honest status: the work is real,
              the product is live in your browser, and the formal
              nonprofit filing is still ahead of us.
            </p>
          </div>

          <div>
            <div className="mk-pullquote">
              Youth can tell instantly when something was designed by
              someone who&rsquo;s never been where they are. The tone, the
              questions it asks first, what it refuses to lecture you
              about — all of that comes from lived experience, not a focus
              group.
            </div>
          </div>
        </div>
      </section>

      {/* ── Services preview ── */}
      <section className="mk-section" id="services-preview" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <p className="mk-kicker">Find services</p>
          <h2 className="mk-h2">Start with the help that&rsquo;s closest.</h2>
          <p className="mk-lead">
            The directory lists California programs across housing, health,
            school, money, and legal help. {VERIFIED_MEANING}
          </p>

          <div className="mk-cards">
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--sky-soft)" }}>
                <Icon name="home" size={26} color="var(--sky)" sw={2.1} />
              </span>
              <h3>Housing &amp; shelter</h3>
              <p>Emergency shelter and transitional housing for youth with nowhere to sleep tonight — plus the numbers that actually pick up.</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse housing →</Link></p>
            </div>
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--mint-soft)" }}>
                <Icon name="cash" size={26} color="var(--mint)" sw={2.1} />
              </span>
              <h3>Chafee Grant — up to $5,000/yr</h3>
              <p>Free money for college or job training that you never pay back, if you were in care between 16 and 18. The app walks you through claiming it.</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse education aid →</Link></p>
            </div>
            <div className="mk-card">
              <span className="mk-tile" style={{ background: "var(--warm-soft)" }}>
                <Icon name="health" size={26} color="var(--warm-deep)" sw={2.1} />
              </span>
              <h3>Health coverage to 26</h3>
              <p>Former foster youth keep free Medi-Cal to age 26 in California. Most never find out. The directory and the app make sure you do.</p>
              <p><Link href="/services" style={{ fontWeight: 700 }}>Browse health →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact ──
          No impact metrics are claimed: we do not count users or
          outcomes yet. Impact here is defined by the goal, not by
          invented results. */}
      <section className="mk-section" id="impact" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <p className="mk-kicker">What impact looks like here</p>
          <h2 className="mk-h2">One youth, one finished thing.</h2>
          <p className="mk-lead">
            We don&rsquo;t publish impact numbers yet, because we
            don&rsquo;t track youth to produce them. The goal we measure
            ourselves against is simple: does a foster kid open this app a
            second time within 7 days — and does one real thing get
            finished, like a bank account opened, a grant applied for, or a
            shelter reached?
          </p>
        </div>
      </section>

      {/* ── Promises ── */}
      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <p className="mk-kicker">What we promise</p>
          <h2 className="mk-h2">The rules we don&rsquo;t break.</h2>
          <div className="mk-promises">
            {PROMISES.map((p) => (
              <div className="mk-promise" key={p.b}>
                <b>{p.b}</b>
                <span>{p.s}</span>
              </div>
            ))}
          </div>
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

      {/* ── Crisis strip ──
          Surfaced on the public page too, so a youth in crisis who never opens
          the app still leaves with a number that answers. */}
      <CrisisStrip />

      {/* ── Footer ── */}
      <OrgFooter />
    </div>
  );
}
