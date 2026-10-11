import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "Terms of Use — AfterCare",
  description: "The plain-language terms for using AfterCare, the free AI life navigator for foster youth.",
};

// NOTE for the team: plain-language terms written in good faith. Have a lawyer review
// before public launch; keep "Last updated" current.
export default function Terms() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <h1>Terms of Use</h1>
          <p>The deal between you and AfterCare, in plain language.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose">
          <p style={{ color: "var(--ink-faint)" }}>Last updated: {new Date().getFullYear()}. A plain-language summary written in good faith — not legal advice.</p>

          <h2>What AfterCare is</h2>
          <p>
            AfterCare is a free tool that gives you information, guidance, and local resources to help
            you navigate life during and after foster care. It’s here to help you understand your
            options and take the next step.
          </p>

          <h2>What AfterCare isn’t</h2>
          <p>
            AfterCare is <strong>not a lawyer, doctor, therapist, or caseworker</strong>, and nothing in
            it is legal, medical, or mental-health advice. For decisions about your specific situation,
            talk to a qualified professional. We do our best to be accurate, but we can’t guarantee every
            detail is complete or current — always confirm important information (like a benefit deadline)
            with the official source.
          </p>

          <h2>Emergencies</h2>
          <p>
            AfterCare is not an emergency service. If you’re in danger, call <strong>911</strong>. To talk
            to someone right now, call or text <strong>988</strong>, the Suicide &amp; Crisis Lifeline.
          </p>

          <h2>Using AfterCare fairly</h2>
          <ul>
            <li>Use it for its purpose — getting help and helping others get help.</li>
            <li>Don’t misuse it, try to break it, or use it to harm anyone.</li>
            <li>Information you store is your responsibility to keep accurate.</li>
          </ul>

          <h2>Your content</h2>
          <p>
            What you put into AfterCare stays yours. You give us permission to use it only to provide the
            service to you (see the <a href="/privacy">Privacy Policy</a>).
          </p>

          <h2>Changes</h2>
          <p>
            We’ll improve AfterCare over time, and may update these terms. If we make a meaningful change,
            we’ll do our best to let you know.
          </p>

          <h2>Questions</h2>
          <p>Email <a href="mailto:hello@aftercare.app">hello@aftercare.app</a>.</p>
        </div>
      </section>
    </SiteShell>
  );
}
