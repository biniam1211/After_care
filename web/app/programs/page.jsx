import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { PROGRAMS } from "@/components/programs-data";
import "../marketing.css";

export const metadata = {
  title: "All needs",
  description:
    "California foster youth guides — rights, documents, money, housing, school, health, court, AB 12, and more. Plain-language steps with official sources.",
};

const CATEGORY_LABELS = {
  "in-care": "While in care",
  rights: "Rights & grievances",
  "documents-money": "Documents & money",
  housing: "Housing",
  benefits: "Benefits & coverage",
  health: "Health & mental health",
  education: "Education",
  jobs: "Work & career",
  "legal-transition": "Legal & transition",
  community: "Community, alumni & giving back",
};

function groupByCategory(programs) {
  /** @type {Record<string, typeof PROGRAMS>} */
  const map = {};
  for (const p of programs) {
    const key = p.category || "in-care";
    if (!map[key]) map[key] = [];
    map[key].push(p);
  }
  return map;
}

export default function ProgramsPage() {
  const grouped = groupByCategory(PROGRAMS);
  const cats = Object.keys(grouped);

  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">{PROGRAMS.length} guides</p>
          <h1 className="mk-h1">
            Every foster need. <em>Mapped.</em>
          </h1>
          <p className="mk-deck">
            Not a three-card homepage pitch — a full California stack: rights in
            care, papers, money, housing, school, health, court, immigration,
            and life after 21. Guidance only; confirm with official sources.
          </p>
          <div className="mk-cta-row">
            <Link href="/find" className="mk-btn mk-btn-primary">
              What do you need right now?
            </Link>
            <Link href="/programs/drivers-license" className="mk-btn mk-btn-ghost">
              Driver&rsquo;s license flagship
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <nav className="mk-cat-nav" aria-label="Program categories">
            {cats.map((c) => (
              <a key={c} href={`#cat-${c}`}>
                {CATEGORY_LABELS[c] || c}
              </a>
            ))}
          </nav>

          {cats.map((c) => (
            <div key={c} id={`cat-${c}`} style={{ marginBottom: 48 }}>
              <p className="mk-kicker">{CATEGORY_LABELS[c] || c}</p>
              <div className="mk-topic-rail">
                {grouped[c].map((p) => (
                  <Link key={p.slug} href={`/programs/${p.slug}`}>
                    <strong>
                      {p.flagship ? "★ " : ""}
                      {p.shortTitle}
                    </strong>
                    <span>{p.questSlug ? "Quest →" : "Open →"}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
