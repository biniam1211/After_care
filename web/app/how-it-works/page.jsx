import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "How it works",
  description:
    "How AfterCare works: AI chat, Quests, Panic Button, and a verified-label services directory — free for foster youth.",
  openGraph: {
    title: "How it works · AfterCare",
    description:
      "Ask anything, follow Quests, find real services, and reach crisis help fast.",
    type: "website",
  },
};

const STEPS = [
  {
    title: "Open the app",
    body: "Works in your browser today. Add it to your Home Screen from /download. No caseworker referral required.",
  },
  {
    title: "Ask anything",
    body: "The AI navigator answers in plain language with next steps and resources from our fixed catalog — it cannot invent hotlines.",
  },
  {
    title: "Follow a Quest",
    body: "Big adult tasks become small wins: learner's permit & driver's license, first bank account, Chafee Grant, health coverage to 26.",
  },
  {
    title: "Find services near you",
    body: "Browse the California directory. Verified listings are labeled; everything else says “Unverified — call to confirm.”",
  },
  {
    title: "Use the Panic Button if you need it",
    body: "Homeless tonight, kicked out, abuse, eviction — get a plan with shelter and crisis numbers, not a lecture.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">How it works</p>
          <h1 className="mk-h1">
            One navigator. <em>Real finished things.</em>
          </h1>
          <p className="mk-deck">
            AfterCare is not another PDF of resources. It walks with you until
            the task is done — and keeps crisis help one tap away.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Get help now
            </Link>
            <Link href="/programs" className="mk-btn mk-btn-ghost">
              Browse programs
            </Link>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-wrap-narrow" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="mk-steps">
            {STEPS.map((s, i) => (
              <div className="mk-step" key={s.title}>
                <div className="mk-step-index">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-note">
            <strong>Not clinical or legal advice.</strong> AfterCare navigates
            and connects. For emergencies use 988, 211, Covenant House,
            Trevor Project, or 911 — also listed on every page.
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt">
        <div className="mk-wrap">
          <p className="mk-kicker">What you can do today</p>
          <div className="mk-grid-3">
            <Link href="/start-here" className="mk-tile">
              <h3>Start here path</h3>
              <p>Crisis first, then documents → bank → license → benefits → school/work.</p>
              <span className="mk-tile-link">Open →</span>
            </Link>
            <Link href="/programs/drivers-license" className="mk-tile">
              <h3>Driver&rsquo;s license</h3>
              <p>Flagship program + Quest for California permit and license steps.</p>
              <span className="mk-tile-link">Open →</span>
            </Link>
            <Link href="/services" className="mk-tile">
              <h3>Services directory</h3>
              <p>California listings with honest verification labels — including iFoster peers.</p>
              <span className="mk-tile-link">Browse →</span>
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
