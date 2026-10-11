import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "AfterCare — The missing parent in your pocket",
  description:
    "The AI life navigator built by foster kids, for foster kids. Open a bank account, find housing tonight, claim college money, keep your health insurance — one step at a time.",
};

const FEATURES = [
  { icon: "💬", bg: "bg-sky", title: "An AI navigator that actually knows your situation", text: "Ask anything — housing, money, school, a scary court date. You get a straight answer, the next 3 steps, and real help near you. Not a search engine. A guide." },
  { icon: "🎯", bg: "bg-mint", title: "Quests that get the hard stuff done", text: "Big, confusing tasks broken into small wins with check-ins along the way — so “open a bank account” or “claim my grant” actually happens." },
  { icon: "🆘", bg: "bg-panic", title: "A Panic button for the worst nights", text: "Nowhere to sleep? Being kicked out? One tap gives you a plan, a real shelter, and a crisis line — 988 and 911 always one tap away." },
  { icon: "🧭", bg: "bg-warm", title: "Local resources that are real", text: "Housing, food, legal help, mental health — filtered to your area, with phone numbers that work. No dead ends." },
  { icon: "📄", bg: "bg-sky", title: "A vault for your documents", text: "Birth certificate, ID, SSN, school and medical records — the paperwork you need to be an adult, kept safe in one place." },
  { icon: "🔔", bg: "bg-mint", title: "Reminders that have your back", text: "Deadlines for grants, insurance, and court don’t wait. AfterCare nudges you before they pass." },
];

const QUESTS = [
  "Get Your First Bank Account",
  "Claim Your Chafee Grant — up to $5,000/yr",
  "Keep Health Insurance to 26",
  "Build Your Credit Score",
  "Get Your Driver’s License",
  "File Your First Tax Return",
];

export default function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "#8fd0ff" }}>For youth aging out of foster care</p>
            <h1>The missing parent in your pocket.</h1>
            <p className="sub">
              Turning 18 in foster care means figuring out money, housing, school, and health
              — usually alone. AfterCare is a free AI navigator that answers your questions and
              walks you through it, step by step.
            </p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-primary btn-lg">Open the app →</Link>
              <Link href="/features" className="btn btn-on-dark btn-lg">See what it does</Link>
            </div>
            <div className="trust">
              <span>✓ Free, always</span>
              <span>✓ Private — your info is never sold</span>
              <span>✓ Built by a former foster youth</span>
            </div>
          </div>

          {/* Phone preview */}
          <div className="phone" aria-hidden="true">
            <div className="p-greet">Hey — you’ve got this. 💪</div>
            <div className="p-bubble me">How do I open a bank account with no parent?</div>
            <div className="p-bubble ai">
              You can 100% do this on your own at 18 — no co-signer needed. The trick is picking
              one with no monthly fees.
            </div>
            <div>
              <span className="p-chip">1. ID + SSN ready</span>
              <span className="p-chip">2. Pick a no-fee bank</span>
              <span className="p-chip">3. Set up direct deposit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Why this matters</p>
          <h2>Aging out shouldn’t mean falling through.</h2>
          <p className="lede">
            Most kids get a decade of practice at adulthood with a parent in their corner. Youth
            leaving foster care often get none — and the system mostly stops at 18.
          </p>
          <div className="stats" style={{ marginTop: 40 }}>
            <div className="stat">
              <div className="num">~20,000</div>
              <div className="lab">young people age out of U.S. foster care every year</div>
            </div>
            <div className="stat">
              <div className="num">1 in 5</div>
              <div className="lab">will experience homelessness after turning 18</div>
            </div>
            <div className="stat">
              <div className="num">Half</div>
              <div className="lab">are not employed by age 24</div>
            </div>
          </div>
          <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 18 }}>
            National figures, U.S. foster care (AFCARS / NYTD). AfterCare exists to change them.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">What it does</p>
          <h2>Everything a parent would help you figure out.</h2>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            {FEATURES.map((f) => (
              <div className="card" key={f.title}>
                <div className={`chip-icon ${f.bg}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quests strip */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Real quests, real wins</p>
          <h2>Start with the thing stressing you out most.</h2>
          <p className="lede">Each one is broken into small steps with a coach checking in.</p>
          <div className="grid grid-2" style={{ marginTop: 30 }}>
            {QUESTS.map((q) => (
              <div key={q} className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px" }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <strong style={{ fontSize: 16.5 }}>{q}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>Three taps to help that fits you.</h2>
          <div className="steps" style={{ marginTop: 36 }}>
            <div className="step">
              <div className="n">1</div>
              <h3>Tell it a little about you</h3>
              <p>Your ZIP, your age, where you are in the system. Takes a minute — and tailors everything.</p>
            </div>
            <div className="step">
              <div className="n">2</div>
              <h3>Ask, or pick a quest</h3>
              <p>Type any question, or choose a goal like “get my ID.” AfterCare does the figuring-out.</p>
            </div>
            <div className="step">
              <div className="n">3</div>
              <h3>Take the next step</h3>
              <p>Clear actions, real local resources, and reminders so nothing slips. One win at a time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission teaser */}
      <section className="section">
        <div className="wrap grid grid-2" style={{ alignItems: "center", gap: 48 }}>
          <p className="quote">“I built the thing I needed and never had.”</p>
          <div>
            <p className="lede" style={{ marginBottom: 18 }}>
              AfterCare is built by someone who aged out of foster care — so it talks to you like
              an older sibling who’s been there, not a caseworker reading a form.
            </p>
            <Link href="/about" className="btn btn-ghost">Read our story →</Link>
          </div>
        </div>
      </section>

      {/* Get the app */}
      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>It’s free. It’s private. It’s ready when you are.</h2>
            <p>Open AfterCare in your browser and add it to your home screen — it works like an app, right now, no download needed.</p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-primary btn-lg">Open AfterCare →</Link>
              <Link href="/partners" className="btn btn-on-dark btn-lg">I work with foster youth</Link>
            </div>
            <p className="install-note">On your phone: tap Share → “Add to Home Screen.” Native iOS &amp; Android apps are on the way.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
