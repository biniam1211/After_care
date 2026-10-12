import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import NewsletterForm from "@/components/site/NewsletterForm";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "AfterCare — The missing parent in your pocket",
  description:
    "A free AI life navigator built by foster kids, for foster kids. Open a bank account, find housing tonight, claim college money, keep your health insurance — one step at a time.",
};

const PROBLEM = [
  { icon: "users", num: "~20,000", cap: "young people age out of U.S. foster care every year" },
  { icon: "home", num: "1 in 5", cap: "will experience homelessness after turning 18" },
  { icon: "briefcase", num: "Half", cap: "are not employed by age 24" },
];

const PILLARS = [
  { icon: "chat", bg: "bg-sky", title: "Guidance that knows your situation", text: "An AI navigator you can ask anything — housing, money, school, court. Straight answers, the next steps, and real help nearby." },
  { icon: "target", bg: "bg-mint", title: "Quests that get the hard stuff done", text: "Big, confusing tasks broken into small wins with check-ins — so “open a bank account” or “claim my grant” actually happens." },
  { icon: "shield", bg: "bg-coral", title: "A Panic button for the worst nights", text: "Nowhere to sleep? Being kicked out? One tap gives you a plan, a real shelter, and a crisis line. 988 & 911 always one tap away." },
  { icon: "compass", bg: "bg-warm", title: "Local resources that are real", text: "Housing, food, legal help, mental health — filtered to your area, with numbers we check. No dead ends." },
];

const HELP = [
  { tag: "Coming soon", title: "Donate", text: "Keep AfterCare free for every youth who needs it. Donations open soon — get on the list to be first to give.", cta: "Get notified", href: "/get-involved#donate" },
  { tag: "Agencies & funders", title: "Partner with us", text: "Caseworkers, schools, nonprofits, funders — put a 24/7 navigator in every youth’s pocket.", cta: "For partners", href: "/partners" },
  { tag: "Anyone", title: "Spread the word", text: "The best outcomes start with someone saying “try this.” Share AfterCare with a youth or a worker.", cta: "How to help", href: "/get-involved" },
  { tag: "Volunteers", title: "Keep resources real", text: "Help us verify local resources and mentor youth, so no one ever hits a dead number.", cta: "Volunteer", href: "/get-involved" },
];

export default function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">For youth aging out of foster care</p>
            <h1>The missing parent <span className="hl">in your pocket.</span></h1>
            <p className="sub">
              Turning 18 in foster care means figuring out money, housing, school, and health —
              usually alone. AfterCare is a free AI navigator that answers your questions and
              walks you through it, step by step.
            </p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-primary btn-lg">Open the app <Icon name="arrow" size={18} /></Link>
              <Link href="/get-involved" className="btn btn-ghost btn-lg">Support the mission</Link>
            </div>
            <div className="trust">
              <span><Icon name="heart" size={17} /> Free, always</span>
              <span><Icon name="lock" size={17} /> Private — never sold</span>
              <span><Icon name="users" size={17} /> Built by a former foster youth</span>
            </div>
          </div>

          <div className="hero-media">
            <img src="/img/app-welcome.png" alt="The AfterCare app open on a phone, showing its welcome screen." width={300} height={649} />
            <span className="badge b1"><Icon name="shield" size={16} /> 988 — one tap away</span>
            <span className="badge b2"><Icon name="heart" size={16} /> Free forever</span>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <p className="eyebrow">Why this matters</p>
            <h2>Aging out shouldn’t mean falling through.</h2>
            <p className="lede" style={{ margin: "10px auto 0" }}>
              Most kids get a decade of practice at adulthood with a parent in their corner.
              Youth leaving foster care often get none — and the system mostly stops at 18.
            </p>
          </div>
          <div className="statrow">
            {PROBLEM.map((s) => (
              <div className="s" key={s.cap}>
                <div className="ic"><Icon name={s.icon} size={26} /></div>
                <div className="num">{s.num}</div>
                <div className="cap">{s.cap}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ink-faint)", fontSize: 13, textAlign: "center", marginTop: 20 }}>
            National figures, U.S. foster care (AFCARS / NYTD). AfterCare exists to change them.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2>Everything a parent would help you figure out.</h2>
          <p className="lede">Four tools that work together to get you from “I have no idea” to “done.”</p>
          <div className="grid grid-2" style={{ marginTop: 36 }}>
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
                <div className={`chip-icon ${p.bg}`}><Icon name={p.icon} size={26} /></div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <Link href="/what-we-do" className="btn btn-ghost">See everything we do</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>Three taps to help that fits you.</h2>
          <div className="steps" style={{ marginTop: 36 }}>
            <div className="step"><div className="n">1</div><h3>Tell it a little about you</h3><p>Your ZIP, your age, where you are in the system. A minute — and it tailors everything.</p></div>
            <div className="step"><div className="n">2</div><h3>Ask, or pick a quest</h3><p>Type any question, or choose a goal like “get my ID.” AfterCare does the figuring-out.</p></div>
            <div className="step"><div className="n">3</div><h3>Take the next step</h3><p>Clear actions, real local resources, and reminders so nothing slips. One win at a time.</p></div>
          </div>
        </div>
      </section>

      {/* Where we serve */}
      <section className="section sand">
        <div className="wrap">
          <p className="eyebrow">Where we serve</p>
          <h2>Starting in California — growing from there.</h2>
          <p className="lede">The AI navigator helps anywhere. Local resources are deepest where we’ve curated them first, and we’re expanding.</p>
          <div className="tiles" style={{ marginTop: 32 }}>
            <div className="tile"><span className="big">California</span>Active now</div>
            <div className="tile soon"><span className="big">Nevada</span>Coming soon</div>
            <div className="tile soon"><span className="big">Washington</span>Coming soon</div>
            <div className="tile soon"><span className="big">Your state?</span>Tell us →</div>
          </div>
        </div>
      </section>

      {/* Mission / story */}
      <section className="section">
        <div className="wrap story">
          <div>
            <p className="quote">
              “I built the thing I needed and never had.”
              <span className="by">— AfterCare’s founder, who aged out of foster care</span>
            </p>
          </div>
          <div>
            <p className="lede" style={{ marginBottom: 18 }}>
              AfterCare talks to you like an older sibling who’s been there — not a caseworker
              reading a form. That’s the whole point.
            </p>
            <Link href="/about" className="btn btn-ghost">Read our story</Link>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">Get involved</p>
          <h2>Be the reason a kid doesn’t fall through.</h2>
          <p className="lede">However you can help, there’s a lane for it.</p>
          <div className="grid grid-4" style={{ marginTop: 36 }}>
            {HELP.map((h) => (
              <div className="help-card" key={h.title}>
                <span className="tag">{h.tag}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                <Link href={h.href} className="cta">{h.cta} <Icon name="arrow" size={15} style={{ verticalAlign: "-2px" }} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-tight">
        <div className="wrap">
          <div className="newsletter">
            <div>
              <h2 style={{ fontSize: 28 }}>Stay in the loop.</h2>
              <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>
                Updates on AfterCare, new resources, and how to help. No spam — unsubscribe anytime.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>It’s free. It’s private. It’s ready when you are.</h2>
            <p>Open AfterCare in your browser and add it to your home screen — it works like an app, right now, no download needed.</p>
            <div className="cta-row">
              <Link href="/app" className="btn btn-donate btn-lg">Open AfterCare</Link>
              <Link href="/get-help" className="btn btn-on-dark btn-lg">I need help now</Link>
            </div>
            <p className="install-note">On your phone: tap Share → “Add to Home Screen.” Native iOS &amp; Android apps are on the way.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
