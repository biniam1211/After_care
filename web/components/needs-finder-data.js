/**
 * Needs finder — age × situation × need → checklist (no PII).
 */

export const AGES = [
  { id: "14-17", label: "14–17 (in care)" },
  { id: "18-20", label: "18–20" },
  { id: "21-26", label: "21–26" },
];

export const SITUATIONS = [
  { id: "in-care", label: "In foster care" },
  { id: "extended-care", label: "Extended foster care (AB 12)" },
  { id: "aged-out", label: "Aged out / former foster youth" },
  { id: "unhoused", label: "Unhoused or couch-surfing" },
  { id: "parenting", label: "Parenting" },
  { id: "in-school", label: "In school or college" },
  { id: "juvenile-justice", label: "Juvenile justice / dual-status" },
];

export const NEEDS = [
  { id: "housing", label: "Housing & shelter" },
  { id: "documents", label: "IDs & vital documents" },
  { id: "money", label: "Money, bank & credit" },
  { id: "benefits", label: "Benefits & Medi-Cal" },
  { id: "education", label: "School & college aid" },
  { id: "jobs", label: "Jobs & work rights" },
  { id: "health", label: "Health & mental health" },
  { id: "legal", label: "Court, records & legal help" },
  { id: "rights", label: "Rights & grievances" },
  { id: "safety", label: "Safety & relationships" },
];

/**
 * @param {{ ageId?: string, situationId?: string, needId?: string }} input
 */
