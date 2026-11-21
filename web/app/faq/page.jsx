import Link from "next/link";
import { OrgNav, OrgFooter, CrisisStrip } from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about AfterCare — what it is, nonprofit status, cost, driver's license help, directory coverage, and getting involved.",
  openGraph: {
    title: "FAQ · AfterCare",
    description:
      "Honest answers about AfterCare — only from what is true today.",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What is AfterCare?",
    a: "AfterCare is the AI life navigator built by foster kids, for foster kids — one place for driver's license help, documents, housing, money, benefits, school, jobs, health, legal rights, AB 12, and parenting support. It includes the navigator app, Quests, a Panic Button, and a California services directory.",
    link: { href: "/programs", label: "See the programs →" },
  },
  {
    q: "Who founded AfterCare?",
    a: "Biniam Efrem, a former foster youth. The founder story section on About has a clearly marked placeholder for his personal story in his own words, plus real photos from his journey.",
    link: { href: "/about#story", label: "About the founder →" },
  },
  {
    q: "Is AfterCare a registered nonprofit?",
    a: "No — not yet. AfterCare is a social-impact project working toward nonprofit status. We do not collect tax-deductible donations, and the donate section is a placeholder until filing and a real processor are ready.",
    link: { href: "/about#transparency", label: "See the honest status →" },
  },
  {
    q: "Is the app free?",
    a: "Yes. Free forever for foster youth. It works in your browser, and you do not need a referral or caseworker to start.",
    link: { href: "/app", label: "Get help now →" },
  },
  {
    q: "Can AfterCare help me get a driver's license?",
    a: "Yes — driver's license and learner's permit help is a flagship program, with California DMV steps cited to official sources and a matching Quest in the app. Always confirm current rules on dmv.ca.gov.",
    link: { href: "/programs/drivers-license", label: "Driver's license program →" },
  },
  {
    q: "What areas does the Services directory cover?",
    a: "Today the directory is California-focused: 65 listings, a subset with their official page confirmed. The rest are labeled “Unverified — call to confirm.”",
    link: { href: "/services", label: "Find services →" },
  },
  {
    q: "Does AfterCare give legal or clinical advice?",
    a: "No. AfterCare navigates and connects you to resources. For clinical care, see a professional. For legal questions, talk to your attorney or legal aid. In a crisis, use 988, 211, Covenant House, Trevor Project, or 911.",
    link: { href: "/resources#crisis", label: "Crisis resources →" },
  },
  {
    q: "How can I get involved?",
    a: "Youth can open the app today. Caring adults can share it and help finish one task. Organizations can partner on the directory. Donations are not live yet — see the placeholder on Get involved.",
    link: { href: "/get-involved", label: "Get involved →" },
  },
  {
    q: "How do I contact AfterCare?",
    a: "There is no public email, phone, or mailing address yet. The fastest way to reach us is the app's chat.",
    link: { href: "/contact", label: "Contact page →" },
  },
  {
    q: "What if I am in danger right now?",
    a: "We are not a crisis line. Call or text 988. Nowhere to sleep: Covenant House 1-800-388-3888. LGBTQ+ youth: Trevor Project 1-866-488-7386. Dial 211 for local resources. If someone is being hurt, call 911.",
    link: null,
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
            Every answer comes from what is already true on this site. Where
            something is not live yet, we say so.
          </p>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
              {f.link && (
                <p>
                  <Link href={f.link.href}>{f.link.label}</Link>
                </p>
              )}
            </details>
          ))}
        </div>
      </section>

      <section className="mk-section mk-section-alt">
        <div className="mk-wrap">
          <p className="mk-kicker">Still stuck?</p>
          <h2 className="mk-h2">Ask in the app.</h2>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Get help now
            </Link>
            <Link href="/contact" className="mk-btn mk-btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
