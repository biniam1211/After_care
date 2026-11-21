import Link from "next/link";
import { MILESTONES } from "@/components/age-milestones";

/**
 * California foster-youth age milestone timeline (14 → 26).
 * Links into My Plan so youth can check off this year’s unlocks.
 */
export function AgeTimeline() {
  return (
    <div className="mk-timeline" role="list">
      {MILESTONES.map((m) => (
        <article className="mk-timeline-item" role="listitem" key={m.age}>
          <div className="mk-timeline-age" aria-hidden="true">
            {m.age}
          </div>
          <h3>{m.title}</h3>
          <ul>
            {m.unlocks.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <div className="mk-cta-row" style={{ marginTop: 10 }}>
            <Link href={m.href}>Open related guide →</Link>
            <Link href={`/my-plan?age=${m.age}`} className="mk-btn mk-btn-ghost">
              Add age {m.age} to My Plan
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
