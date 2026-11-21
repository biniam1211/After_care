import Link from "next/link";
import Image from "next/image";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import {
  FOUNDER_JOURNEY,
  FounderFigure,
  FounderStoryPlaceholder,
  getFounderPhoto,
} from "@/components/founder-photos";
import { PROGRAMS } from "@/components/programs-data";
import { NeedsFinder } from "@/components/needs-finder";
import { AgeTimeline } from "@/components/age-timeline";
import "./marketing.css";

export const metadata = {
  title: "AfterCare — Built by foster kids, for foster kids",
  description:
    "The life navigator for foster youth in California — rights, documents, money, housing, school, health, court, and aging out. Free forever.",
};

const FEATURED = [
  "drivers-license",
  "foster-youth-bill-of-rights",
  "extended-foster-care",
  "vital-documents",
  "education",
  "housing",
  "health",
  "sealing-records",
]
  .map((s) => PROGRAMS.find((p) => p.slug === s))
  .filter(Boolean);

const heroPhoto = getFounderPhoto("grad-mom");

export default function HomePage() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-hero">
        <div className="mk-hero-media" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          {heroPhoto && (
            <Image
              src={heroPhoto.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 28%" }}
            />
          )}
        </div>
        <div className="mk-hero-scrim" />
        <div className="mk-hero-stamp">Free forever for foster youth</div>
        <div className="mk-wrap">
          <div className="mk-hero-copy">
            <p className="mk-kicker">California · ages 14–26</p>
            <h1 className="mk-h1">
              AfterCare.
              <br />
              <em>Your life, mapped.</em>
            </h1>
            <p className="mk-deck">
              Built by a former foster youth for the kids still figuring it out —
              rights, papers, money, housing, school, court, and the nights you
              need a bed. Straight talk. Real steps. Official sources.
            </p>
            <div className="mk-cta-row">
              <Link href="/find" className="mk-btn mk-btn-primary">
                What do you need right now?
              </Link>
              <Link href="/app" className="mk-btn mk-btn-ghost" style={{ color: "#f3e6cc", borderColor: "#f3e6cc" }}>
                Open the app
              </Link>
            </div>
            <div className="mk-hero-meta">
              <span>No caseworker required</span>
              <span>Crisis lines always one tap away</span>
              <span>{ORG_STATUS}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mk-section" id="finder">
        <div className="mk-wrap">
          <NeedsFinder />
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="story">
        <div className="mk-wrap mk-asymmetric">
          <div>
            <p className="mk-kicker">Founder · Biniam Efrem</p>
            <h2 className="mk-h2">
              This exists because <em>someone lived it.</em>
            </h2>
            <FounderStoryPlaceholder />
            <div className="mk-cta-row">
              <Link href="/about#story" className="mk-btn mk-btn-ghost">
                About the founder
              </Link>
            </div>
          </div>
          <div className="mk-journey">
            {FOUNDER_JOURNEY.slice(0, 3).map((j) => (
              <FounderFigure
                key={j.photoId}
                photoId={j.photoId}
                className="mk-polaroid"
                sizes="(max-width: 800px) 100vw, 420px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" id="milestones">
        <div className="mk-wrap">
          <p className="mk-kicker">Age unlocks</p>
          <h2 className="mk-h2">
            What opens up at <em>14, 16, 17, 18, 21, 26.</em>
          </h2>
          <p className="mk-lead">
            Foster care has deadlines nobody explains in plain language. Here is
            the California map — confirm every rule with your worker or attorney.
          </p>
          <AgeTimeline />
        </div>
      </section>

      <section className="mk-section mk-section-pine" id="flagship">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Flagship</p>
            <h2 className="mk-h2">Driver&rsquo;s license &amp; permit</h2>
            <p className="mk-deck">
              Who can sign. Driver&rsquo;s ed. Insurance. The road test. Cited to
              California DMV and CDSS — then finished as a Quest in the app.
            </p>
            <div className="mk-cta-row">
              <Link href="/programs/drivers-license" className="mk-btn mk-btn-on-dark">
                Open the flagship guide
              </Link>
              <Link href="/app" className="mk-btn mk-btn-ghost-on-dark">
                Start the Quest
              </Link>
            </div>
          </div>
          <FounderFigure photoId="first-car" sizes="(max-width: 860px) 100vw, 420px" />
        </div>
      </section>

      <section className="mk-section" id="needs">
        <div className="mk-wrap">
          <p className="mk-kicker">54 guides · California first</p>
          <h2 className="mk-h2">
            Not three cards. <em>Every foster need.</em>
          </h2>
          <p className="mk-lead">
            Bill of Rights, court, credit checks, AB 12, Chafee, Medi-Cal to 26,
            sealing records, SIJS, JV-220, NextUp — pick a line, get steps.
          </p>
          <div className="mk-topic-rail">
            {FEATURED.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`}>
                <strong>{p.shortTitle}</strong>
                <span>{p.flagship ? "Flagship →" : "Open →"}</span>
              </Link>
            ))}
          </div>
          <div className="mk-cta-row">
            <Link href="/programs" className="mk-btn mk-btn-primary">
              Browse all {PROGRAMS.length} guides
            </Link>
            <Link href="/start-here" className="mk-btn mk-btn-ghost">
              Prefer a path? Start here
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-pull" id="promise">
        <div className="mk-wrap">
          <p className="mk-pull-note">
            We will never invent a hotline, a partner logo, or a statistic we
            didn&rsquo;t earn.
          </p>
          <p className="mk-pull-note">
            Guidance — not legal or clinical advice. Official sources linked.
            Crisis help always on the page.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Get help now
            </Link>
            <Link href="/for-supporters" className="mk-btn mk-btn-ghost-on-dark">
              I&rsquo;m a supporter
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
