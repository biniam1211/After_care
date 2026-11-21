/**
 * AfterCare — shared org-site chrome (marketing surfaces only).
 *
 * One nav / footer / crisis strip for every org page. The product app
 * (/app) uses components/app-shell.jsx and deliberately does NOT use this.
 * See docs/ARCHITECTURE-SEPARATION.md.
 */
import Link from "next/link";
import { SiteSearch } from "@/components/site-search";
import { QuickExit } from "@/components/quick-exit";

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
          border: "2px solid #1a120c",
          color: "#1a120c",
          background: "#f7e7b8",
          fontWeight: 800,
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
        border: "2px solid #9b1d1d",
        color: "#9b1d1d",
        fontWeight: 800,
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
        <b>In danger right now?</b> Call or text <a href="tel:988">988</a>{" "}
        (Suicide &amp; Crisis Lifeline). Nowhere to sleep? Covenant House{" "}
        <a href="tel:18003883888">1-800-388-3888</a>. LGBTQ+ youth: Trevor
        Project <a href="tel:18664887386">1-866-488-7386</a>. Crisis Text Line:{" "}
        text HOME to <a href="sms:741741">741741</a>. Runaway / leaving: National
        Runaway Safeline <a href="tel:18007862929">1-800-RUNAWAY</a>. Trafficking:
        National Human Trafficking Hotline{" "}
        <a href="tel:18883737888">1-888-373-7888</a>. Local help:{" "}
        <a href="tel:211">211</a>. If someone is being hurt, call{" "}
        <a href="tel:911">911</a>.
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/directory", label: "Directory" },
  { href: "/find", label: "Finder" },
  { href: "/programs", label: "Guides" },
  { href: "/for-supporters", label: "Supporters" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get involved" },
];

/** Sticky org navigation with Get help CTA. */
export function OrgNav() {
  return (
    <nav className="mk-nav" aria-label="Primary">
      <div className="mk-nav-crisis">
        Crisis? <a href="tel:988">988</a>
        {" · "}
        <a href="tel:18003883888">Covenant House</a>
        {" · "}
        <a href="tel:18664887386">Trevor</a>
        {" · "}
        <a href="sms:741741">Crisis Text 741741</a>
        {" · "}
        <a href="tel:18007862929">1-800-RUNAWAY</a>
        {" · "}
        <a href="tel:18883737888">Trafficking hotline</a>
        {" · "}
        <a href="tel:211">211</a>
      </div>
      <div className="mk-wrap">
        <div className="mk-nav-inner">
          <Link href="/" className="mk-brand">
            AfterCare<i>.</i>
          </Link>
          <span className="mk-brand-tag">Built by foster kids, for foster kids</span>
          <div className="mk-nav-search">
            <SiteSearch compact />
          </div>
          <ul className="mk-nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/app" className="mk-btn mk-btn-primary mk-nav-cta">
            Ask
          </Link>
          <details className="mk-nav-menu">
            <summary aria-label="Open menu">Menu</summary>
            <div className="mk-nav-menu-panel">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href="/services">Legacy services</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/app">Ask AfterCare</Link>
            </div>
          </details>
        </div>
      </div>
      <QuickExit />
    </nav>
  );
}

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/directory", label: "Resource directory" },
      { href: "/find", label: "What do you need?" },
      { href: "/programs", label: "All guides" },
      { href: "/about", label: "About" },
      { href: "/for-supporters", label: "For supporters" },
    ],
  },
  {
    heading: "Get help",
    links: [
      { href: "/app", label: "Ask AfterCare" },
      { href: "/directory?need=crisis", label: "Crisis lines" },
      { href: "/directory?need=ilp", label: "County ILP contacts" },
      { href: "/programs/drivers-license", label: "Driver's license" },
      { href: "/programs/foster-youth-bill-of-rights", label: "Bill of Rights" },
      { href: "/programs/extended-foster-care", label: "AB 12" },
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
        <div className="mk-footer-grid">
          <div>
            <span className="mk-brand" style={{ color: "#f3e6cc" }}>
              AfterCare<i>.</i>
            </span>
            <p style={{ marginTop: 12 }}>
              The life navigator built by foster kids, for foster youth — every
              &ldquo;how do I adult&rdquo; step in one place. {ORG_STATUS} Free
              forever for foster youth.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mk-footer-meta">
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
