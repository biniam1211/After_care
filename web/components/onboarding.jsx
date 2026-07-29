"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Logo + Onboarding flow
// ───────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { Icon, Button, ProgressBar } from "@/components/ui";

// Brand mark: a sunrise over a calm horizon, in a rounded tile = "after" the storm.
export function Logo({ size = 56, r = 17, glow = false }) {
  return (
    <div style={{ width: size, height: size, borderRadius: r, position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, #41B0FF 0%, #2E9BFF 45%, #1B7FE0 100%)",
      boxShadow: glow ? "0 14px 34px rgba(46,155,255,.5)" : "0 6px 16px rgba(46,155,255,.35)", flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 56 56" style={{ position: "absolute", inset: 0 }}>
        <circle cx="28" cy="33" r="9" fill="#FFE7C7" opacity="0.95" />
        <circle cx="28" cy="33" r="9" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />
        {/* horizon */}
        <path d="M8 38h40" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.95" />
        <path d="M13 44h30" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
        {/* rays */}
        <g stroke="#FFE7C7" strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
          <path d="M28 17v4" /><path d="M40 21l-2.5 3" /><path d="M16 21l2.5 3" />
        </g>
      </svg>
    </div>
  );
}

export function Wordmark({ color = "var(--ink)", size = 22 }) {
  return <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: size, letterSpacing: -0.6, color }}>
    After<span style={{ color: "var(--sky)" }}>Care</span></span>;
}

