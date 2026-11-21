/**
 * One-off generator for programs-data.js — run: node web/scripts/generate-programs-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../components/programs-data.js");

const CDSS = "https://www.cdss.ca.gov";
const DMV = "https://www.dmv.ca.gov";
const COURTS = "https://www.courts.ca.gov";
const OFCO = "https://www.ofco.ca.gov";
const CHAFEE = "https://chafee.csac.ca.gov";
const STUDENTAID = "https://studentaid.gov";
const CHILDWELFARE = "https://www.childwelfare.gov";

/** @param {object} o */
function P(o) {
  const highlights =
    o.highlights ||
    (o.steps || []).slice(0, 4).map((s) => s.title);
  return {
    layout: "practical",
    category: "general",
    voice: "",
    sayThis: [],
    documents: [],
    whoToCall: [],
    notes: ["AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."],
    sources: [],
    faqs: [],
    related: [],
    questSlug: null,
    photoId: null,
    flagship: false,
    ...o,
    highlights,
  };
}

const PROGRAMS = [
  P({
    slug: "drivers-license",
    title: "Driver's license & learner's permit",
    shortTitle: "Driver's license",
    tagline: "From documents to permit to license — step by step for California foster youth.",
    summary:
      "Getting a learner's permit and driver's license is one of the biggest independence milestones after care. AfterCare walks you through California DMV steps, who can sign for you, driver's ed and training options, and how insurance fits in — with links to official sources only.",
    whoFor: "Foster youth and former foster youth in California working toward a learner's permit or driver's license.",
    category: "documents-money",
    layout: "flagship",
    flagship: true,
    photoId: "first-car",
    questSlug: "drivers-license",
    voice: "A license is real freedom — but the DMV wants paperwork in the right order. We'll keep it straight.",
    steps: [
      { title: "Gather your documents", body: "You need proof of identity, your Social Security number (or proof you are not eligible), and California residency documents. Ask your social worker or ILP for certified copies." },
      { title: "Complete driver's education (if under 18)", body: "Under 18, California generally requires a Certificate of Completion or Enrollment in driver education before an instruction permit. CDSS notes you may use high school or community college programs — ask if ILP can help with cost." },
      { title: "Get your learner's permit", body: "Complete the DL/ID application, get an authorized adult signature, and visit DMV for vision exam, photo, fee, and knowledge test (80% to pass). Under 18 you must be at least 15½." },
      { title: "Who can sign for foster youth under 18", body: "Per CDSS: a grandparent, sibling 18+, aunt/uncle, foster parent you live with, or a probation/CPS worker may sign. A worker or probation officer may sign without personal liability only if you file proof of financial responsibility (insurance)." },
      { title: "Practice and insurance", body: "Carry proof of insurance whenever you drive and for the drive test. Complete provisional practice hours. Ask about California Low Cost Auto Insurance (mylowcostauto.com) and county ILP help — varies by county." },
      { title: "Pass the behind-the-wheel test", body: "Schedule at dmv.ca.gov with an insured, registered vehicle. Bring permit, insurance proof, and any required licensed adult." },
    ],
    sayThis: [
      "I need help getting my birth certificate and SSN for the DMV.",
      "Who can sign my permit application as my foster youth?",
      "Can ILP help with driver's ed or insurance?",
    ],
    documents: ["Birth certificate or passport", "SSN card or SSA letter", "California residency proof", "DL 44 application", "Driver ed certificate (if under 18)", "Proof of insurance when required"],
    whoToCall: [
      { name: "California DMV", detail: "Appointments and handbook — dmv.ca.gov" },
      { name: "Your social worker / ILP", detail: "Documents, driver's ed, and county training help" },
      { name: "CDSS — Getting around", detail: "Foster youth driver license guidance" },
    ],
    notes: [
      "AfterCare is not the DMV or an insurer. Confirm current fees and rules on official sites.",
      "This is guidance only — not legal advice.",
    ],
    sources: [
      { label: "California DMV — Learner's permits", href: `${DMV}/portal/driver-licenses-identification-cards/learners-permits/` },
      { label: "CDSS — Getting around", href: `${CDSS}/inforesources/foster-care/environmental-wellness/getting-around` },
      { label: "California Low Cost Auto Insurance", href: "https://www.mylowcostauto.com/" },
    ],
    faqs: [
      { q: "Can my social worker sign for my permit?", a: "Yes — per CDSS, a CPS worker or probation officer may sign if you file proof of financial responsibility. Relatives and your foster parent may also sign (with liability implications)." },
      { q: "Do I need driver's ed at 18?", a: "Under-18 rules differ from adults 18+. Adults still start with an instruction permit before a first license. Confirm on dmv.ca.gov." },
    ],
    related: ["vital-documents", "credit-identity-theft", "jobs", "money"],
  }),
];

