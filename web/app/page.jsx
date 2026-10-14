import Link from "next/link";
import { OrgArt } from "@/components/org-art";
import { OrgPhoto } from "@/components/org-photo";
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

      {/* ── Front page ── */}
      <header className="mk-hero">
        <div className="mk-wrap mk-hero-grid">
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
          <OrgPhoto
            src="/images/community-friends.jpg"
            alt="Three young adult friends walking together down a city street with coffee, smiling and chatting"
            caption="Friends, out in the city. Community is the whole point."
            photographer="Keira Burton"
          />
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
                it&rsquo;s scattered across hundreds of websites, state
                portals, PDFs and overworked caseworkers&rsquo; heads — and
                none of it is written for a 17-year-old holding a phone.
              </p>
            </div>
          </div>
          <div className="mk-ledger">
            {STATS.map((s, i) => (
              <div className="mk-ledger-row" key={s.l}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <h3>{s.n} — {s.l}</h3>
                </div>
              </div>
            ))}
          </div>
          <p className="mk-caption">
            Figures are supplied estimates used for planning;
            primary-source citations are still being verified. See{" "}
            <Link href="/research">Research</Link>.
          </p>
        </div>
      </section>

      {/* ── Pull quote band ── */}
      <section className="mk-pull">
        <div className="mk-wrap">
          <blockquote>
            <p>
              “Knowledge and accessibility are the real barriers.
              Everything is on their phone, via text, apps, and links.”
            </p>
            <cite>— APHSA, 2024</cite>
          </blockquote>
          <p className="mk-pull-note">
            The federal government&rsquo;s answer is a transition toolkit
            written for caseworkers. Nobody under 25 reads a PDF. That gap
            — between help existing and help reaching someone — is the
            entire reason AfterCare exists.
          </p>
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

      {/* ── Photo divider: city life ── */}
      <section className="mk-section" id="city-life" style={{ paddingBottom: 0 }}>
        <div className="mk-wrap">
          <OrgPhoto
            src="/images/city-life.jpg"
            alt="A young adult with a backpack standing on a sunny city sidewalk"
            caption="In every city, every ZIP code — a young person on their way."
            photographer="Samson Katt"
          />
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

      {/* ── Everyday scenarios: case notes ── */}
      <section className="mk-section" id="everyday">
        <div className="mk-wrap">
          <p className="mk-kicker">05 — Every day</p>
          <h2 className="mk-h2">What a day with AfterCare looks like.</h2>
          <p className="mk-deck">
            These are illustrative examples of how the navigator helps —
            not stories from real people.
          </p>
          <div className="mk-ledger">
            {SCENARIOS.map((s, i) => (
              <div className="mk-ledger-row" key={s.title}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: 0 }}>{s.tag}</p>
                  <h3 style={{ marginTop: 8 }}>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
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
            <p className="mk-kicker">06 — Impact</p>
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
          <p className="mk-kicker">07 — Get involved</p>
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
