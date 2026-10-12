import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "Resources — AfterCare",
  description:
    "Real, local help for youth aging out of foster care — housing, money & jobs, health, school, crisis, and essentials. Verified numbers, filtered to your area, plus national lifelines that answer 24/7.",
};

const CATEGORIES = [
  { icon: "home", bg: "bg-sky", title: "Housing & shelter", text: "Emergency shelter tonight, transitional housing (THP-Plus), and help keeping a place you already have." },
  { icon: "bank", bg: "bg-mint", title: "Money & jobs", text: "Bank accounts, Chafee grants, benefits like CalFresh, job training, and first-paycheck basics." },
  { icon: "heart", bg: "bg-coral", title: "Health & mental health", text: "Keeping Medi-Cal to 26, finding a doctor or therapist, and free, confidential counseling." },
  { icon: "cap", bg: "bg-warm", title: "School & education", text: "FAFSA as an independent student, tuition and fee waivers, and campus support for foster youth." },
  { icon: "phone", bg: "bg-panic", title: "Crisis & safety", text: "Someone to talk to right now, a safe place tonight, and help when you’re being hurt or kicked out." },
  { icon: "compass", bg: "bg-sky", title: "Everyday essentials", text: "Food, clothing, transportation, phones, and the documents you need to prove who you are." },
];

const LIFELINES = [
  { n: "988", t: "Suicide & Crisis Lifeline — call or text, free & confidential, 24/7.", href: "tel:988" },
  { n: "Text HOME to 741741", t: "Crisis Text Line — talk to a trained counselor by text.", href: "sms:741741" },
  { n: "211", t: "Dial 211 for housing, food, and health help in your area.", href: "tel:211" },
  { n: "1-800-786-2929", t: "National Runaway Safeline (1-800-RUNAWAY) — shelter & a way home.", href: "tel:18007862929" },
];

const STEPS = [
  { n: 1, title: "Open the app, tell it where you are", text: "Your ZIP and a little about your situation. That’s what makes the help local and relevant — not a generic list." },
  { n: 2, title: "Pick what you need, or just ask", text: "Choose a category like housing or money, or type your question. AfterCare finds what fits you." },
  { n: 3, title: "Get real orgs — with numbers we check", text: "Name, what they do, and how to reach them. We verify links and keep phone info conservative, so you don’t hit a dead end." },
  { n: 4, title: "Call, go, or save it", text: "Tap to call or get directions, text your caseworker, or save it for later. One next step at a time." },
];

export default function Resources() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>Resources</p>
          <h1>Real help, near you — not a dead-end list.</h1>
          <p>AfterCare surfaces verified local resources for the things that matter most when you’re aging out, filtered to your area and checked by us.</p>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <Link href="/app" className="btn btn-donate btn-lg">Find help in the app <Icon name="arrow" size={18} /></Link>
            <Link href="/get-help" className="btn btn-on-dark btn-lg">I need help now</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What’s covered</p>
          <h2>Six kinds of help, all in one place.</h2>
          <p className="lede">The app personalizes these to your location. Here’s what you’ll find.</p>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            {CATEGORIES.map((c) => (
              <div className="card" key={c.title}>
                <div className={`chip-icon ${c.bg}`}><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — the process */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>From “I don’t know who to call” to a real next step.</h2>
          <div className="grid grid-2" style={{ marginTop: 34 }}>
            {STEPS.map((s) => (
              <div className="pillar" key={s.n}>
                <div className="chip-icon bg-mint" style={{ fontFamily: "var(--display)", fontWeight: 800, color: "var(--green-press)" }}>{s.n}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 20 }}>
            Local resources are deepest in California first and expanding. We mark a link verified only
            when we’ve confirmed it, and keep phone details conservative — accuracy over a longer list.
          </p>
        </div>
      </section>

      {/* National lifelines */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Always available</p>
          <h2>National lifelines that answer 24/7.</h2>
          <p className="lede">Wherever you are, these are free and always on. Save them now.</p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {LIFELINES.map((l) => (
              <a key={l.n} href={l.href} className="help-card" style={{ textDecoration: "none" }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 24, color: "var(--green-press)" }}>{l.n}</div>
                <p>{l.t}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Your help is already in your pocket.</h2>
            <p>Open AfterCare to find resources filtered to where you are — and a plan for right now if you need one.</p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-donate btn-lg">Open AfterCare</Link>
              <Link href="/get-help" className="btn btn-on-dark btn-lg">Get help now</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
