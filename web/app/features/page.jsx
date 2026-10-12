import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "Features — AfterCare",
  description:
    "AI navigator, step-by-step quests, a panic button for the worst nights, local resources that are real, a document vault, and reminders. Everything AfterCare does for youth aging out of foster care.",
};

const SECTIONS = [
  {
    icon: "chat", bg: "bg-sky", kicker: "The hero", title: "An AI navigator that knows your situation",
    body: "Ask anything — “how do I get my birth certificate,” “I need somewhere to sleep tonight,” “what’s a security deposit.” AfterCare answers in plain language, gives you the next few steps, and points you to real help nearby. It remembers your ZIP and where you are in the system, so the answer actually fits you.",
    bullets: ["Straight answers, no judgment, any time of night", "Tailored to your age, location, and situation", "Turns any answer into a Quest you can follow"],
  },
  {
    icon: "target", bg: "bg-mint", kicker: "Get it done", title: "Quests for the big, confusing stuff",
    body: "The tasks that unlock adulthood are the ones no one explains. AfterCare breaks each into small steps with a coach checking in, so it actually gets finished.",
    bullets: ["Get Your First Bank Account", "Claim Your Chafee Grant — up to $5,000/yr for school", "Keep Health Insurance to 26", "Build Your Credit Score", "Get Your Driver’s License", "File Your First Tax Return"],
  },
  {
    icon: "shield", bg: "bg-panic", kicker: "For the worst nights", title: "A Panic button that gives you a plan",
    body: "When everything’s on fire, you don’t need a search bar. One tap gives you a calm, specific plan for exactly what’s happening — plus a real shelter and a crisis line. 988 and 911 are always one tap away.",
    bullets: ["“I have nowhere to sleep tonight”", "“I’m being kicked out”", "“I’m being hurt”", "“I’m about to be evicted”"],
  },
  {
    icon: "compass", bg: "bg-warm", kicker: "Real help nearby", title: "Local resources that actually work",
    body: "Housing, money & jobs, health, school, crisis, essentials — filtered to your area, with phone numbers and details we check. No dead ends, no wrong numbers when it matters most.",
    bullets: ["Search and filter by category and location", "Call, get directions, or text your caseworker in a tap", "Curated and checked — accuracy is the whole point"],
  },
  {
    icon: "file", bg: "bg-sky", kicker: "Your paperwork", title: "A vault for the documents that run your life",
    body: "Birth certificate, Social Security card, ID, school and medical records — the documents you need to rent, work, and enroll. Keep them in one safe place so you’re never stuck because a file is “back at the last placement.”",
    bullets: ["One secure home for critical documents", "There when you need to prove who you are"],
  },
  {
    icon: "bell", bg: "bg-mint", kicker: "Never miss it", title: "Reminders that have your back",
    body: "Grant deadlines, insurance windows, court dates — miss one and it can cost you for years. AfterCare nudges you before they pass, so the system’s clock stops working against you.",
    bullets: ["Gentle nudges for deadlines that matter", "Follow-ups after a tough moment to check you’re okay"],
  },
];

export default function Features() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#8fd0ff" }}>Features</p>
          <h1>Everything a parent would help you figure out.</h1>
          <p>Six tools that work together to get you from “I have no idea” to “done.”</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className="card grid grid-2"
              style={{ alignItems: "center", gap: 36, padding: 32, background: i % 2 ? "var(--foam)" : "#fff" }}
            >
              <div>
                <div className={`chip-icon ${s.bg}`} style={{ marginBottom: 14 }}><Icon name={s.icon} size={26} /></div>
                <p className="eyebrow">{s.kicker}</p>
                <h2 style={{ fontSize: 28, margin: "6px 0 12px" }}>{s.title}</h2>
                <p style={{ color: "var(--ink-soft)", fontSize: 16.5 }}>{s.body}</p>
              </div>
              <ul style={{ listStyle: "none", display: "grid", gap: 12 }}>
                {s.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontWeight: 600, color: "var(--ink)" }}>
                    <span style={{ color: "var(--mint)", fontWeight: 800 }}>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>See it for yourself.</h2>
            <p>The whole app is free and works in your browser right now.</p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-primary btn-lg">Open AfterCare →</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
