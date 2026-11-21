import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "For supporters",
  description:
    "Guides for foster parents, kin, mentors, social workers, teachers, and donors who back AfterCare youth.",
};

const AUDIENCES = [
  {
    id: "parents",
    title: "Foster parents & caregivers",
    body: "Help with normalcy (sports, sleepovers, phones), driver's ed signatures, credit checks at 14/16/17, and knowing when to call the Ombudsperson — without replacing the youth's attorney.",
    links: [
      { href: "/programs/normalcy", label: "Normalcy" },
      { href: "/programs/credit-identity-theft", label: "Credit checks" },
      { href: "/programs/grievance-ombudsperson", label: "Ombudsperson" },
    ],
  },
  {
    id: "kin",
    title: "Kin & relative caregivers",
    body: "Sibling visits, family contact, and permanency options (guardianship, adoption, kinship) — ask the caseworker and attorney for what fits this youth.",
    links: [
      { href: "/programs/siblings-family-visits", label: "Siblings & visits" },
      { href: "/programs/permanency-kinship", label: "Permanency & kinship" },
    ],
  },
  {
    id: "mentors",
    title: "Mentors & CASA volunteers",
    body: "Show up consistently. Help them rehearse court statements, keep a document checklist, and finish one Quest at a time in the app.",
    links: [
      { href: "/programs/casa", label: "CASA" },
      { href: "/programs/court-and-lawyer", label: "Court & lawyer" },
      { href: "/app", label: "Open the app" },
    ],
  },
  {
    id: "workers",
    title: "Social workers & ILP staff",
    body: "AfterCare is a youth-facing navigator — not a case-management system. Share Start here, the Bill of Rights guide, and AB 12 pages. Confirm county rules yourselves.",
    links: [
      { href: "/start-here", label: "Start here path" },
      { href: "/programs/foster-youth-bill-of-rights", label: "Bill of Rights" },
      { href: "/programs/extended-foster-care", label: "AB 12" },
    ],
  },
  {
    id: "teachers",
    title: "Teachers & school staff",
    body: "AB 490 school stability, partial credits, AB 216 graduation, IEPs/504s, and campus programs like NextUp / Guardian Scholars — point students to the education guides.",
    links: [
      { href: "/programs/school-stability-ab490", label: "AB 490" },
      { href: "/programs/graduation-ab216", label: "AB 216" },
      { href: "/programs/campus-nextup", label: "Campus supports" },
    ],
  },
  {
    id: "donors",
    title: "Donors & volunteers",
    body: `${ORG_STATUS} Donation processing is not live yet. Volunteer by sharing the app, mentoring, or partnering on verified directory listings.`,
    links: [
      { href: "/get-involved", label: "Get involved" },
      { href: "/get-involved#donate", label: "Donate placeholder" },
    ],
  },
];

export default function ForSupportersPage() {
  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Supporters</p>
          <h1 className="mk-h1">
            You&rsquo;re on their team. <em>Here&rsquo;s how to help.</em>
          </h1>
          <p className="mk-deck">
            Separate lanes for foster parents, kin, mentors, workers, teachers,
            and donors — so you don&rsquo;t drown them in adult paperwork.
          </p>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-cat-nav" aria-label="Jump to audience">
            {AUDIENCES.map((a) => (
              <a key={a.id} href={`#${a.id}`}>
                {a.title}
              </a>
            ))}
          </div>
          {AUDIENCES.map((a) => (
            <article key={a.id} id={a.id} className="mk-panel" style={{ marginBottom: 22 }}>
              <h2 className="mk-h2" style={{ fontSize: "1.6rem", maxWidth: "20ch" }}>
                {a.title}
              </h2>
              <p className="mk-lead">{a.body}</p>
              <div className="mk-cta-row">
                {a.links.map((l) => (
                  <Link key={l.href} href={l.href} className="mk-btn mk-btn-ghost">
                    {l.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
