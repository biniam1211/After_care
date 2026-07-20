/**
 * Common foster-care terms, in plain language. California-focused.
 * Content feature inspired by FosterPower's "Common Terms" — kids constantly
 * hear this jargon in court and meetings with nobody explaining it.
 */
export interface Term {
  term: string;
  plain: string;
}

export const GLOSSARY: Term[] = [
  {
    term: 'AB 12 / Extended Foster Care',
    plain: 'A California law that lets you stay in foster care until 21 (instead of aging out at 18) and keep getting housing money and support. You usually need to be working, in school, or in a program.',
  },
  {
    term: 'Aging out',
    plain: 'Leaving foster care because you turned 18 (or 21 with Extended Foster Care) — not because you were adopted or went home.',
  },
  {
    term: 'CASA',
    plain: 'Court Appointed Special Advocate — a trained volunteer whose only job is to speak up for what YOU need in court. Free, and on your side.',
  },
  {
    term: 'Case plan',
    plain: 'The official document that says what needs to happen in your case — where you live, school, visits, services. You have the right to see it and help write it, especially after 12.',
  },
  {
    term: 'CalFresh (EBT / food stamps)',
    plain: 'Monthly money for groceries on a debit-style card. Former foster youth 18–26 often qualify easily — worth applying even if you think you make too much.',
  },
  {
    term: 'Chafee Grant',
    plain: 'Up to $5,000 a year for college or job training, only for current/former foster youth. Free money — you never pay it back. Apply at chafee.csac.ca.gov.',
  },
  {
    term: 'Dependency court',
    plain: 'The court that handles foster care cases. Not criminal court — you are not in trouble. The judge decides where you live and checks that you are getting what you need.',
  },
  {
    term: 'Emancipation',
    plain: 'Legally becoming an adult before 18 through a court process. Rare and hard — different from aging out at 18.',
  },
  {
    term: 'FAFSA',
    plain: 'The free federal financial-aid form for college. As a foster youth you file as "independent" — your foster parents\' income does NOT count against you, which usually means more aid.',
  },
  {
    term: 'ILP (Independent Living Program)',
    plain: 'Free classes, coaching, and sometimes cash/gift cards to teach life skills — cooking, money, jobs, apartments. Ask your social worker to sign you up; it is your right.',
  },
  {
    term: 'Kinship care',
    plain: 'Living with a relative (grandma, aunt, adult sibling) instead of strangers. Relatives can get paid to care for you, just like foster parents.',
  },
  {
    term: 'Medi-Cal',
    plain: "California's free health insurance. If you were in foster care at 18, you automatically qualify until you turn 26 — no income limits. Doctor, dentist, therapy, meds.",
  },
  {
    term: 'NMD (Non-Minor Dependent)',
    plain: 'What the system calls you when you stay in Extended Foster Care after 18. You keep a social worker, court oversight, and monthly support — but with adult freedom.',
  },
  {
    term: 'Placement',
    plain: 'Where the system has you living — a foster home, a relative, a group home, or on your own with SILP. You can ask for a placement change if it is not working.',
  },
  {
    term: 'Reunification',
    plain: 'The plan to get you back home with your parents once things are safe. Most cases start with this goal.',
  },
  {
    term: 'SILP',
    plain: 'Supervised Independent Living Placement — in Extended Foster Care, living in your own apartment (or with roommates) while the monthly foster care payment comes to YOU directly.',
  },
  {
    term: 'Social worker (CSW)',
    plain: 'The county employee assigned to your case. They arrange placements and services and report to the judge. You have the right to contact them — and to ask for a new one if it is truly not working.',
  },
  {
    term: 'STRTP (group home)',
    plain: 'Short-Term Residential Therapeutic Program — the official name for modern group homes. Supposed to be temporary and include therapy.',
  },
  {
    term: 'THP-Plus',
    plain: 'Transitional Housing Program — free or cheap housing plus support for former foster youth, usually 18–25, for up to 2–3 years. One of the best deals out there; ask ILP how to apply.',
  },
  {
    term: 'TILP',
    plain: 'Transitional Independent Living Plan — the written plan (starting at 14–16) for your path to adulthood: school, work, housing, documents. You are supposed to help write it, not just sign it.',
  },
];