export function resolveChecklist({ ageId, situationId, needId }) {
  const items = [];
  const sources = [
    { label: "CDSS — Foster care", href: "https://www.cdss.ca.gov/inforesources/foster-care" },
    { label: "Foster Care Ombudsperson", href: "https://www.ofco.ca.gov" },
  ];

  const push = (text, href) => items.push(href ? { text, href } : { text });

  if (!needId) {
    return {
      title: "Choose a need to see your checklist",
      items: [{ text: "Pick an age, situation, and need above — we'll show steps without asking for personal info." }],
      sources,
    };
  }

  const prog = (slug) => `/programs/${slug}`;

  if (needId === "housing") {
    if (situationId === "unhoused") {
      push("If you need a bed tonight: call 211 or use crisis lines in the app — safety first.", "/programs/housing");
    }
    if (situationId === "extended-care") {
      push("Ask about SILP, THP+FC, and college/dorm housing options under AB 12.", prog("silp"));
    }
    push("Talk to your worker or ILP about THP-Plus and housing navigators in your county.", prog("housing-navigators"));
    push("Before signing a lease, have legal aid or a trusted adult review it.", prog("housing"));
  }

  if (needId === "documents") {
    push("Inventory birth certificate, SSN card, and state ID.", prog("vital-documents"));
    if (ageId === "14-17" || !ageId) {
      push("Plan credit checks at 14, 16, and 17 via AnnualCreditReport.com.", prog("credit-identity-theft"));
    }
    push("Need a passport? Start early — see passport & records.", prog("passport-records"));
  }

  if (needId === "money") {
    push("Open a no-fee account and set up direct deposit.", prog("money"));
    push("Dispute fraudulent accounts on your credit reports.", prog("credit-identity-theft"));
    push("Watch for scams — never give your SSN over random DMs.", prog("scams"));
  }

  if (needId === "benefits") {
    if (ageId === "18-20" || ageId === "21-26" || situationId === "aged-out") {
      push("Confirm Former Foster Youth Medi-Cal to 26 with your county.", prog("benefits"));
    }
    push("Apply for CalFresh and other aid via BenefitsCal.", prog("benefits"));
    if (situationId === "parenting") {
      push("Ask about WIC and parenting-specific Medi-Cal for your child.", prog("parenting-youth"));
    }
    push("Cash aid: ask if CalWORKs or SSI fits your situation.", prog("calworks-ssi"));
  }

  if (needId === "education") {
    push("File FAFSA or CADAA — answer the foster care question accurately.", prog("education"));
    push("Apply for the California Chafee Grant at chafee.csac.ca.gov.", prog("education"));
    if (situationId === "in-school") {
      push("Ask your school for a foster youth liaison and AB 490 stability.", prog("school-stability-ab490"));
      push("Community college? Ask about NextUp.", prog("campus-nextup"));
    }
  }

  if (needId === "jobs") {
    push("Gather ID, SSN, and work permit if under 18.", prog("jobs"));
    push("Know minimum wage and harassment reporting lines.", prog("workers-rights-hiring-prefs"));
    push("Ask ILP about Job Corps, apprenticeships, or AmeriCorps.", prog("job-corps-americorps-military"));
  }

  if (needId === "health") {
    push("Confirm Medi-Cal and pick a primary doctor.", prog("health"));
    push("988 for mental health crisis — free, 24/7.");
    if (situationId === "in-care") {
      push("Psych medication questions? Ask about JV-220 court review with your attorney.", prog("psychotropic-jv220"));
    }
    push("Disability supports: regional center and IEP/504 at school.", prog("disability-regional-centers"));
  }

  if (needId === "legal") {
    push("Save your attorney of record's number — call them first on case issues.", prog("court-and-lawyer"));
    if (situationId === "juvenile-justice") {
      push("Dual-status? Your dependency and delinquency lawyers should coordinate.", prog("dual-status"));
    }
    push("Sealing juvenile records — confirm eligibility with legal aid.", prog("sealing-records"));
    push("Free legal help list for housing, immigration, and records.", prog("free-legal-help"));
  }

  if (needId === "rights") {
    push("Read the Foster Youth Bill of Rights (WIC 16001.9).", prog("foster-youth-bill-of-rights"));
    push("File grievances with your county, then Foster Care Ombudsperson if unresolved.", prog("grievance-ombudsperson"));
    if (situationId === "in-care") {
      push("Normalcy — ask for age-appropriate activities like other teens.", prog("normalcy"));
    }
  }

  if (needId === "safety") {
    push("If you are in danger now: call 911.", prog("healthy-relationships-dv-trafficking"));
    push("Left placement (AWOL)? Safety first, then call your worker or attorney.", prog("awol"));
    push("LGBTQ+ youth: affirming placement and Trevor Project crisis line.", prog("lgbtq-sogie"));
  }

  if (items.length === 0) {
    push(`Browse the ${NEEDS.find((n) => n.id === needId)?.label || "program"} page for full steps.`, prog(needToSlug(needId)));
  }

  const situationLabel = SITUATIONS.find((s) => s.id === situationId)?.label;
  const ageLabel = AGES.find((a) => a.id === ageId)?.label;
  const needLabel = NEEDS.find((n) => n.id === needId)?.label;

  const titleParts = [needLabel || "Checklist"];
  if (situationLabel) titleParts.push(situationLabel);
  if (ageLabel) titleParts.unshift(ageLabel);

  if (needId === "benefits") {
    sources.push({
      label: "DHCS — Former Foster Youth Medi-Cal",
      href: "https://www.dhcs.ca.gov/services/medi-cal/Pages/Medi-CalFormerFosterYouth.aspx",
    });
  }
  if (needId === "education") {
    sources.push({ label: "California Chafee Grant", href: "https://chafee.csac.ca.gov/" });
  }

  return {
    title: titleParts.join(" · "),
    items,
    sources,
  };
}

/** @param {string} needId */
function needToSlug(needId) {
  const map = {
    housing: "housing",
    documents: "vital-documents",
    money: "money",
    benefits: "benefits",
    education: "education",
    jobs: "jobs",
    health: "health",
    legal: "legal-rights",
    rights: "foster-youth-bill-of-rights",
    safety: "healthy-relationships-dv-trafficking",
  };
  return map[needId] || "while-in-care";
}