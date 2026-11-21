// ───────────────────────────────────────────────────────────
// AfterCare — content / data layer
// Ported from the Claude Design prototype. Exported as ES modules.
// ───────────────────────────────────────────────────────────
import { GENERATED_RESOURCES } from "@/components/resources.generated";

// Suggested chat prompts (chips shown on empty chat)
export const CHAT_SUGGESTIONS = [
  { id: "bank", text: "How do I open a bank account without a parent?", icon: "bank" },
  { id: "license", text: "How do I get my learner's permit in California?", icon: "car" },
  { id: "docs", text: "How do I get my birth certificate and state ID?", icon: "doc" },
  { id: "job", text: "How do I get my first job?", icon: "cash" },
  { id: "college", text: "How do I apply to college with no parents?", icon: "grad" },
  { id: "chafee", text: "What's the Chafee Grant and do I qualify?", icon: "cash" },
  { id: "health", text: "How do I keep my health insurance after 18?", icon: "health" },
  { id: "kicked", text: "My foster mom is kicking me out. What do I do?", icon: "alert" },
  { id: "transition", text: "What should be in my transition plan?", icon: "doc" },
];

// Scripted AI answers — every reply has: answer / steps / resources (3-part format)
// `panic: true` makes AfterCare surface the Panic Button first.
export const CHAT_REPLIES = {
  bank: {
    answer:
      "You can 100% open a bank account on your own — you don't need a parent or co-signer once you're 18. Even at 16–17, some banks let you do it. The trick is picking one with no monthly fees.",
    steps: [
      "Get your ID + Social Security number ready (a state ID, passport, or even your school ID can work).",
      "Open a no-fee account — Chime, Current, or Capital One 360. No minimum balance, no surprise charges.",
      "Set up direct deposit so you skip check-cashing places (they steal 3–5% of every check).",
    ],
    resources: ["ifoster-bank", "rightway"],
    followup: "Want me to turn this into a step-by-step Quest so I can check in with you after each part?",
    quest: "first-bank-account",
  },
  college: {
    answer:
      "Here's the part nobody tells you: because you were in foster care after age 13, the FAFSA counts you as an \"independent student.\" That means you don't need a parent's income or signature — and you likely qualify for the most aid available.",
    steps: [
      "File the FAFSA at studentaid.gov — answer \"yes\" to the foster care question to unlock independent status.",
      "Apply for the California Chafee Grant (up to $5,000/yr, just for foster youth) before the May deadline.",
      "Ask each college about their foster-youth tuition waiver — 40+ states waive tuition at public colleges.",
    ],
    resources: ["jbay", "chafee-grant", "ed-transition-toolkit"],
    followup: "The Chafee Grant alone is up to $5k a year. Want me to walk you through claiming it?",
    quest: "chafee-grant",
  },
  transition: {
    answer:
      "A good transition plan is youth-led and covers housing, health insurance, education, mentoring/support, and work — federal law expects your agency to help you build one before you age out. AfterCare turns those domains into Quests; your caseworker/ILP still owns the official plan.",
    steps: [
      "Ask your caseworker or ILP for your current TILP / transition plan and what California requires for you.",
      "Use AfterCare’s Start here path for the day-to-day sequence: documents → bank → license → benefits → school/work/housing.",
      "Read the public-domain ED Foster Care Transition Toolkit for the federal framing — then confirm every current rule with CA sources linked in each program.",
    ],
    resources: ["ed-transition-toolkit", "fosterclub", "211"],
    followup: "Want the Start here path so you can knock out the first Quest today?",
  },
  chafee: {
    answer:
      "The Chafee Grant is free money — up to $5,000 a year for school or job training, and you never pay it back. If you were in foster care between 16 and 18 and you're under 26, you almost certainly qualify.",
    steps: [
      "Check the boxes: were you in care between 16–18? Under 26? Enrolled (or about to enroll) at least half-time? That's it.",
      "File your FAFSA or CA Dream Act application first — Chafee needs it.",
      "Apply at chafee.csac.ca.gov. It takes about 15 minutes.",
    ],
    resources: ["chafee-grant", "jbay"],
    followup: "Want me to set this up as a Quest and remind you before the deadline?",
    quest: "chafee-grant",
  },
  health: {
    answer:
      "Good news — if you were in foster care at 18, you keep free Medicaid (Medi-Cal in CA) until you turn 26. No income limit, no application stress. Most foster youth never find out, so they go uninsured. Don't be one of them.",
    steps: [
      "You're auto-eligible for the Former Foster Youth Medi-Cal program — you don't re-qualify every year.",
      "If your coverage lapsed, call your county Medi-Cal office and say the words \"former foster youth.\"",
      "Keep your address updated with the county so renewal notices actually reach you.",
    ],
    resources: ["medical-ffy", "ifoster-peers", "211"],
    followup: "Want a Quest that locks in your coverage to 26 step by step?",
    quest: "health-26",
  },
  license: {
    answer:
      "Yes — foster youth in California can get a learner's permit and driver's license. Under 18 you generally need driver's ed, an adult signature, and DMV tests; a social worker or probation officer can sign if you file proof of insurance. Always confirm current steps on dmv.ca.gov.",
    steps: [
      "Gather ID, SSN, and residency documents — ask your social worker or ILP for help getting copies.",
      "If you're under 18, complete or enroll in driver education, then book a DMV appointment for the knowledge test (passing score 80%).",
      "Ask about who can sign your application and about ILP help with driver's ed or insurance — then start the Driver's License Quest for the full checklist.",
    ],
    resources: ["211", "rightway"],
    followup: "Want the step-by-step Quest for your learner's permit and license?",
    quest: "drivers-license",
  },
  docs: {
    answer:
      "Your birth certificate, Social Security card, and a state ID (or license) unlock almost every adult task — bank accounts, jobs, DMV, benefits. If you're missing any, your social worker or ILP can usually help you request certified copies.",
    steps: [
      "List what you already have in your file or with your caregiver.",
      "Request what's missing: birth certificate (county recorder / CDPH), SSN card (ssa.gov), state ID at the DMV.",
      "Keep safe photos of certified copies somewhere only you control — and start the Vital Documents Quest for the checklist.",
    ],
    resources: ["211", "rightway"],
    followup: "Want me to walk you through getting your documents step by step?",
    quest: "vital-documents",
  },
  job: {
    answer:
      "A first job is doable without a parent — you need ID/SSN, a simple way to apply, and a bank account so you don't lose money to check-cashing. Start local (retail, warehouse, food service, campus jobs) and practice answers out loud once.",
    steps: [
      "Get work-ready documents (ID, SSN card; work permit if under 18).",
      "Apply to a few places this week — keep it simple and honest.",
      "Set up direct deposit into your own account so your paycheck is yours.",
    ],
    resources: ["ifoster-bank", "rightway", "211"],
    followup: "Want the First Job Quest so I can check in after each step?",
    quest: "first-job",
  },
  housing: {
    answer:
      "If you need a bed tonight, safety comes first — Panic Button, 211, or Covenant House at 1-800-388-3888. For the next roof, ask your worker/ILP about transitional housing and put housing on your TILP. Never sign a lease you don't understand.",
    steps: [
      "If you're unsafe or unsheltered tonight, use the Panic Button or call Covenant House / 211 now.",
      "Tell your social worker, attorney, or ILP — ask about THP / transitional options where you live.",
      "For longer-term housing, go slow: roommates, deposits, and tenant rights — start the Housing Quest for a checklist.",
    ],
    resources: ["covenant", "211", "988"],
    followup: "Want the Housing Quest, or is this an emergency right now?",
    quest: "housing-plan",
    panic: false,
  },
  kicked: {
    answer:
      "Okay — first, breathe. You are not in trouble and you're not alone tonight. If this is happening right now, the fastest help is one tap away with the Panic Button below. Let's make sure you're safe first, then sort the rest.",
    steps: [
      "If you feel unsafe, tap the red Panic Button — I'll pull up a shelter near you in seconds.",
      "You have a right to emergency housing. Covenant House (1-800-388-3888) takes youth 24/7, no questions.",
      "Text your caseworker now — I can draft the message for you so you don't have to find the words.",
    ],
    resources: ["covenant", "988", "trevor"],
    panic: true,
  },
  // Self-harm / suicide / acute crisis — used when detectCrisis fires and
  // Claude is unavailable. Always pairs with panic:true + national lines.
  crisis: {
    answer:
      "I'm really glad you told me. You are not alone, and you deserve help right now — not later. Call or text 988 (Suicide & Crisis Lifeline, free 24/7). If you are in immediate danger, call 911. The red Panic Button below also has Covenant House and The Trevor Project in one tap.",
    steps: [
      "Call or text 988 — someone is there 24/7, free and confidential.",
      "If you are in immediate danger, call 911.",
      "Tap the red Panic Button for shelter and a caseworker message drafted for you.",
    ],
    resources: ["988", "covenant", "trevor"],
    panic: true,
  },
  default: {
    answer:
      "I've got you. Give me a second to think this through with you — I'll always give you a straight answer, the next few steps, and real places near you that can help. Nothing here gets judged.",
    steps: [
      "Tell me a little more — your city or ZIP helps me find help that's actually close to you.",
      "If this is an emergency, the red Panic Button gets you immediate local help.",
      "Anything you ask stays private. Always.",
    ],
    resources: ["211", "rightway"],
  },
  court: {
    answer:
      "Your attorney of record represents you in dependency or delinquency court — not the agency. Save their number, ask what each hearing is about, and request court reports when your county allows.",
    steps: [
      "Find your lawyer's name and phone on your court papers or ask your social worker.",
      "Before the next hearing, ask: what decisions might be made, and can I speak?",
      "Write down dates, orders, and any new placement or reunification plan.",
    ],
    resources: ["211", "foster-ombuds"],
    followup: "Want the Court Rights Quest for a step-by-step checklist?",
    quest: "court-rights",
  },
  seal: {
    answer:
      "Sealing juvenile records can help with jobs and housing, but the rules depend on your case type and charges. Only a juvenile attorney or legal aid can tell you if you qualify — AfterCare can't give legal advice.",
    steps: [
      "Ask your juvenile attorney or legal aid whether dependency, delinquency, or both records apply.",
      "Check California Courts self-help for current sealing forms and waiting periods.",
      "Keep proof when records are sealed for employers or landlords who ask.",
    ],
    resources: ["foster-ombuds", "211"],
    followup: "Open the Seal Records Quest when you're ready to walk through it.",
    quest: "seal-records",
  },
  ab12: {
    answer:
      "California AB 12 extended foster care lets eligible youth stay in care to 21 with support. Options can include family home, SILP, school housing, THP+FC, and more — eligibility is a legal question for your attorney.",
    steps: [
      "Before 18, ask your worker and attorney if you qualify and what court approval is needed.",
      "Pick a housing plan that fits school, work, or training participation rules.",
      "Ask about re-entry if you already left care but are still under 21.",
    ],
    resources: ["jbay", "foster-ombuds"],
    followup: "Want the AB 12 Extended Care Quest?",
    quest: "ab12-extended-care",
  },
  rights: {
    answer:
      "California's Foster Youth Bill of Rights (WIC 16001.9) covers food, shelter, education, privacy, family contact, and how to complain without retaliation. You should get a copy at placement changes.",
    steps: [
      "Ask your worker for the official rights poster or handout.",
      "If something feels wrong, file a county grievance and keep copies.",
      "Still stuck? Foster Care Ombudsperson: 1-877-846-1602 or ofco.ca.gov.",
    ],
    resources: ["foster-ombuds", "fosterclub"],
    followup: "Browse Programs → Bill of Rights for the full list and sources.",
    quest: null,
  },
};

