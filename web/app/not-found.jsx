import Link from "next/link";
import { Logo } from "@/components/onboarding";
import "./marketing.css";

export const metadata = { title: "Page not found" };

// A 404 is a dead end, and someone can land here from a stale link at a bad
// moment. So it points at the app and still carries the crisis numbers rather
// than just saying "not found".

export default function NotFound() {
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

      <section className="mk-final" style={{ minHeight: "58vh", display: "flex", alignItems: "center" }}>
        <div className="mk-wrap">
          <p className="mk-kicker" style={{ color: "#7ec8ff" }}>404</p>
          <h1 className="mk-h2" style={{ color: "#fff", margin: "0 auto" }}>
            That page isn&rsquo;t here.
          </h1>
          <p className="mk-lead" style={{ margin: "20px auto 0", color: "rgba(255,255,255,.74)" }}>
            The link may be old, or we may have moved something. Whatever you
            came looking for, the app is the fastest way to find it.
          </p>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-primary">
              Open the app
            </Link>
            <Link href="/" className="mk-btn mk-btn-ghost" style={{ height: 50, padding: "0 24px", fontSize: 16 }}>
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>

      <div className="mk-crisis">
        <div className="mk-wrap">
          <strong>In danger right now?</strong> Call or text <strong>988</strong>{" "}
          (Suicide &amp; Crisis Lifeline, 24/7). Nowhere to sleep tonight? Covenant
          House California is <strong>1-800-388-3888</strong>. If someone is being
          hurt, call <strong>911</strong>.
        </div>
      </div>
    </div>
  );
}
