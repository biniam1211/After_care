import Link from "next/link";

/** Kid-language task paths — home → help in ≤ 2 taps. */
export const TASK_PATHS = [
  {
    id: "sleep",
    label: "I need a place to sleep",
    href: "/directory?need=housing",
    hint: "Shelter · 211 · Covenant House",
  },
  {
    id: "money",
    label: "I need money",
    href: "/directory?need=money",
    hint: "Bank · CalFresh · jobs · Chafee",
  },
  {
    id: "docs",
    label: "I need my documents",
    href: "/programs/vital-documents",
    hint: "Birth certificate · SSN · ID",
  },
  {
    id: "job",
    label: "I need a job",
    href: "/programs/jobs",
    hint: "First job · work permit · Job Corps",
  },
  {
    id: "court",
    label: "I'm in trouble with court",
    href: "/programs/court-and-lawyer",
    hint: "Your lawyer · hearings · rights",
  },
  {
    id: "talk",
    label: "I need to talk to someone",
    href: "/directory?need=crisis",
    hint: "988 · Trevor · Crisis Text · 741741",
  },
];

/**
 * Task rail for home and start-here.
 * @param {{ title?: string }} [props]
 */
export function TaskPaths({ title = "Go straight to help" }) {
  return (
    <div className="mk-tasks">
      <p className="mk-kicker">{title}</p>
      <h2 className="mk-h2">
        Pick what you need. <em>Two taps.</em>
      </h2>
      <div className="mk-task-grid">
        {TASK_PATHS.map((t) => (
          <Link key={t.id} href={t.href} className="mk-task">
            <strong>{t.label}</strong>
            <span>{t.hint}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