// Resource directory (Orange County / LA flavored). National hotlines are real.
// Hand-written entries. These beat the generated row for the same organisation
// — better copy, a real distance, a tag worth reading — so they are layered on
// top of the CSV-derived catalog below.
const CURATED_RESOURCES = {
  covenant: {
    name: "Covenant House California", cat: "Housing", catColor: "sky",
    blurb: "24/7 emergency shelter & crisis care for youth 18–24. Walk in any time.",
    meta: "Open now · 1.2 mi · Hollywood", phone: "1-800-388-3888", tag: "Open 24/7",
  },
  "211": {
    name: "211 LA / OC", cat: "All-in-one", catColor: "harbor",
    blurb: "Free helpline that connects you to housing, food, and health resources near you.",
    meta: "Call or text · Countywide", phone: "211", tag: "Free",
  },
  rightway: {
    name: "RightWay Foundation", cat: "Money & Jobs", catColor: "warm",
    blurb: "Job training, financial coaching, and mental health support built for foster youth.",
    meta: "1.0 mi · South LA", phone: "(323) 463-1000", tag: "Foster-specific",
  },
  james: {
    name: "James Storehouse", cat: "Essentials", catColor: "mint",
    blurb: "Free clothing, supplies, and wraparound support when you're starting from zero.",
    meta: "Newbury Park · Ventura", phone: "(805) 367-7038", tag: "Free supplies",
  },
  "ifoster-bank": {
    name: "iFoster — Banking Help", cat: "Money & Jobs", catColor: "warm",
    blurb: "Walks you through opening a no-fee bank account, no co-signer needed.",
    meta: "Online · Statewide", phone: null, tag: "Step-by-step",
  },
  "ifoster-peers": {
    name: "iFoster — Peers Paving the Path", cat: "Health", catColor: "mint",
    blurb: "Free Medi-Cal Certified Peer Support Specialists with lived foster-care experience for CA youth 16–26.",
    meta: "CA · Ages 16–26 · Medi-Cal", phone: "530-550-8001", tag: "Peer support",
    url: "https://www.ifoster.org/peers-paving-the-path/",
  },
  fosterclub: {
    name: "FosterClub", cat: "Essentials", catColor: "mint",
    blurb: "National peer network for young people with foster care experience — community, leadership, and transition tools.",
    meta: "Online · National", phone: null, tag: "Peer network",
    url: "https://www.fosterclub.com",
  },
  "fosterclub-whos": {
    name: "FosterClub — Who's in Foster Care?", cat: "Essentials", catColor: "mint",
    blurb: "National foster care primer with AFCARS and NYTD source links — cite their page; AfterCare does not republish those figures as ours.",
    meta: "Online · Stats primer", phone: null, tag: "Context",
    url: "https://www.fosterclub.com/whos-foster-care",
  },
  "ed-transition-toolkit": {
    name: "ED Foster Care Transition Toolkit", cat: "Education", catColor: "sky",
    blurb: "Public-domain U.S. Department of Education guide (May 2016) on transition planning, school, jobs, money, documents, housing, health, and transportation.",
    meta: "PDF · Public domain", phone: null, tag: "Federal guide",
    url: "https://www.ed.gov/sites/ed/files/about/inits/ed/foster-care/youth-transition-toolkit.pdf",
  },
  jbay: {
    name: "John Burton Advocates for Youth", cat: "Education", catColor: "sky",
    blurb: "Free help with FAFSA, college applications, and foster-youth tuition waivers.",
    meta: "Online · Statewide", phone: "(415) 348-1290", tag: "College",
  },
  "chafee-grant": {
    name: "California Chafee Grant", cat: "Education", catColor: "sky",
    blurb: "Up to $5,000/yr for college or job training. You never pay it back.",
    meta: "chafee.csac.ca.gov", phone: null, tag: "Up to $5k/yr",
  },
  "medical-ffy": {
    name: "Former Foster Youth Medi-Cal", cat: "Health", catColor: "mint",
    blurb: "Free health coverage until age 26 — no income limit. Auto-eligible if you aged out.",
    meta: "County Medi-Cal office", phone: "1-800-541-5555", tag: "Free to 26",
  },
  "foster-ombuds": {
    name: "Foster Care Ombudsperson", cat: "Legal", catColor: "harbor",
    blurb: "State office for foster youth rights complaints — help with grievances and county issues.",
    meta: "Statewide · CA", phone: "1-877-846-1602", tag: "Rights",
    url: "https://www.ofco.ca.gov",
  },
  "clc-ca": {
    name: "Children's Law Center of California", cat: "Legal", catColor: "harbor",
    blurb: "Dependency and juvenile court attorneys in many California counties — your attorney of record may be from CLC.",
    meta: "Statewide", phone: null, tag: "Court",
    url: "https://www.clccal.org/",
  },
  "988": {
    name: "988 Suicide & Crisis Lifeline", cat: "Crisis", catColor: "panic",
    blurb: "Call or text 988 any time to talk to someone right now. Free and confidential.",
    meta: "24/7 · Nationwide", phone: "988", tag: "Open 24/7",
  },
  trevor: {
    name: "The Trevor Project", cat: "Crisis", catColor: "panic",
    blurb: "Crisis support for LGBTQ+ young people, 24/7. Call, text, or chat.",
    meta: "24/7 · Nationwide", phone: "1-866-488-7386", tag: "LGBTQ+ · 24/7",
  },
};

