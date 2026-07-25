"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — shared UI: Phone frame, StatusBar, Icon, primitives
// ───────────────────────────────────────────────────────────
import React from "react";

// ── Icon set (stroke, 24 grid) ──────────────────────────────
const ICON_PATHS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5",
  chat: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5v-3.5H5.5A1.5 1.5 0 0 1 4 14.5z",
  target: "M12 3v3M12 18v3M3 12h3M18 12h3 M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
  flag: "M5 21V4M5 4h11l-2 3.5L16 11H5",
  shield: "M12 3l7 2.5v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V5.5z",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  send: "M4.5 12 20 4l-4.5 16-4-7zM15.5 5 8 12",
  sparkle: "M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3zM18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z",
  plus: "M12 5v14M5 12h14",
  chevR: "M9 5l7 7-7 7",
  chevL: "M15 5l-7 7 7 7",
  check: "M5 12.5l4.5 4.5L19 7",
  lock: "M7 10V8a5 5 0 0 1 10 0v2M5.5 10h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
  phone: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z",
  bank: "M4 9.5 12 4l8 5.5M5 10v7M10 10v7M14 10v7M19 10v7M3.5 20h17",
  cash: "M3 7h18v10H3zM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 9.5h.01M18 14.5h.01",
  card: "M3 7h18v10H3zM3 10.5h18",
  grad: "M12 4 2.5 8.5 12 13l9.5-4.5zM6 11v4.5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5V11M21.5 8.5V14",
  health: "M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.6 12 20 12 20Z",
  alert: "M12 4 2.5 20h19zM12 10v4M12 17h.01",
  bell: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  x: "M6 6l12 12M18 6 6 18",
  arrowR: "M5 12h14M13 6l6 6-6 6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7.5V12l3 2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20c0-3.5 3-6 7-6s7 2.5 7 6",
  copy: "M9 9h10v10H9zM5 15V5h10",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z",
  box: "M3.5 7 12 3l8.5 4-8.5 4zM3.5 7v10l8.5 4 8.5-4V7M12 11v10",
  chart: "M5 19V10M12 19V5M19 19v-6M3.5 20h17",
  car: "M3 13l1.8-5.2A2 2 0 0 1 6.7 6.5h10.6a2 2 0 0 1 1.9 1.3L21 13M4 13h16v5H4zM7 18v1.5M17 18v1.5M7 15.5h.01M17 15.5h.01",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  bed: "M3 8v10M3 13h18v5M21 18v-2a3 3 0 0 0-3-3h-7v-2a1 1 0 0 1 1-1h2",
  door: "M6 21V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v17M6 21h11M13 12h.01M18 21V7l-3-2",
  dots: "M6 12h.01M12 12h.01M18 12h.01",
  heart: "M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.6 12 20 12 20Z",
  star: "M12 4l2.3 5.5 6 .5-4.6 4 1.4 5.8L12 16.8 6.9 19.8l1.4-5.8-4.6-4 6-.5z",
  message: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5v-3.5H5.5A1.5 1.5 0 0 1 4 14.5z",
};

export function Icon({ name, size = 24, color = "currentColor", sw = 1.9, fill = "none", style }) {
  const d = ICON_PATHS[name] || ICON_PATHS.target;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{ flexShrink: 0, display: "block", ...style }}>
      <path d={d} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Status bar (tint controlled per screen) ─────────────────
export function StatusBar({ dark = false, time = "9:41" }) {
  const c = dark ? "#fff" : "#0A2536";
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 54, zIndex: 40,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 30px", pointerEvents: "none" }}>
      <span style={{ fontWeight: 700, fontSize: 16, color: c, letterSpacing: 0.2, marginTop: 4 }}>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="5" rx=".6" fill={c}/><rect x="4.5" y="4.5" width="3" height="7.5" rx=".6" fill={c}/><rect x="9" y="2" width="3" height="10" rx=".6" fill={c}/><rect x="13.5" y="0" width="3" height="12" rx=".6" fill={c}/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 3c2.1 0 4 .8 5.4 2.2l1-1A9 9 0 0 0 8 1.3 9 9 0 0 0 1.6 4.2l1 1A7.6 7.6 0 0 1 8 3Z" fill={c}/><path d="M8 6.4c1.2 0 2.3.5 3.1 1.3l1-1A6 6 0 0 0 8 4.9a6 6 0 0 0-4.1 1.8l1 1A4.4 4.4 0 0 1 8 6.4Z" fill={c}/><circle cx="8" cy="10" r="1.4" fill={c}/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={c} strokeOpacity=".4" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.8" fill={c}/><path d="M24 4v4c.8-.3 1.3-1 1.3-2S24.8 4.3 24 4Z" fill={c} fillOpacity=".5"/></svg>
      </div>
    </div>
  );
}

