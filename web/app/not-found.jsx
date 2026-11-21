import Link from "next/link";
import { OrgNav, CrisisStrip, OrgFooter } from "@/components/site-chrome";
import "./marketing.css";

export const metadata = { title: "Page not found" };

/**
 * Strong 404 — still carries crisis help and paths into directory / My Plan / Ask.
 */
export default function NotFound() {
  return (
    <div className="mk">
      <OrgNav />

      <section className="mk-page-hero" style={{ minHeight: "58vh" }}>
        <div className="mk-wrap">
          <p className="mk-kicker">404</p>
          <h1 className="mk-h1">
            That page isn&rsquo;t here. <em>Help still is.</em>
          </h1>
          <p className="mk-deck">
            The link may be old, or we moved something. Pick a path below — or
            dial <a href="tel:211">211</a> / <a href="tel:988">988</a> if you need
            a person now.
          </p>
          <div className="mk-cta-row">
            <Link href="/directory" className="mk-btn mk-btn-primary">
              Resource directory
            </Link>
            <Link href="/my-plan" className="mk-btn mk-btn-ghost">
              My Plan
            </Link>
            <Link href="/map" className="mk-btn mk-btn-ghost">
              County map
            </Link>
            <Link href="/app" className="mk-btn mk-btn-ghost">
              Ask AfterCare
            </Link>
            <Link href="/" className="mk-btn mk-btn-ghost">
              Home
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
