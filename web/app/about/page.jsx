import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import {
  FounderFigure,
  FounderStoryPlaceholder,
  FOUNDER_JOURNEY,
  FOUNDER_PHOTOS,
} from "@/components/founder-photos";
import "../marketing.css";

export const metadata = {
  title: "About",
  description:
    "About AfterCare and founder Biniam Efrem — a former foster youth building the AI life navigator he needed. Social-impact project working toward nonprofit status.",
  openGraph: {
    title: "About · AfterCare",
    description:
      "Built by Biniam Efrem, a former foster youth, for the young people coming after him.",
    type: "website",
  },
};

const GOALS = [
  {
    title: "No young person ages out alone",
    body: "Every young person leaving care has a guide in their pocket — answers, steps, and a plan, any hour of the day.",
  },
  {
    title: "Every how-do-I-adult step",
    body: "Driver's license, documents, housing, money, benefits, school, jobs, health, legal rights, AB 12, parenting — one navigator.",
  },
  {
    title: "Finished things, not just information",
    body: "Success is a permit passed, a bank account opened, a grant applied for — not another page read.",
  },
  {
    title: "Built with lived experience",
    body: "Designed by someone who went through foster care, shaped by the people it serves.",
  },
];

const TRANSPARENCY = [
  {
    claim: "501(c)(3) status, tax-deductible donations, registered-nonprofit standing",
    status: "None of those exist yet — and we do not claim them.",
  },
  {
    claim: "Privacy & Terms",
    status: "Plain-English drafts, not yet reviewed by a lawyer.",
  },
  {
    claim: "Directory listings",
    status: "Labeled plainly: verified, or “Unverified — call to confirm.”",
  },
  {
    claim: "Impact numbers",
    status: "We do not publish impact numbers we have not measured.",
  },
];

export default function About() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">About AfterCare</p>
          <h1 className="mk-h1">
            Built by someone who went through it,{" "}
            <em>for the people coming after him.</em>
          </h1>
          <p className="mk-deck">
            AfterCare is founded by Biniam Efrem, a former foster youth. It is
            a social-impact project for foster youth ages 16–24 — free forever.
          </p>
        </div>
      </header>

      <section className="mk-section" id="story">
        <div className="mk-wrap">
          <p className="mk-kicker">Founder</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">Biniam Efrem</h2>
              <p className="mk-lead">
                Biniam is a former foster youth and the founder of AfterCare.
                The photos on this page are real moments from his life —
                graduation, family, first job, first car — the same milestones
                AfterCare now helps other young people reach.
              </p>
              <FounderStoryPlaceholder />
            </div>
            <FounderFigure
              photoId="grad-mom"
              priority
              sizes="(max-width: 860px) 100vw, 480px"
            />
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="journey">
        <div className="mk-wrap">
          <p className="mk-kicker">The journey</p>
          <h2 className="mk-h2">Foster care → graduation → first job → first car.</h2>
          <p className="mk-deck">
            Simple captions only. No invented quotes. These are Biniam&rsquo;s
            photos; the story text above is reserved for him to write.
          </p>
          <div className="mk-journey">
            {FOUNDER_JOURNEY.map((j) => (
              <div className="mk-journey-step" key={j.step}>
                <span className="mk-step-num">{j.step} — {j.title}</span>
                <FounderFigure photoId={j.photoId} sizes="(max-width: 800px) 100vw, 25vw" />
                <p>{j.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mk-grid-2" style={{ marginTop: 36 }}>
            {FOUNDER_PHOTOS.filter((p) => p.id === "grad-dad").map((p) => (
              <FounderFigure key={p.id} photoId={p.id} sizes="(max-width: 700px) 100vw, 50vw" />
            ))}
            <FounderFigure photoId="first-car" sizes="(max-width: 700px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="mk-section" id="background">
        <div className="mk-wrap">
          <p className="mk-kicker">What AfterCare is</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">An AI life navigator plus a services directory.</h2>
              <p className="mk-lead">
                The navigator answers questions and walks a young person through
                real tasks — one finished thing at a time. The directory lists
                real California programs with honest verification labels. Quests
                turn big adult tasks into steps you can complete.
              </p>
              <div className="mk-cta-row">
                <Link href="/programs" className="mk-btn mk-btn-primary">
                  Explore programs
                </Link>
                <Link href="/how-it-works" className="mk-btn mk-btn-ghost">
                  How it works
                </Link>
              </div>
            </div>
            <aside>
              <p className="mk-kicker">At a glance</p>
              <p className="mk-lead" style={{ marginTop: 0 }}>
                <strong>Who:</strong> foster youth ages 16–24, and the adults
                and organizations who show up for them.
              </p>
              <p className="mk-lead">
                <strong>What:</strong> navigator app, Quests, Panic Button,
                services directory.
              </p>
              <p className="mk-lead">
                <strong>Cost:</strong> free forever for foster youth.
              </p>
              <p className="mk-lead">
                <strong>Status:</strong> {ORG_STATUS}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="goals">
        <div className="mk-wrap">
          <p className="mk-kicker">Goals</p>
          <h2 className="mk-h2">What we&rsquo;re working toward.</h2>
          <div className="mk-grid-2">
            {GOALS.map((g, i) => (
              <div className="mk-tile" key={g.title}>
                <span className="mk-step-num">0{i + 1}</span>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" id="transparency">
        <div className="mk-wrap">
          <p className="mk-kicker">Transparency</p>
          <h2 className="mk-h2">The honest status.</h2>
          <p className="mk-deck">
            {ORG_STATUS} The work is real, the product is live in your browser,
            and the formal nonprofit filing is still ahead.
          </p>
          <table className="mk-table">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSPARENCY.map((t) => (
                <tr key={t.claim}>
                  <td>
                    <strong>{t.claim}</strong>
                  </td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