// ---- Remaining programs: compact factory ----
const more = [
  ["vital-documents", "Vital documents", "Birth certificate, SSN, state ID", "The papers every bank, job, and DMV step needs.", "documents-money", "vital-documents", ["drivers-license", "credit-identity-theft", "passport-records"]],
  ["credit-identity-theft", "Credit check & identity theft", "Credit & ID theft", "Pull free reports at 14, 16, and 17 — and fix fraud on your SSN.", "documents-money", "credit", ["vital-documents", "money", "scams"]],
  ["passport-records", "Passport & case records", "Passport & records", "Passports, court records copies, and your case file.", "documents-money", null, ["vital-documents", "court-and-lawyer"]],
  ["tilp", "TILP & transition planning", "TILP", "Your Transitional Independent Living Plan — make it match your real life.", "in-care", null, ["aging-out-90-day-plan", "extended-foster-care"]],
  ["while-in-care", "Life while in foster care", "While in care", "Day-to-day rights, routines, and who decides what.", "in-care", null, ["foster-youth-bill-of-rights", "placement-changes"]],
  ["foster-youth-bill-of-rights", "Foster youth bill of rights", "Bill of rights", "California WIC 16001.9 — what you are entitled to while in care.", "in-care", null, ["while-in-care", "grievance-ombudsperson"], "rights"],
  ["placement-changes", "Placement changes", "Placement moves", "When your home changes — visits, notice, and your say.", "in-care", null, ["siblings-family-visits", "normalcy"], "practical"],
  ["court-and-lawyer", "Court & your attorney", "Court & lawyer", "Hearings, your attorney of record, and speaking in court.", "legal-transition", "court-rights", ["free-legal-help", "sealing-records"], "rights"],
  ["casa", "CASA volunteers", "CASA", "Court Appointed Special Advocates — an extra voice in your case.", "in-care", null, ["court-and-lawyer"]],
  ["grievance-ombudsperson", "Grievances & Ombudsperson", "Ombudsperson", "File complaints safely — Foster Care Ombudsperson and county grievances.", "rights", null, ["foster-youth-bill-of-rights"], "rights"],
  ["siblings-family-visits", "Siblings & family visits", "Siblings & visits", "Staying connected with brothers, sisters, and family.", "in-care", null, ["permanency-kinship", "normalcy"]],
  ["normalcy", "Normalcy activities", "Normalcy", "Sleepovers, sports, and age-appropriate life like other teens.", "in-care", null, ["allowances-clothing", "siblings-family-visits"]],
  ["allowances-clothing", "Allowances & clothing", "Allowance & clothes", "Spending money, clothing allowances, and essentials.", "in-care", null, ["normalcy", "money"]],
  ["religion-culture", "Religion & culture", "Culture & faith", "Practice your faith and culture while in care.", "in-care", null, ["foster-youth-bill-of-rights"]],
  ["lgbtq-sogie", "LGBTQ+ & SOGIE", "LGBTQ+ / SOGIE", "Affirming placements and support while in care.", "in-care", null, ["sexual-reproductive-health", "healthy-relationships-dv-trafficking"], "rights"],
  ["group-homes-strtp", "Group homes & STRTPs", "Group homes", "Residential treatment and group home rules — what to ask.", "in-care", null, ["psychotropic-jv220", "grievance-ombudsperson"]],
  ["awol", "Runaway / AWOL from placement", "AWOL & runaway", "If you left placement — safety first, then next steps with your team.", "in-care", null, ["grievance-ombudsperson", "housing"], "crisis"],
  ["dual-status", "Dual-status (dependency & delinquency)", "Dual-status", "When you are in both dependency and juvenile justice systems.", "legal-transition", null, ["court-and-lawyer", "sealing-records"]],
  ["immigrant-sijs", "Immigrant youth & SIJS", "Immigrant & SIJS", "Special Immigrant Juvenile Status and immigration legal help.", "legal-transition", null, ["free-legal-help", "court-and-lawyer"]],
  ["money", "Money, banking & credit", "Money & banking", "First bank account, safer habits, and building credit.", "documents-money", "first-bank-account", ["credit-identity-theft", "benefits", "jobs"]],
  ["benefits", "Benefits (Medi-Cal, CalFresh)", "Benefits", "Medi-Cal to 26, CalFresh, and county benefits.", "benefits", "health-26", ["calworks-ssi", "health"]],
  ["calworks-ssi", "CalWORKs & SSI", "CalWORKs & SSI", "Cash aid and disability benefits — eligibility and applications.", "benefits", null, ["benefits", "disability-regional-centers"]],
  ["scams", "Scams & financial abuse", "Scams", "Spot fraud, phishing, and people misusing your money or SSN.", "documents-money", null, ["credit-identity-theft", "money"]],
  ["housing", "Housing", "Housing", "Somewhere safe tonight — and a path to stability.", "housing", "housing-plan", ["extended-foster-care", "silp", "thp-plus-fc"]],
  ["extended-foster-care", "Extended foster care (AB 12)", "AB 12 / EFC", "Stay in care past 18 with support — eligibility and re-entry.", "housing", "ab12-extended-care", ["silp", "thp-plus-fc", "aging-out-90-day-plan"]],
  ["silp", "Supervised Independent Living (SILP)", "SILP", "Renting your own place while still in extended foster care.", "housing", null, ["extended-foster-care", "housing-navigators"]],
  ["thp-plus-fc", "THP+FC & THP-Plus", "THP+FC / THP-Plus", "Transitional housing for current and former foster youth.", "housing", null, ["housing", "fup-fyi"]],
  ["housing-navigators", "Housing navigators", "Housing navigators", "County and nonprofit help finding a place.", "housing", null, ["housing", "thp-plus-fc"]],
  ["fup-fyi", "Family Unification Program (FUP)", "FUP vouchers", "HUD housing vouchers for some youth aging out.", "housing", null, ["thp-plus-fc", "parenting-youth"]],
  ["education", "Education & college aid", "Education", "FAFSA/CADAA, Chafee, and campus support.", "education", "chafee-grant", ["campus-nextup", "graduation-ab216"]],
  ["school-stability-ab490", "School stability (AB 490)", "School stability", "Stay in your school when placement moves.", "education", null, ["iep-504", "education"]],
  ["graduation-ab216", "Graduation help (AB 216)", "Graduation", "Credit recovery and graduation options after care.", "education", null, ["school-stability-ab490", "trades-apprenticeships"]],
  ["iep-504", "IEP & 504 plans", "IEP / 504", "Special education and disability supports at school.", "education", null, ["disability-regional-centers", "school-stability-ab490"]],
  ["campus-nextup", "College — NextUp & support", "NextUp / campus", "Community college and CSU foster youth programs.", "education", null, ["education", "chafee-grant"]],
  ["trades-apprenticeships", "Trades & apprenticeships", "Trades", "Paid apprenticeship paths after high school.", "education", null, ["jobs", "graduation-ab216"]],
  ["jobs", "Jobs & first paycheck", "Jobs", "Work permits, applications, and protecting your pay.", "jobs", "first-job", ["workers-rights-hiring-prefs", "money"]],
  ["workers-rights-hiring-prefs", "Worker rights & hiring prefs", "Work rights", "Minimum wage, harassment, and foster youth hiring preferences.", "jobs", null, ["jobs", "legal-rights"]],
  ["job-corps-americorps-military", "Job Corps, AmeriCorps & military", "Service programs", "Structured training and service programs — what to ask first.", "jobs", null, ["jobs", "education"]],
  ["health", "Health & mental health", "Health", "Coverage, clinics, and crisis lines.", "health", "health-26", ["psychotropic-jv220", "substance-use"]],
  ["psychotropic-jv220", "Psych meds & JV-220", "Psychotropic meds", "Court review when medication is proposed — JV-220 process.", "health", null, ["group-homes-strtp", "health"], "rights"],
  ["substance-use", "Substance use support", "Substance use", "Treatment, harm reduction, and Medi-Cal coverage.", "health", null, ["health", "988"]],
  ["sexual-reproductive-health", "Sexual & reproductive health", "Reproductive health", "Confidential care, contraception, and pregancy support.", "health", null, ["parenting-youth", "lgbtq-sogie"]],
  ["disability-regional-centers", "Disability & regional centers", "Disability", "Regional Center services and ADA rights.", "health", null, ["iep-504", "calworks-ssi"]],
  ["legal-rights", "Legal rights overview", "Legal rights", "Know your rights — then get a real advocate.", "legal-transition", null, ["free-legal-help", "court-and-lawyer"], "rights"],
  ["free-legal-help", "Free legal help", "Free legal aid", "Legal aid, self-help centers, and foster youth attorneys.", "legal-transition", null, ["court-and-lawyer", "sealing-records"]],
  ["sealing-records", "Sealing juvenile records", "Seal records", "When and how juvenile records may be sealed in California.", "legal-transition", "seal-records", ["dual-status", "emancipation"]],
  ["emancipation", "Emancipation", "Emancipation", "Leaving care before 18 through court emancipation.", "legal-transition", null, ["extended-foster-care", "legal-rights"]],
  ["permanency-kinship", "Permanency & kinship", "Permanency", "Adoption, legal guardianship, and reunification paths.", "legal-transition", null, ["siblings-family-visits", "extended-foster-care"]],
  ["healthy-relationships-dv-trafficking", "Relationships, DV & trafficking", "Safety in relationships", "Healthy relationships and help if you are unsafe.", "health", null, ["lgbtq-sogie", "awol"], "crisis"],
  ["parenting-youth", "Parenting youth", "Parenting", "Benefits and support when you are parenting in or after care.", "benefits", null, ["fup-fyi", "sexual-reproductive-health"]],
  ["aging-out-90-day-plan", "90-day transition plan", "90-day plan", "Federal required plan before you leave care at 18.", "legal-transition", null, ["tilp", "extended-foster-care"]],
  ["alumni-after-21", "After 21 — alumni supports", "After 21", "Help that may continue or start after extended care ends.", "community", null, ["peer-advocacy-cyc", "housing"]],
  ["peer-advocacy-cyc", "Peer advocacy (CYC & allies)", "Peer advocacy", "California Youth Connection and youth-led policy voice.", "community", null, ["alumni-after-21", "grievance-ombudsperson"]],
];

