import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import NewsletterForm from "@/components/site/NewsletterForm";

export const metadata = {
  title: "Get Involved — AfterCare",
  description:
    "Donate, partner, volunteer, or spread the word. However you can help, you can keep a free AI life navigator in the hands of every youth aging out of foster care.",
};

const WAYS = [
  { tag: "Agencies & funders", title: "Partner with us", text: "Caseworkers, schools, nonprofits, and funders: extend your reach with a 24/7 navigator for every youth you serve.", cta: "For partners & funders →", href: "/partners" },
  { tag: "Everyone", title: "Spread the word", text: "The best outcomes start with someone saying “try this.” Share AfterCare with a youth or a worker who needs it.", cta: "Open the app to share →", href: "/app" },
  { tag: "Volunteers", title: "Keep resources real", text: "Help us verify local resources so no youth hits a dead number, or mentor someone finding their footing.", cta: "Email to volunteer →", href: "mailto:hello@aftercare.app?subject=Volunteering%20with%20AfterCare" },
  { tag: "Builders", title: "Careers", text: "We’re small and growing. If building this is your kind of mission, we’d love to hear from you.", cta: "See careers →", href: "/careers" },
];

export default function GetInvolved() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>Get involved</p>
          <h1>Be the reason a kid doesn’t fall through.</h1>
          <p>AfterCare is free for youth — and stays that way because people like you step up. Here’s how to help.</p>
        </div>
      </section>

      {/* Donate */}
      <section className="section" id="donate">
        <div className="wrap">
          <div className="story" style={{ background: "var(--sun-soft)" }}>
            <div>
              <span className="tag" style={{ display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sun-deep)", background: "#fff", padding: "4px 10px", borderRadius: 999 }}>Coming soon</span>
              <h2 style={{ marginTop: 12 }}>Donations open soon.</h2>
              <p className="lede" style={{ marginTop: 10 }}>
                We’re finishing our nonprofit setup so every dollar goes straight to keeping
                AfterCare free — covering AI costs, verifying resources, and reaching new regions.
                Get on the list and you’ll be the first to know when giving opens.
              </p>
            </div>
            <div>
              <NewsletterForm />
              <p style={{ color: "var(--ink-soft)", fontSize: 13.5, marginTop: 12 }}>
                Prefer to give now or sponsor directly? Email{" "}
                <a href="mailto:hello@aftercare.app" style={{ color: "var(--green-press)", fontWeight: 600 }}>hello@aftercare.app</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to help */}
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">More ways to help</p>
          <h2>However you can show up, there’s a lane for it.</h2>
          <div className="grid grid-2" style={{ marginTop: 34 }}>
            {WAYS.map((w) => (
              <div className="help-card" key={w.title}>
                <span className="tag">{w.tag}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <Link href={w.href} className="cta">{w.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Not sure where you fit? Just reach out.</h2>
            <p>Tell us who you are and how you’d like to help — we read every message.</p>
            <div className="cta-row">
              <Link href="/contact" className="btn btn-donate btn-lg">Contact us →</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
