"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Quests list + interactive Quest detail
// ───────────────────────────────────────────────────────────
import React, { useRef } from "react";
import { Icon, Screen, TONE, Button, Card, IconTile, ProgressBar, DetailHeader } from "@/components/ui";
import { Logo } from "@/components/onboarding";
import { QUESTS } from "@/components/data";

export function QuestsList({ questProgress, onOpenQuest }) {
  const bank = QUESTS[0];
  const cur = questProgress["first-bank-account"] || 0;
  const total = bank.steps.length;
  const pct = cur / total;
  const done = cur >= total;

  return (
    <Screen top={62}>
      <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 32, letterSpacing: -0.9, color: "var(--ink)", margin: "0 0 4px" }}>Quests</h1>
      <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: "0 0 22px", lineHeight: 1.45 }}>Real-life skills, broken into small wins. I check in after every step.</p>

      {/* active */}
      <div onClick={() => onOpenQuest(bank.slug)} style={{ borderRadius: "var(--r-xl)", padding: 20, cursor: "pointer",
        background: "linear-gradient(150deg, #0B3A57 0%, #06283D 100%)", position: "relative", overflow: "hidden", boxShadow: "0 16px 36px rgba(6,40,61,.26)" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,155,255,.4), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <IconTile name={bank.icon} tone="sky" size={48} r={15} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--warm)", fontWeight: 700, fontSize: 11.5, letterSpacing: 0.4, textTransform: "uppercase" }}>{done ? "Completed" : cur > 0 ? "In progress" : "Recommended first"}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 19, color: "#fff", letterSpacing: -0.3, marginTop: 2 }}>{bank.title}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}><ProgressBar value={pct} color="var(--sky)" h={8} /></div>
            <span style={{ color: "#fff", fontWeight: 800, fontFamily: "var(--display)", fontSize: 14 }}>{cur}/{total}</span>
          </div>
        </div>
      </div>

      {/* the rest */}
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 14, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", margin: "26px 0 12px" }}>More quests</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {QUESTS.slice(1).map((q) => (
          <button key={q.slug} onClick={() => onOpenQuest(q.slug)} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff",
            borderRadius: "var(--r-lg)", padding: "15px 16px", boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)", textAlign: "left" }}>
            <IconTile name={q.icon} tone={q.color} size={46} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)", letterSpacing: -0.3 }}>{q.title}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{q.tagline}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <Icon name="chevR" size={18} color="var(--ink-faint)" sw={2.2} />
              <span style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 700 }}>{q.minutes}m</span>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}

