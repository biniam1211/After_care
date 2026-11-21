/**
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
export const PROGRAMS = [
  {
    "layout": "flagship",
    "category": "documents-money",
    "voice": "A license is real freedom — but the DMV wants paperwork in the right order. We'll keep it straight.",
    "sayThis": [
      "I need help getting my birth certificate and SSN for the DMV.",
      "Who can sign my permit application as my foster youth?",
      "Can ILP help with driver's ed or insurance?"
    ],
    "documents": [
      "Birth certificate or passport",
      "SSN card or SSA letter",
      "California residency proof",
      "DL 44 application",
      "Driver ed certificate (if under 18)",
      "Proof of insurance when required"
    ],
    "whoToCall": [
      {
        "name": "California DMV",
        "detail": "Appointments and handbook — dmv.ca.gov"
      },
      {
        "name": "Your social worker / ILP",
        "detail": "Documents, driver's ed, and county training help"
      },
      {
        "name": "CDSS — Getting around",
        "detail": "Foster youth driver license guidance"
      }
    ],
    "notes": [
      "AfterCare is not the DMV or an insurer. Confirm current fees and rules on official sites.",
      "This is guidance only — not legal advice."
    ],
    "sources": [
      {
        "label": "California DMV — Learner's permits",
        "href": "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/"
      },
      {
        "label": "CDSS — Getting around",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care/environmental-wellness/getting-around"
      },
      {
        "label": "California Low Cost Auto Insurance",
        "href": "https://www.mylowcostauto.com/"
      }
    ],
    "faqs": [
      {
        "q": "Can my social worker sign for my permit?",
        "a": "Yes — per CDSS, a CPS worker or probation officer may sign if you file proof of financial responsibility. Relatives and your foster parent may also sign (with liability implications)."
      },
      {
        "q": "Do I need driver's ed at 18?",
        "a": "Under-18 rules differ from adults 18+. Adults still start with an instruction permit before a first license. Confirm on dmv.ca.gov."
      }
    ],
    "related": [
      "vital-documents",
      "credit-identity-theft",
      "jobs",
      "money"
    ],
    "questSlug": "drivers-license",
    "photoId": "first-car",
    "flagship": true,
    "slug": "drivers-license",
    "title": "Driver's license & learner's permit",
    "shortTitle": "Driver's license",
    "tagline": "From documents to permit to license — step by step for California foster youth.",
    "summary": "Getting a learner's permit and driver's license is one of the biggest independence milestones after care. AfterCare walks you through California DMV steps, who can sign for you, driver's ed and training options, and how insurance fits in — with links to official sources only.",
    "whoFor": "Foster youth and former foster youth in California working toward a learner's permit or driver's license.",
    "steps": [
      {
        "title": "Gather your documents",
        "body": "You need proof of identity, your Social Security number (or proof you are not eligible), and California residency documents. Ask your social worker or ILP for certified copies."
      },
      {
        "title": "Complete driver's education (if under 18)",
        "body": "Under 18, California generally requires a Certificate of Completion or Enrollment in driver education before an instruction permit. CDSS notes you may use high school or community college programs — ask if ILP can help with cost."
      },
      {
        "title": "Get your learner's permit",
        "body": "Complete the DL/ID application, get an authorized adult signature, and visit DMV for vision exam, photo, fee, and knowledge test (80% to pass). Under 18 you must be at least 15½."
      },
      {
        "title": "Who can sign for foster youth under 18",
        "body": "Per CDSS: a grandparent, sibling 18+, aunt/uncle, foster parent you live with, or a probation/CPS worker may sign. A worker or probation officer may sign without personal liability only if you file proof of financial responsibility (insurance)."
      },
      {
        "title": "Practice and insurance",
        "body": "Carry proof of insurance whenever you drive and for the drive test. Complete provisional practice hours. Ask about California Low Cost Auto Insurance (mylowcostauto.com) and county ILP help — varies by county."
      },
      {
        "title": "Pass the behind-the-wheel test",
        "body": "Schedule at dmv.ca.gov with an insured, registered vehicle. Bring permit, insurance proof, and any required licensed adult."
      }
    ],
    "highlights": [
      "Gather your documents",
      "Complete driver's education (if under 18)",
      "Get your learner's permit",
      "Who can sign for foster youth under 18"
    ]
  },
  {
    "layout": "practical",
    "category": "documents-money",
    "voice": "You deserve a straight answer on birth certificate, ssn, state id. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with birth certificate, ssn, state id — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California DMV — ID cards",
        "href": "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/"
      },
      {
        "label": "Social Security — replacement card",
        "href": "https://www.ssa.gov/ssnumber/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my birth certificate, ssn, state id provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "drivers-license",
      "money",
      "passport-records",
      "credit-identity-theft"
    ],
    "questSlug": "vital-documents",
    "photoId": null,
    "flagship": false,
    "slug": "vital-documents",
    "title": "Vital documents",
    "shortTitle": "Birth certificate, SSN, state ID",
    "tagline": "Birth certificate, Social Security card, and state ID — the papers every other step needs.",
    "summary": "Without a birth certificate, SSN card, or state ID, almost every adult task stalls. AfterCare helps you figure out which documents you need, where to request them in California, and how to store copies safely.",
    "whoFor": "Youth who need identity documents to open accounts, work, drive, or apply for benefits.",
    "steps": [
      {
        "title": "List what you already have",
        "body": "Check with your social worker, caregiver, or ILP for certified copies in your case file."
      },
      {
        "title": "Request what is missing",
        "body": "Birth certificates: California Department of Public Health or county recorder. SSN card: ssa.gov. State ID: DMV without a license."
      },
      {
        "title": "Keep safe copies",
        "body": "Photograph certified copies and store them somewhere you control. Never give away your only certified original if you can avoid it."
      }
    ],
    "highlights": [
      "List what you already have",
      "Request what is missing",
      "Keep safe copies"
    ]
  },
  {
    "layout": "practical",
    "category": "documents-money",
    "voice": "You deserve a straight answer on credit & id theft. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with credit & id theft — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "AnnualCreditReport.com",
        "href": "https://www.annualcreditreport.com/"
      },
      {
        "label": "FTC — Identity theft",
        "href": "https://www.identitytheft.gov/"
      },
      {
        "label": "John Burton Advocates for Youth",
        "href": "https://jbay.org/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my credit & id theft provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "vital-documents",
      "money",
      "scams"
    ],
    "questSlug": "credit",
    "photoId": null,
    "flagship": false,
    "slug": "credit-identity-theft",
    "title": "Credit check & identity theft",
    "shortTitle": "Credit & ID theft",
    "tagline": "Pull free reports at 14, 16, and 17 — and fix fraud on your SSN.",
    "summary": "Federal law lets you check credit reports for free. Youth in care should check at ages 14, 16, and 17 for identity theft on their SSN. AfterCare walks you through AnnualCreditReport.com, disputes, and safer credit-building.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Check at 14, 16, and 17",
        "body": "Ask your caregiver, worker, or ILP to help you pull free reports at AnnualCreditReport.com — one bureau at a time or all three."
      },
      {
        "title": "Dispute fraud",
        "body": "If accounts are not yours, dispute with each credit bureau online. Keep copies. Your worker or JBAY may help."
      },
      {
        "title": "Freeze or monitor",
        "body": "Consider a free security freeze or fraud alert if someone misused your SSN — confirm current steps on FTC.gov/identitytheft."
      },
      {
        "title": "Build credit safely later",
        "body": "At 18+, a secured card or credit-builder used small and paid in full is safer than cosigned debt you do not control."
      }
    ],
    "highlights": [
      "Check at 14, 16, and 17",
      "Dispute fraud",
      "Freeze or monitor",
      "Build credit safely later"
    ]
  },
  {
    "layout": "practical",
    "category": "documents-money",
    "voice": "You deserve a straight answer on passport & records. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with passport & records — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my passport & records provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "vital-documents",
      "court-and-lawyer"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "passport-records",
    "title": "Passport & case records",
    "shortTitle": "Passport & records",
    "tagline": "Passports, court records copies, and your case file.",
    "summary": "Passport & case records — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from passport & records this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on tilp. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with tilp — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my tilp provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "aging-out-90-day-plan",
      "extended-foster-care"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "tilp",
    "title": "TILP & transition planning",
    "shortTitle": "TILP",
    "tagline": "Your Transitional Independent Living Plan — make it match your real life.",
    "summary": "TILP & transition planning — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from tilp this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on while in care. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with while in care — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my while in care provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "foster-youth-bill-of-rights",
      "placement-changes"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "while-in-care",
    "title": "Life while in foster care",
    "shortTitle": "While in care",
    "tagline": "Day-to-day rights, routines, and who decides what.",
    "summary": "Life while in foster care — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from while in care this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "rights",
    "category": "in-care",
    "voice": "You deserve a straight answer on bill of rights. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with bill of rights — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Foster Youth Bill of Rights (WIC 16001.9)",
        "href": "https://www.cdss.ca.gov/portals/17/FosterYouthBillofRightsposterEnglishFNL.pdf"
      },
      {
        "label": "Foster Care Ombudsperson",
        "href": "https://www.ofco.ca.gov"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my bill of rights provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "grievance-ombudsperson",
      "while-in-care",
      "court-and-lawyer"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "foster-youth-bill-of-rights",
    "title": "Foster youth bill of rights",
    "shortTitle": "Bill of rights",
    "tagline": "California WIC 16001.9 — what you are entitled to while in care.",
    "summary": "California Welfare and Institutions Code section 16001.9 lists foster youth rights — to care, safety, education, privacy, and participation in decisions. Know the list, then use your attorney and the Ombudsperson if rights are violated.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Get the official rights list",
        "body": "Ask your worker for the Foster Youth Bill of Rights (WIC 16001.9). You should receive it when you enter care and again at every placement change."
      },
      {
        "title": "Know the big buckets",
        "body": "Rights include adequate food, clothing, shelter; education; privacy; reasonable contact with family; participation in court; and complaint processes without retaliation."
      },
      {
        "title": "Use your voice in court",
        "body": "You have the right to attend hearings and speak when appropriate. Your attorney can help you prepare."
      },
      {
        "title": "File a grievance if needed",
        "body": "Start with your worker or supervisor. You can also contact the Foster Care Ombudsperson for help with unresolved complaints."
      }
    ],
    "highlights": [
      "Get the official rights list",
      "Know the big buckets",
      "Use your voice in court",
      "File a grievance if needed"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on placement moves. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with placement moves — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my placement moves provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "siblings-family-visits",
      "normalcy"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "placement-changes",
    "title": "Placement changes",
    "shortTitle": "Placement moves",
    "tagline": "When your home changes — visits, notice, and your say.",
    "summary": "Placement changes — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from placement moves this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "rights",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on court & lawyer. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with court & lawyer — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Courts — Juvenile dependency",
        "href": "https://www.courts.ca.gov/selfhelp/juveniledependency.htm"
      },
      {
        "label": "Children's Law Center of California",
        "href": "https://www.clccal.org/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my court & lawyer provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "free-legal-help",
      "sealing-records"
    ],
    "questSlug": "court-rights",
    "photoId": null,
    "flagship": false,
    "slug": "court-and-lawyer",
    "title": "Court & your attorney",
    "shortTitle": "Court & lawyer",
    "tagline": "Hearings, your attorney of record, and speaking in court.",
    "summary": "Court & your attorney — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Know your attorney's name",
        "body": "Save your dependency or delinquency attorney's phone and email. They represent you — not the agency."
      },
      {
        "title": "Prepare for hearings",
        "body": "Ask what the hearing is about, whether you should speak, and what outcomes are possible."
      },
      {
        "title": "Request copies",
        "body": "Ask for copies of court reports before hearings when policy allows, so you are not surprised."
      }
    ],
    "highlights": [
      "Know your attorney's name",
      "Prepare for hearings",
      "Request copies"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on casa. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with casa — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my casa provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "court-and-lawyer"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "casa",
    "title": "CASA volunteers",
    "shortTitle": "CASA",
    "tagline": "Court Appointed Special Advocates — an extra voice in your case.",
    "summary": "CASA volunteers — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from casa this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "rights",
    "category": "rights",
    "voice": "You deserve a straight answer on ombudsperson. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with ombudsperson — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Foster Care Ombudsperson",
        "detail": "1-877-846-1602 · ofco.ca.gov"
      },
      {
        "name": "County grievance line",
        "detail": "Ask your worker for the county complaint process"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "Foster Care Ombudsperson",
        "href": "https://www.ofco.ca.gov"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my ombudsperson provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "foster-youth-bill-of-rights"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "grievance-ombudsperson",
    "title": "Grievances & Ombudsperson",
    "shortTitle": "Ombudsperson",
    "tagline": "File complaints safely — Foster Care Ombudsperson and county grievances.",
    "summary": "Grievances & Ombudsperson — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from ombudsperson this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on siblings & visits. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with siblings & visits — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my siblings & visits provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "permanency-kinship",
      "normalcy"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "siblings-family-visits",
    "title": "Siblings & family visits",
    "shortTitle": "Siblings & visits",
    "tagline": "Staying connected with brothers, sisters, and family.",
    "summary": "Siblings & family visits — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from siblings & visits this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on normalcy. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with normalcy — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Normalcy",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care/resource-family-approval/normalcy"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my normalcy provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "allowances-clothing",
      "siblings-family-visits"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "normalcy",
    "title": "Normalcy activities",
    "shortTitle": "Normalcy",
    "tagline": "Sleepovers, sports, and age-appropriate life like other teens.",
    "summary": "California law supports age-appropriate activities — sports, sleepovers, dating, and driving — with a reasonable and prudent parent standard in many settings.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name the activity",
        "body": "Be specific: overnight at a friend's, team travel, prom, job — so caregivers know what to approve."
      },
      {
        "title": "Ask for the approval process",
        "body": "Find out who signs, how far in advance, and whether background checks apply."
      },
      {
        "title": "If you are told no",
        "body": "Ask why in writing. Talk to your attorney or Ombudsperson if decisions seem unfair or blanket bans."
      }
    ],
    "highlights": [
      "Name the activity",
      "Ask for the approval process",
      "If you are told no"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on allowance & clothes. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with allowance & clothes — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my allowance & clothes provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "normalcy",
      "money"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "allowances-clothing",
    "title": "Allowances & clothing",
    "shortTitle": "Allowance & clothes",
    "tagline": "Spending money, clothing allowances, and essentials.",
    "summary": "Allowances & clothing — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from allowance & clothes this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on culture & faith. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with culture & faith — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my culture & faith provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "foster-youth-bill-of-rights"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "religion-culture",
    "title": "Religion & culture",
    "shortTitle": "Culture & faith",
    "tagline": "Practice your faith and culture while in care.",
    "summary": "Religion & culture — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from culture & faith this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "rights",
    "category": "in-care",
    "voice": "You deserve a straight answer on lgbtq+ / sogie. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with lgbtq+ / sogie — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my lgbtq+ / sogie provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "sexual-reproductive-health",
      "healthy-relationships-dv-trafficking"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "lgbtq-sogie",
    "title": "LGBTQ+ & SOGIE",
    "shortTitle": "LGBTQ+ / SOGIE",
    "tagline": "Affirming placements and support while in care.",
    "summary": "LGBTQ+ & SOGIE — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from lgbtq+ / sogie this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "in-care",
    "voice": "You deserve a straight answer on group homes. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with group homes — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my group homes provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "psychotropic-jv220",
      "grievance-ombudsperson"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "group-homes-strtp",
    "title": "Group homes & STRTPs",
    "shortTitle": "Group homes",
    "tagline": "Residential treatment and group home rules — what to ask.",
    "summary": "Group homes & STRTPs — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from group homes this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "crisis",
    "category": "in-care",
    "voice": "You deserve a straight answer on awol & runaway. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with awol & runaway — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my awol & runaway provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "grievance-ombudsperson",
      "housing"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "awol",
    "title": "Runaway / AWOL from placement",
    "shortTitle": "AWOL & runaway",
    "tagline": "If you left placement — safety first, then next steps with your team.",
    "summary": "Runaway / AWOL from placement — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from awol & runaway this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on dual-status. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with dual-status — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Courts — Self-help",
        "href": "https://www.courts.ca.gov/selfhelp.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my dual-status provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "court-and-lawyer",
      "sealing-records"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "dual-status",
    "title": "Dual-status (dependency & delinquency)",
    "shortTitle": "Dual-status",
    "tagline": "When you are in both dependency and juvenile justice systems.",
    "summary": "Dual-status (dependency & delinquency) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from dual-status this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on immigrant & sijs. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with immigrant & sijs — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "Immigration law is complex. Only a qualified immigration attorney should advise on SIJS or your status.",
      "AfterCare is navigation only — not legal advice."
    ],
    "sources": [
      {
        "label": "U.S. CIS — SIJS",
        "href": "https://www.uscis.gov/i-360"
      },
      {
        "label": "Immigration Law Help — California",
        "href": "https://www.immigrationlawhelp.org/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my immigrant & sijs provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "free-legal-help",
      "court-and-lawyer"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "immigrant-sijs",
    "title": "Immigrant youth & SIJS",
    "shortTitle": "Immigrant & SIJS",
    "tagline": "Special Immigrant Juvenile Status and immigration legal help.",
    "summary": "Immigrant youth & SIJS — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from immigrant & sijs this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "documents-money",
    "voice": "You deserve a straight answer on money & banking. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with money & banking — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my money & banking provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "credit-identity-theft",
      "vital-documents",
      "jobs",
      "scams"
    ],
    "questSlug": "first-bank-account",
    "photoId": null,
    "flagship": false,
    "slug": "money",
    "title": "Money, banking & credit",
    "shortTitle": "Money & banking",
    "tagline": "First bank account, safer habits, and building credit.",
    "summary": "Money, banking & credit — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Open a no-fee account",
        "body": "Use the First Bank Account Quest — ID, fee-free bank, direct deposit, turn off overdraft."
      },
      {
        "title": "Check credit at key ages",
        "body": "See the Credit & Identity Theft program — free reports at 14, 16, and 17."
      },
      {
        "title": "Build credit slowly at 18+",
        "body": "Secured card or credit-builder, tiny balance, paid in full monthly."
      }
    ],
    "highlights": [
      "Open a no-fee account",
      "Check credit at key ages",
      "Build credit slowly at 18+"
    ]
  },
  {
    "layout": "practical",
    "category": "benefits",
    "voice": "You deserve a straight answer on benefits. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with benefits — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "BenefitsCal",
        "href": "https://www.benefitscal.com/"
      },
      {
        "label": "DHCS — Former Foster Youth Medi-Cal",
        "href": "https://www.dhcs.ca.gov/services/medi-cal/Pages/Medi-CalFormerFosterYouth.aspx"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my benefits provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "calworks-ssi",
      "health"
    ],
    "questSlug": "health-26",
    "photoId": null,
    "flagship": false,
    "slug": "benefits",
    "title": "Benefits (Medi-Cal, CalFresh)",
    "shortTitle": "Benefits",
    "tagline": "CalFresh, Medi-Cal to 26, and other supports you may already qualify for.",
    "summary": "Benefits (Medi-Cal, CalFresh) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Health coverage to 26",
        "body": "If you were in foster care at 18 in California, ask your county about Former Foster Youth Medi-Cal."
      },
      {
        "title": "Food help",
        "body": "CalFresh applications go through BenefitsCal or your county. 211 can point you to the right office."
      },
      {
        "title": "Keep your address current",
        "body": "Notices go by mail. A wrong address is a common reason coverage lapses."
      }
    ],
    "highlights": [
      "Health coverage to 26",
      "Food help",
      "Keep your address current"
    ]
  },
  {
    "layout": "practical",
    "category": "benefits",
    "voice": "You deserve a straight answer on calworks & ssi. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with calworks & ssi — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my calworks & ssi provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "benefits",
      "disability-regional-centers"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "calworks-ssi",
    "title": "CalWORKs & SSI",
    "shortTitle": "CalWORKs & SSI",
    "tagline": "Cash aid and disability benefits — eligibility and applications.",
    "summary": "CalWORKs & SSI — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from calworks & ssi this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "documents-money",
    "voice": "You deserve a straight answer on scams. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with scams — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my scams provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "credit-identity-theft",
      "money"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "scams",
    "title": "Scams & financial abuse",
    "shortTitle": "Scams",
    "tagline": "Spot fraud, phishing, and people misusing your money or SSN.",
    "summary": "Scams & financial abuse — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from scams this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "crisis",
    "category": "housing",
    "voice": "You deserve a straight answer on housing. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with housing — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "211 California",
        "href": "https://www.211ca.org/"
      },
      {
        "label": "CDSS — THP-Plus",
        "href": "https://www.cdss.ca.gov/inforesources/thp"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my housing provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "extended-foster-care",
      "silp",
      "thp-plus-fc"
    ],
    "questSlug": "housing-plan",
    "photoId": null,
    "flagship": false,
    "slug": "housing",
    "title": "Housing",
    "shortTitle": "Housing",
    "tagline": "Somewhere safe tonight — and a path to stability.",
    "summary": "Emergency shelter, transitional housing, and practical lease steps. Crisis first — then THP+FC, SILP, navigators, and FUP with your worker.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "If you need a bed tonight",
        "body": "Use the Panic Button in the app, call 211, or youth crisis lines. Safety first — paperwork can wait."
      },
      {
        "title": "Talk to your worker or ILP",
        "body": "Ask about THP-Plus, THP+FC, SILP inside AB 12, and housing navigators in your county."
      },
      {
        "title": "Plan the next roof",
        "body": "Review any lease with a trusted adult or legal aid before you sign. Know deposits and roommate rules."
      }
    ],
    "highlights": [
      "If you need a bed tonight",
      "Talk to your worker or ILP",
      "Plan the next roof"
    ]
  },
  {
    "layout": "practical",
    "category": "housing",
    "voice": "You deserve a straight answer on ab 12 / efc. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with ab 12 / efc — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Extended Foster Care (AB 12)",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12"
      },
      {
        "label": "JBAY — AB 12 resources",
        "href": "https://jbay.org/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my ab 12 / efc provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "silp",
      "thp-plus-fc",
      "housing-navigators",
      "fup-fyi",
      "aging-out-90-day-plan"
    ],
    "questSlug": "ab12-extended-care",
    "photoId": null,
    "flagship": false,
    "slug": "extended-foster-care",
    "title": "Extended foster care (AB 12)",
    "shortTitle": "AB 12 / EFC",
    "tagline": "Stay in care past 18 with support — eligibility and re-entry.",
    "summary": "California AB 12 extended foster care lets eligible youth stay in care to age 21 with housing, case management, and supports. Options include staying with a caregiver, SILP, supervised settings, and THP+FC in some counties.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Ask before 18",
        "body": "Meet with your worker and attorney about extended foster care eligibility, court requirements, and your housing plan."
      },
      {
        "title": "Pick a placement type",
        "body": "Options may include family home, SILP, dorm/college housing with agreement, THP+FC, or another approved setting — availability varies."
      },
      {
        "title": "Stay in school, work, or an exemption",
        "body": "Most youth must meet participation requirements (school, work, training) unless an exemption applies — confirm with your attorney."
      },
      {
        "title": "Know re-entry",
        "body": "Some youth who left care can petition to re-enter before 21 — timing and rules are legal questions for your attorney."
      }
    ],
    "highlights": [
      "Ask before 18",
      "Pick a placement type",
      "Stay in school, work, or an exemption",
      "Know re-entry"
    ]
  },
  {
    "layout": "practical",
    "category": "housing",
    "voice": "You deserve a straight answer on silp. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with silp — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — SILP",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12/supervised-independent-living-placement"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my silp provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "extended-foster-care",
      "housing-navigators"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "silp",
    "title": "Supervised Independent Living (SILP)",
    "shortTitle": "SILP",
    "tagline": "Renting your own place while still in extended foster care.",
    "summary": "Supervised Independent Living (SILP) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "See if SILP fits",
        "body": "Supervised Independent Living lets eligible EFC youth rent housing with agency support and safety inspections."
      },
      {
        "title": "Budget and lease review",
        "body": "Your worker should help review the lease, deposits, and your monthly budget before you sign."
      },
      {
        "title": "Inspections and supports",
        "body": "The home must meet safety standards. Ask what furniture, deposits, or move-in help the county provides."
      }
    ],
    "highlights": [
      "See if SILP fits",
      "Budget and lease review",
      "Inspections and supports"
    ]
  },
  {
    "layout": "practical",
    "category": "housing",
    "voice": "You deserve a straight answer on thp+fc / thp-plus. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with thp+fc / thp-plus — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my thp+fc / thp-plus provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "housing",
      "fup-fyi"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "thp-plus-fc",
    "title": "THP+FC & THP-Plus",
    "shortTitle": "THP+FC / THP-Plus",
    "tagline": "Transitional housing for current and former foster youth.",
    "summary": "THP+FC & THP-Plus — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from thp+fc / thp-plus this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "housing",
    "voice": "You deserve a straight answer on housing navigators. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with housing navigators — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my housing navigators provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "housing",
      "thp-plus-fc"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "housing-navigators",
    "title": "Housing navigators",
    "shortTitle": "Housing navigators",
    "tagline": "County and nonprofit help finding a place.",
    "summary": "Housing navigators — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from housing navigators this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "housing",
    "voice": "You deserve a straight answer on fup vouchers. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with fup vouchers — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my fup vouchers provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "thp-plus-fc",
      "parenting-youth"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "fup-fyi",
    "title": "Family Unification Program (FUP)",
    "shortTitle": "FUP vouchers",
    "tagline": "HUD housing vouchers for some youth aging out.",
    "summary": "Family Unification Program (FUP) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from fup vouchers this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on education. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with education — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Chafee Grant",
        "href": "https://chafee.csac.ca.gov"
      },
      {
        "label": "Federal Student Aid (FAFSA)",
        "href": "https://studentaid.gov"
      },
      {
        "label": "CSAC — Foster youth",
        "href": "https://www.csac.ca.gov/foster-youth"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my education provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "campus-nextup",
      "graduation-ab216"
    ],
    "questSlug": "chafee-grant",
    "photoId": null,
    "flagship": false,
    "slug": "education",
    "title": "Education & college aid",
    "shortTitle": "Education",
    "tagline": "FAFSA/CADAA, Chafee, and campus support.",
    "summary": "Education & college aid — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "File FAFSA or CADAA",
        "body": "Answer the foster care question accurately to unlock independent student status when you qualify."
      },
      {
        "title": "Apply for Chafee",
        "body": "Complete chafee.csac.ca.gov every year — FAFSA alone does not pay the Chafee Grant."
      },
      {
        "title": "Find campus support",
        "body": "Ask about NextUp, Guardian Scholars, EOPS, and foster liaisons at your school."
      }
    ],
    "highlights": [
      "File FAFSA or CADAA",
      "Apply for Chafee",
      "Find campus support"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on school stability. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with school stability — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDE — Foster youth education",
        "href": "https://www.cde.ca.gov/ls/pf/fy/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my school stability provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "graduation-ab216",
      "iep-504"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "school-stability-ab490",
    "title": "School stability (AB 490)",
    "shortTitle": "School stability",
    "tagline": "Stay in your school when placement moves.",
    "summary": "School stability (AB 490) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Ask about school-of-origin",
        "body": "AB 490 supports staying in your school when placement changes when it is in your best interest."
      },
      {
        "title": "Get a point person",
        "body": "Your school district foster youth liaison helps with enrollment, records, and transportation questions."
      },
      {
        "title": "Fix credits early",
        "body": "If you changed schools a lot, ask about partial credit rules and AB 216 graduation options."
      }
    ],
    "highlights": [
      "Ask about school-of-origin",
      "Get a point person",
      "Fix credits early"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on graduation. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with graduation — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Student Aid Commission — Chafee",
        "href": "https://chafee.csac.ca.gov"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my graduation provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "school-stability-ab490",
      "trades-apprenticeships"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "graduation-ab216",
    "title": "Graduation help (AB 216)",
    "shortTitle": "Graduation",
    "tagline": "Credit recovery and graduation options after care.",
    "summary": "Graduation help (AB 216) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from graduation this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on iep / 504. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with iep / 504 — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Student Aid Commission — Chafee",
        "href": "https://chafee.csac.ca.gov"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my iep / 504 provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "disability-regional-centers",
      "school-stability-ab490"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "iep-504",
    "title": "IEP & 504 plans",
    "shortTitle": "IEP / 504",
    "tagline": "Special education and disability supports at school.",
    "summary": "IEP & 504 plans — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from iep / 504 this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on nextup / campus. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with nextup / campus — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Community Colleges — NextUp",
        "href": "https://nextup.cccco.edu/"
      },
      {
        "label": "JBAY — College support",
        "href": "https://jbay.org/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my nextup / campus provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "education",
      "chafee-grant"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "campus-nextup",
    "title": "College — NextUp & support",
    "shortTitle": "NextUp / campus",
    "tagline": "Community college and CSU foster youth programs.",
    "summary": "College — NextUp & support — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from nextup / campus this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "education",
    "voice": "You deserve a straight answer on trades. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with trades — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Student Aid Commission — Chafee",
        "href": "https://chafee.csac.ca.gov"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my trades provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "jobs",
      "graduation-ab216"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "trades-apprenticeships",
    "title": "Trades & apprenticeships",
    "shortTitle": "Trades",
    "tagline": "Paid apprenticeship paths after high school.",
    "summary": "Trades & apprenticeships — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from trades this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "jobs",
    "voice": "You deserve a straight answer on jobs. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with jobs — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my jobs provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "workers-rights-hiring-prefs",
      "vital-documents",
      "money"
    ],
    "questSlug": "first-job",
    "photoId": "first-job",
    "flagship": false,
    "slug": "jobs",
    "title": "Jobs & first paycheck",
    "shortTitle": "Jobs",
    "tagline": "Work permits, applications, and protecting your pay.",
    "summary": "Jobs & first paycheck — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Get work-ready documents",
        "body": "ID, SSN card, and work permit if under 18."
      },
      {
        "title": "Apply and practice",
        "body": "Start local — retail, warehouse, food service. Practice answers once out loud."
      },
      {
        "title": "Protect your paycheck",
        "body": "Direct deposit into your own account beats check-cashing fees."
      }
    ],
    "highlights": [
      "Get work-ready documents",
      "Apply and practice",
      "Protect your paycheck"
    ]
  },
  {
    "layout": "practical",
    "category": "jobs",
    "voice": "You deserve a straight answer on work rights. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with work rights — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my work rights provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "jobs",
      "legal-rights"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "workers-rights-hiring-prefs",
    "title": "Worker rights & hiring prefs",
    "shortTitle": "Work rights",
    "tagline": "Minimum wage, harassment, and foster youth hiring preferences.",
    "summary": "Worker rights & hiring prefs — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from work rights this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "jobs",
    "voice": "You deserve a straight answer on service programs. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with service programs — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my service programs provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "jobs",
      "education"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "job-corps-americorps-military",
    "title": "Job Corps, AmeriCorps & military",
    "shortTitle": "Service programs",
    "tagline": "Structured training and service programs — what to ask first.",
    "summary": "Job Corps, AmeriCorps & military — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from service programs this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "health",
    "voice": "You deserve a straight answer on health. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with health — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare does not provide therapy, diagnosis, or medical treatment.",
      "iFoster's Peers Paving the Path is a separate organization's program — AfterCare is not affiliated; we list it because the official page is confirmed."
    ],
    "sources": [
      {
        "label": "iFoster — Peers Paving the Path",
        "href": "https://www.ifoster.org/peers-paving-the-path/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my health provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "psychotropic-jv220",
      "substance-use"
    ],
    "questSlug": "health-26",
    "photoId": null,
    "flagship": false,
    "slug": "health",
    "title": "Health & mental health",
    "shortTitle": "Health",
    "tagline": "Coverage, clinics, and crisis lines.",
    "summary": "Health & mental health — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Confirm FFY Medi-Cal",
        "body": "Follow the Medi-Cal to 26 Quest if you aged out in California."
      },
      {
        "title": "Find care",
        "body": "Use your plan directory or county clinic. Ask about transportation if you qualify."
      },
      {
        "title": "In a crisis",
        "body": "Call or text 988. LGBTQ+ youth: The Trevor Project 1-866-488-7386. Danger: 911."
      }
    ],
    "highlights": [
      "Confirm FFY Medi-Cal",
      "Find care",
      "In a crisis"
    ]
  },
  {
    "layout": "rights",
    "category": "health",
    "voice": "You deserve a straight answer on psychotropic meds. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with psychotropic meds — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Courts — JV-220",
        "href": "https://www.courts.ca.gov/documents/jv220.pdf"
      },
      {
        "label": "CDSS — Psychotropic medications",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care/health-care/psychotropic-medications"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my psychotropic meds provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "group-homes-strtp",
      "health"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "psychotropic-jv220",
    "title": "Psych meds & JV-220",
    "shortTitle": "Psychotropic meds",
    "tagline": "Court review when medication is proposed — JV-220 process.",
    "summary": "When psychotropic medication is proposed for a dependent child, California courts use Form JV-220 and related processes so your voice and rights are heard. Confirm every step with your attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Ask what is being proposed",
        "body": "You have the right to know the medication name, purpose, and side effects in words you understand."
      },
      {
        "title": "Request court review when required",
        "body": "JV-220 and related forms trigger court oversight in many situations — your attorney explains what applies."
      },
      {
        "title": "Bring a support person",
        "body": "Ask if you may have your attorney, caregiver, or advocate in conversations about medication."
      }
    ],
    "highlights": [
      "Ask what is being proposed",
      "Request court review when required",
      "Bring a support person"
    ]
  },
  {
    "layout": "practical",
    "category": "health",
    "voice": "You deserve a straight answer on substance use. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with substance use — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "BenefitsCal",
        "href": "https://www.benefitscal.com/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my substance use provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "health",
      "988"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "substance-use",
    "title": "Substance use support",
    "shortTitle": "Substance use",
    "tagline": "Treatment, harm reduction, and Medi-Cal coverage.",
    "summary": "Substance use support — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from substance use this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "health",
    "voice": "You deserve a straight answer on reproductive health. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with reproductive health — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "BenefitsCal",
        "href": "https://www.benefitscal.com/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my reproductive health provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "parenting-youth",
      "lgbtq-sogie"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "sexual-reproductive-health",
    "title": "Sexual & reproductive health",
    "shortTitle": "Reproductive health",
    "tagline": "Confidential care, contraception, and pregancy support.",
    "summary": "Sexual & reproductive health — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from reproductive health this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "health",
    "voice": "You deserve a straight answer on disability. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with disability — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "BenefitsCal",
        "href": "https://www.benefitscal.com/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my disability provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "iep-504",
      "calworks-ssi"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "disability-regional-centers",
    "title": "Disability & regional centers",
    "shortTitle": "Disability",
    "tagline": "Regional Center services and ADA rights.",
    "summary": "Disability & regional centers — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from disability this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "rights",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on legal rights. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with legal rights — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Courts — Self-help",
        "href": "https://www.courts.ca.gov/selfhelp.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my legal rights provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "free-legal-help",
      "court-and-lawyer",
      "sealing-records"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "legal-rights",
    "title": "Legal rights overview",
    "shortTitle": "Legal rights",
    "tagline": "Know your rights — then get a real advocate.",
    "summary": "Legal rights overview — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Call your attorney of record first",
        "body": "For dependency or delinquency case questions, your court-appointed lawyer comes first."
      },
      {
        "title": "Use legal aid for other issues",
        "body": "Housing, records, and employment issues may need legal aid or self-help — AfterCare cannot advise."
      },
      {
        "title": "Document everything",
        "body": "Dates, names, and copies of notices speed up every advocate conversation."
      }
    ],
    "highlights": [
      "Call your attorney of record first",
      "Use legal aid for other issues",
      "Document everything"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on free legal aid. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with free legal aid — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Courts — Self-help",
        "href": "https://www.courts.ca.gov/selfhelp.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my free legal aid provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "court-and-lawyer",
      "sealing-records"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "free-legal-help",
    "title": "Free legal help",
    "shortTitle": "Free legal aid",
    "tagline": "Legal aid, self-help centers, and foster youth attorneys.",
    "summary": "Free legal help — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from free legal aid this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on seal records. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with seal records — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Courts — Sealing juvenile records",
        "href": "https://www.courts.ca.gov/selfhelp/sealingjuvenile.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my seal records provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "dual-status",
      "emancipation"
    ],
    "questSlug": "seal-records",
    "photoId": null,
    "flagship": false,
    "slug": "sealing-records",
    "title": "Sealing juvenile records",
    "shortTitle": "Seal records",
    "tagline": "When and how juvenile records may be sealed in California.",
    "summary": "Sealing juvenile records — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Know which case",
        "body": "Dependency and delinquency records have different sealing rules. Your juvenile attorney or legal aid can explain your path."
      },
      {
        "title": "Check eligibility",
        "body": "California law sets waiting periods and offense types for sealing — this is legal advice territory."
      },
      {
        "title": "File the petition",
        "body": "Self-help centers and legal aid may help with forms. Keep proof of completion for jobs and housing."
      }
    ],
    "highlights": [
      "Know which case",
      "Check eligibility",
      "File the petition"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on emancipation. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with emancipation — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Courts — Self-help",
        "href": "https://www.courts.ca.gov/selfhelp.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my emancipation provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "extended-foster-care",
      "legal-rights"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "emancipation",
    "title": "Emancipation",
    "shortTitle": "Emancipation",
    "tagline": "Leaving care before 18 through court emancipation.",
    "summary": "Emancipation — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from emancipation this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on permanency. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with permanency — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "California Courts — Self-help",
        "href": "https://www.courts.ca.gov/selfhelp.htm"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my permanency provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "siblings-family-visits",
      "extended-foster-care"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "permanency-kinship",
    "title": "Permanency & kinship",
    "shortTitle": "Permanency",
    "tagline": "Adoption, legal guardianship, and reunification paths.",
    "summary": "Permanency & kinship — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from permanency this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "crisis",
    "category": "health",
    "voice": "You deserve a straight answer on safety in relationships. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with safety in relationships — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      },
      {
        "label": "BenefitsCal",
        "href": "https://www.benefitscal.com/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my safety in relationships provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "lgbtq-sogie",
      "awol"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "healthy-relationships-dv-trafficking",
    "title": "Relationships, DV & trafficking",
    "shortTitle": "Safety in relationships",
    "tagline": "Healthy relationships and help if you are unsafe.",
    "summary": "Relationships, DV & trafficking — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from safety in relationships this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "benefits",
    "voice": "You deserve a straight answer on parenting. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with parenting — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my parenting provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "sexual-reproductive-health",
      "fup-fyi",
      "benefits"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "parenting-youth",
    "title": "Parenting youth",
    "shortTitle": "Parenting",
    "tagline": "Benefits and support when you are parenting in or after care.",
    "summary": "Parenting youth — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Tell someone on your team",
        "body": "Your social worker, ILP, or school counselor can open parenting-specific supports."
      },
      {
        "title": "Lock in benefits",
        "body": "Ask about Medi-Cal, CalFresh, and WIC with a written list of questions."
      },
      {
        "title": "If you are unsafe",
        "body": "Call 911 if in danger. Domestic violence hotlines and 211 can connect you."
      }
    ],
    "highlights": [
      "Tell someone on your team",
      "Lock in benefits",
      "If you are unsafe"
    ]
  },
  {
    "layout": "practical",
    "category": "legal-transition",
    "voice": "You deserve a straight answer on 90-day plan. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with 90-day plan — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "Child Welfare — Transition plan",
        "href": "https://www.childwelfare.gov/topics/preventing/prb/transition_to_adulthood_planning/"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my 90-day plan provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "tilp",
      "vital-documents",
      "extended-foster-care"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "aging-out-90-day-plan",
    "title": "90-day transition plan",
    "shortTitle": "90-day plan",
    "tagline": "Federal required plan before you leave care at 18.",
    "summary": "90-day transition plan — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Ask for the 90-day plan",
        "body": "Federal rules require a transition plan starting 90 days before age 18 — housing, health, education, and documents."
      },
      {
        "title": "Compare to your TILP",
        "body": "Your TILP and 90-day plan should match what you actually need. Request changes in writing."
      },
      {
        "title": "List gaps",
        "body": "Missing ID, no bank account, no housing plan? Name each gap and who will fix it before your birthday."
      }
    ],
    "highlights": [
      "Ask for the 90-day plan",
      "Compare to your TILP",
      "List gaps"
    ]
  },
  {
    "layout": "practical",
    "category": "community",
    "voice": "You deserve a straight answer on after 21. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with after 21 — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "CDSS — Foster care",
        "href": "https://www.cdss.ca.gov/inforesources/foster-care"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my after 21 provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "peer-advocacy-cyc",
      "housing"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "alumni-after-21",
    "title": "After 21 — alumni supports",
    "shortTitle": "After 21",
    "tagline": "Help that may continue or start after extended care ends.",
    "summary": "After 21 — alumni supports — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from after 21 this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  },
  {
    "layout": "practical",
    "category": "community",
    "voice": "You deserve a straight answer on peer advocacy. Here's what to do, what to say, and who picks up the phone.",
    "sayThis": [
      "I need help with peer advocacy — what is the next step for me?",
      "Can we put this on my case plan or TILP?",
      "Please send me the official form or link in writing."
    ],
    "documents": [
      "Photo ID or state ID",
      "Case number or client ID (if you have one)",
      "Any notices you received"
    ],
    "whoToCall": [
      {
        "name": "Your social worker",
        "detail": "County CPS — placements, benefits, referrals"
      },
      {
        "name": "Your attorney of record",
        "detail": "Dependency or delinquency court questions"
      },
      {
        "name": "Foster Care Ombudsperson",
        "detail": "ofco.ca.gov · 1-877-846-1602 — rights complaints statewide"
      }
    ],
    "notes": [
      "AfterCare gives navigation only — not legal, medical, or clinical advice. Confirm details with your worker, attorney, or the official source."
    ],
    "sources": [
      {
        "label": "California Youth Connection",
        "href": "https://www.calyouthconn.org/"
      },
      {
        "label": "FosterClub",
        "href": "https://www.fosterclub.com"
      }
    ],
    "faqs": [
      {
        "q": "Is AfterCare my peer advocacy provider?",
        "a": "No. We explain steps and link official programs. Your county and courts run the real services."
      },
      {
        "q": "Can AfterCare give me legal advice?",
        "a": "No. Talk to your attorney or legal aid for legal advice about your situation."
      }
    ],
    "related": [
      "alumni-after-21",
      "grievance-ombudsperson"
    ],
    "questSlug": null,
    "photoId": null,
    "flagship": false,
    "slug": "peer-advocacy-cyc",
    "title": "Peer advocacy (CYC & allies)",
    "shortTitle": "Peer advocacy",
    "tagline": "California Youth Connection and youth-led policy voice.",
    "summary": "Peer advocacy (CYC & allies) — plain-language California steps for foster youth ages 14–26. AfterCare links official sources; confirm eligibility with your worker or attorney.",
    "whoFor": "California current or former foster youth (about 14–26) and allies helping them navigate this topic.",
    "steps": [
      {
        "title": "Name your goal",
        "body": "Decide what you need from peer advocacy this week — one concrete outcome (a form filed, a call made, a document in hand)."
      },
      {
        "title": "Loop in your team",
        "body": "Tell your social worker, attorney, ILP coach, or caregiver. Ask for a specific next step and a deadline."
      },
      {
        "title": "Use official sources",
        "body": "Read the linked CDSS, court, school, or benefits page. Rules change — do not rely on gossip or old handouts."
      },
      {
        "title": "Follow up in writing",
        "body": "Text or email a short summary after calls: who you talked to, what they said, and what happens next."
      }
    ],
    "highlights": [
      "Name your goal",
      "Loop in your team",
      "Use official sources",
      "Follow up in writing"
    ]
  }
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