// ── Phone frame ─────────────────────────────────────────────
export function Phone({ children, statusDark = false, bg = "var(--foam)" }) {
  return (
    <div style={{ width: 393, height: 852, borderRadius: 54, position: "relative",
      background: "#0a0f14", padding: 5,
      boxShadow: "0 50px 90px -20px rgba(2,14,24,.6), 0 0 0 1px rgba(255,255,255,.06)" }}>
      <div style={{ position: "absolute", inset: 5, borderRadius: 49, overflow: "hidden", background: bg }}>
        {/* dynamic island */}
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 34, borderRadius: 20, background: "#000", zIndex: 50 }} />
        <StatusBar dark={statusDark} />
        {children}
        {/* home indicator */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 134, height: 5, borderRadius: 99, background: statusDark ? "rgba(255,255,255,.6)" : "rgba(10,37,54,.28)", zIndex: 60, pointerEvents: "none" }} />
      </div>
    </div>
  );
}

// A scrollable screen body with consistent top inset + bottom padding for tab bar
export function Screen({ children, pad = 20, top = 54, bottom = 112, bg, onScroll, scrollRef }) {
  return (
    <div ref={scrollRef} onScroll={onScroll} className="no-scrollbar" style={{
      position: "absolute", inset: 0, overflowY: "auto", background: bg,
      paddingTop: top, paddingLeft: pad, paddingRight: pad, paddingBottom: bottom,
    }}>
      {children}
    </div>
  );
}

// ── Color helpers ───────────────────────────────────────────
export const TONE = {
  sky:    { solid: "var(--sky)",    soft: "var(--sky-soft)",   ink: "#0B5FB0" },
  warm:   { solid: "var(--warm-deep)", soft: "var(--warm-soft)", ink: "#C25C16" },
  mint:   { solid: "var(--mint)",   soft: "var(--mint-soft)",  ink: "#0C7A5A" },
  harbor: { solid: "var(--harbor-2)", soft: "#E4EDF3",         ink: "#0B3A57" },
  panic:  { solid: "var(--panic)",  soft: "var(--panic-soft)", ink: "#C01820" },
};

// ── Primitives ──────────────────────────────────────────────
export function Button({ children, onClick, variant = "primary", icon, full, size = "lg", style }) {
  const sizes = { lg: { h: 56, fs: 17, px: 24 }, md: { h: 48, fs: 16, px: 20 } };
  const s = sizes[size];
  const variants = {
    primary: { background: "var(--sky)", color: "#fff", boxShadow: "0 8px 20px rgba(46,155,255,.32)" },
    dark: { background: "var(--harbor)", color: "#fff", boxShadow: "0 8px 20px rgba(6,40,61,.28)" },
    warm: { background: "var(--warm-deep)", color: "#fff", boxShadow: "0 8px 20px rgba(242,130,58,.3)" },
    ghost: { background: "#fff", color: "var(--ink)", boxShadow: "inset 0 0 0 1.5px var(--line)" },
    soft: { background: "var(--sky-soft)", color: "#0B5FB0", boxShadow: "none" },
  };
  return (
    <button onClick={onClick} style={{
      height: s.h, padding: `0 ${s.px}px`, borderRadius: 99, fontFamily: "var(--display)",
      fontWeight: 700, fontSize: s.fs, letterSpacing: -0.2, width: full ? "100%" : undefined,
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
      transition: "transform .12s ease, filter .12s ease", ...variants[variant], ...style,
    }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      {icon && <Icon name={icon} size={20} color="currentColor" sw={2.1} />}
      {children}
    </button>
  );
}

export function Card({ children, style, onClick, pad = 18 }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--card)", borderRadius: "var(--r-lg)", padding: pad,
      boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)",
      transition: "transform .14s ease", ...style,
    }}>{children}</div>
  );
}

export function Badge({ children, tone = "sky" }) {
  const t = TONE[tone] || TONE.sky;
  return (
    <span style={{ background: t.soft, color: t.ink, fontWeight: 700, fontSize: 12,
      padding: "5px 11px", borderRadius: 99, letterSpacing: 0.1, whiteSpace: "nowrap" }}>{children}</span>
  );
}

// Tinted rounded-square icon tile
export function IconTile({ name, tone = "sky", size = 46, r = 14, iconSize }) {
  const t = TONE[tone] || TONE.sky;
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: t.soft,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={name} size={iconSize || size * 0.5} color={t.solid} sw={2} />
    </div>
  );
}

// Progress ring
export function Ring({ value = 0, size = 52, sw = 5, color = "var(--sky)", track = "var(--line)", children }) {
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value)}
          style={{ transition: "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}

export function ProgressBar({ value = 0, color = "var(--sky)", h = 8 }) {
  return (
    <div style={{ height: h, borderRadius: 99, background: "var(--line)", overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${value * 100}%`, background: color, borderRadius: 99,
        transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

// Header for stacked detail screens
export function DetailHeader({ title, onBack, dark = false, trailing }) {
  const c = dark ? "#fff" : "var(--ink)";
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, paddingTop: 54,
      display: "flex", alignItems: "center", gap: 10, padding: "58px 16px 12px",
      background: dark ? "transparent" : "rgba(241,248,253,.86)",
      backdropFilter: dark ? "none" : "blur(12px)", WebkitBackdropFilter: dark ? "none" : "blur(12px)" }}>
      <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 99, background: dark ? "rgba(255,255,255,.16)" : "#fff",
        boxShadow: dark ? "none" : "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="chevL" size={22} color={c} sw={2.4} />
      </button>
      <div style={{ flex: 1, fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, color: c, letterSpacing: -0.3 }}>{title}</div>
      {trailing}
    </div>
  );
}
