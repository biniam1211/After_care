"use client";

/**
 * Client-side “What do you need right now?” finder.
 * Age / situation / need stay in React state only — nothing is posted
 * or written to localStorage (no PII collection).
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AGES,
  SITUATIONS,
  NEEDS,
  resolveChecklist,
} from "@/components/needs-finder-data";

/**
 * Interactive needs finder for the org site.
 * @param {{ compact?: boolean }} props
 */
export function NeedsFinder({ compact = false }) {
  const [ageId, setAgeId] = useState("");
  const [situationId, setSituationId] = useState("");
  const [needId, setNeedId] = useState("");

  const result = useMemo(
    () => resolveChecklist({ ageId, situationId, needId }),
    [ageId, situationId, needId]
  );

  return (
    <div className="mk-finder" aria-live="polite">
      {!compact && (
        <>
          <p className="mk-kicker">No account · no personal info saved</p>
          <h2 className="mk-h2" style={{ maxWidth: "18ch" }}>
            What do you need <em>right now?</em>
          </h2>
          <p className="mk-lead">
            Pick your age band, situation, and need. We build a checklist on
            this device only — nothing is uploaded.
          </p>
        </>
      )}
      <div className="mk-finder-row">
        <label>
          Age
          <select
            value={ageId}
            onChange={(e) => setAgeId(e.target.value)}
            aria-label="Age band"
          >
            <option value="">Select…</option>
            {AGES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Situation
          <select
            value={situationId}
            onChange={(e) => setSituationId(e.target.value)}
            aria-label="Current situation"
          >
            <option value="">Select…</option>
            {SITUATIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Need
          <select
            value={needId}
            onChange={(e) => setNeedId(e.target.value)}
            aria-label="What you need help with"
          >
            <option value="">Select…</option>
            {NEEDS.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mk-finder-result">
        <h3>{result.title}</h3>
        <ol>
          {result.items.map((item) => (
            <li key={item.text}>
              {item.href ? <Link href={item.href}>{item.text}</Link> : item.text}
            </li>
          ))}
        </ol>
        {result.sources?.length > 0 && needId && (
          <p className="mk-finder-note">
            Sources to confirm:{" "}
            {result.sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " · " : ""}
                <a href={s.href} rel="noopener noreferrer" target="_blank">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