// The full catalog: the curated set above, plus the ~65 California resources
// generated from supabase/seed/resources.sample.csv. The AI chat can only cite
// ids from this object, so its usefulness is bounded by how big this is — ten
// hand-written entries meant the chat kept pointing at the same few places.
//
// Curated copy wins field-by-field; the generated row still contributes url,
// address and the verified flag underneath it.
//
// Verification rule (do not change without updating site-chrome.jsx):
// `verified` comes ONLY from the CSV `verified` column via the generated
// catalog. A curated `tag` ("Open 24/7", "Free", ...) is descriptive copy
// and must NEVER be read as verification. Curated entries have no
// `verified` field of their own, so the generated value survives the merge.
export const RESOURCES = (() => {
  const merged = { ...GENERATED_RESOURCES };
  for (const [id, curated] of Object.entries(CURATED_RESOURCES)) {
    merged[id] = { ...merged[id], ...curated };
  }

  // Normalize: every entry carries a real boolean, so UI code can rely on
  // `!!r.verified` and never on the tag string.
  for (const id of Object.keys(merged)) {
    merged[id] = { ...merged[id], verified: Boolean(merged[id].verified) };
  }

  // Curated first, then everything else — the hand-written entries are the
  // ones with distances and real tags, so they should lead the list.
  const ordered = {};
  for (const id of Object.keys(CURATED_RESOURCES)) ordered[id] = merged[id];
  for (const id of Object.keys(merged)) if (!ordered[id]) ordered[id] = merged[id];
  return ordered;
})();

