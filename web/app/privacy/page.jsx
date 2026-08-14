import { LegalPage, Contact } from "@/components/legal-page";
import "../marketing.css";

export const metadata = {
  title: "Privacy",
  description:
    "What AfterCare collects, what it never does with it, and how to delete it. We never sell your data and we never show ads.",
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="13 August 2026">
      <h2>The short version</h2>
      <ul>
        <li>
          <strong>We never sell your data.</strong> Not to anyone, not ever.
        </li>
        <li>
          <strong>No ads.</strong> There is nothing to advertise to you here.
        </li>
        <li>
          <strong>We don&rsquo;t report you to anyone.</strong> Telling AfterCare
          something hard does not trigger a call to a caseworker, a court, or the
          police. It gives you resources.
        </li>
        <li>
          <strong>You can use it without an account.</strong> No email, no phone
          number, no sign-up wall.
        </li>
        <li>
          <strong>You can wipe everything</strong> from Settings, on your device,
          in one tap.
        </li>
      </ul>

      <h2>What we actually collect</h2>
      <p>
        By default, <strong>nothing leaves your phone</strong>. What you tell
        onboarding — a name or nickname, your ZIP, your age range, where you are
        with foster care, and how you like things explained — is stored in your
        browser&rsquo;s local storage on your own device. Your quest progress
        lives there too.
      </p>
      <p>
        We do not ask for your phone number, your address, your Social Security
        number, or any documents.
      </p>

      <h2>When something does leave your device</h2>
      <ul>
        <li>
          <strong>Questions you send the AI.</strong> Your message goes to
          Anthropic&rsquo;s Claude API so it can answer, along with your ZIP and
          your explain-it-like-this preference so the answer fits you. Your name
          is not sent.
        </li>
        <li>
          <strong>Messages you choose to send a caseworker.</strong> Only when
          you tap send, only to the address you entered yourself.
        </li>
        <li>
          <strong>If you sign in.</strong> Signing in is optional and exists so
          your progress follows you to another device. It stores your email
          address, a login session, and the same profile and quest progress
          described above.
        </li>
        <li>
          <strong>Basic server logs.</strong> Whether a reply succeeded or
          errored, so we can tell when the app is broken. Not the content of what
          you asked.
        </li>
      </ul>

      <h2>The AI, plainly</h2>
      <p>
        AfterCare is <strong>an AI, not a person</strong>, and it says so on the
        first screen. It is not a lawyer, a doctor, a therapist, or a caseworker.
        It can be wrong. For anything that matters, check with a real
        professional — and in an emergency call 988 or 911 rather than typing.
      </p>
      <p>
        The AI can only point you at resources from a checked list. It cannot
        invent a hotline or an address, because the list of what it is allowed to
        recommend is fixed and checked again on our server before it reaches you.
      </p>

      <h2>Deleting your data</h2>
      <p>
        Settings → <strong>Reset everything</strong> clears what is on your
        device and, if you signed in, signs you out and ends that session. To
        have a signed-in account and its stored progress deleted entirely, ask
        and it will be done: <Contact />.
      </p>

      <h2>Age</h2>
      <p>
        AfterCare is built for youth 14 and older. We do not knowingly collect
        anything from children under 13.
      </p>

      <h2>California rights</h2>
      <p>
        If you live in California you have the right to know what we hold, to
        correct it, and to have it deleted. We do not sell or share personal
        information as those terms are used under the CCPA/CPRA. To exercise any
        of this: <Contact />.
      </p>

      <h2>Changes</h2>
      <p>
        If this changes, the date at the top changes and the new version is
        posted here.
      </p>
    </LegalPage>
  );
}
