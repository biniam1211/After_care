import Link from "next/link";
import { Icon } from "@/components/ui";
import { OrgArt } from "@/components/org-art";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "About us",
  description:
    "AfterCare's story, organization background, goals, and honest status — a social-impact project working toward nonprofit status.",
};

const GOALS = [
  {
    title: "No young person ages out alone",
    body: "Every young person leaving care has a guide in their pocket — answers, steps, and a plan, any hour of the day.",
  },
  {
    title: "Help that reaches every ZIP code",
    body: "A directory that starts in California and grows state by state until help near home is findable anywhere in America.",
  },
  {
    title: "Finished things, not just information",
    body: "Success is a bank account opened, a grant applied for, a shelter reached — not another page read.",
  },
  {
    title: "Built with lived experience, not about it",
    body: "Designed by someone who went through foster care, shaped by the people it serves — never a lecture from the outside.",
  },
];

export default function About() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            About AfterCare
          </span>
          <h1 className="mk-h1">
            Built by someone who went through it, <em>for the people coming after him.</em>
          </h1>
          <p className="mk-sub">
            AfterCare is a social-impact project for foster youth ages 16–24 —
            and for the adults and organizations who show up for them.
          </p>
        </div>
      </header>

      {/* ── Our story ── */}
      <section className="mk-section" id="story">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Our story</p>
            <h2 className="mk-h2">This isn&rsquo;t charity work.</h2>
            <p className="mk-lead">
              AfterCare is being built by someone who went through foster
              care and is building the thing he needed when he was in it.
              Youth can tell instantly when something was designed by
              someone who&rsquo;s never been where they are. The tone, the
              questions it asks first, what it refuses to lecture you about —
              all of that comes from lived experience, not a focus group.
            </p>
            <p className="mk-lead">
              The full founder story — in Binyam&rsquo;s own words — is
              coming soon. Until then, this section says only what he has
              stated himself.
            </p>
          </div>
          <div className="mk-art">
            <OrgArt kind="community" />
          </div>
        </div>
      </section>

      {/* ── Organization background ── */}
      <section className="mk-section mk-band-sky" id="background">
        <div className="mk-wrap">
          <p className="mk-kicker">Organization background</p>
          <h2 className="mk-h2">What AfterCare is.</h2>
          <p className="mk-lead">
            AfterCare is an AI life navigator plus a services directory for
            foster youth. The navigator answers questions and walks a young
            person through real tasks — housing, health, work, money, and
            paperwork — one finished thing at a time. The directory lists
            real programs near them, with honest labels about what has and
            hasn&rsquo;t been verified yet.
          </p>
          <p className="mk-lead">
            The work is built for everyone, every ZIP code, every day. The
            directory covers California today and grows from there — the
            goal is a young person anywhere in America finding help near
            home.
          </p>
          <div className="mk-cta-row">
            <Link href="/programs" className="mk-btn mk-btn-sky">
              Explore programs <Icon name="arrowR" size={19} color="#fff" sw={2.6} />
            </Link>
            <Link href="/research" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
              See the research
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our goals ── */}
      <section className="mk-section" id="goals">
        <div className="mk-wrap">
          <p className="mk-kicker">Our goals</p>
          <h2 className="mk-h2">What we&rsquo;re working toward.</h2>
          <div className="mk-grid3">
            {GOALS.map((g) => (
              <div className="mk-card" key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparency ── */}
      <section className="mk-section mk-section-dark" id="transparency">
        <div className="mk-wrap">
          <p className="mk-kicker">Transparency</p>
          <h2 className="mk-h2">The honest status.</h2>
          <p className="mk-lead">
            {ORG_STATUS} That is the honest status: the work is real, the
            product is live in your browser, and the formal nonprofit filing
            is still ahead of us.
          </p>
          <ul className="mk-checklist" style={{ maxWidth: 42 }}>
            <li style={{ color: "rgba(255,255,255,.8)" }}>No claim of 501(c)(3) status, tax-deductible donations, or registered-nonprofit standing — none of those exist yet.</li>
            <li style={{ color: "rgba(255,255,255,.8)" }}>Privacy &amp; Terms are plain-English drafts, not yet reviewed by a lawyer.</li>
            <li style={{ color: "rgba(255,255,255,.8)" }}>Directory listings say plainly whether they are verified or “Unverified — call to confirm.”</li>
            <li style={{ color: "rgba(255,255,255,.8)" }}>We do not publish impact numbers we have not measured.</li>
          </ul>
          <div className="mk-cta-row">
            <Link href="/impact" className="mk-btn mk-btn-primary">
              How we measure impact <Icon name="arrowR" size={19} color="var(--harbor)" sw={2.6} />
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