for (const row of more) {
  const [slug, title, shortTitle, tagline, category, questSlug, related, layout] = row;
  const summary = `${title} — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.`;
  PROGRAMS.push(
    P({
      slug,
      title,
      shortTitle,
      tagline,
      summary,
      whoFor: "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
      category,
      layout: layout || "practical",
      questSlug: questSlug || null,
      voice: `You deserve a straight answer on ${shortTitle.toLowerCase()}. Here's what to do, what to say, and who picks up the phone.`,
      steps: [
        { title: "Name your goal", body: `Decide what you need from ${shortTitle.toLowerCase()} this week — one concrete outcome (a form filed, a call made, a document in hand).` },
        { title: "Loop in your team", body: "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline." },
        { title: "Use official sources", body: "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts." },
        { title: "Follow up in writing", body: "Text or email a short summary after calls: who you talked to, what they said, and what happens next." },
      ],
      sayThis: [
        `I need help with ${shortTitle.toLowerCase()} — what is the next step for me?`,
        "Can we put this on my case plan or TILP?",
        "Please send me the official form or link in writing.",
      ],
      documents: ["Photo ID or state ID", "Case number or client ID (if you have one)", "Any notices you received"],
      whoToCall: [
        { name: "Your social worker", detail: "County CPS — placements, benefits, referrals" },
        { name: "Your attorney of record", detail: "Dependency or delinquency court questions" },
        { name: "Foster Care Ombudsperson", detail: "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide" },
      ],
      sources: defaultSources(slug, category),
      faqs: [
        { q: `Is AfterCare my ${shortTitle.toLowerCase()} provider?`, a: "No. We explain steps and link official programs. Your county and courts run the real services." },
        { q: "Can AfterCare give me legal advice?", a: "No. Talk to your attorney or legal aid for legal advice about your situation." },
      ],
      related: related || [],
    })
  );
}

