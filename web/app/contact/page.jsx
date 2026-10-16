import Link from "next/link";
import { OrgNav, OrgFooter, CrisisStrip } from "@/components/site-chrome";
import { Contact } from "@/components/legal-page";

export const metadata = {
  title: "Contact",
  description:
    "How to reach AfterCare. No public email, phone, or mailing address yet — a contact address is being set up, and the app's chat reaches us today.",
  openGraph: {
    title: "Contact · AfterCare",
    description:
      "How to reach AfterCare. No public email, phone, or mailing address yet — a contact address is being set up, and the app's chat reaches us today.",
    type: "website",
  },
};

// ───────────────────────────────────────────────────────────
// AfterCare — /contact (org surface)
//
// Honest status page. There is no public email, phone number, or
// mailing address yet — no page may invent one. The contact address
// is being set up; until it is live, the app's chat is the way to
// reach us (see Contact in components/legal-page.jsx).
// ───────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Contact</p>
          <h1 className="mk-h1">
            Reach us through the <em>app&rsquo;s chat.</em>
          </h1>
          <p className="mk-deck">
            There is no public email, phone number, or mailing address yet.
            That is the honest state of things — we would rather say so than
            print a contact that goes nowhere.
          </p>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — How to reach us</p>
          <h2 className="mk-h2">The way that works today.</h2>
          <p className="mk-lead">
            To contact us, <Contact />. Someone on the team reads it.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app →
            </Link>
            <Link href="/faq" className="mk-btn mk-btn-ghost">
              Questions? See the FAQ
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — Sharing a story</p>
          <h2 className="mk-h2">Stories go through the same door.</h2>
          <p className="mk-lead">
            To share your story for the Stories page, read the consent rules
            first — your photo, your words, your permission, and a
            parent/guardian&rsquo;s permission if you are under 18 — then
            reach us through the app&rsquo;s chat.
          </p>
          <Link href="/stories#share">How sharing a story works →</Link>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — Urgent help</p>
          <h2 className="mk-h2">If you need help right now, don&rsquo;t wait on us.</h2>
          <p className="mk-lead">
            We are not a crisis line and we do not monitor messages around
            the clock. If you are in danger, call or text 988. If you have
            nowhere to sleep tonight, Covenant House California is
            1-800-388-3888. If someone is being hurt, call 911.
          </p>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
