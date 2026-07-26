"use client";
// ───────────────────────────────────────────────────────────
// AfterCare — App root: navigation, tab bar, panic FAB
// ───────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { Icon, Phone } from "@/components/ui";
import { QUESTS, CHAT_REPLIES, CHAT_SUGGESTIONS } from "@/components/data";
import { Onboarding } from "@/components/onboarding";
import { Home } from "@/components/home";
import { Chat } from "@/components/chat";
import { QuestsList, QuestDetail } from "@/components/quests";
import { ResourcesList, ResourceDetail } from "@/components/resources";
import { Panic } from "@/components/panic";
import { Settings } from "@/components/settings";
import { fetchServerState, saveServerState, signOutServer } from "@/components/session";

const TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "quests", label: "Quests", icon: "flag" },
  { id: "chat", label: "Ask", icon: "chat" },
  { id: "resources", label: "Help", icon: "pin" },
];

function TabBar({ active, onTab, onPanic }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 80, pointerEvents: "none" }}>
      {/* panic FAB floating above bar */}
      <div style={{ position: "absolute", right: 18, bottom: 96, pointerEvents: "auto" }}>
        <button onClick={onPanic} style={{ width: 60, height: 60, borderRadius: 99, background: "var(--panic)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
          boxShadow: "var(--shadow-fab)", animation: "ac-pulse 2.6s infinite" }}>
          <Icon name="shield" size={24} color="#fff" sw={2.2} fill="rgba(255,255,255,.16)" />
          <span style={{ fontSize: 8.5, fontWeight: 800, color: "#fff", fontFamily: "var(--display)", letterSpacing: 0.3 }}>SOS</span>
        </button>
      </div>

      <div style={{ pointerEvents: "auto", margin: "0 14px 14px", height: 72, borderRadius: 28, background: "rgba(255,255,255,.86)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 -2px 30px rgba(6,40,61,.12), 0 1px 0 rgba(255,255,255,.6) inset",
        border: "1px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", padding: "0 8px" }}>
        {TABS.map((t) => {
          const on = active === t.id;
          return (
            <button key={t.id} onClick={() => onTab(t.id)} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 30, borderRadius: 99,
                background: on ? "var(--sky-soft)" : "transparent", transition: "background .2s" }}>
                <Icon name={t.icon} size={23} color={on ? "var(--sky)" : "var(--ink-faint)"} sw={on ? 2.3 : 2} fill={on ? "rgba(46,155,255,.12)" : "none"} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: on ? "var(--sky)" : "var(--ink-faint)", fontFamily: "var(--display)", letterSpacing: -0.1 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const STORE_KEY = "aftercare_state_v1";
function loadState() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch (e) { return null; }
}

export default function App() {
  // Start from a deterministic default so server + first client render match (avoids hydration mismatch).
  const [hydrated, setHydrated] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState({ name: "", zip: "", age: "", status: "", learningStyle: "", feeling: "", caseworkerEmail: "" });
  const [tab, setTab] = useState("home");
  const [questProgress, setQuestProgress] = useState({});
  const [openQuest, setOpenQuest] = useState(null);
  const [openResource, setOpenResource] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [panicOpen, setPanicOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState(null);
  // Optional server account: { configured, authed, email }
  const [account, setAccount] = useState({ configured: false, authed: false, email: "" });
  const saveTimer = useRef(null);

  // Rehydrate persisted state on the client after mount, then sync from the
  // server when a signed-in session exists (server state wins).
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setOnboarded(!!saved.onboarded);
      if (saved.profile) setProfile(saved.profile);
      if (saved.questProgress) setQuestProgress(saved.questProgress);
    }
    setHydrated(true);
    fetchServerState().then((r) => {
      if (!r) { setAccount({ configured: false, authed: false, email: "" }); return; }
      setAccount({ configured: true, authed: !!r.authenticated, email: r.email || "" });
      if (r.authenticated && r.state) {
        setOnboarded(!!r.state.onboarded);
        if (r.state.profile) setProfile((p) => ({ ...p, ...r.state.profile }));
        if (r.state.questProgress) setQuestProgress(r.state.questProgress);
      }
    });
  }, []);

  // Persist to localStorage always; debounce-save to the server when signed in.
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ onboarded, profile, questProgress })); } catch (e) {}
    if (account.authed) {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => saveServerState({ onboarded, profile, questProgress }), 700);
    }
  }, [hydrated, onboarded, profile, questProgress, account.authed]);

  const finishOnboard = (p) => { setProfile(p); setOnboarded(true); setTab("home"); };

  const resetAll = () => {
    if (account.authed) signOutServer();
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    setAccount((a) => ({ ...a, authed: false, email: "" }));
    setOnboarded(false);
    setProfile({ name: "", zip: "", age: "", status: "", learningStyle: "", feeling: "", caseworkerEmail: "" });
    setQuestProgress({});
    setOpenQuest(null); setOpenResource(null); setSettingsOpen(false); setPanicOpen(false);
    setTab("home");
  };

  const askPrompt = (key, text) => {
    const reply = CHAT_REPLIES[key];
    const fallbackText = (CHAT_SUGGESTIONS.find((s) => s.id === key) || {}).text || "I need help with this.";
    setPendingPrompt({ key: reply ? key : "default", text: text || fallbackText });
    setOpenQuest(null);
    setTab("chat");
  };

  const goQuest = (slug) => setOpenQuest(slug);

  let body;
  if (!onboarded) {
    body = <Onboarding onDone={finishOnboard} />;
  } else if (tab === "home") {
    body = <Home profile={profile} questProgress={questProgress}
      onOpenQuest={goQuest} onTab={setTab} onPanic={() => setPanicOpen(true)}
      onAskPrompt={(id) => askPrompt(id)} onOpenSettings={() => setSettingsOpen(true)} />;
  } else if (tab === "quests") {
    body = <QuestsList questProgress={questProgress} onOpenQuest={goQuest} />;
  } else if (tab === "chat") {
    body = <Chat profile={profile} pendingPrompt={pendingPrompt} clearPending={() => setPendingPrompt(null)}
      onOpenResource={(id) => setOpenResource(id)} onOpenQuest={goQuest} onPanic={() => setPanicOpen(true)} />;
  } else if (tab === "resources") {
    body = <ResourcesList profile={profile} onOpen={(id) => setOpenResource(id)} />;
  }

  const showTabBar = onboarded && !openQuest && !openResource && !settingsOpen;
  // status bar tint: dark text on light screens, except onboarding + interactive quest hero are dark bg
  const statusDark = !onboarded || !!(openQuest && QUESTS.find((q) => q.slug === openQuest && q.steps));
  const frameBg = !onboarded ? "#06283d" : "var(--foam)";

  return (
    <Phone statusDark={statusDark} bg={frameBg}>
      {body}

      {openQuest && (
        <QuestDetail slug={openQuest} profile={profile} questProgress={questProgress} setQuestProgress={setQuestProgress}
          onBack={() => setOpenQuest(null)} onAskHelp={(slug) => {
            const q = QUESTS.find((x) => x.slug === slug);
            const map = { "first-bank-account": "bank", "chafee-grant": "chafee", "health-26": "health" };
            askPrompt(map[slug] || "default", q ? `Can you help me with "${q.title}"?` : "I need help with this quest.");
          }} />
      )}

      {openResource && <ResourceDetail id={openResource} profile={profile} onBack={() => setOpenResource(null)} />}

      {settingsOpen && <Settings profile={profile} setProfile={setProfile} onBack={() => setSettingsOpen(false)} onReset={resetAll} account={account} />}

      {panicOpen && <Panic profile={profile} onClose={() => setPanicOpen(false)} onOpenChat={() => { setPanicOpen(false); askPrompt("kicked", "I need help right now."); }} />}

      {showTabBar && <TabBar active={tab} onTab={(t) => { setOpenResource(null); setTab(t); }} onPanic={() => setPanicOpen(true)} />}
    </Phone>
  );
}
