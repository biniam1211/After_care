// ───────────────────────────────────────────────────────────
// AfterCare — content / data layer
// Ported from the Claude Design prototype. Exported as ES modules.
// ───────────────────────────────────────────────────────────

// Suggested chat prompts (chips shown on empty chat)
export const CHAT_SUGGESTIONS = [
  { id: "bank", text: "How do I open a bank account without a parent?", icon: "bank" },
  { id: "college", text: "How do I apply to college with no parents?", icon: "grad" },
  { id: "chafee", text: "What's the Chafee Grant and do I qualify?", icon: "cash" },
  { id: "health", text: "How do I keep my health insurance after 18?", icon: "health" },
  { id: "kicked", text: "My foster mom is kicking me out. What do I do?", icon: "alert" },
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
    resources: ["jbay", "chafee-grant"],
    followup: "The Chafee Grant alone is up to $5k a year. Want me to walk you through claiming it?",
    quest: "chafee-grant",
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
    resources: ["medical-ffy", "211"],
    followup: "Want a Quest that locks in your coverage to 26 step by step?",
    quest: "health-26",
  },
  kicked: {
    answer:
      "Okay — first, breathe. You are not in trouble and you're not alone tonight. If this is happening right now, the fastest help is one tap away with the Panic Button below. Let's make sure you're safe first, then sort the rest.",
    steps: [
      "If you feel unsafe, tap the red Panic Button — I'll pull up a shelter near you in seconds.",
      "You have a right to emergency housing. Covenant House (1-800-388-3888) takes youth 24/7, no questions.",
      "Text your caseworker now — I can draft the message for you so you don't have to find the words.",
    ],
    resources: ["covenant", "211"],
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
};

// Resource directory (Orange County / LA flavored). National hotlines are real.
export const RESOURCES = {
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

export const RESOURCE_CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "Housing", label: "Housing", icon: "home" },
  { id: "Money & Jobs", label: "Money & Jobs", icon: "cash" },
  { id: "Health", label: "Health", icon: "health" },
  { id: "Education", label: "School", icon: "grad" },
  { id: "Crisis", label: "Crisis", icon: "shield" },
  { id: "Essentials", label: "Essentials", icon: "box" },
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
  { slug: "credit", title: "Build Your Credit Score", tagline: "Start from nothing, the safe way.", icon: "chart", color: "warm", minutes: 15, locked: true },
  { slug: "chafee-grant", title: "Claim Your Chafee Grant", tagline: "Up to $5,000/yr for school.", icon: "cash", color: "mint", minutes: 15, locked: true },
  { slug: "health-26", title: "Keep Health Insurance to 26", tagline: "Free coverage you already qualify for.", icon: "health", color: "sky", minutes: 10, locked: true },
  { slug: "license", title: "Get Your Driver's License", tagline: "ID, permit, and the road test.", icon: "car", color: "harbor", minutes: 25, locked: true },
  { slug: "taxes", title: "File Your First Tax Return", tagline: "Get the refund that's yours.", icon: "doc", color: "warm", minutes: 20, locked: true },
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
