"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Settings: revisit learning style / feeling
// ───────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Icon, Screen, DetailHeader, IconTile } from "@/components/ui";
import { requestSignInLink } from "@/components/session";

export function Settings({ profile, setProfile, onBack, onReset, account = {} }) {
  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
  const label = { fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 };
  const inputStyle = { width: "100%", height: 52, borderRadius: 16, border: "2px solid var(--line)", background: "#fff",
    padding: "0 16px", fontSize: 16, color: "var(--ink)", outline: "none" };
  const [signinEmail, setSigninEmail] = useState("");
  const [signinStatus, setSigninStatus] = useState(null); // {sent, devLink?}
  const sendLink = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signinEmail)) return;
    const r = await requestSignInLink(signinEmail.trim());
    setSigninStatus(r || { sent: false });
  };
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

        {account.configured && !account.authed && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 10px" }}>
              Sign in with your email to save your progress and pick up on any device.
            </p>
            {signinStatus ? (
              <div style={{ background: "var(--mint-soft)", border: "1px solid #CDEEDF", borderRadius: 16, padding: "13px 15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0C7A5A", fontWeight: 700, fontSize: 14.5 }}>
                  <Icon name="check" size={17} color="#0C7A5A" sw={2.6} /> {signinStatus.sent ? "Check your email for the link." : "Link ready."}
                </div>
                {signinStatus.devLink && (
                  <a href={signinStatus.devLink} style={{ display: "inline-block", marginTop: 8, color: "var(--sky)", fontWeight: 700, fontSize: 13.5, wordBreak: "break-all" }}>
                    Dev sign-in link →
                  </a>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input type="email" inputMode="email" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)}
                  placeholder="you@email.com" style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--sky)")} onBlur={(e) => (e.target.style.borderColor = "var(--line)")} />
                <button onClick={sendLink} style={{ flexShrink: 0, height: 52, padding: "0 18px", borderRadius: 16, background: "var(--sky)", color: "#fff",
                  fontFamily: "var(--display)", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 18px rgba(46,155,255,.28)" }}>Send link</button>
              </div>
            )}
          </div>
        )}

        {account.configured && account.authed && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 16, padding: "13px 16px",
            border: "1px solid var(--line-soft)", boxShadow: "var(--shadow-card)", marginBottom: 12 }}>
            <IconTile name="user" tone="mint" size={36} r={11} iconSize={18} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>Signed in · syncing</div>
              <div style={{ fontSize: 15, color: "var(--ink)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{account.email}</div>
            </div>
          </div>
        )}

        <button onClick={() => { if (onReset) onReset(); }} style={{ width: "100%", height: 52, borderRadius: 16, background: "#fff",
          border: "1px solid var(--line-soft)", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", textAlign: "left" }}>
          <IconTile name="shield" tone="harbor" size={36} r={11} iconSize={18} />
          <span style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, color: "var(--ink)" }}>
            {account.authed ? "Sign out" : "Start over on this device"}
          </span>
          <Icon name="chevR" size={18} color="var(--ink-faint)" sw={2.2} />
        </button>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.5, margin: "12px 0 0" }}>
          Everything you tell AfterCare is private. {account.authed ? "Signing out ends syncing on this device." : "This clears your info from this device."}
        </p>
      </Screen>
    </div>
  );
}
