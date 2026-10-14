import Link from "next/link";
import { OrgNav, CrisisStrip, OrgFooter } from "@/components/site-chrome";
import "./marketing.css";

export const metadata = { title: "Page not found" };

// A 404 is a dead end, and someone can land here from a stale link at a bad
// moment. So it points at the app and still carries the crisis numbers rather
// than just saying "not found".

export default function NotFound() {
  return (
    <div className="mk">
      <OrgNav />

      <section className="mk-final" style={{ minHeight: "58vh", display: "flex", alignItems: "center" }}>
        <div className="mk-wrap">
          <p className="mk-kicker">404</p>
          <h1 className="mk-h2" style={{ margin: "0 auto" }}>
            That page isn&rsquo;t here.
          </h1>
          <p className="mk-lead" style={{ margin: "20px auto 0" }}>
            The link may be old, or we may have moved something. Whatever you
            came looking for, the app is the fastest way to find it.
          </p>
          <div className="mk-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app
            </Link>
            <Link href="/" className="mk-btn mk-btn-ghost">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
