# 📱 PRD: **AfterCare** (working name)

### *The AI life navigator built by foster kids, for foster kids.*

**Founder:** Biniam | **Date:** May 2026 | **Status:** MVP Spec v1.0

---

## 1. ONE-LINER

A mobile-first AI assistant that replaces the absent parent — guiding foster youth aged 16–24 through every "I don't know how to adult" moment: opening a bank account, building credit, finding housing, applying for benefits, and not falling through the cracks at 18.

---

## 2. THE WHY (Research-Backed Problem Statement)

### The scale
- **15,000–23,000+** youth age out of US foster care every year
- **20%** become homeless instantly at 18
- **31–46%** experience homelessness by age 26
- **<3%** ever earn a college degree
- **50%** are employed by age 24, earning <$700/month on average
- **80%** have mental health conditions (anxiety, depression, PTSD)
- **17%** of all US prisoners spent time in foster care

### The root cause
The resources exist. The system is broken.

> *"Services and programs to help foster youth transition to independence have always existed — but knowledge and accessibility are the real barriers. Gen Z has grown up with a digital mindset. Everything is on their phone, via text, apps, and links. They aren't used to filling out physical paperwork and using fax machines."*
> — APHSA, 2024

The US Department of Education's "Foster Care Transition Tool Kit" is a PDF written for caseworkers. Nobody under 25 reads PDFs.

### The financial black hole
- No bank account, no credit, no co-signer
- 5% of foster youth minors have credit reports with fraud signs
- 12% have erroneous SSN-linked records
- Identity theft is rampant before they even turn 18
- No one teaches budgeting, debt, or financial literacy

---

## 3. THE WEDGE (Why You Can Win Where Others Failed)

### Competitive landscape

| Player | What they do | Why you beat them |
|---|---|---|
| **iFoster** | Nonprofit portal, document locker, jobs program | Web-first, cluttered, nonprofit pace, no AI, feels like a government website |
| **FosterClub** | PDF "Transition Toolkit" + community | Static PDFs in 2026. Not an app. |
| **Think of Us** | Decision-support web tool | Not personalized, not an AI agent |
| **KnowB4UGo** | Resource directory | Just a directory, no action layer |
| **Government tools** | DOE Transition Toolkit | Unusable — written for caseworkers, not kids |

### Your unfair advantage
- **Lived experience.** You were a foster kid. You aged out. You know.
- **AI-native builder.** You're already shipping AI products (EliAI, Nexus).
- **Gen Z communicator.** You speak the language of TikTok and Reels natively.
- **Founder-market fit.** Investors and grant-makers fund founders with lived experience.

You're not building a directory. You're building **the missing parent in their pocket.**

---

## 4. TARGET USER (Beachhead)

### Primary persona: "Maya, 17, in extended foster care in California"
- 6 months from aging out
- Has a phone, lives on TikTok and Instagram
- No bank account, no credit, no driver's license
- Has heard about "AB 12" but doesn't know what it means
- Caseworker is overworked and slow to respond
- Doesn't trust adults but trusts other foster kids

### Why California first
- ~38,000+ foster youth in CA (largest in the US)
- AB 12 extends care to 21 (longer engagement window)
- Tons of OC/LA-based nonprofits to partner with
- You live there

### Beachhead market
~5,000 transition-age foster youth in Orange County + LA County. Own that, expand statewide, then nationally.

---

## 5. MVP SCOPE — Ship in 6–8 Weeks

**Core principle:** *One job, done better than anyone else.* Don't try to be a "super app" on day one. Build **one feature so good** that kids tell other kids about it.

### The hero feature: **AfterCare AI — the conversational life navigator**

A WhatsApp-style chat interface where users can ask anything in plain English and get:
1. A real, actionable answer in their voice
2. The next 3 concrete steps to take
3. Direct links / phone numbers / pre-filled forms
4. A reminder to follow up

### MVP feature set (V1)

#### 1. AI Chat (the heart)
- Plain-English conversational AI (Claude/GPT) trained on foster youth resources
- Answers questions like:
  - *"How do I open a bank account without a parent?"*
  - *"My foster mom kicked me out, what do I do tonight?"*
  - *"How do I apply to college if I have no parents?"*
- Always returns: short answer → 3 next steps → resource links

#### 2. Smart Resource Finder (location-aware)
- User enters ZIP code once
- AI surfaces only resources available to them: ILP programs, FYI housing vouchers, food banks, free clinics, legal aid
- Each resource has a "I want this" button that triggers a guided application walkthrough

#### 3. Step-by-Step Quests (the gamified core)
- Replaces FosterClub's PDF toolkit
- Quests like:
  - *Get Your First Bank Account*
  - *Build Your Credit Score*
  - *Apply for the Chafee Grant*
  - *Get Health Insurance After 18*
  - *Get Your Driver's License*
  - *File Your First Tax Return*
- Each quest = 5–7 micro-steps, AI checks in after each one
- Push notifications nudge them forward

#### 4. Document Vault *(table stakes — iFoster has this, you need it too)*
- Encrypted upload for birth certificate, SSN card, ID, school records, medical records, court papers
- One-tap share to a verified caseworker, employer, or landlord
- This is the *retention hook* — once docs are in, they don't switch apps

#### 5. "Panic Button" (your differentiator)
- One tap = AI walks them through emergency scenarios:
  - *"I'm homeless tonight"*
  - *"I'm being kicked out"*
  - *"I'm being abused"*
  - *"I'm going to be evicted"*
- Connects to local crisis resources, hotlines, pre-drafted message to caseworker