export const RESOURCE_CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "Housing", label: "Housing", icon: "home" },
  { id: "Money & Jobs", label: "Money & Jobs", icon: "cash" },
  { id: "Health", label: "Health", icon: "health" },
  { id: "Education", label: "School", icon: "grad" },
  { id: "Legal", label: "Legal", icon: "doc" },
  { id: "Crisis", label: "Crisis", icon: "shield" },
  { id: "Essentials", label: "Essentials", icon: "box" },
  { id: "All-in-one", label: "All-in-one", icon: "grid" },
];

// Quests
export const QUESTS = [
  {
    slug: "first-bank-account",
    title: "Get Your First Bank Account",
    tagline: "No parent. No co-signer. No fees.",
    icon: "bank", color: "sky",
    minutes: 20,
    why: "A bank account is the foundation of everything — getting paid, saving, building credit. Most foster kids don't have one, and check-cashing places quietly steal 3–5% of every paycheck.",
    steps: [
      {
        title: "Get your ID together",
        what: "You'll need a government photo ID, your Social Security number, and proof of address.",
        why: "Banks are legally required to verify who you are. No exceptions — but your ID is enough.",
        action: "Gather your ID + SSN. No printer needed.",
        check: "Got your ID and SSN ready?",
      },
      {
        title: "Pick a bank with no fees",
        what: "Most banks charge $5–15/month. You want a fee-free one.",
        why: "$15/month is $180/year — that's a phone bill you'd be paying for nothing.",
        action: "Open Chime, Current, or Capital One 360.",
        check: "Did the application go through?",
      },
      {
        title: "Set up direct deposit",
        what: "Get paid up to 2 days early and skip check-cashing fees.",
        why: "Check-cashing places take 3–5% of your paycheck. Direct deposit is free.",
        action: "Give your employer the routing + account numbers from the app.",
        check: "Direct deposit set up?",
      },
      {
        title: "Turn off overdraft fees",
        what: "Stop the bank charging you $35 every time a card declines.",
        why: "One bad week can be $200 in overdraft fees. Switch it off.",
        action: "Open the bank app → Settings → turn off overdraft.",
        check: "Overdraft protection sorted?",
      },
      {
        title: "Start the $20/week habit",
        what: "Auto-transfer $20/week to savings — $1,040/year without thinking about it.",
        why: "A $1,000 emergency fund is the single thing that changes your life after care.",
        action: "Open the app → Recurring Transfer → $20/week.",
        check: "Auto-save running?",
      },
    ],
  },
  {
    slug: "credit",
    title: "Credit Check & Fix",
    tagline: "Free reports at 14, 16, 17 — then build credit safely.",
    icon: "chart", color: "warm",
    minutes: 15,
    why: "Foster youth are at higher risk for identity theft on their SSN. Federal law gives you free credit reports — check at 14, 16, and 17, dispute fraud, then build credit the safe way at 18+.",
    steps: [
      {
        title: "Check your credit for free",
        what: "Pull all three credit reports free at AnnualCreditReport.com — ask your worker to help at 14, 16, and 17.",
        why: "Kids in care are often victims of identity theft. Catching a fake account early saves years of cleanup.",
        action: "Go to AnnualCreditReport.com and request your reports.",
        check: "Reviewed your reports for accounts you didn't open?",
      },
      {
        title: "Dispute anything that isn't yours",
        what: "If you see accounts or debts you never created, dispute them in writing.",
        why: "You are not responsible for fraud committed against you as a minor.",
        action: "File a dispute with each bureau online. A JBAY advocate or caseworker can help.",
        check: "Disputed anything suspicious?",
      },
      {
        title: "Open a credit-builder",
        what: "A secured card (small deposit) or a credit-builder account reports your on-time payments.",
        why: "It's the safest way to start credit with no history and no risk of overspending.",
        action: "Open a secured card, or a builder like Chime Credit Builder or Self.",
        check: "Credit-builder account opened?",
      },
      {
        title: "Use it tiny, pay it in full",
        what: "Put one small recurring bill on it and pay the whole balance every month.",
        why: "Staying under 30% of your limit and never carrying a balance raises your score fastest.",
        action: "Set the card to autopay the full statement balance.",
        check: "Autopay set to the full balance?",
      },
      {
        title: "Check back in 3 months",
        what: "A score usually appears after 3–6 months of on-time payments.",
        why: "Watching it climb tells you it's working — and you're now rentable and loanable.",
        action: "Check your score free in your bank app or Credit Karma.",
        check: "Watching your score grow?",
      },
    ],
  },
  {
    slug: "chafee-grant",
    title: "FAFSA/CADAA & Chafee",
    tagline: "File aid, then claim Chafee — up to $5,000/yr.",
    icon: "cash", color: "mint",
    minutes: 15,
    why: "The Chafee Grant is up to $5,000 a year for college or job training that you never pay back. If you were in foster care between 16 and 18 and you're under 26, you almost certainly qualify — but you have to apply every year.",
    steps: [
      {
        title: "Confirm you qualify",
        what: "You need at least one day in care between 16 and 18, be under 26, and be enrolled at least half-time.",
        why: "Most eligible youth never claim it because no one tells them they qualify.",
        action: "Check the boxes: in care 16–18, under 26, half-time student.",
        check: "Do you meet all three?",
      },
      {
        title: "File FAFSA or CADAA first",
        what: "Chafee needs a completed FAFSA at studentaid.gov or a California Dream Act Application (CADAA) if you are undocumented.",
        why: "The grant is tied to your financial-aid file — no FAFSA/CADAA, no Chafee.",
        action: "File FAFSA or CADAA and answer the foster-care question accurately.",
        check: "FAFSA or CADAA submitted?",
      },
      {
        title: "Apply at chafee.csac.ca.gov",
        what: "The Chafee application itself takes about 15 minutes.",
        why: "This is the actual grant form — the FAFSA alone doesn't do it.",
        action: "Go to chafee.csac.ca.gov and complete the Chafee form.",
        check: "Chafee application submitted?",
      },
      {
        title: "Tell your school",
        what: "Your school's financial-aid office confirms enrollment so the money can pay out.",
        why: "The grant pays through your school — they need to know you claimed it.",
        action: "Email financial aid that you've applied for the Chafee Grant.",
        check: "Financial-aid office notified?",
      },
      {
        title: "Set a reminder to reapply",
        what: "Chafee is annual — you re-file the FAFSA and Chafee app each year until 26.",
        why: "Miss a year and you leave up to $5,000 on the table.",
        action: "Set a reminder for next January to reapply.",
        check: "Reminder set to reapply?",
      },
    ],
  },
  {
    slug: "health-26",
    title: "Medi-Cal to 26",
    tagline: "Former foster youth coverage — confirm with your county.",
    icon: "health", color: "sky",
    minutes: 10,
    why: "If you were in foster care on your 18th birthday, you keep free Medi-Cal until you turn 26 — no income limit, no yearly reapplication. Most foster youth never find out and go uninsured. Don't be one of them.",
    steps: [
      {
        title: "Confirm your coverage",
        what: "You're auto-eligible for the Former Foster Youth (FFY) Medi-Cal program if you aged out at 18+.",
        why: "It's automatic — but only if the county has your current info.",
        action: "Call your county Medi-Cal office and say \"former foster youth.\"",
        check: "Confirmed you're in the FFY program?",
      },
      {
        title: "Update your address",
        what: "Give the county your current mailing address and phone.",
        why: "Renewal notices go by mail — a wrong address is the #1 reason coverage lapses.",
        action: "Update your contact info with the county, online or by phone.",
        check: "Address updated with the county?",
      },
      {
        title: "Get your Benefits ID card",
        what: "Ask for your BIC (Benefits Identification Card) if you don't have one.",
        why: "You need it to see a doctor, dentist, or therapist for free.",
        action: "Request your BIC from the county.",
        check: "BIC card in hand or on the way?",
      },
      {
        title: "Pick a doctor",
        what: "Choose a primary care provider so you have somewhere to go before you're sick.",
        why: "A doctor lined up turns \"I feel awful\" into a same-week appointment.",
        action: "Call the number on your plan or use the Medi-Cal site to pick one.",
        check: "Primary doctor chosen?",
      },
      {
        title: "Save the crisis line",
        what: "Medi-Cal covers mental health too — save 988 and your plan's behavioral-health number.",
        why: "Coverage only helps if you can reach it fast when you need it.",
        action: "Save 988 and your plan's mental-health line in your phone.",
        check: "Crisis numbers saved?",
      },
    ],
  },
  {
    slug: "drivers-license",
    title: "Get Your Learner's Permit & Driver's License",
    tagline: "California DMV steps — documents to road test.",
    icon: "car", color: "harbor",
    minutes: 35,
    featured: true,
    why: "A learner's permit and license unlock jobs, independence, and proof of identity. California foster youth can have a grandparent, adult sibling, aunt/uncle, foster parent, or (with proof of insurance) a social worker or probation officer sign the application. Confirm every fee and rule on dmv.ca.gov — they change.",
    completion:
      "You worked the California DMV path — documents, permit, practice, and the road test. That independence is real. Keep your insurance proof with you whenever you drive.",
    steps: [
      {
        title: "Gather your documents",
        what: "Proof of identity, your Social Security number (or proof you are not eligible for one), and California residency documents.",
        why: "DMV will not start the application without these. Your social worker or ILP can often help you get certified copies.",
        action: "Ask your social worker/ILP for your birth certificate and SSN card, and list residency docs you already have.",
        check: "Got identity, SSN, and residency proof ready?",
      },
      {
        title: "Driver's ed (if under 18)",
        what: "Under 18, California generally requires a Certificate of Completion or Enrollment of Driver Education before an instruction permit. CDSS notes high school or community college programs may be options.",
        why: "Without driver's ed (when required for your age), the DMV will not issue your permit.",
        action: "Ask your school, caregiver, or ILP about driver's ed enrollment and whether ILP can help with cost.",
        check: "Driver's ed certificate or enrollment in hand (or you're 18+)?",
      },
      {
        title: "Study for the knowledge test",
        what: "Read the California Driver Handbook and take practice tests. Passing score is 80%.",
        why: "The written test is based on the handbook — practice runs make it far less stressful.",
        action: "Take 2–3 free practice tests via dmv.ca.gov resources or a reputable practice app.",
        check: "Passing practice tests consistently?",
      },
      {
        title: "Get your learner's / instruction permit",
        what: "Complete the DL/ID application, get an authorized adult signature, book a DMV visit for vision exam, photo, fee, and knowledge test. Under 18 you must be at least 15½ (per DMV).",
        why: "The permit is what lets you practice on the road with a licensed adult.",
        action: "Book at dmv.ca.gov. If under 18, ask who will sign — foster parent, relative, or social worker/probation officer with proof of financial responsibility.",
        check: "Instruction permit in hand?",
      },
      {
        title: "Insurance & practice hours",
        what: "You must carry proof of financial responsibility when you drive and for the drive test. DMV minimum liability limits apply; California also has a Low Cost Auto Insurance Program if you qualify. Complete required supervised practice / provisional rules for your age.",
        why: "No insurance, no legal driving — and a social worker can only sign when proof of financial responsibility is filed.",
        action: "Confirm insurance coverage, save the card in your phone, and log practice with a licensed adult. Ask ILP about help with training or insurance (varies by county).",
        check: "Insurance proof ready and practice underway?",
      },
      {
        title: "Pass the behind-the-wheel test",
        what: "Schedule the driving test at DMV with an insured, registered vehicle that meets test rules.",
        why: "This is the last milestone — pass it and you are licensed.",
        action: "Schedule your road test at dmv.ca.gov and bring permit, insurance proof, and a qualified licensed adult if required.",
        check: "Road test scheduled or passed?",
      },
    ],
  },
  {
    slug: "vital-documents",
    title: "Get Your Vital Documents",
    tagline: "Birth certificate, SSN card, and state ID.",
    icon: "doc", color: "harbor",
    minutes: 25,
    featured: true,
    why: "Without identity documents, almost every adult step stalls — bank accounts, jobs, DMV, benefits, school aid. Getting certified copies once saves you from repeating the scramble.",
    completion:
      "You lined up the papers every other Quest needs. Keep safe copies somewhere you control — and never hand away your only certified original if you can avoid it.",
    steps: [
      {
        title: "Inventory what you have",
        what: "List birth certificate, Social Security card, state ID/license, and passport if any — plus where each one is.",
        why: "You might already have certified copies in your case file or with a caregiver.",
        action: "Ask your social worker, caregiver, or ILP what documents are already on file for you.",
        check: "Know what you have and what's missing?",
      },
      {
        title: "Request your birth certificate",
        what: "Order a certified copy from the California Department of Public Health or your county recorder if you were born in CA.",
        why: "Banks, DMV, and many jobs ask for it — a photocopy often isn't enough.",
        action: "Start the request with your worker's help, or look up your county recorder / CDPH vital records process.",
        check: "Birth certificate requested or in hand?",
      },
      {
        title: "Get or replace your SSN card",
        what: "Apply for a Social Security card (or replacement) through the Social Security Administration.",
        why: "You need the number for work, taxes, and benefits — the card proves it.",
        action: "Go to ssa.gov or a local SSA office with the ID they require (your worker can help).",
        check: "SSN card requested or in hand?",
      },
      {
        title: "Get a California state ID",
        what: "You can get a state ID at the DMV without driving — useful if you're not ready for a license yet.",
        why: "Photo ID unlocks banks, jobs, and housing applications.",
        action: "Book a DMV visit for an ID card and bring the identity/residency docs they list on dmv.ca.gov.",
        check: "State ID (or license) in hand or appointment booked?",
      },
      {
        title: "Store safe copies",
        what: "Photograph or scan certified copies and save them somewhere only you control.",
        why: "Losing the only original sends you back to square one.",
        action: "Save copies to a locked phone album or trusted cloud account you own — tell one safe adult where they are.",
        check: "Safe copies stored?",
      },
    ],
  },
  {
    slug: "housing-plan",
    title: "Make a Housing Plan",
    tagline: "Safe tonight, stable next month.",
    icon: "home", color: "warm",
    minutes: 20,
    why: "Housing is the difference between finishing school and surviving day to day. Start with safety tonight, then build a plan with your worker — not a rushed lease you don't understand.",
    completion:
      "You know your crisis numbers, you've looped in your team, and you have a next-step plan. That is how people get from tonight to a real roof.",
    steps: [
      {
        title: "If you need a bed tonight",
        what: "Use the Panic Button, call 211, or Covenant House at 1-800-388-3888. Safety first — paperwork can wait.",
        why: "You have a right to emergency help. You are not in trouble for asking.",
        action: "Save Covenant House, 211, and 988 in your phone — call now if you need a bed tonight.",
        check: "Crisis numbers saved (and called if you needed them)?",
      },
      {
        title: "Tell someone on your team",
        what: "Contact your social worker, attorney, ILP, or a trusted adult about housing.",
        why: "They can open transitional options and put housing on your TILP / court record.",
        action: "Send a short message: “I need help with housing — can we talk today?”",
        check: "Reached out to your worker or ILP?",
      },
      {
        title: "Ask about transitional programs",
        what: "Ask specifically about THP / THP-Plus / THP+FC or other transitional housing where you live — availability varies by county.",
        why: "These programs exist for youth leaving care; many people never hear the name.",
        action: "Write down three questions for your next meeting about housing options and eligibility.",
        check: "Asked about transitional housing options?",
      },
      {
        title: "Plan the next roof carefully",
        what: "Shared housing, deposits, and leases — go slow so you are not trapped.",
        why: "A bad lease is expensive to escape. Tenant rights matter.",
        action: "Before signing anything, have a trusted adult or legal aid look it over — and never sign under pressure.",
        check: "Know not to sign a lease without a second pair of eyes?",
      },
      {
        title: "Keep a backup plan",
        what: "Know one backup bed (friend, relative, shelter number) if the current plan falls through.",
        why: "Plans change. A backup keeps one hard night from becoming a crisis spiral.",
        action: "Write one backup contact and one shelter number on a note in your phone.",
        check: "Backup plan written down?",
      },
    ],
  },
  {
    slug: "first-job",
    title: "Get Your First Job",
    tagline: "Apply, interview, get paid into your account.",
    icon: "cash", color: "mint",
    minutes: 25,
    featured: true,
    why: "A first paycheck builds confidence and independence — especially when it lands in your own bank account instead of a check-cashing shop.",
    completion:
      "You know how to apply, show up, and protect your paycheck. That first job energy is real — keep going.",
    steps: [
      {
        title: "Get work-ready documents",
        what: "Photo ID, Social Security card, and a work permit if you're under 18.",
        why: "Employers have to verify who you are before they can pay you.",
        action: "Gather ID + SSN card (use the Vital Documents Quest if you're missing them).",
        check: "Work documents ready?",
      },
      {
        title: "Pick places to apply",
        what: "Start local: retail, warehouse, food service, campus jobs, grocery — places that hire year-round.",
        why: "A first job is about getting started, not finding a forever career on day one.",
        action: "List 5 places near you and apply to at least 3 this week (online or in person).",
        check: "Submitted at least 3 applications?",
      },
      {
        title: "Practice the interview",
        what: "Practice saying your availability, that you're reliable, and one example of teamwork or showing up.",
        why: "One practice run out loud makes the real interview less scary.",
        action: "Practice 3 answers with a friend, mirror, or AfterCare chat.",
        check: "Practiced your answers once?",
      },
      {
        title: "Protect your paycheck",
        what: "Open a no-fee bank account and set up direct deposit.",
        why: "Check-cashing places quietly take a cut of every paycheck.",
        action: "Start or finish the First Bank Account Quest, then give HR your routing + account numbers.",
        check: "Direct deposit set (or bank account started)?",
      },
      {
        title: "Show up the first week",
        what: "Be early, ask questions, and write down your schedule.",
        why: "Reliability is how first jobs turn into references and better shifts.",
        action: "Set alarms for your first three shifts and save your supervisor's number.",
        check: "Ready for your first week?",
      },
    ],
  },
  {
    slug: "ab12-extended-care",
    title: "Stay in Care Under AB 12",
    tagline: "Extended foster care to 21 — plan before 18.",
    icon: "home", color: "harbor",
    minutes: 20,
    why: "California AB 12 lets eligible youth stay in foster care with support to age 21. Housing, school, and work rules apply — your attorney confirms what fits you.",
    steps: [
      {
        title: "Meet before your 18th birthday",
        what: "Schedule time with your social worker and attorney about extended foster care eligibility.",
        why: "Court approval and a plan are usually required — waiting until the last week makes it harder.",
        action: "Ask: \"Do I qualify for AB 12 extended foster care, and what must I sign or file?\"",
        check: "Meeting set with worker and attorney?",
      },
      {
        title: "Pick a placement path",
        what: "Options may include your current home, SILP, dorm housing, THP+FC, or another approved setting.",
        why: "Where you live affects rent help, supervision, and school stability.",
        action: "List two housing options and ask which ones your county funds.",
        check: "Compared at least two placement types?",
      },
      {
        title: "Confirm participation rules",
        what: "Most youth must be in school, working, or in an approved program — or have an exemption.",
        why: "Court can end EFC if participation rules are not met — confirm with your attorney.",
        action: "Ask your attorney what counts for you and how to document it.",
        check: "Know your school/work requirement or exemption?",
      },
      {
        title: "Update your TILP",
        what: "Your Transitional Independent Living Plan should match your real goals — housing, Medi-Cal, documents, education.",
        why: "A vague plan does not protect you when something goes wrong.",
        action: "Request a written TILP copy and mark what still needs to happen.",
        check: "TILP updated in writing?",
      },
      {
        title: "Know re-entry",
        what: "Some youth who left care can petition to re-enter before 21 — deadlines and rules vary.",
        why: "If you already left, you may still have a window — legal advice required.",
        action: "Ask your attorney about re-entry and any filing deadlines for your county.",
        check: "Asked about re-entry if you previously left care?",
      },
    ],
  },
  {
    slug: "court-rights",
    title: "Court & Your Attorney",
    tagline: "Hearings, reports, and your voice in court.",
    icon: "doc", color: "harbor",
    minutes: 15,
    why: "Dependency and delinquency court decisions shape where you live and what help you get. Your attorney works for you — not CPS or probation.",
    steps: [
      {
        title: "Save your attorney's contact",
        what: "Put your lawyer's name, phone, and email in your phone today.",
        why: "In a crisis you should not be hunting for a number.",
        action: "Ask your worker or the court clerk for your attorney of record if you don't have it.",
        check: "Attorney contact saved?",
      },
      {
        title: "Ask before the next hearing",
        what: "Find out the hearing purpose, whether you should attend, and whether you can speak.",
        why: "You have the right to participate when appropriate — preparation helps.",
        action: "Call or text: \"What is the next hearing about, and should I prepare a statement?\"",
        check: "Talked to your attorney before the hearing?",
      },
      {
        title: "Request court reports",
        what: "In many counties you can ask for copies of social worker or probation reports before hearings.",
        why: "Surprises in court are harder to challenge.",
        action: "Ask your attorney how to get reports in your county.",
        check: "Know how to get your reports?",
      },
      {
        title: "Show up prepared",
        what: "Dress comfortably, bring notes, and arrive early past security.",
        why: "Judges and lawyers take you more seriously when you are prepared.",
        action: "Write three bullet points you want the court to know.",
        check: "Notes ready for court?",
      },
      {
        title: "Follow up in writing",
        what: "After court, email your attorney what you understood from the orders.",
        why: "A short summary catches mistakes early.",
        action: "Send a follow-up message within 24 hours of the hearing.",
        check: "Sent a follow-up after your last hearing?",
      },
    ],
  },
  {
    slug: "seal-records",
    title: "Seal Juvenile Records",
    tagline: "Legal steps — confirm with an attorney.",
    icon: "shield", color: "warm",
    minutes: 20,
    why: "Sealed records can open doors for jobs and housing, but eligibility depends on your case. This Quest is navigation only — not legal advice.",
    steps: [
      {
        title: "Identify your case types",
        what: "Dependency (child welfare) and delinquency (juvenile justice) have different sealing paths.",
        why: "The wrong form wastes months — a lawyer tells you which applies.",
        action: "Ask legal aid or your juvenile attorney which records exist for you.",
        check: "Know dependency vs. delinquency for your situation?",
      },
      {
        title: "Check current California rules",
        what: "California Courts self-help lists waiting periods and forms.",
        why: "Rules change — use courts.ca.gov, not random blog posts.",
        action: "Open courts.ca.gov self-help sealing pages with your attorney.",
        check: "Reviewed official self-help materials?",
      },
      {
        title: "Gather your paperwork",
        what: "Case numbers, docket dates, and any disposition papers help legal aid file faster.",
        why: "Courts need exact case info.",
        action: "Request your juvenile case summary from your attorney or clerk.",
        check: "Have case numbers and dates?",
      },
      {
        title: "File with legal help",
        what: "Many counties offer free sealing clinics or legal aid assistance.",
        why: "A rejected petition can delay you — legal help reduces errors.",
        action: "Call 211 or your county legal aid to ask about juvenile record sealing.",
        check: "Connected with legal aid or your attorney to file?",
      },
      {
        title: "Keep your proof",
        what: "Save the court order showing records were sealed.",
        why: "Employers or landlords may ask — you need a copy, not a story.",
        action: "Scan the sealed order to a folder only you control.",
        check: "Sealing order saved somewhere safe?",
      },
    ],
  },
  {
    slug: "taxes",
    title: "File Your First Tax Return",
    tagline: "Get the refund that's yours.",
    icon: "doc", color: "warm",
    minutes: 20,
    why: "Filing taxes can put real money back in your pocket — refunds and credits worth up to a few thousand dollars. It's free to file, and foster youth often get money back even on a small income.",
    steps: [
      {
        title: "Gather your tax forms",
        what: "Collect the W-2 from each job (and any 1099s). They arrive by late January.",
        why: "These show what you earned and what was already withheld — you can't file without them.",
        action: "Round up every W-2 and 1099 from last year.",
        check: "Got all your W-2s and 1099s?",
      },
      {
        title: "Use a free filing service",
        what: "If you made under about $79,000 you can file 100% free through IRS Free File or VITA.",
        why: "Never pay to file — free tools do the same thing and find credits for you.",
        action: "Go to irs.gov/freefile, or find a free VITA site near you.",
        check: "Free filing tool chosen?",
      },
      {
        title: "Claim your credits",
        what: "The Earned Income Tax Credit and others can add hundreds or thousands to your refund.",
        why: "These credits are the whole reason low-income filers often get money back.",
        action: "Answer every question honestly — the tool applies credits you qualify for.",
        check: "Let the tool check you for credits?",
      },
      {
        title: "Set up direct deposit",
        what: "Enter your bank routing + account number so your refund comes straight to you.",
        why: "Direct deposit is faster and skips check-cashing fees.",
        action: "Add your bank info from your banking app to the return.",
        check: "Direct deposit set for your refund?",
      },
      {
        title: "File and save a copy",
        what: "Submit before the April deadline and save a PDF of your return.",
        why: "You'll need last year's return for FAFSA, apartments, and next year's taxes.",
        action: "File electronically and download a copy to keep.",
        check: "Filed and saved a copy?",
      },
    ],
  },
];

