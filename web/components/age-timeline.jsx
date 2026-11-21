import Link from "next/link";
import { MILESTONES } from "@/components/age-milestones";

/**
 * California foster-youth age milestone timeline (14 → 26).
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
          <Link href={m.href}>Open related guide →</Link>
        </article>
      ))}
    </div>
  );
}
