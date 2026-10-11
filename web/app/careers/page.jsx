import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "Careers — AfterCare",
  description:
    "AfterCare is small and growing. If building a free life navigator for foster youth is your kind of mission, we'd love to hear from you.",
};

export default function Careers() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#bfe8cf" }}>Careers</p>
          <h1>Build something that matters.</h1>
          <p>AfterCare is early and small. We don’t have formal openings posted yet — but the right people find us early.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose">
          <h2>Who we’re looking for</h2>
          <p>
            People who care about foster youth and sweat the details — because in this work, a wrong
            phone number or a confusing step has real consequences. Especially valuable:
          </p>
          <ul>
            <li>Engineers and designers who build fast and humanely.</li>
            <li>People with lived experience of foster care.</li>
            <li>Social workers and youth advocates who know the system from the inside.</li>
            <li>Partnerships, fundraising, and resource-curation people.</li>
          </ul>

          <h2>No open roles yet — reach out anyway</h2>
          <p>
            If this is your kind of mission, tell us who you are and how you’d want to help. We keep
            every note and reach back out as we grow.
          </p>
          <p>
            <a href="mailto:hello@aftercare.app?subject=Joining%20AfterCare" className="btn btn-primary" style={{ textDecoration: "none" }}>Introduce yourself →</a>
          </p>
          <p style={{ marginTop: 18 }}>
            Not looking for a role but want to help? See <Link href="/get-involved">ways to get involved</Link>.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
