/**
 * California foster youth age milestones (14–26).
 * Plain-language unlocks with links to program pages.
 */

/**
 * @typedef {object} AgeMilestone
 * @property {number} age
 * @property {string} title
 * @property {string[]} unlocks
 * @property {string} href — program path e.g. /programs/vital-documents
 */

/** @type {AgeMilestone[]} */
export const MILESTONES = [
  {
    age: 14,
    title: "Age 14 — know your rights & check your credit",
    unlocks: [
      "You should receive the California Foster Youth Bill of Rights (WIC 16001.9) and understand how to file grievances.",
      "Federal guidance encourages a first free credit report check to catch identity theft early.",
      "Start ILP / life-skills planning with your worker when your county offers it.",
      "You can participate in court hearings about your case — ask your attorney how.",
    ],
    href: "/programs/foster-youth-bill-of-rights",
  },
  {
    age: 16,
    title: "Age 16 — documents, permit prep & second credit check",
    unlocks: [
      "Line up birth certificate, SSN card, and state ID — you'll need them for work, DMV, and benefits.",
      "Second recommended credit report check at AnnualCreditReport.com.",
      "Ask about driver's ed and who can sign your permit when you are ready (15½+).",
      "Chafee may apply later — confirm timing with CSAC when you start planning school after 16.",
    ],
    href: "/programs/vital-documents",
  },
  {
    age: 17,
    title: "Age 17 — plan for 18, AB 12 & third credit check",
    unlocks: [
      "Ask your attorney and worker about extended foster care (AB 12) before your 18th birthday.",
      "Third credit check — dispute anything on your SSN that is not yours.",
      "Update your TILP / 90-day transition plan: housing, Medi-Cal, education, documents.",
      "File FAFSA or CADAA the year you may start college or training.",
    ],
    href: "/programs/extended-foster-care",
  },
  {
    age: 18,
    title: "Age 18 — bank account, Medi-Cal FFY & adulthood steps",
    unlocks: [
      "Open a no-fee bank account in your own name — direct deposit beats check-cashing.",
      "If you were in California foster care at 18, Former Foster Youth Medi-Cal may cover you to 26.",
      "Choose extended foster care, emancipation, or other exit paths — confirm with your attorney.",
      "Learner's permit / license, first job, and vital documents unlock most other Quests.",
    ],
    href: "/programs/benefits",
  },
  {
    age: 21,
    title: "Age 21 — after extended care & alumni supports",
    unlocks: [
      "Extended foster care generally ends at 21 — confirm your last-day plan with your worker.",
      "THP-Plus and housing navigators may still help in many counties — ask before you lose eligibility.",
      "Chafee Grant and FAFSA aid can continue until 26 when you meet rules.",
      "Peer networks (CYC, FosterClub) and 211 stay useful for housing, jobs, and health.",
    ],
    href: "/programs/alumni-after-21",
  },
  {
    age: 26,
    title: "Age 26 — benefits transition & long-term stability",
    unlocks: [
      "Former Foster Youth Medi-Cal typically ends at 26 — plan other coverage with the county before your birthday.",
      "Chafee Grant eligibility also ends at 26 — finish or transfer training with a campus advisor.",
      "Credit, housing, and career Quests still apply — seal records and legal aid if old cases hold you back.",
      "Alumni programs and 211 remain safety nets — you do not have to navigate alone.",
    ],
    href: "/programs/health",
  },
];