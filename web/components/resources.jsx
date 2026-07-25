"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — Resource Finder + Resource detail
// ───────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Icon, Screen, TONE, Button, Card, Badge, IconTile } from "@/components/ui";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/components/data";

function catIconFor(r) {
  return r.cat === "Crisis" ? "shield" : r.cat === "Housing" ? "home" : r.cat === "Health" ? "health"
    : r.cat === "Education" ? "grad" : r.cat === "Money & Jobs" ? "cash" : r.cat === "Essentials" ? "box" : "pin";
}

export function ResourcesList({ profile, onOpen }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const ids = Object.keys(RESOURCES).filter((id) => {
    const r = RESOURCES[id];
    const okCat = cat === "all" || r.cat === cat;
    const okQ = !q || (r.name + " " + r.blurb + " " + r.cat).toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  return (
    <Screen top={62}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 32, letterSpacing: -0.9, color: "var(--ink)", margin: "0 0 4px" }}>Help near you</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)", fontSize: 14, fontWeight: 600 }}>
            <Icon name="pin" size={15} color="var(--sky)" sw={2.2} /> ZIP {profile.zip || "92805"} · Orange County, CA
          </div>
        </div>
      </div>

      {/* search */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 18, padding: "0 16px", marginTop: 18, boxShadow: "var(--shadow-card)", border: "1px solid var(--line)", height: 52 }}>
        <Icon name="search" size={20} color="var(--ink-faint)" sw={2.2} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search housing, money, health…" style={{ flex: 1, border: "none", outline: "none", fontSize: 15.5, background: "transparent", color: "var(--ink)" }} />
      </div>

      {/* categories */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 9, overflowX: "auto", margin: "16px -20px 0", padding: "0 20px" }}>
        {RESOURCE_CATEGORIES.map((c) => {
          const on = cat === c.id;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0,
              height: 40, padding: "0 16px", borderRadius: 99, background: on ? "var(--harbor)" : "#fff", color: on ? "#fff" : "var(--ink)",
              fontWeight: 700, fontSize: 14, boxShadow: on ? "none" : "var(--shadow-card)", border: "1px solid var(--line-soft)", transition: "all .15s" }}>
              <Icon name={c.icon} size={16} color={on ? "#fff" : "var(--ink-soft)"} sw={2.1} /> {c.label}
            </button>
          );
        })}
      </div>

      {/* list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
        {ids.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--ink-faint)" }}>
            <Icon name="search" size={32} color="var(--ink-faint)" sw={1.8} style={{ margin: "0 auto 10px" }} />
            <div style={{ fontWeight: 600 }}>Nothing matched — try the chat, I'll find it live.</div>
          </div>
        )}
        {ids.map((id) => {
          const r = RESOURCES[id];
          return (
            <button key={id} onClick={() => onOpen(id)} style={{ textAlign: "left", background: "#fff", borderRadius: "var(--r-lg)", padding: 16, boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
              <div style={{ display: "flex", gap: 13 }}>
                <IconTile name={catIconFor(r)} tone={r.catColor} size={48} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <Badge tone={r.catColor}>{r.tag}</Badge>
                  </div>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16.5, color: "var(--ink)", letterSpacing: -0.3, lineHeight: 1.15 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-faint)", marginTop: 3, fontWeight: 600 }}>{r.meta}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.45, color: "var(--ink-soft)", margin: "12px 0 0" }}>{r.blurb}</p>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}

export function ResourceDetail({ id, onBack }) {
  const r = RESOURCES[id];
  const [sent, setSent] = useState(false);
  if (!r) return null;
  const t = TONE[r.catColor] || TONE.sky;
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--foam)", display: "flex", flexDirection: "column" }}>
      {/* tinted hero */}
      <div style={{ background: t.soft, paddingTop: 56, paddingBottom: 24, paddingLeft: 18, paddingRight: 18, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 99, background: "#fff", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Icon name="chevL" size={22} color="var(--ink)" sw={2.4} />
        </button>
        <IconTile name={catIconFor(r)} tone={r.catColor} size={60} r={19} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0 8px" }}><Badge tone={r.catColor}>{r.tag}</Badge>
          <span style={{ fontSize: 13, color: t.ink, fontWeight: 700 }}>· {r.cat}</span></div>
        <h1 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 27, letterSpacing: -0.6, color: "var(--ink)", margin: 0, lineHeight: 1.1 }}>{r.name}</h1>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "20px 18px 40px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink)", margin: "0 0 18px" }}>{r.blurb}</p>

        <Card style={{ padding: 4 }}>
          <Row icon="pin" tone={r.catColor} label="Where" value={r.meta} />
          {r.phone && <Row icon="phone" tone={r.catColor} label="Call" value={r.phone} last />}
        </Card>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 11 }}>
          {r.phone && <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} style={{ textDecoration: "none" }}><Button full variant="primary" icon="phone">Call {r.phone}</Button></a>}
          <Button full variant="ghost" icon="pin">Get directions</Button>
        </div>

        {/* caseworker share */}
        <div style={{ marginTop: 22, background: "#fff", borderRadius: "var(--r-lg)", padding: 18, boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <IconTile name="message" tone="harbor" size={42} r={13} iconSize={20} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>Want a hand reaching out?</div>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0", lineHeight: 1.45 }}>I can text this to your caseworker so you don't have to explain it.</p>
            </div>
          </div>
          <button onClick={() => setSent(true)} disabled={sent} style={{ width: "100%", marginTop: 14, height: 46, borderRadius: 99,
            background: sent ? "var(--mint-soft)" : "var(--harbor)", color: sent ? "#0C7A5A" : "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {sent ? <React.Fragment><Icon name="check" size={18} color="#0C7A5A" sw={2.6} /> Sent to your caseworker</React.Fragment> : "Text this to my caseworker"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, tone, label, value, last }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 14px", borderBottom: last ? "none" : "1px solid var(--line-soft)" }}>
      <IconTile name={icon} tone={tone} size={40} r={12} iconSize={19} />
      <div>
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</div>
        <div style={{ fontSize: 15.5, color: "var(--ink)", fontWeight: 600, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}
