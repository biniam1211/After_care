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
import { RESOURCES } from "@/components/data";
import { NeedsFinder } from "@/components/needs-finder";
import { AgeTimeline } from "@/components/age-timeline";
import { SiteSearch } from "@/components/site-search";
import { TaskPaths } from "@/components/task-paths";
import { CountyMosaic } from "@/components/county-mosaic";
import { CitedAskDemo } from "@/components/cited-ask-demo";
import "./marketing.css";

export const metadata = {
  title: "AfterCare — Built by foster kids, for foster kids",
  description:
    "Search verified California foster youth resources by county, ask for help that cites real sources, and finish Quests step by step. Free forever.",
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
const verifiedCount = Object.values(RESOURCES).filter((r) => r.verified).length;
const totalResources = Object.keys(RESOURCES).length;

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
        <div className="mk-hero-stamp">
          {verifiedCount}+ verified
          <br />
          listings
        </div>
        <div className="mk-wrap">
          <div className="mk-hero-copy">
            <p className="mk-kicker">California · ages 14–26 · {totalResources} resources</p>
            <h1 className="mk-h1">
              AfterCare.
              <br />
              <em>Ask. Find. Go.</em>
            </h1>
            <p className="mk-deck">
              Type what you need. Jump to a real phone number or official link in
              two taps. Built by a former foster youth — with sources you can check.
            </p>
            <SiteSearch autoFocus />
            <div className="mk-cta-row">
              <Link href="/directory" className="mk-btn mk-btn-primary">
                Open the directory
              </Link>
              <Link
                href="/app"
                className="mk-btn mk-btn-ghost"
                style={{ color: "#f3e6cc", borderColor: "#f3e6cc" }}
              >
                Ask the navigator
              </Link>
            </div>
            <div className="mk-hero-meta">
              <span>No caseworker required</span>
              <span>ZIP stays in your browser</span>
              <span>{ORG_STATUS}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mk-section" id="tasks">
        <div className="mk-wrap">
          <TaskPaths />
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="ask-demo">
        <div className="mk-wrap">
          <p className="mk-kicker">Ask with citations</p>
          <h2 className="mk-h2">
            Answers that <em>show their sources.</em>
          </h2>
          <p className="mk-lead">
            Retrieval over verified listings and guides — with follow-ups for age,
            county, and situation. If we don&rsquo;t know, we say so.
          </p>
          <CitedAskDemo />
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="finder">
        <div className="mk-wrap">
          <NeedsFinder />
        </div>
      </section>

      <section className="mk-section" id="directory-cta">
        <div className="mk-wrap">
          <CountyMosaic />
          <div className="mk-split" style={{ marginTop: 36 }}>
            <div className="mk-panel practical">
              <h3>{verifiedCount} verified · {totalResources} total</h3>
              <p>
                Verified means we confirmed an official page or the CDSS county
                roster. It does <strong>not</strong> mean we tested the phone line
                live. Always call ahead.{" "}
                <Link href="/directory">Browse full directory →</Link>
              </p>
            </div>
            <div className="mk-cta-row" style={{ alignItems: "center" }}>
              <Link href="/directory?need=crisis" className="mk-btn mk-btn-primary">
                Crisis lines
              </Link>
              <Link href="/directory?need=food" className="mk-btn mk-btn-ghost">
                Food help
              </Link>
            </div>
          </div>
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
            Deadlines nobody explains in plain language — confirm every rule with
            your worker or attorney.
          </p>
          <AgeTimeline />
        </div>
      </section>

      <section className="mk-section mk-section-pine" id="flagship">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Flagship guide</p>
            <h2 className="mk-h2">Driver&rsquo;s license &amp; permit</h2>
            <p className="mk-deck">
              Who can sign. Driver&rsquo;s ed. Insurance. Cited to DMV and CDSS —
              finished as a Quest in the app.
            </p>
            <div className="mk-cta-row">
              <Link href="/programs/drivers-license" className="mk-btn mk-btn-on-dark">
                Open the guide
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
          <p className="mk-kicker">{PROGRAMS.length} guides</p>
          <h2 className="mk-h2">
            Deep guides. <em>Not three cards.</em>
          </h2>
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
              Browse all guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-pull" id="promise">
        <div className="mk-wrap">
          <p className="mk-pull-note">
            If we don&rsquo;t know, we say so — and send you to 211 or a crisis line.
          </p>
          <p className="mk-pull-note">
            No invented orgs. No fake numbers. Guidance, not legal or clinical advice.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Ask AfterCare
            </Link>
            <Link href="/directory" className="mk-btn mk-btn-ghost-on-dark">
              Directory
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