function defaultSources(slug, category) {
  const base = [{ label: "CDSS — Foster care", href: `${CDSS}/inforesources/foster-care` }];
  if (category === "education") base.push({ label: "California Student Aid Commission — Chafee", href: CHAFEE });
  if (category === "legal-transition" || slug.includes("court") || slug.includes("seal"))
    base.push({ label: "California Courts — Self-help", href: `${COURTS}/selfhelp.htm` });
  if (slug === "grievance-ombudsperson" || slug === "foster-youth-bill-of-rights")
    base.push({ label: "Foster Care Ombudsperson", href: OFCO });
  if (category === "health" || slug === "benefits")
    base.push({ label: "BenefitsCal", href: "https://www.benefitscal.com/" });
  return base;
}

// Enrich key programs (overwrite with fuller content)
enrich(PROGRAMS);

function enrich(list) {
  const by = Object.fromEntries(list.map((p) => [p.slug, p]));

  Object.assign(by["foster-youth-bill-of-rights"], {
    summary: "California Welfare and Institutions Code section 16001.9 lists foster youth rights — to care, safety, education, privacy, and participation in decisions. Know the list, then use your attorney and the Ombudsperson if rights are violated.",
    steps: [
      { title: "Get the official rights list", body: "Ask your worker for the Foster Youth Bill of Rights (WIC 16001.9). You should receive it when you enter care and again at every placement change." },
      { title: "Know the big buckets", body: "Rights include adequate food, clothing, shelter; education; privacy; reasonable contact with family; participation in court; and complaint processes without retaliation." },
      { title: "Use your voice in court", body: "You have the right to attend hearings and speak when appropriate. Your attorney can help you prepare." },
      { title: "File a grievance if needed", body: "Start with your worker or supervisor. You can also contact the Foster Care Ombudsperson for help with unresolved complaints." },
    ],
    sources: [
      { label: "California Foster Youth Bill of Rights (WIC 16001.9)", href: `${CDSS}/portals/17/FosterYouthBillofRightsposterEnglishFNL.pdf` },
      { label: "Foster Care Ombudsperson", href: OFCO },
    ],
    related: ["grievance-ombudsperson", "while-in-care", "court-and-lawyer"],
  });

  Object.assign(by["credit-identity-theft"], {
    summary: "Federal law lets you check credit reports for free. Youth in care should check at ages 14, 16, and 17 for identity theft on their SSN. AfterCare walks you through AnnualCreditReport.com, disputes, and safer credit-building.",
    questSlug: "credit",
    steps: [
      { title: "Check at 14, 16, and 17", body: "Ask your caregiver, worker, or ILP to help you pull free reports at AnnualCreditReport.com — one bureau at a time or all three." },
      { title: "Dispute fraud", body: "If accounts are not yours, dispute with each credit bureau online. Keep copies. Your worker or JBAY may help." },
      { title: "Freeze or monitor", body: "Consider a free security freeze or fraud alert if someone misused your SSN — confirm current steps on FTC.gov/identitytheft." },
      { title: "Build credit safely later", body: "At 18+, a secured card or credit-builder used small and paid in full is safer than cosigned debt you do not control." },
    ],
    sources: [
      { label: "AnnualCreditReport.com", href: "https://www.annualcreditreport.com/" },
      { label: "FTC — Identity theft", href: "https://www.identitytheft.gov/" },
      { label: "John Burton Advocates for Youth", href: "https://jbay.org/" },
    ],
    related: ["vital-documents", "money", "scams"],
  });

  Object.assign(by["extended-foster-care"], {
    summary: "California AB 12 extended foster care lets eligible youth stay in care to age 21 with housing, case management, and supports. Options include staying with a caregiver, SILP, supervised settings, and THP+FC in some counties.",
    questSlug: "ab12-extended-care",
    steps: [
      { title: "Ask before 18", body: "Meet with your worker and attorney about extended foster care eligibility, court requirements, and your housing plan." },
      { title: "Pick a placement type", body: "Options may include family home, SILP, dorm/college housing with agreement, THP+FC, or another approved setting — availability varies." },
      { title: "Stay in school, work, or an exemption", body: "Most youth must meet participation requirements (school, work, training) unless an exemption applies — confirm with your attorney." },
      { title: "Know re-entry", body: "Some youth who left care can petition to re-enter before 21 — timing and rules are legal questions for your attorney." },
    ],
    sources: [
      { label: "CDSS — Extended Foster Care (AB 12)", href: `${CDSS}/inforesources/foster-care/extended-foster-care-ab-12` },
      { label: "JBAY — AB 12 resources", href: "https://jbay.org/" },
    ],
    related: ["silp", "thp-plus-fc", "housing-navigators", "fup-fyi", "aging-out-90-day-plan"],
  });

  Object.assign(by["silp"], {
    steps: [
      { title: "See if SILP fits", body: "Supervised Independent Living lets eligible EFC youth rent housing with agency support and safety inspections." },
      { title: "Budget and lease review", body: "Your worker should help review the lease, deposits, and your monthly budget before you sign." },
      { title: "Inspections and supports", body: "The home must meet safety standards. Ask what furniture, deposits, or move-in help the county provides." },
    ],
    sources: [{ label: "CDSS — SILP", href: `${CDSS}/inforesources/foster-care/extended-foster-care-ab-12/supervised-independent-living-placement` }],
  });

  Object.assign(by["court-and-lawyer"], {
    questSlug: "court-rights",
    steps: [
      { title: "Know your attorney's name", body: "Save your dependency or delinquency attorney's phone and email. They represent you — not the agency." },
      { title: "Prepare for hearings", body: "Ask what the hearing is about, whether you should speak, and what outcomes are possible." },
      { title: "Request copies", body: "Ask for copies of court reports before hearings when policy allows, so you are not surprised." },
    ],
    sources: [
      { label: "California Courts — Juvenile dependency", href: `${COURTS}/selfhelp/juveniledependency.htm` },
      { label: "Children's Law Center of California", href: "https://www.clccal.org/" },
    ],
  });

  Object.assign(by["sealing-records"], {
    questSlug: "seal-records",
    steps: [
      { title: "Know which case", body: "Dependency and delinquency records have different sealing rules. Your juvenile attorney or legal aid can explain your path." },
      { title: "Check eligibility", body: "California law sets waiting periods and offense types for sealing — this is legal advice territory." },
      { title: "File the petition", body: "Self-help centers and legal aid may help with forms. Keep proof of completion for jobs and housing." },
    ],
    sources: [
      { label: "California Courts — Sealing juvenile records", href: `${COURTS}/selfhelp/sealingjuvenile.htm` },
    ],
  });

  Object.assign(by["education"], {
    steps: [
      { title: "File FAFSA or CADAA", body: "Answer the foster care question accurately to unlock independent student status when you qualify." },
      { title: "Apply for Chafee", body: "Complete chafee.csac.ca.gov every year — FAFSA alone does not pay the Chafee Grant." },
      { title: "Find campus support", body: "Ask about NextUp, Guardian Scholars, EOPS, and foster liaisons at your school." },
    ],
    sources: [
      { label: "California Chafee Grant", href: CHAFEE },
      { label: "Federal Student Aid (FAFSA)", href: STUDENTAID },
      { label: "CSAC — Foster youth", href: "https://www.csac.ca.gov/foster-youth" },
    ],
  });

  Object.assign(by["campus-nextup"], {
    sources: [
      { label: "California Community Colleges — NextUp", href: "https://nextup.cccco.edu/" },
      { label: "JBAY — College support", href: "https://jbay.org/" },
    ],
  });

  Object.assign(by["grievance-ombudsperson"], {
    whoToCall: [
      { name: "Foster Care Ombudsperson", detail: "1-877-846-1602 · ofco.ca.gov" },
      { name: "County grievance line", detail: "Ask your worker for the county complaint process" },
    ],
    layout: "rights",
  });

  Object.assign(by["peer-advocacy-cyc"], {
    sources: [
      { label: "California Youth Connection", href: "https://www.calyouthconn.org/" },
      { label: "FosterClub", href: "https://www.fosterclub.com" },
    ],
  });

  Object.assign(by["immigrant-sijs"], {
    notes: [
      "Immigration law is complex. Only a qualified immigration attorney should advise on SIJS or your status.",
      "AfterCare is navigation only — not legal advice.",
    ],
    sources: [
      { label: "U.S. CIS — SIJS", href: "https://www.uscis.gov/i-360" },
      { label: "Immigration Law Help — California", href: "https://www.immigrationlawhelp.org/" },
    ],
  });

  Object.assign(by["vital-documents"], {
    title: "Vital documents",
    tagline: "Birth certificate, Social Security card, and state ID — the papers every other step needs.",
    summary:
      "Without a birth certificate, SSN card, or state ID, almost every adult task stalls. AfterCare helps you figure out which documents you need, where to request them in California, and how to store copies safely.",
    whoFor: "Youth who need identity documents to open accounts, work, drive, or apply for benefits.",
    questSlug: "vital-documents",
    photoId: null,
    steps: [
      { title: "List what you already have", body: "Check with your social worker, caregiver, or ILP for certified copies in your case file." },
      { title: "Request what is missing", body: "Birth certificates: California Department of Public Health or county recorder. SSN card: ssa.gov. State ID: DMV without a license." },
      { title: "Keep safe copies", body: "Photograph certified copies and store them somewhere you control. Never give away your only certified original if you can avoid it." },
    ],
    sources: [
      { label: "California DMV — ID cards", href: `${DMV}/portal/driver-licenses-identification-cards/identification-id-cards/` },
      { label: "Social Security — replacement card", href: "https://www.ssa.gov/ssnumber/" },
    ],
    related: ["drivers-license", "money", "passport-records", "credit-identity-theft"],
  });

  Object.assign(by["housing"], {
    summary:
      "Emergency shelter, transitional housing, and practical lease steps. Crisis first — then THP+FC, SILP, navigators, and FUP with your worker.",
    questSlug: "housing-plan",
    layout: "crisis",
    steps: [
      { title: "If you need a bed tonight", body: "Use the Panic Button in the app, call 211, or youth crisis lines. Safety first — paperwork can wait." },
      { title: "Talk to your worker or ILP", body: "Ask about THP-Plus, THP+FC, SILP inside AB 12, and housing navigators in your county." },
      { title: "Plan the next roof", body: "Review any lease with a trusted adult or legal aid before you sign. Know deposits and roommate rules." },
    ],
    sources: [
      { label: "211 California", href: "https://www.211ca.org/" },
      { label: "CDSS — THP-Plus", href: `${CDSS}/inforesources/thp` },
    ],
  });

  Object.assign(by["money"], {
    questSlug: "first-bank-account",
    steps: [
      { title: "Open a no-fee account", body: "Use the First Bank Account Quest — ID, fee-free bank, direct deposit, turn off overdraft." },
      { title: "Check credit at key ages", body: "See the Credit & Identity Theft program — free reports at 14, 16, and 17." },
      { title: "Build credit slowly at 18+", body: "Secured card or credit-builder, tiny balance, paid in full monthly." },
    ],
    related: ["credit-identity-theft", "vital-documents", "jobs", "scams"],
  });

  Object.assign(by["benefits"], {
    tagline: "CalFresh, Medi-Cal to 26, and other supports you may already qualify for.",
    questSlug: "health-26",
    steps: [
      { title: "Health coverage to 26", body: "If you were in foster care at 18 in California, ask your county about Former Foster Youth Medi-Cal." },
      { title: "Food help", body: "CalFresh applications go through BenefitsCal or your county. 211 can point you to the right office." },
      { title: "Keep your address current", body: "Notices go by mail. A wrong address is a common reason coverage lapses." },
    ],
    sources: [
      { label: "BenefitsCal", href: "https://www.benefitscal.com/" },
      { label: "DHCS — Former Foster Youth Medi-Cal", href: "https://www.dhcs.ca.gov/services/medi-cal/Pages/Medi-CalFormerFosterYouth.aspx" },
    ],
  });

  Object.assign(by["health"], {
    questSlug: "health-26",
    steps: [
      { title: "Confirm FFY Medi-Cal", body: "Follow the Medi-Cal to 26 Quest if you aged out in California." },
      { title: "Find care", body: "Use your plan directory or county clinic. Ask about transportation if you qualify." },
      { title: "In a crisis", body: "Call or text 988. LGBTQ+ youth: The Trevor Project 1-866-488-7386. Danger: 911." },
    ],
    sources: [
      { label: "iFoster — Peers Paving the Path", href: "https://www.ifoster.org/peers-paving-the-path/" },
    ],
    notes: [
      "AfterCare does not provide therapy, diagnosis, or medical treatment.",
      "iFoster's Peers Paving the Path is a separate organization's program — AfterCare is not affiliated; we list it because the official page is confirmed.",
    ],
  });

  Object.assign(by["jobs"], {
    questSlug: "first-job",
    photoId: "first-job",
    steps: [
      { title: "Get work-ready documents", body: "ID, SSN card, and work permit if under 18." },
      { title: "Apply and practice", body: "Start local — retail, warehouse, food service. Practice answers once out loud." },
      { title: "Protect your paycheck", body: "Direct deposit into your own account beats check-cashing fees." },
    ],
    related: ["workers-rights-hiring-prefs", "vital-documents", "money"],
  });

  Object.assign(by["legal-rights"], {
    questSlug: null,
    layout: "rights",
    steps: [
      { title: "Call your attorney of record first", body: "For dependency or delinquency case questions, your court-appointed lawyer comes first." },
      { title: "Use legal aid for other issues", body: "Housing, records, and employment issues may need legal aid or self-help — AfterCare cannot advise." },
      { title: "Document everything", body: "Dates, names, and copies of notices speed up every advocate conversation." },
    ],
    related: ["free-legal-help", "court-and-lawyer", "sealing-records"],
  });

  Object.assign(by["parenting-youth"], {
    steps: [
      { title: "Tell someone on your team", body: "Your social worker, ILP, or school counselor can open parenting-specific supports." },
      { title: "Lock in benefits", body: "Ask about Medi-Cal, CalFresh, and WIC with a written list of questions." },
      { title: "If you are unsafe", body: "Call 911 if in danger. Domestic violence hotlines and 211 can connect you." },
    ],
    related: ["sexual-reproductive-health", "fup-fyi", "benefits"],
  });

  Object.assign(by["psychotropic-jv220"], {
    layout: "rights",
    summary:
      "When psychotropic medication is proposed for a dependent child, California courts use Form JV-220 and related processes so your voice and rights are heard. Confirm every step with your attorney.",
    steps: [
      { title: "Ask what is being proposed", body: "You have the right to know the medication name, purpose, and side effects in words you understand." },
      { title: "Request court review when required", body: "JV-220 and related forms trigger court oversight in many situations — your attorney explains what applies." },
      { title: "Bring a support person", body: "Ask if you may have your attorney, caregiver, or advocate in conversations about medication." },
    ],
    sources: [
      { label: "California Courts — JV-220", href: `${COURTS}/documents/jv220.pdf` },
      { label: "CDSS — Psychotropic medications", href: `${CDSS}/inforesources/foster-care/health-care/psychotropic-medications` },
    ],
  });

  Object.assign(by["school-stability-ab490"], {
    steps: [
      { title: "Ask about school-of-origin", body: "AB 490 supports staying in your school when placement changes when it is in your best interest." },
      { title: "Get a point person", body: "Your school district foster youth liaison helps with enrollment, records, and transportation questions." },
      { title: "Fix credits early", body: "If you changed schools a lot, ask about partial credit rules and AB 216 graduation options." },
    ],
    sources: [
      { label: "CDE — Foster youth education", href: "https://www.cde.ca.gov/ls/pf/fy/" },
    ],
    related: ["graduation-ab216", "iep-504"],
  });

  Object.assign(by["aging-out-90-day-plan"], {
    steps: [
      { title: "Ask for the 90-day plan", body: "Federal rules require a transition plan starting 90 days before age 18 — housing, health, education, and documents." },
      { title: "Compare to your TILP", body: "Your TILP and 90-day plan should match what you actually need. Request changes in writing." },
      { title: "List gaps", body: "Missing ID, no bank account, no housing plan? Name each gap and who will fix it before your birthday." },
    ],
    sources: [
      { label: "Child Welfare — Transition plan", href: `${CHILDWELFARE}/topics/preventing/prb/transition_to_adulthood_planning/` },
    ],
    related: ["tilp", "vital-documents", "extended-foster-care"],
  });

  Object.assign(by["normalcy"], {
    summary:
      "California law supports age-appropriate activities — sports, sleepovers, dating, and driving — with a reasonable and prudent parent standard in many settings.",
    steps: [
      { title: "Name the activity", body: "Be specific: overnight at a friend's, team travel, prom, job — so caregivers know what to approve." },
      { title: "Ask for the approval process", body: "Find out who signs, how far in advance, and whether background checks apply." },
      { title: "If you are told no", body: "Ask why in writing. Talk to your attorney or Ombudsperson if decisions seem unfair or blanket bans." },
    ],
    sources: [{ label: "CDSS — Normalcy", href: `${CDSS}/inforesources/foster-care/resource-family-approval/normalcy` }],
  });

  for (const p of list) {
    if (p.steps?.length) {
      p.highlights = p.steps.slice(0, 4).map((s) => s.title);
    }
  }
}

