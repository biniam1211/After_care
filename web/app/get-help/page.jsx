import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "Get Help — AfterCare",
  description:
    "Need help right now? Crisis lines that answer 24/7, and a free app that gives you a plan, a real shelter, and local resources in seconds.",
};

const LINES = [
  { n: "911", t: "If you’re in immediate danger.", href: "tel:911" },
  { n: "988", t: "Call or text the Suicide & Crisis Lifeline — free, confidential, 24/7.", href: "tel:988" },
  { n: "1-800-786-2929", t: "National Runaway Safeline (1-800-RUNAWAY) — shelter & a way home.", href: "tel:18007862929" },
];

export default function GetHelp() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#ffd9b0" }}>Get help</p>
          <h1>Need help right now? You’re in the right place.</h1>
          <p>If it’s an emergency, start with a call. Then the app can give you a plan and real help near you.</p>
        </div>
      </section>

      {/* Crisis lines first */}
      <section className="section">
        <div className="wrap">
          <div className="grid grid-3">
            {LINES.map((l) => (
              <a key={l.n} href={l.href} className="card" style={{ textAlign: "center", display: "block" }}>
                <div className="num" style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 30, color: "var(--green-press)" }}>{l.n}</div>
                <p style={{ marginTop: 8 }}>{l.t}</p>
              </a>
            ))}
          </div>
          <p style={{ color: "var(--ink-soft)", textAlign: "center", marginTop: 18, fontSize: 14.5 }}>
            Not in the U.S., or not sure who to call? Open the app and tap the 🆘 Panic button — it
            walks you through exactly what to do.
          </p>
        </div>
      </section>

      {/* The app is your help */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">Your help, in one place</p>
          <h2>The app gives you a plan — not just a phone number.</h2>
          <div className="grid grid-3" style={{ marginTop: 30 }}>
            <div className="card"><div className="chip-icon bg-coral">🆘</div><h3>A plan for tonight</h3><p>Nowhere to sleep? Being kicked out? Pick what’s happening and get calm, specific steps plus a real shelter.</p></div>
            <div className="card"><div className="chip-icon bg-sky">💬</div><h3>Ask anything</h3><p>Housing, money, court, ID — the AI navigator answers in plain language and points you to local help.</p></div>
            <div className="card"><div className="chip-icon bg-mint">🧭</div><h3>Real resources near you</h3><p>Housing, food, legal, and mental-health help, filtered to your area, with numbers we check.</p></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/app" className="btn btn-primary btn-lg">Open AfterCare →</Link>
          </div>

          <div className="disclaimer" style={{ marginTop: 30, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <span>⚠️</span>
            <span>AfterCare is not an emergency service and doesn’t replace 911 or a trained counselor. If you’re in danger, call <strong>911</strong>; to talk to someone now, call or text <strong>988</strong>.</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
