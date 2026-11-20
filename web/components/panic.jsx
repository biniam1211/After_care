"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Panic Button (emergency triage → action plan)
//
// National crisis lines (988 / Covenant / Trevor / 911) are hardcoded
// via lib/crisis.js and ALWAYS render — they do not depend on RESOURCES,
// Sanity, the database, or the network.
// ───────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Icon } from "@/components/ui";
import { RESOURCES, PANIC_SCENARIOS } from "@/components/data";
import { NATIONAL_CRISIS, EMERGENCY_911 } from "@/lib/crisis";
import { sendCaseworker } from "@/components/notify";

export function Panic({ onClose, onOpenChat, profile }) {
  const [scenario, setScenario] = useState(null);
  const [smsSent, setSmsSent] = useState(false);
  const [smsNote, setSmsNote] = useState("");

  const bg = "radial-gradient(120% 80% at 50% -5%, #14405f 0%, #0a3553 40%, #06283d 85%)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panic Button — emergency help"
      style={{ position: "absolute", inset: 0, zIndex: 200, background: bg, display: "flex", flexDirection: "column" }}
    >
      {/* header */}
      <div style={{ paddingTop: 58, paddingLeft: 20, paddingRight: 20, paddingBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--panic)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(255,59,65,.45)" }}>
            <Icon name="shield" size={21} color="#fff" sw={2.2} fill="rgba(255,255,255,.15)" />
          </div>
          <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -0.3 }}>You&apos;re not alone</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panic help"
          style={{ width: 44, height: 44, borderRadius: 99, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon name="x" size={20} color="#fff" sw={2.4} />
        </button>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "10px 20px 40px" }}>
        {!scenario ? (
          <div style={{ animation: "ac-rise .35s ease both" }}>
            <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: -0.8, color: "#fff", margin: "8px 0 8px" }}>
              What&apos;s happening<br/>right now?
            </h1>
            <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "rgba(219,241,255,.78)", margin: "0 0 18px" }}>
              Tap whatever fits. I&apos;ll get you a real plan in seconds — no judgment, no paperwork.
            </p>

            <NationalCrisisStrip />

            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 18 }}>
              {PANIC_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { setScenario(s); setSmsSent(false); setSmsNote(""); }}
                  style={{ display: "flex", alignItems: "center", gap: 15, width: "100%", textAlign: "left",
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18, padding: "16px 18px", backdropFilter: "blur(6px)", minHeight: 44 }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(255,59,65,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={s.icon} size={23} color="#FF8A8E" sw={2.1} />
                  </div>
                  <span style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: -0.2 }}>{s.label}</span>
                  <Icon name="chevR" size={20} color="rgba(255,255,255,.5)" sw={2.2} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <PanicPlan
            scenario={scenario}
            smsSent={smsSent}
            setSmsSent={setSmsSent}
            smsNote={smsNote}
            setSmsNote={setSmsNote}
            onBack={() => setScenario(null)}
            onOpenChat={onOpenChat}
            profile={profile}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Always-on national lines. Hardcoded phones — never looks up RESOURCES.
 */
export function NationalCrisisStrip({ compact }) {
  return (
    <div
      role="region"
      aria-label="National crisis hotlines"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: compact ? "12px 14px" : "14px 16px",
        background: "rgba(255,255,255,.09)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,.16)",
      }}
    >
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(219,241,255,.7)", letterSpacing: 0.4, textTransform: "uppercase" }}>
        Help that always works
      </div>
      {NATIONAL_CRISIS.map((r) => (
        <a
          key={r.id}
          href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minHeight: 44, color: "#fff" }}
        >
          <Icon name="phone" size={18} color="#fff" sw={2.2} />
          <span style={{ flex: 1, fontSize: 14.5, lineHeight: 1.35 }}>
            <b>{r.name}</b>
            <span style={{ display: "block", fontSize: 13, color: "rgba(219,241,255,.8)", fontWeight: 600 }}>{r.phone}</span>
          </span>
        </a>
      ))}
      <a
        href={`tel:${EMERGENCY_911.phone}`}
        style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minHeight: 44, color: "#fff" }}
      >
        <Icon name="alert" size={18} color="#FF8A8E" sw={2.2} />
        <span style={{ flex: 1, fontSize: 14.5, lineHeight: 1.35 }}>
          <b>In immediate danger?</b> Call <b>911</b>.
        </span>
      </a>
    </div>
  );
}

