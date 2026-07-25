"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — AI Chat (the hero). 3-part answers + resources.
// ───────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Icon, TONE, IconTile } from "@/components/ui";
import { Logo } from "@/components/onboarding";
import { CHAT_SUGGESTIONS, CHAT_REPLIES, RESOURCES } from "@/components/data";

function matchReply(text) {
  const t = text.toLowerCase();
  if (/(kick|kicked|nowhere|homeless|sleep|abuse|hurt|evict)/.test(t)) return "kicked";
  if (/(bank|account|debit|checking|direct deposit)/.test(t)) return "bank";
  if (/(college|university|fafsa|school|degree)/.test(t)) return "college";
  if (/(chafee|grant|scholarship|free money|tuition)/.test(t)) return "chafee";
  if (/(health|insurance|medi|medical|doctor|medicaid)/.test(t)) return "health";
  return "default";
}

function ResourceMini({ id, onOpen }) {
  const r = RESOURCES[id]; if (!r) return null;
  const t = TONE[r.catColor] || TONE.sky;
  return (
    <button onClick={() => onOpen(id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
      background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: "11px 13px" }}>
      <IconTile name={r.cat === "Crisis" ? "shield" : r.cat === "Housing" ? "home" : r.cat === "Health" ? "health" : r.cat === "Education" ? "grad" : "pin"} tone={r.catColor} size={38} r={11} iconSize={19} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)", letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
        <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 1 }}>{r.meta}</div>
      </div>
      {r.phone && <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 99, background: t.soft }}><Icon name="phone" size={17} color={t.solid} sw={2} /></span>}
    </button>
  );
}

