import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import NewsletterForm from "@/components/site/NewsletterForm";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "Stories — AfterCare",
  description:
    "Real stories from youth aging out of foster care and the people walking with them. Coming soon — and we'd love to share yours.",
};

export default function Stories() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>Stories</p>
          <h1>Small steps. Big changes.</h1>
          <p>The reason AfterCare exists is the people it’s for. As youth share their wins, we’ll share them here — with their permission, in their words.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="story" style={{ display: "block", textAlign: "center", padding: "48px 32px" }}>
            <div className="chip-icon bg-warm" style={{ width: 64, height: 64, margin: "0 auto", borderRadius: 999 }}><Icon name="sun" size={30} /></div>
            <h2 style={{ marginTop: 12 }}>Stories are coming soon.</h2>
            <p className="lede" style={{ margin: "12px auto 0" }}>
              AfterCare is new, so we’re not going to invent testimonials. Real stories — from youth,
              caseworkers, and volunteers — will live here as they happen.
            </p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap grid grid-2" style={{ gap: 40, alignItems: "center" }}>
          <div>
            <p className="eyebrow">Share yours</p>
            <h2 style={{ fontSize: 30 }}>Been through it? Your story could help someone else.</h2>
            <p className="lede" style={{ marginTop: 12 }}>
              If AfterCare helped — or if you just want other foster youth to hear from someone who
              gets it — we’d be honored to share your story. Always with your consent, always your call.
            </p>
            <Link href="mailto:hello@aftercare.app?subject=My%20AfterCare%20story" className="btn btn-primary" style={{ marginTop: 18 }}>Share your story →</Link>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--display)", color: "var(--green-deep)", fontSize: 22, marginBottom: 10 }}>Get updates</h3>
            <p style={{ color: "var(--ink-soft)", marginBottom: 14 }}>Be the first to read new stories and see what’s next.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