export function QuestDetail({ slug, profile, questProgress, setQuestProgress, onBack, onAskHelp }) {
  const quest = QUESTS.find((q) => q.slug === slug);
  const interactive = !!(quest && quest.steps);
  const scrollRef = useRef(null);

  if (!interactive) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "var(--foam)" }}>
        <DetailHeader title="Quest" onBack={onBack} />
        <Screen top={108}>
          <IconTile name={quest.icon} tone={quest.color} size={64} r={20} />
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 28, letterSpacing: -0.7, color: "var(--ink)", margin: "18px 0 6px", lineHeight: 1.1 }}>{quest.title}</h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>{quest.tagline}</p>
          <Card style={{ marginTop: 22, display: "flex", gap: 13, alignItems: "flex-start" }}>
            <IconTile name="sparkle" tone="warm" size={40} r={12} iconSize={20} />
            <div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>This quest is on the way</div>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: "5px 0 0", lineHeight: 1.5 }}>I'm building it now. In the meantime, ask me about it in chat — I can still walk you through it live.</p>
            </div>
          </Card>
          <div style={{ marginTop: 16 }}>
            <Button full variant="primary" icon="sparkle" onClick={() => onAskHelp(quest.slug)}>Ask AfterCare about this</Button>
          </div>
        </Screen>
      </div>
    );
  }

  const total = quest.steps.length;
  const cur = questProgress[slug] || 0;
  const done = cur >= total;
  const complete = () => {
    setQuestProgress((p) => ({ ...p, [slug]: Math.min((p[slug] || 0) + 1, total) }));
    setTimeout(() => { const el = scrollRef.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); }, 120);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--foam)", display: "flex", flexDirection: "column" }}>
      {/* dark hero */}
      <div style={{ background: "linear-gradient(160deg, #0B3A57 0%, #06283D 100%)", paddingTop: 56, paddingBottom: 22, paddingLeft: 18, paddingRight: 18, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,155,255,.35), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 99, background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon name="chevL" size={22} color="#fff" sw={2.4} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <IconTile name={quest.icon} tone="sky" size={52} r={16} />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 24, letterSpacing: -0.5, color: "#fff", margin: 0, lineHeight: 1.08 }}>{quest.title}</h1>
              <div style={{ color: "rgba(219,241,255,.78)", fontSize: 13.5, marginTop: 3 }}>{quest.tagline}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
            <div style={{ flex: 1 }}><ProgressBar value={cur / total} color="var(--sky)" h={8} /></div>
            <span style={{ color: "#fff", fontWeight: 800, fontFamily: "var(--display)", fontSize: 14 }}>{cur}/{total} done</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "18px 18px 40px" }}>
        {/* why */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--warm-soft)", borderRadius: 18, padding: "14px 16px", border: "1px solid #FFE2C9", marginBottom: 18 }}>
          <Icon name="heart" size={22} color="var(--warm-deep)" sw={2} fill="rgba(255,158,87,.18)" style={{ marginTop: 1 }} />
          <div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "#9A5A22", letterSpacing: 0.2, textTransform: "uppercase" }}>Why this matters</div>
            <p style={{ margin: "5px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#86511F" }}>{quest.why}</p>
          </div>
        </div>

        {/* steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {quest.steps.map((s, i) => {
            const isDone = i < cur;
            const isActive = i === cur && !done;
            if (isDone) return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, background: "var(--mint-soft)", borderRadius: 18, padding: "14px 16px", border: "1px solid #CDEEDF" }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: "var(--mint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={17} color="#fff" sw={3} />
                </div>
                <span style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "#0C7A5A" }}>{s.title}</span>
                <span style={{ fontSize: 12.5, color: "#0C7A5A", fontWeight: 700 }}>Done</span>
              </div>
            );
            if (isActive) return (
              <div key={i} style={{ background: "#fff", borderRadius: "var(--r-lg)", padding: 20, boxShadow: "var(--shadow-pop)", border: "2px solid var(--sky)", animation: "ac-rise .35s ease both" }}>
                {/* AI check-in (after first step) */}
                {cur > 0 && (
                  <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "var(--sky-soft)", borderRadius: 14, padding: "11px 13px", marginBottom: 16 }}>
                    <Logo size={26} r={8} />
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: "#0B5FB0", fontWeight: 600 }}>Nice — that's {cur} done. {quest.steps[cur-1].check.replace(/\?$/, "")}? Let's keep going. 💪</p>
                  </div>
                )}
                {profile && profile.feeling === "overwhelmed" && cur === 0 && (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", background: "var(--warm-soft)", borderRadius: 12, padding: "9px 12px", marginBottom: 14, fontSize: 13, fontWeight: 600, color: "#9A5A22" }}>
                    <Icon name="heart" size={16} color="var(--warm-deep)" sw={2} /> No rush — just this one step for now.
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 99, background: "var(--sky)", color: "#fff", fontFamily: "var(--display)", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 19, color: "var(--ink)", margin: 0, letterSpacing: -0.3, flex: 1, lineHeight: 1.1 }}>{s.title}</h3>
                </div>
                <Field label="What it is" text={s.what} />
                {!(profile && profile.learningStyle === "simple") && <Field label="Why bother" text={s.why} accent />}
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start", background: "var(--foam)", borderRadius: 14, padding: "13px 14px", marginTop: 4, marginBottom: 18 }}>
                  <Icon name="arrowR" size={18} color="var(--sky)" sw={2.4} style={{ marginTop: 1 }} />
                  <div>
                    <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 12.5, color: "var(--sky)", letterSpacing: 0.3, textTransform: "uppercase" }}>Do this now</div>
                    <p style={{ margin: "4px 0 0", fontSize: 14.5, lineHeight: 1.45, color: "var(--ink)" }}>{s.action}</p>
                  </div>
                </div>
                <Button full variant="primary" icon="check" onClick={complete}>{i === total - 1 ? "Finish quest" : "I did this"}</Button>
                <button onClick={() => onAskHelp(slug)} style={{ width: "100%", marginTop: 10, color: "var(--ink-soft)", fontWeight: 600, fontSize: 14.5, padding: 6 }}>I need help with this step</button>
              </div>
            );
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff", borderRadius: 18, padding: "14px 16px", border: "1px solid var(--line-soft)", opacity: 0.65 }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: "var(--foam)", color: "var(--ink-faint)", fontFamily: "var(--display)", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1.5px solid var(--line)" }}>{i + 1}</div>
                <span style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "var(--ink-soft)" }}>{s.title}</span>
                <Icon name="lock" size={16} color="var(--ink-faint)" sw={2} />
              </div>
            );
          })}
        </div>

        {/* completion */}
        {done && (
          <div style={{ marginTop: 18, borderRadius: "var(--r-xl)", padding: 26, textAlign: "center", background: "linear-gradient(160deg, #17B98A 0%, #0C7A5A 100%)", boxShadow: "0 16px 36px rgba(12,122,90,.34)", animation: "ac-pop .5s ease both" }}>
            <div style={{ width: 72, height: 72, borderRadius: 99, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Icon name="star" size={40} color="#fff" sw={2} fill="rgba(255,255,255,.3)" />
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: -0.5, margin: 0 }}>You did it.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "rgba(255,255,255,.88)", margin: "10px 0 18px" }}>You have a real bank account, no fees, and money saving itself every week. That's a foundation most people never build. Proud of you.</p>
            <Button full onClick={onBack} style={{ background: "#fff", color: "#0C7A5A" }}>Back to my quests</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, text, accent }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 12.5, color: accent ? "var(--warm-deep)" : "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "var(--ink)" }}>{text}</p>
    </div>
  );
}
