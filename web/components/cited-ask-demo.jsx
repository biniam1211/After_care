"use client";

/**
 * Public Ask demo with retrieval citations + clarifying follow-ups.
 */
import { useState } from "react";
import Link from "next/link";
import { buildCitedAskReply } from "@/lib/ask-retrieve";
import { detectCrisis } from "@/lib/crisis";

/**
 * @returns {JSX.Element}
 */
export function CitedAskDemo() {
  const [q, setQ] = useState("");
  const [age, setAge] = useState("");
  const [county, setCounty] = useState("");
  const [situation, setSituation] = useState("");
  const [reply, setReply] = useState(null);

  const ask = (text) => {
    const message = text || q;
    if (!message.trim()) return;
    if (detectCrisis(message)) {
      setReply({
        answer:
          "If you’re in danger or thinking about suicide, call or text 988 now. For nowhere to sleep tonight, call Covenant House at 1-800-388-3888 or dial 211. I’m not guessing — go to real crisis help first.",
        steps: ["Call or text 988", "Call Covenant House 1-800-388-3888 if you need a bed", "Dial 211 for local routing"],
        resources: ["988", "covenant", "211"],
        citations: [],
        followups: [],
        refuseGuess: false,
        crisis: true,
      });
      return;
    }
    setReply(buildCitedAskReply(message, { age, county, situation }));
  };

  return (
    <div className="mk-ask-demo">
      <label className="mk-search-label" htmlFor="cited-ask-input">
        Ask with sources
      </label>
      <div className="mk-plan-grid">
        <label>
          Age
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Optional</option>
            <option value="14-17">14–17</option>
            <option value="18-20">18–20</option>
            <option value="21-26">21–26</option>
          </select>
        </label>
        <label>
          County
          <input
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            placeholder="Optional"
            maxLength={40}
          />
        </label>
        <label>
          Situation
          <select value={situation} onChange={(e) => setSituation(e.target.value)}>
            <option value="">Optional</option>
            <option value="housing">Housing</option>
            <option value="school">School</option>
            <option value="health">Health</option>
            <option value="money">Money</option>
            <option value="court">Court</option>
          </select>
        </label>
      </div>
      <div className="mk-search-box">
        <input
          id="cited-ask-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. I aged out — how do I keep Medi-Cal?"
          onKeyDown={(e) => {
            if (e.key === "Enter") ask();
          }}
        />
        <button type="button" className="mk-btn mk-btn-primary" onClick={() => ask()}>
          Ask
        </button>
      </div>
      {reply && (
        <div className="mk-ask-reply" role="status">
          <p>{reply.answer}</p>
          {reply.steps?.length > 0 && (
            <ol>
              {reply.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          )}
          {reply.citations?.length > 0 && (
            <div className="mk-citations">
              <h3>Sources we can cite</h3>
              <ul>
                {reply.citations.map((c) => (
                  <li key={`${c.kind}-${c.id}`}>
                    <Link href={c.href}>{c.title}</Link>
                    {c.sourceUrl && (
                      <>
                        {" · "}
                        <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
                          Official page
                        </a>
                      </>
                    )}
                    {c.verifiedDate && <> · verified {c.verifiedDate}</>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {reply.followups?.length > 0 && (
            <div className="mk-followups">
              <h3>Help me narrow it</h3>
              <div className="mk-cta-row">
                {reply.followups.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className="mk-btn mk-btn-ghost"
                    onClick={() => {
                      setQ((prev) => `${prev} (${f})`);
                      ask(`${q} ${f}`);
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="mk-lead">
            Prefer the full chat experience?{" "}
            <Link href="/app">Open Ask AfterCare</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
