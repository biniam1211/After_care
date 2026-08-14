import Link from "next/link";
import { Icon } from "@/components/ui";
import { Logo } from "@/components/onboarding";
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
    body: "Every resource is checked and tied to a real place. The AI is locked to that verified list — it physically cannot invent a hotline or send you to an office three states away.",
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
      <nav className="mk-nav">
        <div className="mk-wrap mk-nav-inner">
          <Link href="/" className="mk-brand">
            {/* The same mark the app shows on its welcome screen, so the site
                and the product are recognisably one thing. */}
            <Logo size={34} r={10} />
            AfterCare
          </Link>
          <div className="mk-nav-links">
            <a href="#problem">The problem</a>
            <a href="#what">What it does</a>
            <a href="#story">Our story</a>
          </div>
          <Link href="/app" className="mk-btn mk-btn-ghost" style={{ marginLeft: "auto" }}>
            Open the app
          </Link>
        </div>
      </nav>

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
              <a href="#what" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
                See what it does
              </a>
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

      {/* ── Story ── */}
      <section className="mk-section" id="story" style={{ background: "#fff" }}>
        <div className="mk-wrap mk-story">
          <div>
            <p className="mk-kicker">Our story</p>
            <h2 className="mk-h2">This isn&rsquo;t charity work.</h2>
            <p className="mk-lead">
              AfterCare was built by someone who needed it and didn&rsquo;t have
              it. That&rsquo;s not a marketing line — it&rsquo;s the reason every
              screen in the app looks the way it does.
            </p>
            <ul className="mk-timeline">
              <li>
                <b>Born in Ethiopia</b>
                <span>Came to the United States at 16.</span>
              </li>
              <li>
                <b>Placed in foster care</b>
                <span>Learned the system from the inside, not from a training deck.</span>
              </li>
              <li>
                <b>Aged out at 18</b>
                <span>Hit the same cliff this app is built to catch people on.</span>
              </li>
              <li>
                <b>Became an engineer</b>
                <span>
                  Taught himself to build, then went to work building AI
                  professionally.
                </span>
              </li>
              <li>
                <b>Built the thing that should have existed</b>
                <span>
                  AfterCare is the answer to a question he had to figure out alone.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <div className="mk-pullquote">
              A general tech founder building an app for foster youth is doing
              charity work. This is self-rescue, at scale.
            </div>
            <p className="mk-lead" style={{ marginTop: 28 }}>
              Youth can tell instantly when something was designed by someone
              who&rsquo;s never been where they are. The tone, the questions it
              asks first, what it refuses to lecture you about — all of that comes
              from lived experience, not a focus group.
            </p>
          </div>
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
          </div>
        </div>
      </section>

      {/* ── Crisis strip ──
          Surfaced on the public page too, so a youth in crisis who never opens
          the app still leaves with a number that answers. */}
      <div className="mk-crisis">
        <div className="mk-wrap">
          <b>In danger right now?</b> Call or text <b>988</b> (Suicide &amp; Crisis
          Lifeline, 24/7). If you have nowhere to sleep tonight, Covenant House
          California is <b>1-800-388-3888</b>. If someone is being hurt, call{" "}
          <b>911</b>.
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="mk-footer">
        <div className="mk-wrap mk-footer-inner">
          <span>© {new Date().getFullYear()} AfterCare · Free forever for foster youth</span>
          <span>
            <Link href="/app">Open the app</Link>
            <a href="#story">Our story</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