### What's NOT in V1
- ❌ Social/community feed (don't build a social network)
- ❌ Therapy/mental health AI (regulatory minefield)
- ❌ Direct cash assistance / banking (later, partner first)
- ❌ Web app (mobile-first, period)
- ❌ Foster parent / caseworker portals (focus on the kid)

---

## 6. TECH STACK

| Layer | Choice | Why |
|---|---|---|
| Frontend | React Native (Expo) | One codebase, iOS + Android, you know React |
| Backend | Node.js + Postgres (Supabase) | Auth, db, storage, all in one |
| AI | Claude API (Anthropic) for chat, GPT-4 fallback | You already build with these |
| Resource DB | Curated by you + scraped from 211.org, iFoster, FosterClub | RAG against this DB so AI gives accurate local answers |
| Notifications | Expo Push + Twilio SMS | SMS for kids without smartphones |
| Doc storage | Supabase encrypted bucket | HIPAA-aware setup |
| Analytics | PostHog | Free, privacy-first |

**Build it solo + Claude Code in 6 weeks.** This is exactly what Vibe Coder is for.

---

## 7. PRODUCT-MARKET FIT STRATEGY

### North Star: Sean Ellis PMF Test
At 100 active users, ask: *"How would you feel if you could no longer use AfterCare?"*

**40%+ "very disappointed" = PMF.** That's the metric.

### Phase 1 — Concierge MVP (Weeks 1–4)
Don't build the app first. **Be the AI manually.**
- Set up Instagram + TikTok documenting your story
- DM with foster kids who reach out, answer questions yourself for free
- Track every question — each one = future training data + product feature
- **Goal:** 25 foster kids personally helped in 30 days

### Phase 2 — MVP Launch (Weeks 5–10)
- Ship V1 to a closed beta of 50 OC/LA foster youth
- Recruit through: ILP programs, OC Social Services, RightWay Foundation, James Storehouse, your TikTok
- Weekly user interviews (15 min each) — listen for the *"this saved me"* moments
- Iterate weekly on the #1 most-used feature

### Phase 3 — PMF Hunt (Months 3–6)
PMF signals to chase:
- ✅ 40%+ would be "very disappointed" without it
- ✅ 30%+ weekly active rate
- ✅ Organic kid-to-kid referrals without you asking
- ✅ Caseworkers asking *"can my kids use this?"*

### Phase 4 — Scale (Month 6+)
- **B2G/B2B revenue:** license to county social services, school districts, ILP programs ($20–50k/year per county)
- **Grants:** Pritzker Foster Care Initiative, Casey Family Programs, GitLab Foundation AI for Economic Opportunity, Llama Startup Program ($6k/mo cloud credits)
- **Direct-to-user always free for the kids**

---

## 8. DISTRIBUTION (Vibe Coder Brand = Moat)

This is the unfair advantage no nonprofit has:

1. **TikTok/Reels content series:** *"Things I wish someone told me when I aged out of foster care"* — 30–60s clips, raw, you on camera. Each video drives to the app waitlist.
2. **Founder story content:** *"I came to the US at 16, was in foster care, aged out at 18, now I'm building an AI app to help kids like me."* This is investor catnip and TikTok gold.
3. **Build-in-public:** Document the build on TikTok/X. Foster kids + AI + wealth-building Venn diagram = your three pillars converging.
4. **Caseworker referrals:** Once you have 10 happy users, caseworkers become your sales force.

---

## 9. SUCCESS METRICS

**North Star Metric:** *Quests completed per active user per month*
(Tells you the app actually changes lives, not just gets opened.)

| Metric | MVP target (60 days) | PMF target (6 months) |
|---|---|---|
| Total signups | 250 | 5,000 |
| WAU (weekly active) | 30% | 45% |
| AI chats/user/week | 3+ | 7+ |
| Quests completed/user | 1+ | 5+ |
| Sean Ellis "very disappointed" | 25% | 40%+ |
| Caseworker referrals | 5 orgs | 25 orgs |

---

## 10. WHY THIS COULD BE WORTH MILLIONS

### Market size
- ~400k foster youth in care + ~250k transition-age alumni in the US
- Each failed transition = ~$1M economic burden to society (iFoster data)
- Total addressable problem: **multi-billion dollar social cost**

### Revenue paths
- **B2G contracts** with counties/states (sticky, high-value)
- **SaaS to ILP programs** and nonprofits ($50k–500k ARR per county)
- **Enterprise licensing** to caseworker software (Salesforce for foster care)
- **Affiliate revenue** from foster-friendly banks, secured card partners

### Mission moat
Nobody can out-mission you. **You ARE the user.** Investors and grant-makers fund founders with lived experience.

### Comparable raises
- **Promise** (justice tech) — $50M raised
- **Findhelp.org** (resource navigation) — $30M+ raised
- **Papa** (companion care for elderly) — $240M raised

Same playbook, different population.

---

## 11. THE NEXT 7 DAYS

Don't write more docs. Do this:

| Day | Action |
|---|---|
| 1–2 | Lock the brand name, buy domain, set up TikTok + IG handles |
| 3 | Post first founder-story TikTok ("I was in foster care and I'm building this — here's why") |
| 4–5 | Build Notion landing page + waitlist form |
| 6–7 | DM 20 foster youth on TikTok/IG, hop on calls, listen. Concierge mode begins. |

**Build trust, then build the app.**

---

## 12. APPENDIX — Key Stats for Pitch Deck

- 15,000–23,000 youth age out of foster care annually in the US
- 20% become homeless instantly at 18
- 31–46% experience homelessness by age 26
- <3% earn a college degree
- 50% employed by age 24, avg <$700/month income
- 80% have mental health conditions
- 17% of all US prisoners spent time in foster care
- 70% of girls in foster care become pregnant before 21
- 25% suffer ongoing PTSD into adulthood
- ~$1M economic burden per failed transition

---

*End of PRD v1.0*
