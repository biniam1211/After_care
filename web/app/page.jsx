import Image from "next/image";
import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
  VERIFIED_MEANING,
} from "@/components/site-chrome";
import {
  FounderFigure,
  FounderStoryPlaceholder,
  FOUNDER_JOURNEY,
  getFounderPhoto,
} from "@/components/founder-photos";
import { PROGRAMS } from "@/components/programs-data";
import "./marketing.css";

export const metadata = {
  title: "AfterCare — Built by foster kids, for foster kids",
  description:
    "AfterCare is the AI life navigator for foster youth — driver's license help, housing, money, benefits, school, and more. Free forever. Founded by Biniam Efrem, a former foster youth.",
  openGraph: {
    title: "AfterCare — Built by foster kids, for foster kids",
    description:
      "The AI life navigator for foster youth. Get help now with real steps for every how-do-I-adult moment.",
    type: "website",
  },
};

const heroPhoto = getFounderPhoto("grad-mom");
const flagship = PROGRAMS.find((p) => p.flagship);
const featuredPrograms = PROGRAMS.filter((p) =>
  ["drivers-license", "vital-documents", "housing", "money", "benefits", "education"].includes(p.slug)
);

export default function Home() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-hero">
        <div className="mk-hero-media" aria-hidden="true">
          {heroPhoto && (
            <Image
              src={heroPhoto.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="mk-photo-img"
              style={{ objectFit: "cover", objectPosition: "center 28%" }}
            />
          )}
          <div className="mk-hero-scrim" />
        </div>
        <div className="mk-hero-content">
          <div className="mk-wrap">
            <p className="mk-brand-hero">
              AfterCare<i>.</i>
            </p>
            <h1 className="mk-h1">
              Built by foster kids, for foster kids.
            </h1>
            <p className="mk-deck">
              The AI life navigator for every &ldquo;how do I adult&rdquo; step —
              from your learner&rsquo;s permit to a bank account, benefits, and a
              safe place to sleep.
            </p>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-primary">
                Get help now
              </Link>
              <Link href="/programs/drivers-license" className="mk-btn mk-btn-ghost-on-dark">
                Driver&rsquo;s license help
              </Link>
            </div>
            <div className="mk-hero-meta">
              <span>Free forever for foster youth</span>
              <span>No caseworker required</span>
              <span>Crisis lines always one tap away</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mk-section" id="founder">
        <div className="mk-wrap">
          <p className="mk-kicker">Founder story</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">
                From foster care to founding AfterCare.
              </h2>
              <p className="mk-lead">
                AfterCare was founded by <strong>Biniam Efrem</strong>, a former
                foster youth. The product comes from lived experience — the gaps
                he hit graduating, working, and getting on the road — not from a
                focus group about foster care.
              </p>
              <FounderStoryPlaceholder />
              <div className="mk-cta-row">
                <Link href="/about#story" className="mk-btn mk-btn-ghost">
                  Read the journey
                </Link>
              </div>
            </div>
            <FounderFigure photoId="christmas" sizes="(max-width: 860px) 100vw, 480px" />
          </div>

          <div className="mk-journey" aria-label="Founder journey milestones">
            {FOUNDER_JOURNEY.map((j) => (
              <div className="mk-journey-step" key={j.step}>
                <span className="mk-step-num">{j.step}</span>
                <FounderFigure photoId={j.photoId} sizes="(max-width: 800px) 100vw, 25vw" />
                <h3>{j.title}</h3>
                <p>{j.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="programs">
        <div className="mk-wrap">
          <p className="mk-kicker">Programs</p>
          <h2 className="mk-h2">An all-in-one life navigator.</h2>
          <p className="mk-deck">
            Real service areas with clear next steps — and Quests in the app
            when you are ready to finish the job.
          </p>
          {flagship && (
            <div className="mk-split" style={{ marginTop: 40 }}>
              <FounderFigure photoId="first-car" sizes="(max-width: 860px) 100vw, 480px" />
              <div>
                <span className="mk-badge mk-badge-flagship">Flagship</span>
                <h3 className="mk-h3" style={{ marginTop: 12 }}>{flagship.title}</h3>
                <p className="mk-lead">{flagship.summary}</p>
                <div className="mk-cta-row">
                  <Link href={`/programs/${flagship.slug}`} className="mk-btn mk-btn-primary">
                    Explore the program
                  </Link>
                  <Link href="/app" className="mk-btn mk-btn-ghost">
                    Start the Quest
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className="mk-grid-3">
            {featuredPrograms.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="mk-tile">
                {p.flagship && <span className="mk-badge mk-badge-flagship">Flagship</span>}
                <h3>{p.shortTitle}</h3>
                <p>{p.tagline}</p>
                <span className="mk-tile-link">View program →</span>
              </Link>
            ))}
          </div>
          <p className="mk-lead">
            <Link href="/programs">See all programs →</Link>
          </p>
        </div>
      </section>

      <section className="mk-section" id="how">
        <div className="mk-wrap">
          <p className="mk-kicker">How it works</p>
          <h2 className="mk-h2">Ask. Follow steps. Finish the thing.</h2>
          <div className="mk-grid-3">
            <div className="mk-tile">
              <span className="mk-step-num">01</span>
              <h3>Get help now</h3>
              <p>Open the app and ask anything — bank account, DMV, Medi-Cal, housing. Plain language, no judgment.</p>
            </div>
            <div className="mk-tile">
              <span className="mk-step-num">02</span>
              <h3>Follow a Quest</h3>
              <p>Break big adult tasks into small wins. Driver&rsquo;s license and first bank account are ready today.</p>
            </div>
            <div className="mk-tile">
              <span className="mk-step-num">03</span>
              <h3>Find real services</h3>
              <p>65 California listings from a fixed catalog — never invented numbers. {VERIFIED_MEANING}</p>
            </div>
          </div>
          <div className="mk-cta-row">
            <Link href="/how-it-works" className="mk-btn mk-btn-ghost">
              How AfterCare works
            </Link>
            <Link href="/resources" className="mk-btn mk-btn-ghost">
              Resources hub
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-harbor" id="get-help">
        <div className="mk-wrap">
          <p className="mk-kicker">Get help now</p>
          <h2 className="mk-h2">You should not have to figure this out alone.</h2>
          <p className="mk-deck">
            No sign-up wall required to start. Works in your browser. Panic
            Button and crisis numbers are always there — 988, 211, Covenant
            House, Trevor Project.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Open the app
            </Link>
            <Link href="/download" className="mk-btn mk-btn-ghost-on-dark">
              Get it on your phone
            </Link>
          </div>
          <p className="mk-cta-note" style={{ color: "rgba(255,255,255,.65)" }}>
            {ORG_STATUS}
          </p>
        </div>
      </section>

      <section className="mk-section" id="involved">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Get involved</p>
            <h2 className="mk-h2">Volunteer, partner, or support the work.</h2>
            <p className="mk-lead">
              Caring adults, youth-serving orgs, and future donors all have a
              door in. Donation processing is a placeholder until nonprofit
              filing is real — we will never claim tax-deductibility before then.
            </p>
            <div className="mk-cta-row">
              <Link href="/get-involved" className="mk-btn mk-btn-primary">
                Get involved
              </Link>
              <Link href="/contact" className="mk-btn mk-btn-ghost">
                Contact
              </Link>
            </div>
          </div>
          <FounderFigure photoId="first-job" sizes="(max-width: 860px) 100vw, 480px" />
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