function PanicCall({ id, primary }) {
  // Prefer hardcoded national numbers when the id matches; fall back to catalog.
  const national = NATIONAL_CRISIS.find((r) => r.id === id);
  const catalog = RESOURCES[id];
  const name = national?.name || catalog?.name;
  const phone = national?.phone || catalog?.phone;
  const meta = national?.note || catalog?.meta || "";
  if (!name || !phone) return null;
  return (
    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: primary ? "var(--panic)" : "#fff", borderRadius: 18, padding: "15px 16px",
        boxShadow: primary ? "var(--shadow-fab)" : "0 8px 24px rgba(0,0,0,.18)", minHeight: 44 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: primary ? "rgba(255,255,255,.2)" : "var(--panic-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="phone" size={22} color={primary ? "#fff" : "var(--panic)"} sw={2.2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: primary ? "#fff" : "var(--ink)", letterSpacing: -0.2 }}>{name}</div>
          <div style={{ fontSize: 13, color: primary ? "rgba(255,255,255,.85)" : "var(--ink-soft)", marginTop: 1, fontWeight: 600 }}>{meta}</div>
        </div>
        <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 15, color: primary ? "#fff" : "var(--panic)" }}>{phone}</span>
      </div>
    </a>
  );
}

function PanicPlan({ scenario, smsSent, setSmsSent, smsNote, setSmsNote, onBack, onOpenChat, profile }) {
  const p = scenario.plan;
  const sendText = async () => {
    setSmsSent(true); // optimistic — never make a youth in crisis wait
    setSmsNote("");
    const sent = await sendCaseworker({
      to: profile && profile.caseworkerEmail,
      message: p.sms,
      subject: "Urgent: a young person needs help",
    });
    if (!sent) {
      setSmsNote("If they didn’t get it, call or text 988 — help is still one tap away above.");
    }
    // Schedule the promised 6-hour check-in (server no-ops if not signed in).
    try {
      fetch("/api/checkin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "panic",
          hours: 6,
          message: "Hey — I said I'd check in. Are you okay? If you still need help, tap the red button any time. You matter.",
        }),
      }).catch(() => {});
    } catch (e) { /* ignore */ }
  };
  return (
    <div style={{ animation: "ac-rise .35s ease both" }}>
      <button type="button" onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(219,241,255,.8)", fontWeight: 700, fontSize: 14.5, marginBottom: 14, minHeight: 44 }}>
        <Icon name="chevL" size={18} color="rgba(219,241,255,.8)" sw={2.4} /> Back
      </button>
      <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, lineHeight: 1.14, letterSpacing: -0.6, color: "#fff", margin: "0 0 10px" }}>{p.title}</h1>
      <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "rgba(219,241,255,.82)", margin: "0 0 16px" }}>{p.now}</p>

      <NationalCrisisStrip compact />

      <div style={{ marginTop: 18 }}>
        <Step n={1} label="A safe place tonight" />
        <div style={{ marginBottom: 18 }}><PanicCall id={p.shelter} primary /></div>

        <Step n={2} label="Someone to talk to, right now" />
        <div style={{ marginBottom: 18 }}><PanicCall id={p.line} /></div>
      </div>

      <Step n={3} label="Tell someone — I'll write it for you" />
      <div style={{ background: "#fff", borderRadius: 18, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,.18)" }}>
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 8 }}>Draft to your caseworker</div>
        <div style={{ background: "var(--foam)", borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink)", fontStyle: "italic" }}>&quot;{p.sms}&quot;</div>
        <button type="button" onClick={sendText} disabled={smsSent} style={{ width: "100%", marginTop: 12, height: 48, borderRadius: 99,
          background: smsSent ? "var(--mint-soft)" : "var(--harbor)", color: smsSent ? "#0C7A5A" : "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {smsSent ? <React.Fragment><Icon name="check" size={18} color="#0C7A5A" sw={2.6} /> Sent — they&apos;ll get this now</React.Fragment> : <React.Fragment><Icon name="send" size={18} color="#fff" sw={2.2} /> Send this text</React.Fragment>}
        </button>
        {smsNote ? (
          <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.4, color: "var(--ink-soft)" }}>{smsNote}</p>
        ) : null}
      </div>

      <button type="button" onClick={onOpenChat} style={{ width: "100%", marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
        background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "15px", color: "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, minHeight: 44 }}>
        <Icon name="sparkle" size={19} color="#fff" sw={2} /> Talk it through with me instead
      </button>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 18, padding: "13px 16px", background: "rgba(255,158,87,.14)", borderRadius: 14, border: "1px solid rgba(255,158,87,.25)" }}>
        <Icon name="clock" size={18} color="var(--warm)" sw={2.2} />
        <span style={{ fontSize: 13.5, color: "rgba(255,225,200,.95)", lineHeight: 1.4 }}>I&apos;ll check in on you in 6 hours to make sure you&apos;re okay.</span>
      </div>
    </div>
  );
}

function Step({ n, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{ width: 24, height: 24, borderRadius: 99, background: "rgba(255,255,255,.16)", color: "#fff", fontFamily: "var(--display)", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
      <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: -0.2 }}>{label}</span>
    </div>
  );
}
