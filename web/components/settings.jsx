"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Settings: revisit learning style / feeling
// ───────────────────────────────────────────────────────────
import React from "react";
import { Icon, Screen, DetailHeader, IconTile } from "@/components/ui";

export function Settings({ profile, setProfile, onBack, onReset }) {
  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
  const label = { fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 };
  const styles = [
    { id: "simple", label: "Short & simple", sub: "Just tell me what to do" },
    { id: "detailed", label: "Walk me through it", sub: "I like knowing the why, step by step" },
    { id: "examples", label: "Show me examples", sub: "I learn best from real examples" },
  ];
  const feelings = [
    { id: "overwhelmed", label: "Honestly, overwhelmed", sub: "There's a lot going on" },
    { id: "okay", label: "Managing okay", sub: "Figuring it out as I go" },
    { id: "confident", label: "Pretty confident", sub: "Just want the fastest path" },
  ];
  const Pick = ({ k, opts }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
      {opts.map((o) => {
        const on = profile[k] === o.id;
        return (
          <button key={o.id} onClick={() => set(k, o.id)} style={{ textAlign: "left",
            background: on ? "var(--sky-soft)" : "#fff", borderRadius: 16, padding: "13px 16px",
            border: `2px solid ${on ? "var(--sky)" : "transparent"}`, boxShadow: on ? "none" : "var(--shadow-card)",
            display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 21, height: 21, borderRadius: 99, border: `2px solid ${on ? "var(--sky)" : "var(--line)"}`,
              background: on ? "var(--sky)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {on && <Icon name="check" size={13} color="#fff" sw={3} />}
            </div>
            <div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "var(--ink)" }}>{o.label}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 1 }}>{o.sub}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--foam)" }}>
      <DetailHeader title="How I help you" onBack={onBack} />
      <Screen top={108}>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 20px" }}>Change these any time — they shape how I explain things, never what you're allowed to ask.</p>
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 }}>When I explain something</div>
        <Pick k="learningStyle" opts={styles} />
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 }}>Right now, adulting feels</div>
        <Pick k="feeling" opts={feelings} />

        {/* Caseworker contact — used by "text my caseworker" */}
        <div style={label}>Your caseworker (optional)</div>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 10px" }}>
          Add their email and I can text them for you from the Panic Button or any resource — you never have to find the words.
        </p>
        <input
          type="email" inputMode="email" value={profile.caseworkerEmail || ""}
          onChange={(e) => set("caseworkerEmail", e.target.value)}
          placeholder="caseworker@email.com"
          style={{ width: "100%", height: 52, borderRadius: 16, border: "2px solid var(--line)", background: "#fff",
            padding: "0 16px", fontSize: 16, color: "var(--ink)", outline: "none", marginBottom: 24 }}
          onFocus={(e) => (e.target.style.borderColor = "var(--sky)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
        />

        {/* Account */}
        <div style={label}>Account</div>
        <button onClick={() => { if (onReset) onReset(); }} style={{ width: "100%", height: 52, borderRadius: 16, background: "#fff",
          border: "1px solid var(--line-soft)", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", textAlign: "left" }}>
          <IconTile name="user" tone="harbor" size={36} r={11} iconSize={18} />
          <span style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "var(--ink)" }}>Sign out &amp; start over</span>
          <Icon name="chevR" size={18} color="var(--ink-faint)" sw={2.2} />
        </button>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.5, margin: "12px 0 0" }}>
          Everything you tell AfterCare is private. Signing out clears this device.
        </p>
      </Screen>
    </div>
  );
}
