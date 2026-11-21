import Link from "next/link";
import { notFound } from "next/navigation";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { FounderFigure } from "@/components/founder-photos";
import {
  PROGRAMS,
  getProgram,
  getProgramSlugs,
} from "@/components/programs-data";
import "../../marketing.css";

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export async function generateStaticParams() {
  return getProgramSlugs().map((slug) => ({ slug }));
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Program" };
  return {
    title: program.title,
    description: program.summary,
    openGraph: {
      title: `${program.title} · AfterCare`,
      description: program.tagline,
      type: "website",
    },
  };
}

/**
 * Individual program / service-area page.
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const others = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 6);

  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">
            <Link href="/programs">Programs</Link>
            {" / "}
            {program.shortTitle}
          </p>
          {program.flagship && (
            <span className="mk-badge mk-badge-flagship">Flagship</span>
          )}
          <h1 className="mk-h1" style={{ marginTop: program.flagship ? 12 : 0 }}>
            {program.title}
          </h1>
          <p className="mk-deck">{program.tagline}</p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              {program.questSlug ? "Start in the app" : "Ask AfterCare"}
            </Link>
            <Link href="/resources" className="mk-btn mk-btn-ghost">
              Resources hub
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Overview</p>
            <h2 className="mk-h2">What this program covers</h2>
            <p className="mk-lead">{program.summary}</p>
            <p className="mk-lead">
              <strong>Who it&rsquo;s for:</strong> {program.whoFor}
            </p>
            <ul className="mk-checklist">
              {program.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {program.questSlug && (
              <div className="mk-note">
                <strong>Quest available.</strong> Open the app and start
                &ldquo;{program.title}&rdquo; to walk through this step by step.
              </div>
            )}
          </div>
          {program.photoId ? (
            <FounderFigure
              photoId={program.photoId}
              sizes="(max-width: 860px) 100vw, 480px"
            />
          ) : (
            <div className="mk-tile" style={{ alignSelf: "start" }}>
              <span className="mk-badge mk-badge-live">In the navigator</span>
              <h3>Get help on this now</h3>
              <p>
                Ask the AfterCare chat about {program.shortTitle.toLowerCase()},
                or browse the California services directory for local programs.
              </p>
              <Link href="/app" className="mk-tile-link">
                Open the app →
              </Link>
            </div>
          )}
        </div>
      </section>

      {program.steps?.length > 0 && (
        <section className="mk-section mk-section-alt" id="steps">
          <div className="mk-wrap mk-wrap-narrow" style={{ maxWidth: 760, margin: "0 auto" }}>
            <p className="mk-kicker">Step by step</p>
            <h2 className="mk-h2">How to move forward</h2>
            <div className="mk-steps">
              {program.steps.map((s, i) => (
                <div className="mk-step" key={s.title}>
                  <div className="mk-step-index">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            {program.notes?.map((n) => (
              <div className="mk-note" key={n}>
                {n}
              </div>
            ))}
            {program.sources?.length > 0 && (
              <div className="mk-sources">
                <h3>Official sources</h3>
                <ul>
                  {program.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} rel="noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">More programs</p>
          <h2 className="mk-h2">Keep going</h2>
          <div className="mk-grid-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="mk-tile">
                <h3>{p.shortTitle}</h3>
                <p>{p.tagline}</p>
                <span className="mk-tile-link">View →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
