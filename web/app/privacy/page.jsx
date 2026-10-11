import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "Privacy Policy — AfterCare",
  description: "How AfterCare handles your information: what we collect, why, and the promises we keep. Plain language.",
};

// NOTE for the team: plain-language policy written in good faith. Because AfterCare
// serves minors and handles sensitive data, have this reviewed by a lawyer before
// public launch, and keep the "Last updated" date current.
export default function Privacy() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <h1>Privacy Policy</h1>
          <p>Your information is yours. Here’s exactly how we treat it.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose">
          <p style={{ color: "var(--ink-faint)" }}>Last updated: {new Date().getFullYear()}. This is a plain-language summary written in good faith; it isn’t a contract or legal advice.</p>

          <h2>The short version</h2>
          <ul>
            <li>We collect only what the app needs to help you.</li>
            <li>We <strong>never sell</strong> your information.</li>
            <li>You control what you save, and you can delete it.</li>
            <li>We use AI to answer your questions; be mindful of what you share in chat.</li>
          </ul>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Profile basics</strong> you give us — like your ZIP code, age range, and where you are in the system — so answers and resources fit you.</li>
            <li><strong>Your activity in the app</strong> — quests you start, steps you complete, reminders you set.</li>
            <li><strong>Messages you send the AI navigator</strong>, so it can help and keep context.</li>
            <li><strong>Documents you choose to store</strong> in your vault.</li>
            <li><strong>Basic technical data</strong> (like a sign-in token) needed to run the service securely.</li>
          </ul>

          <h2>How we use it</h2>
          <p>To give you accurate, local, personalized help; to save your progress; to send reminders you ask for; and to keep the service working and safe. That’s it.</p>

          <h2>What we don’t do</h2>
          <ul>
            <li>We don’t sell or rent your data to anyone.</li>
            <li>We don’t show you ads.</li>
            <li>We don’t share your information with your caseworker, agency, or anyone else unless you ask us to, or the law requires it (for example, a genuine safety emergency).</li>
          </ul>

          <h2>AI &amp; your messages</h2>
          <p>
            Your chat is answered using an AI model. We send your message (and relevant context) to a
            trusted AI provider to generate a reply. Please don’t share more sensitive detail than you
            need to, and remember the AI gives information — not legal, medical, or mental-health advice.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>You decide what to save to your account.</li>
            <li>You can ask us to delete your data.</li>
            <li>You can use much of the app without creating an account.</li>
          </ul>

          <h2>Youth &amp; families</h2>
          <p>
            AfterCare is designed for young people in and leaving foster care, including minors. We aim
            to collect as little as possible and to treat that information with extra care.
          </p>

          <h2>Questions</h2>
          <p>Email us at <a href="mailto:hello@aftercare.app">hello@aftercare.app</a> and we’ll help.</p>

          <div className="disclaimer" style={{ marginTop: 26 }}>
            <span>⚠️</span>
            <span>In an emergency, call <strong>911</strong>, or <strong>988</strong> for the Suicide &amp; Crisis Lifeline.</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
