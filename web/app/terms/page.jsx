import { LegalPage, Contact } from "@/components/legal-page";
import "../marketing.css";

export const metadata = {
  title: "Terms",
  description:
    "The rules for using AfterCare, in plain language. It is free, it is informational, and it is not a substitute for a professional.",
};

export default function Terms() {
  return (
    <LegalPage title="Terms" updated="13 August 2026">
      <h2>What AfterCare is</h2>
      <p>
        A free app that helps foster and former-foster youth work out the
        grown-up things nobody explained — money, housing, school, health,
        benefits, paperwork — using an AI assistant and a checked list of real
        resources.
      </p>
      <p>
        It is <strong>free for youth, permanently</strong>. There is no trial, no
        paid tier, and nothing to buy.
      </p>

      <h2>What it is not</h2>
      <p>
        AfterCare is <strong>not professional advice</strong>. It is not a
        lawyer, a doctor, a therapist, a financial advisor, or a caseworker, and
        it does not replace one. The AI can be wrong or out of date. Check
        anything important with a qualified person before you act on it.
      </p>
      <p>
        It is also <strong>not an emergency service</strong>. Nobody is
        monitoring your messages waiting to respond. If you are in danger, call{" "}
        <strong>911</strong>. If you are in crisis, call or text{" "}
        <strong>988</strong>.
      </p>

      <h2>About the resources we list</h2>
      <p>
        The organisations listed are real and independent of us. We check that
        the organisation and its official page are genuine, but we do not run
        them and cannot promise their hours, their funding, their eligibility
        rules, or that they can help you specifically. Call ahead where you can.
        If something we list is wrong or dead, tell us and we will fix it.
      </p>

      <h2>Who can use it</h2>
      <p>
        You should be 14 or older. You do not need an account, a caseworker&rsquo;s
        permission, or proof of anything to use the app.
      </p>

      <h2>Your account, if you make one</h2>
      <p>
        Signing in is optional and only exists so your progress follows you
        between devices. Keep access to your email secure, since that is how
        signing in works. You can stop using AfterCare and delete everything at
        any time.
      </p>

      <h2>Fair use</h2>
      <p>
        Please don&rsquo;t attack the service, try to break its security, or use
        it to harm someone else. Beyond that, use it however helps.
      </p>

      <h2>No warranty</h2>
      <p>
        AfterCare is provided &ldquo;as is&rdquo;, without warranties of any
        kind. To the fullest extent the law allows, we are not liable for damages
        arising from using the app or relying on information in it. Some places
        do not allow those limits, in which case they apply to you only as far as
        the law permits.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change as the app does. The date at the top will change
        with them, and the current version always lives here.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, corrections, or a resource that let you down: <Contact />.
      </p>
    </LegalPage>
  );
}
