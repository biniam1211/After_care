/**
 * National crisis lines hardcoded in the native shell.
 * These MUST work with zero network — never fetch or look up.
 */

export interface CrisisLine {
  id: string;
  name: string;
  phone: string;
  /** Digits-only for tel: / sms: URLs */
  tel: string;
  sms?: string;
  note: string;
}

export const NATIONAL_CRISIS: CrisisLine[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    tel: "988",
    sms: "988",
    note: "Free, 24/7. Call or text if you are in crisis or just need to talk.",
  },
  {
    id: "covenant",
    name: "Covenant House (youth homelessness)",
    phone: "1-800-388-3888",
    tel: "18003883888",
    note: "Nationwide crisis line and shelters for youth with nowhere to sleep.",
  },
  {
    id: "trevor",
    name: "The Trevor Project (LGBTQ+ youth)",
    phone: "1-866-488-7386",
    tel: "18664887386",
    sms: "678678",
    note: "24/7 support for LGBTQ+ young people. Text START to 678-678.",
  },
];

export const EMERGENCY_911: CrisisLine = {
  id: "911",
  name: "Emergency services",
  phone: "911",
  tel: "911",
  note: "If you are in immediate danger, call 911 now.",
};