const header = `/**
 * AfterCare program catalog for the org site.
 *
 * Each entry is a service area with its own page. Facts about California
 * programs cite official sources. Nothing here is clinical or legal advice.
 * Quest slugs link into the product app when a matching quest exists.
 */

/**
 * @typedef {object} ProgramWhoToCall
 * @property {string} name
 * @property {string} detail
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
 * @property {string} category
 * @property {string} voice
 * @property {string[]} highlights
 * @property {ProgramStep[]} [steps]
 * @property {string[]} [sayThis]
 * @property {string[]} [documents]
 * @property {ProgramWhoToCall[]} [whoToCall]
 * @property {string[]} [notes]
 * @property {ProgramSource[]} [sources]
 * @property {ProgramFaq[]} [faqs]
 * @property {string[]} [related]
 * @property {string | null} [questSlug]
 * @property {string | null} [photoId]
 * @property {boolean} [flagship]
 * @property {'flagship' | 'rights' | 'practical' | 'crisis'} [layout]
 */

/** @type {Program[]} */
export const PROGRAMS = `;

const footer = `;

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
`;

const body = JSON.stringify(PROGRAMS, null, 2)
  .replace(/"([^"]+)":/g, "$1:") // not valid - need proper JS
  ;

// Use JSON.stringify and eval alternative - export as const with proper formatting
import { inspect } from "util";
const programsSource = inspect(PROGRAMS, { depth: null, maxArrayLength: null, breakLength: 100 });

// inspect uses single quotes - convert to valid module format manually via JSON
const programsJson = JSON.stringify(PROGRAMS, null, 2);
const programsJs = programsJson.replace(/"(\w+)":/g, "$1:").replace(/"/g, '"'); // still has quoted strings

fs.writeFileSync(
  OUT,
  header + programsJson.replace(/^/gm, (line, offset) => {
    return line;
  }) + footer.replace("export const PROGRAMS = ", "").replace(/^`/, "")
);

// Fix: write JSON array as JS - use template
const final = `${header}${programsJson}\n${footer.split("`")[1] || footer.replace("export const PROGRAMS = `", "export const PROGRAMS = ")}}`;
// Simpler approach:
const outContent =
  header +
  programsJson +
  `;

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
`;

fs.writeFileSync(OUT, outContent);
console.log("Wrote", OUT, "programs:", PROGRAMS.length);