import Link from "next/link";
import { OrgNav, OrgFooter, CrisisStrip } from "@/components/site-chrome";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about AfterCare — what it is, nonprofit status, cost, directory coverage, sharing a story, and getting involved. Answered only from what is true today.",
  openGraph: {
    title: "FAQ · AfterCare",
    description:
      "Frequently asked questions about AfterCare — what it is, nonprofit status, cost, directory coverage, sharing a story, and getting involved. Answered only from what is true today.",
    type: "website",
  },
};

// ───────────────────────────────────────────────────────────
// AfterCare — /faq (org surface)
//
// Every answer below is drawn ONLY from copy already on the site:
// the About transparency table, the Services directory (65 listings,
// 6 verified), the Get Involved doors, the Stories consent rules,
// and the Download page. Nothing here is new information — if a
// question cannot be answered from existing honest copy, it does
// not get an invented answer.
// ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is AfterCare?",
    a: "AfterCare is the life navigator for foster youth — one place for housing, health, work, money, and community. It has three parts: the Navigator app, which walks you through real tasks step by step; the Services directory, which lists free and low-cost programs; and the programs that tie them together.",
    link: { href: "/programs", label: "See the programs →" },
  },
  {
    q: "Is AfterCare a registered nonprofit?",
    a: "No — not yet. AfterCare is a social-impact project working toward nonprofit status. The work is real and the product is live in your browser, but the formal nonprofit filing is still ahead of us. That also means we do not collect tax-deductible donations, and there is no Donate button until the filing is real.",
    link: { href: "/about#transparency", label: "See the honest status →" },
  },
  {
    q: "Is the app free?",
    a: "Yes. Free forever for foster youth. There is no sign-up wall — it works in your browser, and you do not need a referral, a caseworker, or an account to start.",
    link: { href: "/app", label: "Open the app →" },
  },
  {
    q: "What areas does the Services directory cover?",
    a: "Today the directory is California-focused: 65 listings, 6 with their official page confirmed. The rest are labeled “Unverified — call to confirm,” which means their details have not been confirmed yet — call ahead before you rely on one.",
    link: { href: "/services", label: "Find services →" },
  },
  {
    q: "Does AfterCare work nationwide?",
    a: "Not yet — nationwide is the road ahead, not live coverage. The destination is every ZIP code in America, where a young person anywhere can find help near them. California is where the directory starts.",
    link: { href: "/programs#roadmap", label: "See the roadmap →" },
  },
  {
    q: "How do I share my story?",
    a: "Four things: your photo (never someone else's without their permission), your words in your own voice (we don't rewrite them), your permission to publish (which you can take back), and — if you are under 18 — a parent or guardian's permission, no exceptions. Nothing goes up without the person who lived it saying so.",
    link: { href: "/stories#share", label: "How sharing works →" },
  },
  {
    q: "How can I get involved?",
    a: "Three doors. If you are the young person: open the app and finish one real task today. If you are a caring adult: show up consistently and point the way. If you run an organization that serves foster youth: get your program listed accurately in the directory — and help build the nationwide map with us.",
    link: { href: "/get-involved", label: "Get involved →" },
  },
  {
    q: "How do I contact AfterCare?",
    a: "There is no public email, phone, or mailing address yet. A contact address is being set up — until it is live, reach us through the app's chat and it will reach us.",
    link: { href: "/contact", label: "Contact page →" },
  },
  {
    q: "What if I am in danger right now?",
    a: "We are not a crisis line and we do not monitor messages around the clock. Call or text 988 (Suicide & Crisis Lifeline, 24/7). If you have nowhere to sleep tonight, Covenant House California is 1-800-388-3888. If someone is being hurt, call 911.",
    link: null,
  },
  {
    q: "Does AfterCare sell my data or show ads?",
    a: "No. We never sell your data, not to anyone, not ever — and we never show ads.",
    link: { href: "/privacy", label: "Read the Privacy draft →" },
  },
];

export default function Faq() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">FAQ</p>
          <h1 className="mk-h1">
            Questions, answered <em>honestly.</em>
          </h1>
          <p className="mk-deck">
            Every answer here comes from what is already true on this site.
            Where something is not live yet, we say so instead of dressing
            it up.
          </p>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          {FAQS.map((f, i) => (
            <div key={f.q} className="mk-ledger-row" style={{ marginBottom: 8 }}>
              <div className="mk-ledger-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h2 className="mk-h2" style={{ fontSize: 24, marginBottom: 8 }}>
                  {f.q}
                </h2>
                <p className="mk-lead" style={{ marginBottom: 8 }}>{f.a}</p>
                {f.link && <Link href={f.link.href}>{f.link.label}</Link>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">Still stuck?</p>
          <h2 className="mk-h2">Ask in the app.</h2>
          <p className="mk-lead">
            The app&rsquo;s chat is the fastest way to reach us — and the
            fastest way to get an answer about your own situation.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app →
            </Link>
            <Link href="/contact" className="mk-btn mk-btn-ghost">
              Contact page
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
