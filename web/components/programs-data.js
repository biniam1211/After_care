/**
 * AfterCare program catalog for the org site.
 *
 * Each entry is a service area with its own page. Facts about California
 * programs cite official sources. Nothing here is clinical or legal advice.
 * Quest slugs link into the product app when a matching quest exists.
 */

/**
 * @typedef {object} ProgramSource
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {object} ProgramStep
 * @property {string} title
 * @property {string} body
 */

/**
 * @typedef {object} ProgramFaq
 * @property {string} q
 * @property {string} a
 */

/**
 * @typedef {object} Program
 * @property {string} slug
 * @property {string} title
 * @property {string} shortTitle
 * @property {string} tagline
 * @property {string} summary
 * @property {string} whoFor
 * @property {string[]} highlights
 * @property {ProgramStep[]} [steps]
 * @property {string[]} [notes]
 * @property {ProgramSource[]} [sources]
 * @property {ProgramFaq[]} [faqs]
 * @property {string[]} [related]
 * @property {string | null} [questSlug]
 * @property {string | null} [photoId]
 * @property {boolean} [flagship]
 */

/** @type {Program[]} */
export const PROGRAMS = [
  {
    slug: "drivers-license",
    title: "Driver's license & learner's permit",
    shortTitle: "Driver's license",
    tagline: "From documents to permit to license — step by step for California foster youth.",
    summary:
      "Getting a learner's permit and driver's license is one of the biggest independence milestones after care. AfterCare walks you through California DMV steps, who can sign for you, driver's ed and training options, and how insurance fits in — with links to official sources only.",
    whoFor: "Foster youth and former foster youth in California working toward a learner's permit or driver's license.",
    flagship: true,
    photoId: "first-car",
    questSlug: "drivers-license",
    highlights: [
      "California DMV permit and license steps, in plain language",
      "Who can sign a minor's application (including a social worker or probation officer when proof of financial responsibility is filed)",
      "Driver's ed, practice hours, and insurance pointers with official links",
      "A matching Quest in the app so you finish one step at a time",
    ],
    steps: [
      {
        title: "Gather your documents",
        body: "You will need proof of identity, your Social Security number (or proof you are not eligible for one), and California residency documents. Ask your social worker or Independent Living Program (ILP) for help getting certified copies if you do not have them.",
      },
      {
        title: "Complete driver's education (if under 18)",
        body: "Under age 18, California generally requires a Certificate of Completion or Enrollment of Driver Education before you can get an instruction permit. CDSS notes you may be able to take driver education through a high school or community college program. Ask your caregiver, social worker, or ILP whether they can help with the cost.",
      },
      {
        title: "Get your learner's / instruction permit",
        body: "Per the California DMV: under 18 you must be at least 15½; complete the DL/ID application; have a parent/guardian (or other authorized adult) sign; visit a DMV office for vision exam, photo, fee, and knowledge test (passing score 80%). Adults 18+ also start with an instruction permit before a first license.",
      },
      {
        title: "Who can sign for foster youth under 18",
        body: "Per CDSS and Vehicle Code rules summarized by CDSS: a grandparent, sibling over 18, aunt or uncle, foster parent you live with, or a probation officer / child protective services worker may sign. A social worker or probation officer may sign without personal liability only if you file proof of financial responsibility (insurance).",
      },
      {
        title: "Practice, then take the driving test",
        body: "Provisional licensing rules (including required practice time) apply for teens — see the DMV Teen Driver Roadmap and Provisional Licensing materials. You must show proof of financial responsibility (insurance) when you drive and for the drive test. Schedule the behind-the-wheel test at dmv.ca.gov.",
      },
      {
        title: "Insurance and low-cost options",
        body: "California requires minimum liability coverage (currently $30,000 / $60,000 / $15,000 per DMV handbook). If you cannot afford standard insurance, ask about the California Low Cost Automobile Insurance Program (mylowcostauto.com). Some county ILP programs may help eligible youth with driver training or insurance — ask your ILP; availability varies by county.",
      },
    ],
    notes: [
      "AfterCare is not the DMV, CDSS, or an insurer. Always confirm current requirements on the official sites linked below — rules and fees change.",
      "This is guidance and navigation, not legal advice.",
    ],
    sources: [
      {
        label: "California DMV — Learner's / instruction permits",
        href: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/",
      },
      {
        label: "California DMV — Financial responsibility & insurance",
        href: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/",
      },
      {
        label: "CDSS — Getting around (foster youth driver's license)",
        href: "https://www.cdss.ca.gov/inforesources/foster-care/environmental-wellness/getting-around",
      },
      {
        label: "Foster Youth Help (CA) — State ID or driver's license",
        href: "https://fosteryouthhelp.ca.gov/youth-resources/",
      },
      {
        label: "California Low Cost Auto Insurance Program",
        href: "https://www.mylowcostauto.com/",
      },
    ],
    faqs: [
      {
        q: "Can my social worker sign for my permit?",
        a: "Yes — per CDSS guidance, a child protective services worker or probation officer may sign if you file proof of financial responsibility (insurance). Relatives and a foster parent you live with may also sign (with liability implications).",
      },
      {
        q: "Do I need driver's ed if I'm 18?",
        a: "Adults 18+ still start with an instruction permit before a first California license, but the under-18 driver's ed certificate rules do not apply the same way. Confirm on dmv.ca.gov for your situation.",
      },
      {
        q: "What if I can't afford insurance?",
        a: "Ask about the California Low Cost Automobile Insurance Program and whether your county ILP can help with training or insurance costs — help varies by county.",
      },
    ],
    related: ["vital-documents", "jobs", "money"],
  },
  {
    slug: "vital-documents",
    title: "Vital documents",
    shortTitle: "Vital documents",
    tagline: "Birth certificate, Social Security card, and state ID — the papers every other step needs.",
    summary:
      "Without a birth certificate, SSN card, or state ID, almost every adult task stalls. AfterCare helps you figure out which documents you need, where to request them in California, and how to store copies safely.",
    whoFor: "Youth who need identity documents to open accounts, work, drive, or apply for benefits.",
    questSlug: "vital-documents",
    highlights: [
      "Birth certificate and Social Security card requests",
      "California state ID vs. driver's license",
      "What to bring and who can help (social worker, ILP)",
    ],
    steps: [
      {
        title: "List what you already have",
        body: "Check with your social worker, caregiver, or ILP for any certified copies already in your file.",
      },
      {
        title: "Request what is missing",
        body: "Birth certificates: California Department of Public Health / county recorder. SSN card: ssa.gov. State ID: DMV (you can get an ID without driving).",
      },
      {
        title: "Keep safe copies",
        body: "Photograph or scan certified copies and store them somewhere you control. Never give away your only certified original if you can avoid it.",
      },
    ],
    notes: [
      "AfterCare does not issue documents. Official agencies set fees and identity rules.",
      "Federal guidance (ED Foster Care Transition Toolkit, 2016) also stresses birth certificate, SSN card, and photo ID before leaving care — confirm current California process with your worker.",
    ],
    sources: [
      { label: "California DMV — ID cards", href: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/" },
      { label: "Social Security Administration — replacement card", href: "https://www.ssa.gov/ssnumber/" },
      { label: "ED Foster Care Transition Toolkit (PDF)", href: "https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf" },
    ],
    faqs: [
      {
        q: "Can I get a state ID without a driver's license?",
        a: "Yes. The California DMV issues identification cards separately from driver's licenses.",
      },
      {
        q: "Who can help me pay for certified copies?",
        a: "Ask your social worker or ILP — many counties help youth get vital records. Fees and processes are set by the issuing agency.",
      },
    ],
    related: ["drivers-license", "money", "jobs", "benefits"],
  },
  {
    slug: "housing",
    title: "Housing",
    shortTitle: "Housing",
    tagline: "Somewhere safe tonight — and a path to something stable next month.",
    summary:
      "Emergency shelter, transitional housing, and the practical steps to keep a roof over your head. The Panic Button and Services directory surface numbers that pick up; this program explains the path.",
    whoFor: "Youth facing homelessness, placement ending, or looking for independent housing.",
    questSlug: "housing-plan",
    highlights: [
      "Crisis shelter pathways (including Covenant House)",
      "Transitional and supportive housing pointers",
      "What to ask before you sign a lease",
    ],
    steps: [
      { title: "If you need a bed tonight", body: "Use the Panic Button in the app, call 211, or Covenant House at 1-800-388-3888. Safety first — paperwork can wait." },
      { title: "Talk to your worker or ILP", body: "Ask about transitional housing, THP-Plus / THP+FC (where available), and housing on your TILP." },
      { title: "Plan the next roof", body: "Shared housing, roommate agreements, and tenant rights — go step by step so you are not rushed into a bad lease." },
    ],
    notes: ["AfterCare is not a shelter provider. Always call ahead to confirm beds and eligibility."],
    faqs: [
      {
        q: "What if I have nowhere to sleep tonight?",
        a: "Use the Panic Button in the app, call 211, or Covenant House at 1-800-388-3888. Do that before paperwork.",
      },
      {
        q: "Is AfterCare a shelter?",
        a: "No. We navigate and connect you to real programs. Always call ahead to confirm beds and who they serve.",
      },
    ],
    related: ["benefits", "legal-rights", "extended-foster-care", "money"],
  },
  {
    slug: "money",
    title: "Money, banking & credit",
    shortTitle: "Money & credit",
    tagline: "First bank account, safer habits, and credit built the right way.",
    summary:
      "Banking and credit are the foundation for getting paid, renting, and not losing money to check-cashing fees. Start with a no-fee account, then build credit safely — including checking for identity theft.",
    whoFor: "Youth opening a first account, building credit, or cleaning up a credit file.",
    questSlug: "first-bank-account",
    highlights: [
      "No-fee bank account Quest in the app",
      "Credit-builder path and free credit reports",
      "Watch for identity theft on your SSN",
    ],
    steps: [
      { title: "Open a no-fee account", body: "Use the First Bank Account Quest in the app — ID, pick a fee-free bank, direct deposit, turn off overdraft, start a small auto-save." },
      { title: "Check your credit reports", body: "Pull free reports at AnnualCreditReport.com. Dispute anything that is not yours." },
      { title: "Build credit slowly", body: "A secured card or credit-builder product, used tiny and paid in full, is safer than a big limit you do not need." },
    ],
    faqs: [
      {
        q: "Do I need a parent to open a bank account?",
        a: "At 18, no. Some banks also serve 16–17-year-olds — the First Bank Account Quest walks you through fee-free options.",
      },
      {
        q: "What if someone used my SSN?",
        a: "Pull free credit reports and dispute anything that is not yours. A JBAY advocate or caseworker can help with identity theft cleanup.",
      },
    ],
    related: ["vital-documents", "jobs", "benefits", "education"],
  },
  {
    slug: "benefits",
    title: "Benefits",
    shortTitle: "Benefits",
    tagline: "CalFresh, Medi-Cal to 26, and other supports you may already qualify for.",
    summary:
      "Benefits paperwork is confusing on purpose. AfterCare helps you see what former foster youth in California often qualify for — including Medi-Cal to age 26 — and points you to official applications.",
    whoFor: "Youth who need food, health coverage, or other public benefits.",
    questSlug: "health-26",
    highlights: [
      "Medi-Cal Former Foster Youth program to age 26",
      "CalFresh food assistance pointers",
      "211 and county offices for local applications",
    ],
    steps: [
      { title: "Health coverage to 26", body: "If you were in foster care at 18 in California, ask your county about Former Foster Youth Medi-Cal — follow the Health Insurance to 26 Quest." },
      { title: "Food help", body: "CalFresh applications go through your county or BenefitsCal. 211 can point you to the right office." },
      { title: "Keep your address current", body: "Notices go by mail. A wrong address is a common reason coverage or benefits lapse." },
    ],
    notes: ["Eligibility rules are set by the state and counties. AfterCare does not determine eligibility."],
    sources: [
      { label: "BenefitsCal", href: "https://www.benefitscal.com/" },
      { label: "211 California", href: "https://www.211ca.org/" },
    ],
  },
  {
    slug: "education",
    title: "Education & college aid",
    shortTitle: "Education",
    tagline: "FAFSA independence, Chafee Grant, and school pathways after care.",
    summary:
      "Foster youth often qualify for aid that never gets claimed. AfterCare covers FAFSA independent student status, the California Chafee Grant (up to $5,000/year), and how to talk to campus support programs.",
    whoFor: "Youth finishing high school, starting college or job training, or reclaiming education.",
    questSlug: "chafee-grant",
    highlights: [
      "FAFSA / CA Dream Act as an independent student",
      "Chafee Grant Quest — up to $5,000/year",
      "Campus foster youth support programs",
    ],
    steps: [
      { title: "File FAFSA or Dream Act", body: "Answer yes to the foster care question when it applies so you are treated as independent." },
      { title: "Apply for Chafee", body: "Use the Chafee Grant Quest and chafee.csac.ca.gov — FAFSA alone is not enough." },
      { title: "Find campus support", body: "Ask about foster youth liaisons, EOPS, and priority registration at community colleges and universities." },
    ],
    sources: [
      { label: "California Chafee Grant", href: "https://chafee.csac.ca.gov/" },
      { label: "Federal Student Aid (FAFSA)", href: "https://studentaid.gov/" },
      { label: "ED Foster Care Transition Toolkit (PDF)", href: "https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf" },
    ],
    notes: [
      "The ED toolkit (2016) covers FAFSA independence for foster youth and Chafee/ETV — always confirm current award rules on chafee.csac.ca.gov and studentaid.gov.",
    ],
  },
  {
    slug: "jobs",
    title: "Jobs",
    shortTitle: "Jobs",
    tagline: "Work permits, first jobs, resumes, and showing up ready.",
    summary:
      "From your first shift to a steadier role: work authorization, how to apply, what to wear, and how to keep a paycheck flowing into a real bank account.",
    whoFor: "Youth looking for work or stabilizing employment.",
    questSlug: "first-job",
    photoId: "first-job",
    highlights: [
      "First-job basics and interview prep",
      "Connecting pay to a bank account",
      "ILP and workforce programs that serve foster youth",
    ],
    steps: [
      { title: "Get work-ready documents", body: "ID, SSN card, and any work permit you need if under 18." },
      { title: "Apply and practice", body: "Start local — retail, warehouse, food service, campus jobs. Practice answers out loud once." },
      { title: "Protect your paycheck", body: "Direct deposit into your own account beats check-cashing fees every time." },
    ],
    faqs: [
      {
        q: "I have no work history. Can I still get hired?",
        a: "Yes. Many first jobs hire for reliability and availability. Start local and be honest about your schedule.",
      },
      {
        q: "Where should my paycheck go?",
        a: "Into an account in your name. Use the First Bank Account Quest so check-cashing places do not take a cut.",
      },
    ],
    related: ["vital-documents", "money", "education", "drivers-license"],
  },
  {
    slug: "health",
    title: "Health & mental health",
    shortTitle: "Health",
    tagline: "Coverage, care you can reach, and crisis lines that answer.",
    summary:
      "Physical and mental health support without lectures. Keep coverage, find a clinic, and know that 988 and other crisis lines are always one step away — AfterCare is not a clinical provider.",
    whoFor: "Youth who need coverage, a doctor, or someone to talk to in a hard moment.",
    questSlug: "health-26",
    highlights: [
      "Medi-Cal to 26 for eligible former foster youth",
      "Crisis routing: 988, Trevor Project, 911",
      "No clinical advice — we connect you to people who can help",
    ],
    steps: [
      { title: "Confirm coverage", body: "Follow the Health Insurance to 26 Quest if you aged out in California." },
      { title: "Find care", body: "Use your plan directory or county clinic list. Ask about transportation help through Medi-Cal if you qualify." },
      { title: "In a crisis", body: "Call or text 988. LGBTQ+ youth: The Trevor Project 1-866-488-7386. If someone is being hurt, call 911." },
    ],
    notes: [
      "AfterCare does not provide therapy, diagnosis, or medical treatment.",
      "iFoster’s Peers Paving the Path is a separate organization’s program — AfterCare is not affiliated; we list it because the official page is confirmed.",
    ],
    sources: [
      {
        label: "iFoster — Peers Paving the Path",
        href: "https://www.ifoster.org/peers-paving-the-path/",
      },
    ],
    faqs: [
      {
        q: "What is Peers Paving the Path?",
        a: "iFoster’s free California program pairs eligible current/former foster youth (16–26, Medi-Cal Managed Care) with a Certified Peer Support Specialist who has lived foster-care experience. Confirm enrollment details on iFoster’s site or at 530-550-8001.",
      },
    ],
    related: ["benefits", "housing", "parenting-youth"],
  },
  {
    slug: "legal-rights",
    title: "Legal rights",
    shortTitle: "Legal rights",
    tagline: "Know your rights — then get a real advocate when you need one.",
    summary:
      "Court, case plans, housing, and discrimination questions come up a lot after care. AfterCare explains common rights in plain language and points you to legal aid — we do not give legal advice.",
    whoFor: "Youth with court, housing, employment, or records questions.",
    questSlug: null,
    highlights: [
      "When to call legal aid vs. your attorney of record",
      "Records, expungement pointers, and tenants' rights intros",
      "Clear line: navigation only — not legal advice",
    ],
    steps: [
      { title: "If you have a lawyer on your case", body: "Call them first for anything about your dependency or delinquency case." },
      { title: "For other legal issues", body: "Legal aid, court self-help centers, and foster youth advocacy orgs can advise — AfterCare cannot." },
      { title: "Write things down", body: "Dates, names, and copies of notices make every conversation with an advocate faster." },
    ],
    notes: ["Nothing on this site is legal advice."],
  },
  {
    slug: "extended-foster-care",
    title: "Extended foster care (AB 12)",
    shortTitle: "AB 12 / EFC",
    tagline: "Staying supported past 18 under California's extended foster care.",
    summary:
      "California's AB 12 extended foster care lets eligible youth stay in care with support past 18. AfterCare helps you understand the idea, what to ask your worker, and how it connects to housing, benefits, and school — not a substitute for your attorney or social worker.",
    whoFor: "Youth approaching 18 or already in extended foster care in California.",
    questSlug: null,
    highlights: [
      "What extended foster care is for",
      "Questions to bring to your worker and attorney",
      "How EFC connects to housing, school, and benefits",
    ],
    steps: [
      { title: "Ask early", body: "Before you turn 18, ask your social worker and attorney whether you qualify for extended foster care and what your options are." },
      { title: "Update your TILP", body: "Your Transitional Independent Living Plan should match real goals — school, work, housing, documents." },
      { title: "Know re-entry exists", body: "Some youth can re-enter extended care after leaving — ask your attorney about current rules for your county." },
    ],
    notes: [
      "Eligibility and re-entry rules are legal determinations. Confirm with your attorney and county.",
      "Federal transition-plan rules expect housing, health insurance, education, mentoring, and workforce options in your plan — ask your worker what California requires for you.",
    ],
    sources: [
      { label: "CDSS — Extended Foster Care (AB 12)", href: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
      { label: "ED Foster Care Transition Toolkit (PDF)", href: "https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf" },
      { label: "FosterClub", href: "https://www.fosterclub.com" },
    ],
  },
  {
    slug: "parenting-youth",
    title: "Parenting youth",
    shortTitle: "Parenting youth",
    tagline: "Supports for young parents navigating care, benefits, and childcare.",
    summary:
      "If you are parenting while in or after foster care, you deserve concrete help — benefits, childcare leads, and people who will not shame you. AfterCare points to resources; it does not replace a caseworker or pediatrician.",
    whoFor: "Pregnant and parenting foster youth and former foster youth.",
    questSlug: null,
    highlights: [
      "Benefits and WIC / CalFresh pointers",
      "Childcare and school continuation supports",
      "Crisis and domestic violence lines when safety is at risk",
    ],
    steps: [
      { title: "Tell someone on your team", body: "Your social worker, ILP, or school counselor can open parenting-specific supports." },
      { title: "Lock in benefits", body: "Ask about Medi-Cal, CalFresh, and WIC. Bring a list of questions so the appointment is not wasted." },
      { title: "If you are unsafe", body: "Call 911 if in danger. For domestic violence support, local hotlines and 211 can connect you." },
    ],
  },
];

/**
 * @param {string} slug
 * @returns {Program | undefined}
 */
export function getProgram(slug) {
  return PROGRAMS.find((p) => p.slug === slug);
}

/** @returns {string[]} */
export function getProgramSlugs() {
  return PROGRAMS.map((p) => p.slug);
}
