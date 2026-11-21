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
 * Individual program page — layout varies by topic (flagship / rights / practical / crisis).
 * @param {{ params: Promise<{ slug: string }> }} props
 */
export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const layout = program.layout || "practical";
  const related = (program.related || [])
    .map((s) => getProgram(s))
    .filter(Boolean);
  const others = (
    related.length > 0
      ? related
      : PROGRAMS.filter((p) => p.slug !== program.slug)
  ).slice(0, 8);

  const panelClass =
    layout === "rights"
      ? "mk-panel rights"
      : layout === "crisis"
        ? "mk-panel crisis"
        : layout === "flagship"
          ? "mk-panel practical"
          : "mk-panel";

  return (
    <div className="mk">
      <OrgNav />

      <header
        className="mk-page-hero"
        style={
          layout === "flagship"
            ? { background: "linear-gradient(180deg, #f8d5ce 0%, transparent 70%)" }
            : layout === "rights"
              ? { background: "linear-gradient(180deg, #d5ebe3 0%, transparent 70%)" }
              : layout === "crisis"
                ? { background: "linear-gradient(180deg, #f8d5ce 0%, transparent 70%)" }
                : undefined
        }
      >
        <div className="mk-wrap">
          <p className="mk-kicker">
            <Link href="/programs">All needs</Link>
            {" / "}
            {program.shortTitle}
          </p>
          {program.flagship && (
            <span className="mk-badge mk-badge-flagship">Flagship</span>
          )}
          {program.questSlug && !program.flagship && (
            <span className="mk-badge mk-badge-live">Quest in the app</span>
          )}
          <h1
            className="mk-h1"
            style={{ marginTop: program.flagship || program.questSlug ? 12 : 0 }}
          >
            {program.title}
          </h1>
          <p className="mk-deck">{program.tagline}</p>
          {program.voice && <p className="mk-voice">{program.voice}</p>}
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              {program.questSlug ? "Start the Quest" : "Ask AfterCare"}
            </Link>
            <Link href="/find" className="mk-btn mk-btn-ghost">
              Needs finder
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Overview</p>
            <h2 className="mk-h2">What this covers</h2>
            <p className="mk-lead">{program.summary}</p>
            <p className="mk-lead">
              <strong>Who it&rsquo;s for:</strong> {program.whoFor}
            </p>
            {program.highlights?.length > 0 && (
              <ul className="mk-checklist">
                {program.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
          {program.photoId ? (
            <FounderFigure
              photoId={program.photoId}
              sizes="(max-width: 860px) 100vw, 480px"
            />
          ) : (
            <div className={panelClass}>
              <h3>Get help on this now</h3>
              <p>
                Ask the AfterCare chat about {program.shortTitle.toLowerCase()},
                or open the needs finder if you&rsquo;re not sure where to start.
              </p>
              <Link href="/app" className="mk-tile-link">
                Open the app →
              </Link>
            </div>
          )}
        </div>
      </section>

      {(program.sayThis?.length || program.documents?.length || program.whoToCall?.length) && (
        <section className="mk-section mk-section-alt" id="toolkit">
          <div className="mk-wrap">
            <p className="mk-kicker">What to say · what to bring · who to call</p>
            <h2 className="mk-h2">Your pocket script</h2>
            <div className="mk-grid-3">
              {program.sayThis?.length > 0 && (
                <div className={panelClass}>
                  <h3>Say / ask this</h3>
                  <ul className="mk-checklist">
                    {program.sayThis.map((s) => (
                      <li key={s}>&ldquo;{s}&rdquo;</li>
                    ))}
                  </ul>
                </div>
              )}
              {program.documents?.length > 0 && (
                <div className="mk-panel">
                  <h3>Documents</h3>
                  <ul className="mk-checklist">
                    {program.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {program.whoToCall?.length > 0 && (
                <div className="mk-panel">
                  <h3>Who to call</h3>
                  <ul className="mk-checklist">
                    {program.whoToCall.map((w) => (
                      <li key={w.name}>
                        <strong>{w.name}</strong> — {w.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {program.steps?.length > 0 && (
        <section className="mk-section" id="steps">
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

      {program.faqs?.length > 0 && (
        <section className="mk-section mk-section-alt" id="faq">
          <div className="mk-wrap mk-wrap-narrow" style={{ maxWidth: 760, margin: "0 auto" }}>
            <p className="mk-kicker">FAQ</p>
            <h2 className="mk-h2">Common questions</h2>
            <div className="mk-faq">
              {program.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mk-section mk-section-ink" id="quest-cta">
        <div className="mk-wrap">
          <p className="mk-kicker">In the app</p>
          <h2 className="mk-h2">
            {program.questSlug
              ? "Ready to finish this step by step?"
              : "Ask AfterCare about this"}
          </h2>
          <p className="mk-deck">
            {program.questSlug
              ? "Open the navigator, start the matching Quest, and check off each win."
              : "The chat can still walk you through this while we expand Quests."}
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Open the app
            </Link>
            <Link href="/programs" className="mk-btn mk-btn-ghost-on-dark">
              All needs
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">{related.length ? "Related" : "Keep going"}</p>
          <div className="mk-topic-rail">
            {others.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`}>
                <strong>{p.shortTitle}</strong>
                <span>Open →</span>
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
