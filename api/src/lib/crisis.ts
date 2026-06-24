/**
 * National crisis fallbacks. These ALWAYS surface in the Panic Button, even
 * when the user has zero account data and no ZIP set. Local resources (from the
 * resource DB, ZIP-filtered) are layered on top when available.
 */

export interface CrisisResource {
  name: string;
  phone?: string;
  sms?: string;
  url?: string;
  note: string;
}

export const NATIONAL_CRISIS: CrisisResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    sms: 'Text 988',
    url: 'https://988lifeline.org',
    note: 'Free, 24/7. Call or text if you are in crisis or just need to talk.',
  },
  {
    name: 'Covenant House (youth homelessness)',
    phone: '1-800-388-3888',
    url: 'https://www.covenanthouse.org',
    note: 'Nationwide crisis line and shelters for youth with nowhere to sleep.',
  },
  {
    name: 'The Trevor Project (LGBTQ+ youth)',
    phone: '1-866-488-7386',
    sms: 'Text START to 678-678',
    url: 'https://www.thetrevorproject.org',
    note: '24/7 support for LGBTQ+ young people in crisis.',
  },
  {
    name: 'National Runaway Safeline',
    phone: '1-800-786-2929',
    url: 'https://www.1800runaway.org',
    note: 'For youth who have run away or are thinking about it.',
  },
];

export type PanicScenario = 'homeless' | 'kicked_out' | 'abuse' | 'eviction' | 'other';

/** Resource categories most relevant to each panic scenario, for ZIP-filtered lookup. */
export const SCENARIO_CATEGORIES: Record<PanicScenario, string[]> = {
  homeless: ['housing', 'shelter'],
  kicked_out: ['housing', 'shelter', 'legal'],
  abuse: ['mental_health', 'legal', 'crisis'],
  eviction: ['housing', 'legal'],
  other: ['crisis'],
};
