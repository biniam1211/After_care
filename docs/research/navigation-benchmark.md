# Navigation & resource UX benchmark

**Purpose:** Study peer sites so AfterCare can be resource-rich, kid-navigable, and accurate — without copying their copy, logos, or assets.  
**Date:** 2026-11-21 · **Scope:** California foster youth ages 14–26  
**Also informed by:** deep fetch pass ([Fetch peer site patterns](bc-7b214b5f-c016-5b61-91d3-55b539c574d6))

## What each site does well

| Site | Patterns that work |
| --- | --- |
| **FosterClub Help Hub** ([fosterclub.com/helphub](https://www.fosterclub.com/helphub)) | State picker first; youth “Explainers”; emergency block (911 / 988 / trafficking); “Not sure?” with chat/phone and stated hours. |
| **John Burton Advocates for Youth** ([jbay.org/resources](https://jbay.org/resources/)) | Filterable library; county rosters (ILP, FUP/FYI, AB 12 re-entry); **Last updated** on every piece; policy fact sheets. |
| **California Youth Connection** ([calyouthconn.org](https://calyouthconn.org/)) | Youth-led voice; audience split (youth vs supporters); policy → rights. |
| **Children’s Law Center of CA** ([clccal.org](https://www.clccal.org/)) | Role clarity (court-appointed counsel); county coverage; rights education without pretending to be a hotline. |
| **CDSS Foster Care** ([cdss.ca.gov](https://www.cdss.ca.gov/inforesources/foster-care)) | Official EFC / THP / ILP county contacts; Bill of Rights; TAY program definitions. |
| **Think of Us / ConnectMe** ([thinkof.us](https://www.thinkof.us/), [ConnectMe](https://www.thinkofus.org/our-work/connectme)) | Not “just a directory” — self-serve list **or** human navigator; urgent-needs intake framing. |
| **Juvenile Law Center** ([jlc.org](https://jlc.org/)) | Issue-area cards (foster care, records, youth justice); lived-experience partnerships. |
| **211.org / findhelp.org** | Need tiles; zip-first search; subcategory **counts**; stackable filters (age, open now); Open Eligibility taxonomy. |
| **Trevor Project** | Persistent “Reach a counselor”; call/text/chat; **Quick Exit** (leave site fast); topic-picker resource hub. |
| **Crisis Text Line** | Hero = action phrase (“Text HOME to 741741”); how-it-works sample; topic cards. |
| **Covenant House** | 24/7 shelter path; prominent crisis phone; inclusive access statement. |
| **StandUp For Kids** | Story + impact narrative; single national helpline; volunteer/donate combined. |
| **GoFundMe.org / charity:water** | Trust UX (proof, counters, 100% promise) — we adapt **transparency**, not fundraising copy. |
| **Benefits.gov / GetCalFresh / mRelief** | Category finder; **prep vs official apply** (link out to BenefitsCal); ~3 min screener → portal. |
| **gov.uk** | Single front door; topic tiles with “Includes…”; life-situation browse; plain language. |

## Patterns AfterCare adopts (and why)

| # | Pattern | Inspired by | Status on this PR |
| --- | --- | --- | --- |
| 1 | Task language (“I need a place to sleep”) | gov.uk + FosterClub | Shipped — home task rail |
| 2 | ≤2 taps to phone or official link | Crisis Text + Trevor | Shipped — search + directory |
| 3 | CA-first, then county / ZIP (browser-only) | FosterClub + JBAY + CDSS + findhelp | Shipped — `/directory` |
| 4 | Always-on crisis strip (911 / 988 / trafficking / 211) | FosterClub + Trevor | Shipped — expanded strip |
| 5 | Verified + last-checked + source URL | JBAY + findhelp honesty | Shipped — listing footers |
| 6 | County ILP / EFC contacts from CDSS | CDSS roster | Shipped — all 58 counties |
| 7 | Screener → checklist | GetCalFresh / mRelief / Benefits.gov | Shipped — `/find` |
| 8 | Quick Exit | Trevor | Shipped |
| 9 | Synonym search | findhelp taxonomy | Shipped — SiteSearch |
| 10 | Ask cites sources or admits unknown | gov.uk honesty | Shipped — chat + default |
| 11 | Report outdated info | FosterClub broken-link path | Shipped — mailto on listings |
| 12 | Prep lanes that link to official apply | GetCalFresh → BenefitsCal | Partial — guides link out; deepen later |
| 13 | Self-serve **or** human navigator choice | Think of Us ConnectMe | Partial — Ask + directory; no live navigator staffing yet |
| 14 | Spanish-ready structure | OFCO / LifeLine Spanish | Structure only — full ES copy later |

## What we refuse

- Copying logos, brand systems, or marketing copy.
- Claiming partnership with any org we only list.
- Fabricating phone numbers, stats, or “verified” without an official page check.
- Collecting ZIP / county on a server (browser-only).
- Inventing impact statistics (charity:water / 211 style counters only if AfterCare earns them).
