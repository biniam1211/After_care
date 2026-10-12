import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "FAQ — AfterCare",
  description:
    "Is AfterCare free? Is it private? Do I need an account? What if I'm in crisis? Answers to common questions about the AI life navigator for foster youth.",
};

const FAQS = [
  { q: "Is AfterCare really free?", a: "Yes — completely, and always for youth. No subscription, no trial, no credit card. It’s funded so that it never costs you anything." },
  { q: "Is my information private?", a: "Yes. We don’t sell your data, and we keep what we store to a minimum. You’re in control of what you share. See our privacy policy for the details." },
  { q: "Do I need to download anything?", a: "No. AfterCare runs in your web browser. On your phone you can tap Share → “Add to Home Screen” and it works just like an app. Native iOS and Android versions are on the way." },
  { q: "Do I need an account?", a: "You can start right away. Creating a lightweight account lets your progress, quests, and documents follow you across devices — but you choose what to save." },
  { q: "Is this legal or medical advice?", a: "No. AfterCare gives you clear information and next steps, but it’s not a lawyer, doctor, or therapist. For your specific situation, talk to a professional. We’ll help you find one." },
  { q: "What if I’m in a crisis right now?", a: "If you’re in immediate danger, call 911. To talk to someone right now, call or text 988 (the Suicide & Crisis Lifeline) — it’s free and confidential. The app’s Panic button also gives you a plan and a real shelter in seconds." },
  { q: "Who is AfterCare for?", a: "Young people in and aging out of foster care — roughly teens through their mid-twenties — plus the caseworkers, families, and agencies supporting them." },
  { q: "Which areas does it cover?", a: "The AI navigator helps anywhere, and local resources are strongest in the regions we’ve curated first. We’re expanding coverage — tell us where you are and we’ll prioritize it." },
  { q: "Who built this?", a: "AfterCare was created by someone who aged out of foster care, with help from people who work with foster youth. It’s the tool we wish we’d had." },
];

export default function FAQ() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#8fd0ff" }}>FAQ</p>
          <h1>Questions, answered straight.</h1>
          <p>No fine print, no runaround. If your question isn’t here, just ask us.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose" style={{ maxWidth: "76ch" }}>
          {FAQS.map((f) => (
            <details key={f.q} className="faq-item">
              <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 19, color: "var(--ink)", fontFamily: "var(--display)" }}>
                {f.q}
              </summary>
              <p style={{ marginTop: 10 }}>{f.a}</p>
            </details>
          ))}

          <div className="disclaimer" style={{ marginTop: 30 }}>
            <Icon name="alert" size={18} style={{ flex: "none", marginTop: 1 }} />
            <span>
              In an emergency, call <strong>911</strong>. To talk to someone now, call or text{" "}
              <strong>988</strong> — the Suicide &amp; Crisis Lifeline, free and confidential, 24/7.
            </span>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Still have a question?</h2>
            <p>We read every message and answer like humans.</p>
            <div className="cta-row">
              <Link href="/contact" className="btn btn-primary btn-lg">Ask us →</Link>
              <Link href="/app" className="btn btn-on-dark btn-lg">Open the app</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
