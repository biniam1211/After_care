import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { FounderFigure } from "@/components/founder-photos";
import { PROGRAMS } from "@/components/programs-data";
import "../marketing.css";

export const metadata = {
  title: "Programs",
  description:
    "AfterCare programs for foster youth: driver's license help, vital documents, housing, money, benefits, education, jobs, health, legal rights, AB 12, and parenting youth.",
  openGraph: {
    title: "Programs · AfterCare",
    description:
      "All-in-one life navigator programs — from learner's permit to benefits and housing.",
    type: "website",
  },
};

export default function ProgramsPage() {
  const flagship = PROGRAMS.find((p) => p.flagship);
  const rest = PROGRAMS.filter((p) => !p.flagship);

  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Programs</p>
          <h1 className="mk-h1">
            Every how-do-I-adult step, <em>in one navigator.</em>
          </h1>
          <p className="mk-deck">
            Service areas with clear next steps — and Quests in the app when you
            are ready to finish the job. Free forever for foster youth.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Get help now
            </Link>
            <Link href="/programs/drivers-license" className="mk-btn mk-btn-ghost">
              Driver&rsquo;s license flagship
            </Link>
          </div>
        </div>
      </header>

      {flagship && (
        <section className="mk-section" id="flagship">
          <div className="mk-wrap mk-split">
            <FounderFigure photoId="first-car" sizes="(max-width: 860px) 100vw, 480px" />
            <div>
              <span className="mk-badge mk-badge-flagship">Flagship program</span>
              <h2 className="mk-h2" style={{ marginTop: 12 }}>{flagship.title}</h2>
              <p className="mk-lead">{flagship.summary}</p>
              <ul className="mk-checklist">
                {flagship.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mk-cta-row">
                <Link href={`/programs/${flagship.slug}`} className="mk-btn mk-btn-primary">
                  Open driver&rsquo;s license program
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mk-section mk-section-alt" id="all">
        <div className="mk-wrap">
          <p className="mk-kicker">All programs</p>
          <h2 className="mk-h2">Pick the step you need next.</h2>
          <div className="mk-grid-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="mk-tile">
                <h3>{p.shortTitle}</h3>
                <p>{p.tagline}</p>
                <span className="mk-tile-link">
                  {p.questSlug ? "Program + Quest →" : "View program →"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-harbor">
        <div className="mk-wrap">
          <p className="mk-kicker">In the app</p>
          <h2 className="mk-h2">Quests that finish the job.</h2>
          <p className="mk-deck">
            Driver&rsquo;s license, first bank account, Chafee Grant, and health
            coverage to 26 are interactive Quests today. More programs get Quests
            as we build them — until then, ask the chat.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Open the app
            </Link>
            <Link href="/how-it-works" className="mk-btn mk-btn-ghost-on-dark">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
