import { OrgNav, OrgFooter, CrisisStrip } from "@/components/site-chrome";

// Shared chrome for /privacy and /terms so the legal pages look like the rest
// of the site rather than a naked wall of text. Nav/footer/crisis strip come
// from components/site-chrome.jsx — the single shared org chrome.

/**
 * Contact address shown in the legal pages. Set CONTACT_EMAIL in the
 * environment before launch — until then the pages say plainly that
 * the app's chat is the way to reach us, rather than printing a
 * mailto: link that bounces.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || null;

export function Contact() {
  if (CONTACT_EMAIL) {
    return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  }
  return (
    <span>
      reach us through the app&rsquo;s chat and it will reach us
    </span>
  );
}

export function LegalPage({ title, updated, children }) {
  return (
    <div className="mk">
      <OrgNav />

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

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
