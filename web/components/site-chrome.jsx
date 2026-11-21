/**
 * AfterCare — shared org-site chrome (marketing surfaces only).
 *
 * One nav / footer / crisis strip for every org page. The product app
 * (/app) uses components/app-shell.jsx and deliberately does NOT use this.
 * See docs/ARCHITECTURE-SEPARATION.md.
 */
import Link from "next/link";

/** Honest org status — never claim registered nonprofit / 501(c)(3). */
export const ORG_STATUS =
  "A social-impact project working toward nonprofit status.";

export const VERIFIED_MEANING =
  "Verified means we confirmed the organisation's official page. It does not mean the phone line was tested live — hours and who they serve still change, so call ahead.";

export const UNVERIFIED_LABEL = "Unverified — call to confirm";

/**
 * Resource verification label.
 * @param {{ verified: boolean }} props
 */
export function VerificationBadge({ verified }) {
  if (verified) {
    return (
      <span
        style={{
          border: "1.5px solid #06283d",
          color: "#06283d",
          fontWeight: 700,
          fontSize: 12,
          padding: "5px 10px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        ✓ Verified listing
      </span>
    );
  }
  return (
    <span
      style={{
        border: "1.5px solid #b42318",
        color: "#b42318",
        fontWeight: 700,
        fontSize: 12,
        padding: "5px 10px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {UNVERIFIED_LABEL}
    </span>
  );
}

/** Persistent crisis numbers on every org page. */
export function CrisisStrip() {
  return (
    <div className="mk-crisis" role="region" aria-label="Crisis hotlines">
      <div className="mk-wrap">
        <b>In danger right now?</b> Call or text <b>988</b> (Suicide &amp;
        Crisis Lifeline, 24/7). Nowhere to sleep tonight? Covenant House is{" "}
        <b>1-800-388-3888</b>. LGBTQ+ youth crisis support: The Trevor Project{" "}
        <b>1-866-488-7386</b>. Community resources: dial <b>211</b>. If someone
        is being hurt, call <b>911</b>.
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/start-here", label: "Start here" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/resources", label: "Resources" },
  { href: "/research", label: "Research" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/** Sticky org navigation with Get help CTA. */
export function OrgNav() {
  return (
    <nav className="mk-nav" aria-label="Primary">
      <div className="mk-nav-crisis">
        Crisis? <a href="tel:988">988</a>
        {" · "}
        <a href="tel:18003883888">Covenant House 1-800-388-3888</a>
        {" · "}
        <a href="tel:18664887386">Trevor Project</a>
        {" · "}
        <a href="tel:211">211</a>
      </div>
      <div className="mk-wrap">
        <div className="mk-nav-inner">
          <Link href="/" className="mk-brand">
            AfterCare<i>.</i>
          </Link>
          <span className="mk-brand-sub">Built by foster kids, for foster kids</span>
          <div className="mk-nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/app" className="mk-nav-cta">
            Get help now
          </Link>
          <details className="mk-menu">
            <summary className="mk-menu-btn" aria-label="Open menu">
              Menu
            </summary>
            <div className="mk-menu-panel">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href="/services">Find services</Link>
              <Link href="/download">Download</Link>
              <Link href="/app">Get help now</Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/start-here", label: "Start here" },
      { href: "/about", label: "About" },
      { href: "/programs", label: "Programs" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/research", label: "Research" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    heading: "Get help",
    links: [
      { href: "/app", label: "Open the app" },
      { href: "/resources", label: "Resources hub" },
      { href: "/services", label: "Find services" },
      { href: "/programs/drivers-license", label: "Driver's license help" },
      { href: "/programs/vital-documents", label: "Vital documents" },
      { href: "/download", label: "Download" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/get-involved", label: "Volunteer & partner" },
      { href: "/get-involved#donate", label: "Donate (placeholder)" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy (draft)" },
      { href: "/terms", label: "Terms (draft)" },
    ],
  },
];

/** Site footer for org pages. */
export function OrgFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-wrap">
        <div className="mk-footer-cols">
          <div className="mk-footer-brand">
            <span className="mk-brand">
              AfterCare<i>.</i>
            </span>
            <p>
              The AI life navigator built by foster kids, for foster youth —
              every &ldquo;how do I adult&rdquo; step in one place. {ORG_STATUS}{" "}
              Free forever for foster youth.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="mk-footer-col">
              <b>{col.heading}</b>
              {col.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mk-footer-base">
          <span>
            © {new Date().getFullYear()} AfterCare · Founded by Biniam Efrem ·
            Free forever for foster youth
          </span>
          <p>
            Privacy &amp; Terms are plain-English drafts, not yet reviewed by a
            lawyer. Resource listings marked &ldquo;Unverified — call to
            confirm&rdquo; have not had their details confirmed yet — call ahead
            before you rely on one. AfterCare does not provide clinical or legal
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
