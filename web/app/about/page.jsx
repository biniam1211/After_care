import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "About AfterCare — Built by a foster kid, for foster kids",
  description:
    "AfterCare is a free AI life navigator for youth aging out of foster care, built by someone who lived it. Our mission, our story, and what we believe.",
};

export default function About() {
  return (
    <SiteShell>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "#8fd0ff" }}>Our story</p>
          <h1>Built by a foster kid, for foster kids.</h1>
          <p>
            Most tools for foster youth are built by people who’ve never lived it. AfterCare
            isn’t one of them.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose">
          <h2>The problem we know firsthand</h2>
          <p>
            When you turn 18 in foster care, the support often just… stops. No parent to co-sign a
            lease, explain a W-2, or sit with you before a court date. You’re handed a stack of
            paperwork and a lot of “you should really look into that,” and expected to figure out
            adulthood overnight — usually while moving, switching schools, or couch-surfing.
          </p>
          <p>
            The information you need exists. It’s just scattered across dozens of agencies, buried
            in PDFs, and written in a language nobody taught you. By the time you find it, the
            deadline’s passed.
          </p>

          <h2>What AfterCare is</h2>
          <p>
            AfterCare is a free app that works like the parent you should’ve had for this part —
            an older sibling who’s been through it and actually knows the system. Ask it anything,
            and it gives you a real answer, the next few steps, and help that’s actually near you.
            When a task is big and scary, it breaks it into small wins and checks in on you.
          </p>
          <p>
            It’s not a search engine and it’s not a caseworker’s form. It’s in your pocket, it
            answers at 2 a.m., and it never makes you feel stupid for asking.
          </p>

          <h2>What we believe</h2>
          <ul>
            <li><strong>You’re not a case number.</strong> You’re a person figuring out a hard thing, and you deserve a straight answer.</li>
            <li><strong>Accuracy over everything.</strong> A dead phone number or wrong advice can cost you a bed for the night. We’d rather say “I’m not sure” than guess.</li>
            <li><strong>Your information is yours.</strong> We don’t sell it. Ever. (See our <Link href="/privacy">privacy policy</Link>.)</li>
            <li><strong>Free, because this shouldn’t cost you anything.</strong></li>
          </ul>

          <div className="disclaimer" style={{ marginTop: 30 }}>
            <span>⚠️</span>
            <span>
              AfterCare gives information and guidance, not legal, medical, or mental-health advice.
              For your specific situation, talk to a lawyer, doctor, or counselor. In an emergency,
              call <strong>911</strong>, or <strong>988</strong> for the Suicide &amp; Crisis Lifeline.
            </span>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="band">
            <h2>Want to help us reach more youth?</h2>
            <p>Whether you’re a former foster youth, a caseworker, an agency, or a funder — there’s a place for you here.</p>
            <div className="cta-row">
              <Link href="/partners" className="btn btn-primary btn-lg">For partners &amp; funders</Link>
              <Link href="/contact" className="btn btn-on-dark btn-lg">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