function AiMessage({ data, profile, onOpenResource, onOpenQuest, onPanic, animate }) {
  const [expanded, setExpanded] = useState(false);
  const compact = profile && profile.learningStyle === "simple";
  const showSteps = data.steps ? (compact && !expanded ? data.steps.slice(0, 2) : data.steps) : null;
  const overwhelmed = profile && profile.feeling === "overwhelmed";
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", animation: animate ? "ac-rise .4s ease both" : "none" }}>
      <div style={{ marginTop: 2 }}><Logo size={32} r={10} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 13, color: "var(--ink-soft)", marginBottom: 6, marginLeft: 2 }}>AfterCare</div>
        {/* answer bubble */}
        <div style={{ background: "#fff", borderRadius: "4px 20px 20px 20px", padding: "15px 16px", boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)" }}>
          {overwhelmed && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 11, color: "var(--ink-faint)", fontSize: 13, fontWeight: 600 }}>
              <Icon name="heart" size={16} color="var(--warm-deep)" sw={2} /> Take your time — one step at a time.
            </div>
          )}
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, color: "var(--ink)" }}>{data.answer}</p>

          {showSteps && (
            <div style={{ marginTop: 15 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                <Icon name="flag" size={15} color="var(--sky)" sw={2.2} />
                <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5, color: "var(--sky)", letterSpacing: 0.2, textTransform: "uppercase" }}>Your next steps</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {showSteps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 11 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 99, background: "var(--sky-soft)", color: "var(--sky)", fontFamily: "var(--display)", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 14.5, lineHeight: 1.45, color: "var(--ink)", paddingTop: 2 }}>{s}</span>
                  </div>
                ))}
              </div>
              {compact && !expanded && data.steps.length > 2 && (
                <button onClick={() => setExpanded(true)} style={{ marginTop: 10, color: "var(--sky)", fontWeight: 700, fontSize: 13.5 }}>+{data.steps.length - 2} more steps</button>
              )}
            </div>
          )}
        </div>

        {/* resources */}
        {data.resources && data.resources.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: 0.4, textTransform: "uppercase", margin: "0 0 8px 2px" }}>Real help near you</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.resources.map((id) => <ResourceMini key={id} id={id} onOpen={onOpenResource} />)}
            </div>
          </div>
        )}

        {/* panic CTA */}
        {data.panic && (
          <button onClick={onPanic} style={{ marginTop: 11, width: "100%", display: "flex", alignItems: "center", gap: 12, background: "var(--panic)", borderRadius: 16, padding: "14px 16px", boxShadow: "var(--shadow-fab)" }}>
            <Icon name="shield" size={22} color="#fff" sw={2.2} fill="rgba(255,255,255,.15)" />
            <span style={{ flex: 1, textAlign: "left", color: "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5 }}>Open the Panic Button</span>
            <Icon name="arrowR" size={19} color="#fff" sw={2.2} />
          </button>
        )}

        {/* followup + quest CTA */}
        {data.followup && (
          <div style={{ marginTop: 11, background: "var(--warm-soft)", borderRadius: 18, padding: "13px 15px", border: "1px solid #FFE2C9" }}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: "#9A5A22" }}>{data.followup}</p>
            {data.quest && (
              <button onClick={() => onOpenQuest(data.quest)} style={{ marginTop: 11, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--warm-deep)", color: "#fff", borderRadius: 99, padding: "10px 16px", fontFamily: "var(--display)", fontWeight: 700, fontSize: 14 }}>
                <Icon name="flag" size={16} color="#fff" sw={2.2} /> Turn this into a Quest
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Chat({ profile, pendingPrompt, clearPending, onOpenResource, onOpenQuest, onPanic }) {
  const [messages, setMessages] = useState([]); // {role, text} or {role:'ai', data}
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const lastAnim = useRef(0);
  const msgsRef = useRef([]);

  const scrollDown = () => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight + 400; };
  useEffect(() => { msgsRef.current = messages; }, [messages]);
  useEffect(() => { const t = setTimeout(scrollDown, 60); return () => clearTimeout(t); }, [messages, typing]);

  // Try the live Claude endpoint; fall back to the scripted reply on no-key / error.
  const fetchReply = useCallback(async (displayText, key) => {
    const history = msgsRef.current
      .map((m) => (m.role === "user"
        ? { role: "user", content: m.text }
        : { role: "ai", content: m.data && m.data.answer }))
      .filter((m) => m.content);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: displayText, history, profile }),
      });
      if (res.ok) {
        const j = await res.json();
        if (j && j.configured && j.reply) return j.reply;
      }
    } catch (e) { /* fall through to scripted */ }
    return CHAT_REPLIES[key] || CHAT_REPLIES[matchReply(displayText)] || CHAT_REPLIES.default;
  }, [profile]);

  const ask = useCallback(async (key, displayText) => {
    setMessages((m) => [...m, { role: "user", text: displayText }]);
    setTyping(true);
    const reply = await fetchReply(displayText, key);
    setTyping(false);
    lastAnim.current = Date.now();
    setMessages((m) => [...m, { role: "ai", data: reply }]);
  }, [fetchReply]);

  // consume a prompt sent from elsewhere (home chips / quest help)
  useEffect(() => {
    if (pendingPrompt) {
      ask(pendingPrompt.key, pendingPrompt.text);
      clearPending();
    }
  }, [pendingPrompt]); // eslint-disable-line react-hooks/exhaustive-deps

  const send = () => {
    const text = input.trim(); if (!text) return;
    setInput("");
    ask(matchReply(text), text);
  };

  const empty = messages.length === 0 && !typing;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "var(--foam)" }}>
      {/* header */}
      <div style={{ paddingTop: 56, paddingBottom: 12, paddingLeft: 18, paddingRight: 18, display: "flex", alignItems: "center", gap: 12,
        background: "rgba(241,248,253,.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--line-soft)", zIndex: 5 }}>
        <Logo size={42} r={13} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", letterSpacing: -0.3 }}>AfterCare</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 1 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--mint)" }} />
            <span style={{ fontSize: 12.5, color: "var(--ink-soft)", fontWeight: 600 }}>Here for you · always free</span>
          </div>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "18px 16px 8px" }}>
        {empty ? (
          <div style={{ paddingTop: 14 }}>
            <div style={{ animation: "ac-pop .5s ease both" }}><Logo size={58} r={18} glow /></div>
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, letterSpacing: -0.7, color: "var(--ink)", margin: "18px 0 0", lineHeight: 1.12 }}>
              {profile && profile.feeling === "overwhelmed" ? <React.Fragment>Hey — one thing<br/>at a time. I've got you.</React.Fragment> : <React.Fragment>Ask me anything.<br/>No question is too small.</React.Fragment>}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink-soft)", margin: "10px 0 22px" }}>
              Money, housing, school, health, paperwork — or just figuring out what to do next. I'll give you a straight answer and real places that can help.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {CHAT_SUGGESTIONS.map((s) => (
                <button key={s.id} onClick={() => ask(s.id, s.text)} style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff",
                  borderRadius: 16, padding: "13px 15px", boxShadow: "var(--shadow-card)", border: "1px solid var(--line-soft)", textAlign: "left" }}>
                  <IconTile name={s.icon} tone={s.id === "kicked" ? "panic" : "sky"} size={38} r={11} iconSize={19} />
                  <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{s.text}</span>
                  <Icon name="arrowR" size={17} color="var(--ink-faint)" sw={2.2} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => m.role === "user" ? (
              <div key={i} style={{ alignSelf: "flex-end", maxWidth: "82%", background: "var(--sky)", color: "#fff",
                borderRadius: "20px 20px 4px 20px", padding: "12px 16px", fontSize: 15.5, lineHeight: 1.4, fontWeight: 500,
                boxShadow: "0 6px 16px rgba(46,155,255,.28)", animation: "ac-rise .3s ease both" }}>{m.text}</div>
            ) : (
              <AiMessage key={i} data={m.data} profile={profile} onOpenResource={onOpenResource} onOpenQuest={onOpenQuest} onPanic={onPanic} animate={i === messages.length - 1} />
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Logo size={32} r={10} />
                <div style={{ background: "#fff", borderRadius: "4px 20px 20px 20px", padding: "16px 18px", boxShadow: "var(--shadow-card)", display: "flex", gap: 5 }}>
                  {[0,1,2].map((d) => <span key={d} style={{ width: 8, height: 8, borderRadius: 99, background: "var(--ink-faint)", animation: `ac-dots 1.2s ${d * 0.15}s infinite` }} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* input */}
      <div style={{ padding: "10px 14px 30px", background: "rgba(241,248,253,.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 26, padding: "6px 6px 6px 18px", boxShadow: "var(--shadow-card)", border: "1px solid var(--line)" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask AfterCare anything…" style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "var(--ink)", background: "transparent", height: 40 }} />
          <button onClick={send} style={{ width: 44, height: 44, borderRadius: 99, background: input.trim() ? "var(--sky)" : "var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .15s" }}>
            <Icon name="send" size={20} color="#fff" sw={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