// Panic scenarios
export const PANIC_SCENARIOS = [
  {
    id: "sleep", label: "I have nowhere to sleep tonight", icon: "bed",
    plan: {
      title: "Let's get you somewhere safe tonight.",
      now: "You have a right to emergency shelter. This is not your fault and you are not in trouble.",
      shelter: "covenant",
      line: "988",
      sms: "Hi, this is an emergency — I don't have a safe place to sleep tonight and I need help finding shelter. Can you call me?",
    },
  },
  {
    id: "kicked", label: "I'm being kicked out", icon: "door",
    plan: {
      title: "Okay. Let's slow this down and protect you.",
      now: "If you're under 21 in extended care, you may have a right to stay. Either way, we'll find you a bed.",
      shelter: "covenant",
      line: "211",
      sms: "I'm being told to leave my placement and I need help right now. Please call me as soon as you can.",
    },
  },
  {
    id: "hurt", label: "I'm being hurt", icon: "shield",
    plan: {
      title: "Your safety comes first. Right now.",
      now: "If you're in immediate danger, call 911. To talk to someone this second, 988 is free and confidential.",
      shelter: "covenant",
      line: "988",
      sms: "I don't feel safe where I am and I need help. Please contact me right away.",
    },
  },
  {
    id: "evict", label: "I'm about to be evicted", icon: "home",
    plan: {
      title: "There are people who do exactly this. Let's call them.",
      now: "Free legal aid can often stop or delay an eviction. Don't sign anything yet.",
      shelter: "211",
      line: "211",
      sms: "I got an eviction notice and I don't know what to do. Can you help me find legal aid?",
    },
  },
  {
    id: "other", label: "Something else", icon: "dots",
    plan: {
      title: "Whatever it is, we'll figure it out together.",
      now: "Tell me what's happening in the chat, or call 211 to talk to a real person who can route you.",
      shelter: "211",
      line: "988",
      sms: "I'm going through something and I need to talk. Can you reach out to me?",
    },
  },
];
