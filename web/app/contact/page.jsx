import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/site/Icon";

export const metadata = {
  title: "Contact — AfterCare",
  description:
    "Get in touch with AfterCare — youth, caseworkers, agencies, funders, and press. We read every message.",
};

// NOTE: placeholder address — replace with your real inbox before launch.
const EMAIL = "hello@aftercare.app";

export default function Contact() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#8fd0ff" }}>Contact</p>
          <h1>Let’s talk.</h1>
          <p>Youth, caseworkers, agencies, funders, press — whoever you are, we’d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-2" style={{ gap: 40, alignItems: "start" }}>
          <div className="prose" style={{ maxWidth: "unset" }}>
            <h2>Email us</h2>
            <p>
              The fastest way to reach us is email. We read every message and reply like humans —
              not a ticket system.
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="btn btn-primary" style={{ textDecoration: "none" }}>
                <Icon name="mail" size={18} /> {EMAIL}
              </a>
            </p>
            <p style={{ marginTop: 24 }}>
              Working with foster youth and want to partner or fund the work? Start on the{" "}
              <Link href="/partners">partners page</Link> — it’ll tell us how best to help you.
            </p>
          </div>

          <div className="card">
            <h3>If you need help right now</h3>
            <p style={{ color: "var(--ink-soft)" }}>
              This inbox isn’t monitored 24/7, so please don’t use it in an emergency.
            </p>
            <ul style={{ listStyle: "none", display: "grid", gap: 12, marginTop: 14 }}>
              <li><strong>911</strong> — if you’re in immediate danger.</li>
              <li><strong>988</strong> — call or text the Suicide &amp; Crisis Lifeline, free &amp; confidential.</li>
              <li><strong>1-800-RUNAWAY</strong> — the National Runaway Safeline.</li>
            </ul>
            <p style={{ marginTop: 16 }}>
              <Link href="/app" className="btn btn-ghost">Open the app’s Panic button →</Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