// Format raw digits as (555) 000-0000 while the user types.
function fmtPhone(d = "") {
  d = d.replace(/[^\d]/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// ── Onboarding ──────────────────────────────────────────────
export function Onboarding({ onDone }) {
  const [step, setStep] = useState(0); // 0 welcome, 1 name, 2 phone, 3 code, 4 zip, 5 age, 6 status, 7 profile, 8 done
  const [profile, setProfile] = useState({ name: "", phone: "", zip: "", age: "", status: "", learningStyle: "", feeling: "" });
  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
  const next = () => setStep((s) => s + 1);

  const FORM_STEPS = 7; // steps 1..7
  const progress = step >= 1 && step <= 7 ? step / FORM_STEPS : 0;

  // Welcome (dark)
  if (step === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background:
        "radial-gradient(120% 80% at 50% -10%, #11537f 0%, #0a3a59 38%, #06283d 78%)",
        display: "flex", flexDirection: "column", padding: "0 28px 40px" }}>
        {/* floating mist orbs */}
        <div style={{ position: "absolute", top: 120, left: -40, width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(65,176,255,.35), transparent 70%)", filter: "blur(8px)" }} />
        <div style={{ position: "absolute", top: 300, right: -50, width: 220, height: 220, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,158,87,.18), transparent 70%)", filter: "blur(8px)" }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "ac-pop .7s ease both" }}><Logo size={76} r={23} glow /></div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 46, lineHeight: 1.02,
            letterSpacing: -1.4, color: "#fff", margin: "30px 0 0", animation: "ac-rise .6s .08s ease both" }}>
            The missing<br/>parent in your<br/>pocket.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "rgba(219,241,255,.82)", margin: "20px 0 0", maxWidth: 300,
            animation: "ac-rise .6s .16s ease both" }}>
            Adulting after foster care — figured out, step by step, by people who've actually been there.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1, animation: "ac-rise .6s .26s ease both" }}>
          <Button full variant="primary" onClick={next} style={{ background: "#fff", color: "var(--harbor)", boxShadow: "0 12px 30px rgba(0,0,0,.3)" }}>
            Get started
          </Button>
          <button onClick={() => onDone({ name: "", zip: "92805", age: "18", status: "aged_out" })}
            style={{ width: "100%", marginTop: 14, color: "rgba(219,241,255,.7)", fontSize: 15, fontWeight: 600, padding: 8 }}>
            I've been here before · Log in
          </button>
          <p style={{ textAlign: "center", color: "rgba(219,241,255,.45)", fontSize: 12.5, margin: "10px 0 0", lineHeight: 1.5 }}>
            Free forever. Private. You're talking to an AI, not a caseworker.
          </p>
        </div>
      </div>
    );
  }

  if (step === 8) return <OnboardDone profile={profile} onDone={() => onDone({ ...profile, status: profile.status || "aged_out" })} />;

  // Form steps shell
  const shell = (content, canNext, ctaLabel = "Continue") => (
    <div style={{ position: "absolute", inset: 0, background: "var(--foam)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "62px 24px 0", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} style={{ width: 38, height: 38, borderRadius: 99,
          background: "#fff", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="chevL" size={20} color="var(--ink)" sw={2.4} />
        </button>
        <div style={{ flex: 1 }}><ProgressBar value={progress} h={7} /></div>
      </div>
      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "30px 28px 16px", display: "flex", flexDirection: "column" }}>
        {content}
      </div>
      <div style={{ padding: "10px 24px 38px" }}>
        <Button full variant={canNext ? "primary" : "ghost"} onClick={canNext ? next : undefined}
          style={canNext ? {} : { opacity: .5, pointerEvents: "none" }} icon={canNext ? "arrowR" : undefined}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );

  const Q = ({ kicker, title, sub }) => (
    <div style={{ marginBottom: 26 }}>
      {kicker && <div style={{ color: "var(--sky)", fontWeight: 700, fontSize: 13, letterSpacing: 0.3, marginBottom: 10, textTransform: "uppercase" }}>{kicker}</div>}
      <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 30, lineHeight: 1.08, letterSpacing: -0.8, color: "var(--ink)", margin: 0 }}>{title}</h2>
      {sub && <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--ink-soft)", margin: "12px 0 0" }}>{sub}</p>}
    </div>
  );

  const bigInput = (props) => (
    <input {...props} style={{ width: "100%", height: 64, borderRadius: 18, border: "2px solid var(--line)",
      background: "#fff", padding: "0 20px", fontSize: 22, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--display)",
      outline: "none", letterSpacing: 0.2 }}
      onFocus={(e) => (e.target.style.borderColor = "var(--sky)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--line)")} />
  );

  if (step === 1) return shell(
    <React.Fragment>
      <Q kicker="First — hey 👋" title="What should I call you?" sub="A name, a nickname, whatever you go by. You can skip this." />
      {bigInput({ value: profile.name, onChange: (e) => set("name", e.target.value), placeholder: "Your name", autoFocus: true })}
      <button onClick={next} style={{ marginTop: 18, color: "var(--ink-soft)", fontWeight: 600, fontSize: 15, alignSelf: "flex-start" }}>Skip for now →</button>
    </React.Fragment>, profile.name.trim().length > 0);

  if (step === 2) return shell(
    <React.Fragment>
      <Q kicker="Step 2" title="What's your number?" sub="We text you a code to sign in — and nudges if you want them. No spam, ever." />
      {bigInput({ value: fmtPhone(profile.phone), onChange: (e) => set("phone", e.target.value.replace(/[^\d]/g, "").slice(0,10)), placeholder: "(555) 000-0000", inputMode: "tel", autoFocus: true })}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16, color: "var(--ink-faint)", fontSize: 13 }}>
        <Icon name="lock" size={15} color="var(--ink-faint)" /> Your number is never sold or shared.
      </div>
    </React.Fragment>, profile.phone.length >= 10);

  if (step === 3) return <OtpStep phone={profile.phone} onBack={() => setStep(2)} onNext={next} progress={progress} />;

  if (step === 4) return shell(
    <React.Fragment>
      <Q kicker="Step 4" title="Where are you?" sub="Just your ZIP. I only ever show you help that's actually near you — never a hotline three states away." />
      {bigInput({ value: profile.zip, onChange: (e) => set("zip", e.target.value.replace(/[^\d]/g, "").slice(0,5)), placeholder: "ZIP code", inputMode: "numeric", autoFocus: true })}
    </React.Fragment>, profile.zip.length === 5);

  if (step === 5) return shell(
    <React.Fragment>
      <Q kicker="Step 5" title="How old are you?" sub="This helps me know which programs and deadlines apply to you right now." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {["16","17","18","19","20","21","22","23","24+"].map((a) => (
          <button key={a} onClick={() => set("age", a)} style={{
            height: 64, borderRadius: 16, fontFamily: "var(--display)", fontWeight: 800, fontSize: 22,
            background: profile.age === a ? "var(--sky)" : "#fff", color: profile.age === a ? "#fff" : "var(--ink)",
            boxShadow: profile.age === a ? "0 8px 18px rgba(46,155,255,.32)" : "var(--shadow-card)",
            border: "1px solid var(--line-soft)", transition: "all .15s ease" }}>{a}</button>
        ))}
      </div>
    </React.Fragment>, !!profile.age);

  if (step === 6) {
    const opts = [
      { id: "in_care", label: "I'm in foster care now", sub: "Still placed with a family or home" },
      { id: "extended", label: "I'm in extended care", sub: "18–21, still getting support (like AB 12)" },
      { id: "aged_out", label: "I've aged out", sub: "On my own now" },
      { id: "unsure", label: "I'm not totally sure", sub: "That's okay — we'll figure it out" },
    ];
    return shell(
      <React.Fragment>
        <Q kicker="Last one" title="Where are you with foster care?" sub="No wrong answer. This just helps me give you the right next steps." />
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {opts.map((o) => {
            const on = profile.status === o.id;
            return (
              <button key={o.id} onClick={() => set("status", o.id)} style={{ textAlign: "left",
                background: on ? "var(--sky-soft)" : "#fff", borderRadius: 18, padding: "16px 18px",
                border: `2px solid ${on ? "var(--sky)" : "transparent"}`, boxShadow: on ? "none" : "var(--shadow-card)",
                display: "flex", alignItems: "center", gap: 14, transition: "all .15s ease" }}>
                <div style={{ width: 24, height: 24, borderRadius: 99, border: `2px solid ${on ? "var(--sky)" : "var(--line)"}`,
                  background: on ? "var(--sky)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {on && <Icon name="check" size={15} color="#fff" sw={3} />}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{o.label}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{o.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </React.Fragment>, !!profile.status);
  }

  if (step === 7) {
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
    const canNext = !!profile.learningStyle && !!profile.feeling;
    const pick = (key, opts, val) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
        {opts.map((o) => {
          const on = val === o.id;
          return (
            <button key={o.id} onClick={() => set(key, o.id)} style={{ textAlign: "left",
              background: on ? "var(--sky-soft)" : "#fff", borderRadius: 16, padding: "13px 16px",
              border: `2px solid ${on ? "var(--sky)" : "transparent"}`, boxShadow: on ? "none" : "var(--shadow-card)",
              display: "flex", alignItems: "center", gap: 12, transition: "all .15s ease" }}>
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
    return shell(
      <React.Fragment>
        <Q kicker="Almost there" title="How can I help you best?" sub="This just shapes how I explain things — never what you're allowed to ask." />
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 14, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 }}>When I explain something</div>
        {pick("learningStyle", styles, profile.learningStyle)}
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 14, color: "var(--ink-faint)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 10 }}>Right now, adulting feels</div>
        {pick("feeling", feelings, profile.feeling)}
      </React.Fragment>, canNext, "Finish setup");
  }
  return null;
}

// OTP sub-step
function OtpStep({ phone, onBack, onNext, progress }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  useEffect(() => { refs[0].current && refs[0].current.focus(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handle = (i, v) => {
    v = v.replace(/[^\d]/g, "").slice(-1);
    const nc = [...code]; nc[i] = v; setCode(nc);
    if (v && i < 3) refs[i + 1].current.focus();
    if (nc.every((d) => d) && nc.join("").length === 4) setTimeout(onNext, 280);
  };
  const fmt = phone ? `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}` : "your phone";
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--foam)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "62px 24px 0", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 99, background: "#fff", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="chevL" size={20} color="var(--ink)" sw={2.4} />
        </button>
        <div style={{ flex: 1 }}><ProgressBar value={progress} h={7} /></div>
      </div>
      <div style={{ flex: 1, padding: "30px 28px" }}>
        <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 30, lineHeight: 1.08, letterSpacing: -0.8, color: "var(--ink)", margin: 0 }}>Enter your code</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--ink-soft)", margin: "12px 0 30px" }}>We texted a 4-digit code to {fmt}. <span style={{ color: "var(--sky)", fontWeight: 700 }}>(Demo: type anything)</span></p>
        <div style={{ display: "flex", gap: 12 }}>
          {code.map((d, i) => (
            <input key={i} ref={refs[i]} value={d} onChange={(e) => handle(i, e.target.value)} inputMode="numeric" maxLength={1}
              style={{ width: 64, height: 76, textAlign: "center", borderRadius: 18, border: `2px solid ${d ? "var(--sky)" : "var(--line)"}`,
                background: "#fff", fontSize: 30, fontWeight: 800, fontFamily: "var(--display)", color: "var(--ink)", outline: "none", transition: "border-color .15s" }} />
          ))}
        </div>
        <button style={{ marginTop: 24, color: "var(--ink-soft)", fontWeight: 600, fontSize: 15 }}>Resend code</button>
      </div>
    </div>
  );
}

function OnboardDone({ profile, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const first = profile.name ? profile.name.split(" ")[0] : "friend";
  return (
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% 30%, #11537f 0%, #0a3a59 45%, #06283d 85%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", textAlign: "center" }}>
      <div style={{ animation: "ac-pop .6s ease both" }}>
        <div style={{ width: 92, height: 92, borderRadius: 99, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, borderRadius: 99, background: "var(--mint)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 26px rgba(23,185,138,.5)" }}>
            <Icon name="check" size={36} color="#fff" sw={3} />
          </div>
        </div>
      </div>
      <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 34, letterSpacing: -1, color: "#fff", margin: "28px 0 0", animation: "ac-rise .5s .15s ease both" }}>
        You're in, {first}.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(219,241,255,.82)", margin: "14px 0 0", maxWidth: 300, animation: "ac-rise .5s .25s ease both" }}>
        Everything here is free, private, and yours. Let's take the next step together.
      </p>
    </div>
  );
}
