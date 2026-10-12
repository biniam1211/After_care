import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "What We Do — AfterCare",
  description:
    "AfterCare puts a 24/7 AI life navigator, step-by-step quests, a panic button, real local resources, and a document vault in the hands of youth aging out of foster care.",
};

const PILLARS = [
  { icon: "chat", bg: "bg-sky", title: "AI navigator", text: "Ask anything — housing, money, school, a court date. Straight answers, the next steps, and real help nearby, tailored to your age and location.", learn: true },
  { icon: "target", bg: "bg-mint", title: "Life-skill quests", text: "The tasks that unlock adulthood — bank account, Chafee grant, insurance, ID, taxes — broken into small steps with check-ins so they actually get done." },
  { icon: "shield", bg: "bg-coral", title: "Panic button", text: "For the worst nights: one tap gives a calm plan for exactly what’s happening, a real shelter, and a crisis line. 988 & 911 are always one tap away." },
  { icon: "compass", bg: "bg-warm", title: "Local resources", text: "Housing, food, legal, mental health — filtered to the youth’s area, with numbers we check. No dead ends when it matters most." },
  { icon: "file", bg: "bg-sky", title: "Document vault", text: "Birth certificate, SSN, ID, school and medical records — the paperwork you need to rent, work, and enroll, kept safe in one place." },
  { icon: "bell", bg: "bg-mint", title: "Reminders", text: "Grant deadlines, insurance windows, court dates — gentle nudges before they pass, plus a check-in after a tough moment." },
];

export default function WhatWeDo() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>What we do</p>
          <h1>One app. Everything a parent would help you figure out.</h1>
          <p>AfterCare brings the guidance, tools, and real local help that youth aging out of foster care are usually left to find alone.</p>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <Link href="/app" className="btn btn-donate btn-lg">Open the app →</Link>
            <Link href="/get-help" className="btn btn-on-dark btn-lg">Get help now</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-2">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
                <div className={`chip-icon ${p.bg}`}><Icon name={p.icon} size={26} /></div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  {p.learn && <Link href="/features" className="cta">See it in detail →</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow">Want the deep dive?</p>
          <h2>See exactly how each piece works.</h2>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: 20 }}>
            <Link href="/features" className="btn btn-primary btn-lg">Explore the features →</Link>
            <Link href="/approach" className="btn btn-ghost btn-lg">Why it works</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
