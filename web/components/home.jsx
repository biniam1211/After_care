"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Home dashboard
// ───────────────────────────────────────────────────────────
import React from "react";
import { Icon, Screen, TONE, IconTile, Ring } from "@/components/ui";
import { QUESTS, CHAT_SUGGESTIONS } from "@/components/data";

export function Home({ profile, questProgress, onOpenQuest, onTab, onPanic, onAskPrompt, onOpenSettings }) {
  const first = profile.name ? profile.name.split(" ")[0] : "friend";
  const hour = 9;
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Evening";

  const bank = QUESTS[0];
  const cur = questProgress["first-bank-account"] || 0;
  const total = bank.steps.length;
  const pct = cur / total;
  const started = cur > 0;
  const done = cur >= total;
  const activeStep = bank.steps[Math.min(cur, total - 1)];

  const recommended = QUESTS.slice(1, 4);

  return (
    <Screen top={62}>
      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ color: "var(--ink-soft)", fontSize: 15, fontWeight: 600 }}>{greet},</div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 28, letterSpacing: -0.7, color: "var(--ink)", margin: "2px 0 0" }}>
            {first} 👋
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onOpenSettings} style={{ width: 44, height: 44, borderRadius: 99, background: "#fff", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="user" size={20} color="var(--ink)" sw={2} />
          </button>
          <button style={{ width: 44, height: 44, borderRadius: 99, background: "#fff", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={21} color="var(--ink)" sw={2} />
            <span style={{ position: "absolute", top: 11, right: 12, width: 8, height: 8, borderRadius: 99, background: "var(--warm-deep)", border: "2px solid #fff" }} />
          </button>
        </div>
      </div>

      {/* Active quest hero */}
      <div onClick={() => onOpenQuest(bank.slug)} style={{ borderRadius: "var(--r-xl)", padding: 22, cursor: "pointer",
        background: "linear-gradient(150deg, #0B3A57 0%, #06283D 100%)", position: "relative", overflow: "hidden",
        boxShadow: "0 16px 36px rgba(6,40,61,.28)" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,155,255,.4), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ color: "var(--warm)", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.4, textTransform: "uppercase" }}>
              {done ? "Quest complete" : started ? "Pick up where you left off" : "Your first quest"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Ring value={pct} size={66} sw={6} color="var(--sky)" track="rgba(255,255,255,.16)">
              <span style={{ color: "#fff", fontWeight: 800, fontFamily: "var(--display)", fontSize: 14 }}>{cur}/{total}</span>
            </Ring>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: -0.4, lineHeight: 1.1 }}>{bank.title}</div>
              <div style={{ color: "rgba(219,241,255,.78)", fontSize: 14, marginTop: 5, lineHeight: 1.35 }}>
                {done ? "You did it. Want to start the next one?" : started ? `Next: ${activeStep.title}` : bank.tagline}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18, height: 48, borderRadius: 99, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff", fontWeight: 700, fontFamily: "var(--display)", fontSize: 16, backdropFilter: "blur(4px)" }}>
            {done ? "Review quest" : started ? "Continue" : "Start the quest"} <Icon name="arrowR" size={19} color="#fff" sw={2.2} />
          </div>
        </div>
      </div>

      {/* Quick help */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <button onClick={() => onTab("chat")} style={{ textAlign: "left", background: "#fff", borderRadius: "var(--r-lg)", padding: 18, boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
          <IconTile name="sparkle" tone="sky" size={44} />
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)", marginTop: 12, letterSpacing: -0.3 }}>Ask anything</div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.35 }}>Real answers, no judgment</div>
        </button>
        <button onClick={() => onTab("resources")} style={{ textAlign: "left", background: "#fff", borderRadius: "var(--r-lg)", padding: 18, boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
          <IconTile name="pin" tone="mint" size={44} />
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)", marginTop: 12, letterSpacing: -0.3 }}>Help near me</div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.35 }}>Real places in your ZIP</div>
        </button>
      </div>

      {/* Ask chips */}
      <div style={{ marginTop: 26 }}>
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, color: "var(--ink)", marginBottom: 12, letterSpacing: -0.3 }}>People your age are asking…</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {CHAT_SUGGESTIONS.slice(0, 3).map((s) => (
            <button key={s.id} onClick={() => onAskPrompt(s.id)} style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff",
              borderRadius: 16, padding: "13px 15px", boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)", textAlign: "left" }}>
              <IconTile name={s.icon} tone="harbor" size={38} r={11} iconSize={19} />
              <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{s.text}</span>
              <Icon name="chevR" size={18} color="var(--ink-faint)" sw={2.2} />
            </button>
          ))}
        </div>
      </div>

      {/* Recommended quests */}
      <div style={{ marginTop: 26 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, color: "var(--ink)", letterSpacing: -0.3 }}>Up next for you</div>
          <button onClick={() => onTab("quests")} style={{ color: "var(--sky)", fontWeight: 700, fontSize: 14 }}>See all</button>
        </div>
        <div className="no-scrollbar" style={{ display: "flex", gap: 12, overflowX: "auto", margin: "0 -20px", padding: "0 20px" }}>
          {recommended.map((q) => (
            <div key={q.slug} onClick={() => onTab("quests")} style={{ width: 168, flexShrink: 0, background: "#fff", borderRadius: "var(--r-lg)", padding: 16, boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
              <IconTile name={q.icon} tone={q.color} size={44} />
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "var(--ink)", marginTop: 12, letterSpacing: -0.3, lineHeight: 1.15 }}>{q.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, color: "var(--ink-faint)", fontSize: 12.5, fontWeight: 600 }}>
                <Icon name="clock" size={14} color="var(--ink-faint)" sw={2} /> {q.minutes} min
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety reassurance */}
      <button onClick={onPanic} style={{ width: "100%", marginTop: 22, display: "flex", alignItems: "center", gap: 13,
        background: "var(--panic-soft)", borderRadius: "var(--r-lg)", padding: "15px 16px", textAlign: "left", border: "1px solid #FFD9DB" }}>
        <IconTile name="shield" tone="panic" size={42} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15, color: "var(--panic-deep)" }}>Need help right now?</div>
          <div style={{ fontSize: 13, color: "#B8434A", marginTop: 2 }}>Tap the red button any time, day or night.</div>
        </div>
        <Icon name="chevR" size={18} color="#C96066" sw={2.2} />
      </button>
    </Screen>
  );
}
