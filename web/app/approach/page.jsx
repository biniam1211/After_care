import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "Our Approach — AfterCare",
  description:
    "Why AfterCare works: the problem youth aging out of foster care face, our theory of change, the principles we build on, and how we'll measure impact honestly.",
};

const PRINCIPLES = [
  { icon: "target", title: "Accuracy over everything", text: "A dead phone number or wrong advice can cost someone a bed for the night. We’d rather say “I’m not sure” than guess, and we check the resources we surface." },
  { icon: "lock", title: "Privacy & dignity", text: "Their data is theirs. We don’t sell it and we store as little as possible. We talk to youth like people, not case numbers." },
  { icon: "heart", title: "Free, and meeting youth where they are", text: "No cost, no download, answers at 2 a.m. in plain language — because the barrier should never be the help itself." },
  { icon: "handshake", title: "Alongside, not instead of", text: "AfterCare extends caseworkers and agencies between appointments. It hands youth back better prepared, not less supported." },
];

export default function Approach() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>Our approach</p>
          <h1>The right help, at the moment it’s actually needed.</h1>
          <p>We’re new, and we’re honest about that. Here’s the problem we’re built to solve, how we plan to solve it, and how we’ll hold ourselves accountable.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">The problem</p>
          <h2>Support that stops at 18.</h2>
          <div className="statrow" style={{ marginTop: 34 }}>
            <div className="s"><div className="ic"><Icon name="users" size={26} /></div><div className="num">~20,000</div><div className="cap">age out of U.S. foster care each year</div></div>
            <div className="s"><div className="ic"><Icon name="home" size={26} /></div><div className="num">1 in 5</div><div className="cap">experience homelessness after 18</div></div>
            <div className="s"><div className="ic"><Icon name="briefcase" size={26} /></div><div className="num">Half</div><div className="cap">are not employed by age 24</div></div>
            <div className="s"><div className="ic"><Icon name="cap" size={26} /></div><div className="num">~3–4%</div><div className="cap">earn a college degree by their mid-20s</div></div>
          </div>
          <p style={{ color: "var(--ink-faint)", fontSize: 13, marginTop: 16 }}>National figures, U.S. foster care (AFCARS / NYTD and related research).</p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">Our theory of change</p>
          <h2>Information, turned into action, at the right time.</h2>
          <div className="steps" style={{ marginTop: 34 }}>
            <div className="step"><div className="n">1</div><h3>Meet youth where they are</h3><p>A free app in their pocket that answers instantly, in plain language, any time of day.</p></div>
            <div className="step"><div className="n">2</div><h3>Turn “I don’t know” into a next step</h3><p>Every answer comes with concrete actions and real local resources — not just information.</p></div>
            <div className="step"><div className="n">3</div><h3>Follow through to the win</h3><p>Quests and reminders carry momentum so benefits are claimed and deadlines aren’t missed.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What we build on</p>
          <h2>Four principles, non-negotiable.</h2>
          <div className="grid grid-2" style={{ marginTop: 34 }}>
            {PRINCIPLES.map((p) => (
              <div className="pillar" key={p.title}>
                <div className="chip-icon bg-mint"><Icon name={p.icon} size={26} /></div>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap">
          <p className="eyebrow">How we’ll measure impact</p>
          <h2>Honest about where we are.</h2>
          <p className="lede">
            AfterCare is early, so we won’t pretend to have outcomes we haven’t earned yet. As we
            grow, we’ll track and share the things that actually matter — and report them plainly.
          </p>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            <div className="card"><h3>Reach</h3><p>Youth and workers using AfterCare, and the regions we cover.</p></div>
            <div className="card"><h3>Action taken</h3><p>Quests completed and benefits claimed — bank accounts, grants, insurance kept.</p></div>
            <div className="card"><h3>Trust</h3><p>Resource accuracy and whether youth come back when it matters.</p></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Help us make these numbers real.</h2>
            <p>Partner, fund, or spread the word — every bit moves a youth from falling through to figuring it out.</p>
            <div className="cta-row">
              <Link href="/get-involved" className="btn btn-donate btn-lg">Get involved →</Link>
              <Link href="/app" className="btn btn-on-dark btn-lg">Open the app</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
