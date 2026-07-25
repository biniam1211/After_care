"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Settings: revisit learning style / feeling
// ───────────────────────────────────────────────────────────
import React from "react";
import { Icon, Screen, DetailHeader } from "@/components/ui";

export function Settings({ profile, setProfile, onBack }) {
  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
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
      </Screen>
    </div>
  );
}
