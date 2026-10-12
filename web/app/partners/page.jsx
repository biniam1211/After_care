import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "For Partners & Funders — AfterCare",
  description:
    "Caseworkers, agencies, schools, and funders: put a 24/7 AI life navigator in the hands of every youth aging out of foster care. How to use AfterCare with your youth, and how to support the mission.",
};

export default function Partners() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#8fd0ff" }}>For partners &amp; funders</p>
          <h1>A life navigator in every youth’s pocket.</h1>
          <p>
            You can’t be on call at 2 a.m. for every young person on your caseload. AfterCare can —
            and it hands them back to you better prepared, not less supported.
          </p>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Partner with us →</Link>
            <Link href="/app" className="btn btn-on-dark btn-lg">Try the app</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Who it’s for</p>
          <h2>Built to sit alongside the people already doing the work.</h2>
          <div className="grid grid-3" style={{ marginTop: 34 }}>
            <div className="card">
              <div className="chip-icon bg-sky"><Icon name="users" size={26} /></div>
              <h3>Caseworkers &amp; ILP coordinators</h3>
              <p>Give youth a 24/7 first stop for the questions that flood your inbox. Spend your time on the human stuff, not re-explaining how a bank account works.</p>
            </div>
            <div className="card">
              <div className="chip-icon bg-mint"><Icon name="cap" size={26} /></div>
              <h3>Schools &amp; campus support</h3>
              <p>Help foster and homeless youth claim the grants, waivers, and housing they’re entitled to — before the deadlines pass.</p>
            </div>
            <div className="card">
              <div className="chip-icon bg-warm"><Icon name="handshake" size={26} /></div>
              <h3>Agencies &amp; nonprofits</h3>
              <p>Extend your reach between appointments. Your resources, surfaced to the youth who need them, exactly when they need them.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">Why it works</p>
          <h2>Support that scales without losing the human part.</h2>
          <div className="grid grid-3" style={{ marginTop: 34 }}>
            <div className="card"><h3>Always on</h3><p>Crises and questions don’t keep office hours. AfterCare answers nights, weekends, and the moment a youth is actually ready to act.</p></div>
            <div className="card"><h3>Accurate by design</h3><p>Resources are curated and checked, scoped to the youth’s location. We’d rather say “not sure” than send someone to a dead number.</p></div>
            <div className="card"><h3>Private &amp; youth-owned</h3><p>Their data is theirs. We don’t sell it, and we minimize what we store. Built with the dignity these youth are rarely given.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Ways to work together</p>
          <h2>However you can help, there’s a lane for it.</h2>
          <div className="grid grid-2" style={{ marginTop: 30 }}>
            <div className="card"><h3>Fund it</h3><p>AfterCare is free to youth. Funding keeps it that way — covering AI costs, resource verification, and expansion to new regions. We’ll share exactly where it goes.</p></div>
            <div className="card"><h3>Pilot it</h3><p>Run AfterCare with your youth and tell us what’s missing. Frontline feedback shapes what we build next.</p></div>
            <div className="card"><h3>Share your resources</h3><p>Help us keep the local directory accurate and complete so no youth hits a dead end in your area.</p></div>
            <div className="card"><h3>Spread the word</h3><p>Put it in the hands of the youth and workers who need it. The best outcomes start with someone saying “try this.”</p></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Let’s talk.</h2>
            <p>Tell us who you work with and how you’d like to help. We read every message.</p>
            <div className="cta-row">
              <Link href="/contact" className="btn btn-primary btn-lg">Contact us →</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
