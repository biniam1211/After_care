import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "Research",
  description:
    "AfterCare research & policy context: the accessibility gap, Executive Order 14359, the ED Foster Care Transition Toolkit, FosterClub context, and what we measure — without invented statistics.",
  openGraph: {
    title: "Research · AfterCare",
    description:
      "The accessibility gap, federal policy and transition guides, and how AfterCare approaches the problem.",
    type: "website",
  },
};

const PRINCIPLES = [
  { t: "Phone-first.", b: "Everything lives where young people already are — on their phone, in plain language." },
  { t: "Answers, then action.", b: "Knowing isn’t doing. Every answer ends in steps that finish a real task." },
  { t: "Never invented.", b: "The navigator recommends only from a fixed catalog of real listings — it cannot invent a hotline or an office." },
  { t: "Honest about limits.", b: "It is not a lawyer, a doctor, or a caseworker — and it says so, then points you to a real one." },
  { t: "Private by design.", b: "No selling data, ever. Nothing you ask is used to profile you." },
];

export default function Research() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Research &amp; evidence</p>
          <h1 className="mk-h1">
            The gap is real. <em>Closing it is the work.</em>
          </h1>
          <p className="mk-deck">
            AfterCare exists because of the gap between help existing and help
            reaching someone — and because everything a young person needs
            should be on their phone, in plain language.
          </p>
        </div>
      </header>

      <section className="mk-pull" id="gap">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — The accessibility gap</p>
          <p className="mk-pull-note">
            Help exists — but it lives across websites, state portals, PDFs,
            and overworked caseworkers&rsquo; heads, and almost none of it is
            written for a 17-year-old holding a phone.
          </p>
          <p className="mk-pull-note">
            That gap — between help existing and help reaching someone — is
            the entire reason AfterCare exists.
          </p>
        </div>
      </section>

      <section className="mk-section" id="policy">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — Policy context</p>
          <h2 className="mk-h2">Federal recognition of the same gap.</h2>
          <p className="mk-lead">
            On November 13, 2025, the White House issued{" "}
            <strong>Executive Order 14359</strong>,{" "}
            <em>Fostering the Future for American Children and Families</em>.
            Among other directives, it instructs HHS to develop a
            &ldquo;Fostering the Future&rdquo; initiative and plan an online
            platform that helps people who have been in foster care assess
            needs, find Federal/State/local programs (housing, education,
            employment, healthcare, mentoring), search available resources, and
            generate customized plans for self-sufficiency.
          </p>
          <p className="mk-lead">
            AfterCare was already building toward that same need — an AI life
            navigator with Quests, a fixed resource catalog, and crisis routing.
            <strong> We are not claiming to be the federal platform, a
            government partner, or an official EO deliverable.</strong>{" "}
            {ORG_STATUS} We cite the order because it confirms the problem is
            real at the national level.
          </p>
          <div className="mk-sources">
            <h3>Primary source</h3>
            <ul>
              <li>
                <a
                  href="https://www.whitehouse.gov/presidential-actions/2025/11/fostering-the-future-for-american-children-and-families/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  White House — Executive Order 14359 (Nov 13, 2025)
                </a>
              </li>
            </ul>
          </div>
          <div className="mk-note" style={{ marginTop: 22 }}>
            <strong>No invented impact claims.</strong> We do not publish
            statistics we have not measured. When we quote another
            organization&rsquo;s outcomes, we attribute them and link out.
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="toolkit">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — Federal transition guide</p>
          <h2 className="mk-h2">The ED Foster Care Transition Toolkit.</h2>
          <p className="mk-lead">
            In May 2016 the U.S. Department of Education published the{" "}
            <strong>Foster Care Transition Toolkit</strong> (public domain) with
            HHS, HUD, DOT, DOL, and youth/practitioner partners. It walks
            current and former foster youth — and supportive adults — through
            transition planning, education, jobs, money, essential documents,
            support networks, housing, health, and transportation.
          </p>
          <p className="mk-lead">
            AfterCare&rsquo;s program map and Start here path cover the same
            life domains in phone-first Quests.{" "}
            <strong>
              We are not an official ED product, contractor, or successor to
              the toolkit.
            </strong>{" "}
            We cite it because it is a clear federal framing of the work —
            and because some of its linked state pages are dated, so we always
            point people to current California sources (DMV, CDSS, Chafee)
            inside each program.
          </p>
          <ul className="mk-checklist">
            <li>Citation: U.S. Department of Education, Foster Youth Transition Toolkit, Washington, D.C. 2016</li>
            <li>Audience: youth in/after care + kinship caregivers, foster parents, CASA, social workers, school staff</li>
            <li>Also lists FosterClub&rsquo;s own transition toolkit as a complementary planning tool</li>
          </ul>
          <div className="mk-sources">
            <h3>Primary sources</h3>
            <ul>
              <li>
                <a
                  href="https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ED — Foster Care Transition Toolkit (PDF, May 2016)
                </a>
              </li>
              <li>
                <a
                  href="https://www.ed.gov/teaching-and-administration/supporting-students/special-populations/students-foster-care/students-in-foster-care"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ED — Students in Foster Care hub
                </a>
              </li>
            </ul>
          </div>
          <div className="mk-cta-row">
            <Link href="/start-here" className="mk-btn mk-btn-primary">
              AfterCare Start here path
            </Link>
            <Link href="/programs" className="mk-btn mk-btn-ghost">
              Program guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section" id="fosterclub">
        <div className="mk-wrap">
          <p className="mk-kicker">04 — National peer context</p>
          <h2 className="mk-h2">FosterClub — who&rsquo;s in care, and why it matters.</h2>
          <p className="mk-lead">
            <strong>FosterClub</strong> is a national network for young people
            with foster care experience (separate organization; AfterCare is
            not affiliated). Their{" "}
            <em>Who&rsquo;s in Foster Care?</em> page summarizes national
            figures and links to primary data systems — AFCARS and NYTD —
            so readers can dig deeper.
          </p>
          <p className="mk-lead">
            <strong>We do not republish FosterClub&rsquo;s numbers as
            AfterCare statistics.</strong>{" "}
            When we reference national scale, we point to their page (or the
            federal data systems they cite) rather than inventing or freezing
            a headline number here.
          </p>
          <div className="mk-cta-row">
            <a
              className="mk-btn mk-btn-primary"
              href="https://www.fosterclub.com/whos-foster-care"
              rel="noopener noreferrer"
              target="_blank"
            >
              FosterClub — Who&rsquo;s in Foster Care?
            </a>
            <a
              className="mk-btn mk-btn-ghost"
              href="https://www.fosterclub.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              fosterclub.com
            </a>
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="peers">
        <div className="mk-wrap">
          <p className="mk-kicker">05 — Peer support in the field</p>
          <h2 className="mk-h2">Lived-experience specialists matter.</h2>
          <p className="mk-lead">
            iFoster&rsquo;s <strong>Peers Paving the Path</strong> program pairs
            eligible California current and former foster youth (ages 16–26,
            Medi-Cal Managed Care) with Medi-Cal Certified Peer Support
            Specialists who have lived foster-care experience. It is a free
            service from iFoster — a separate organization. AfterCare lists it
            because the official page is confirmed; we are not affiliated.
          </p>
          <ul className="mk-checklist">
            <li>Official page: ifoster.org/peers-paving-the-path</li>
            <li>Phone / text: 530-550-8001 · support@ifoster.org</li>
            <li>Also listed in the AfterCare services directory (Verified listing = official page confirmed)</li>
          </ul>
          <div className="mk-cta-row">
            <a
              className="mk-btn mk-btn-primary"
              href="https://www.ifoster.org/peers-paving-the-path/"
              rel="noopener noreferrer"
              target="_blank"
            >
              iFoster Peers page
            </a>
            <Link href="/programs/health" className="mk-btn mk-btn-ghost">
              AfterCare health program
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section" id="approach">
        <div className="mk-wrap">
          <p className="mk-kicker">06 — Our approach</p>
          <h2 className="mk-h2">Built for how young people actually get help.</h2>
          <div className="mk-ledger">
            {PRINCIPLES.map((p, i) => (
              <div className="mk-ledger-row" key={p.t}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-cta-row">
            <Link href="/start-here" className="mk-btn mk-btn-primary">
              Start here path
            </Link>
            <Link href="/impact" className="mk-btn mk-btn-ghost">
              How we measure impact
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
