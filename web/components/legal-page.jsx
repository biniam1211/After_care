import Link from "next/link";
import { Logo } from "@/components/onboarding";

// Shared chrome for /privacy and /terms so the legal pages look like the rest
// of the site rather than a naked wall of text.

/**
 * Contact address shown in the legal pages. Set CONTACT_EMAIL in the
 * environment before launch — until then the pages say plainly that a contact
 * route is still being set up, which is truthful, rather than printing a
 * mailto: link that bounces.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || null;

export function Contact() {
  if (CONTACT_EMAIL) {
    return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  }
  return (
    <span>
      a contact address is being set up — until it is live, raise anything
      through the app&rsquo;s chat and it will reach us
    </span>
  );
}

export function LegalPage({ title, updated, children }) {
  return (
    <div className="mk">
      <nav className="mk-nav">
        <div className="mk-wrap mk-nav-inner">
          <Link href="/" className="mk-brand">
            <Logo size={34} r={10} />
            AfterCare
          </Link>
          <Link href="/app" className="mk-btn mk-btn-ghost" style={{ marginLeft: "auto" }}>
            Open the app
          </Link>
        </div>
      </nav>

      <main className="mk-wrap mk-legal">
        <h1>{title}</h1>
        <p className="mk-updated">Last updated {updated}</p>

        <div className="mk-note">
          <strong>Plain-English draft, not yet reviewed by a lawyer.</strong> It
          describes honestly what AfterCare actually does with your information
          today. It will be reviewed before we ask anyone to rely on it.
        </div>

        {children}
      </main>

      <div className="mk-crisis">
        <div className="mk-wrap">
          <strong>In danger right now?</strong> Call or text <strong>988</strong>{" "}
          (Suicide &amp; Crisis Lifeline, 24/7). Nowhere to sleep tonight? Covenant
          House California is <strong>1-800-388-3888</strong>. If someone is being
          hurt, call <strong>911</strong>.
        </div>
      </div>

      <footer className="mk-footer">
        <div className="mk-wrap mk-footer-inner">
          <span>© {new Date().getFullYear()} AfterCare · Free forever for foster youth</span>
          <span>
            <Link href="/">Home</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
