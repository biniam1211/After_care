# 🛠️ AfterCare — MVP Build Plan

**Founder:** Biniam | **Stack:** React Native + Supabase + Claude API | **Timeline:** 6 weeks to closed beta

---

## 0. THE GOLDEN RULE

Ship the **AI Chat + 1 Quest + Panic Button** in 6 weeks. Everything else can wait.

If you try to ship all 5 features at once, you ship none. The MVP exists to answer one question: *will a foster kid open this app twice in a week?*

---

## 1. MVP SCOPE LOCK (What's IN vs. OUT)

### ✅ IN (Build these, in this order)
1. **Onboarding flow** — phone OTP, ZIP code, age, foster status
2. **AI Chat** — Claude-powered conversational navigator with RAG over a curated resource DB
3. **One flagship Quest** — "Get Your First Bank Account" (5 steps)
4. **Panic Button** — emergency triage flow (homeless tonight / kicked out / abuse / eviction)
5. **Resource Finder** — lightweight, ZIP-based list of local resources

### ❌ OUT of V1 (Ship in V2+)
- Document Vault (Phase 2)
- More Quests (add weekly post-launch based on chat data)
- Push notifications (use SMS via Twilio in V1, simpler)
- Caseworker portal
- Social features
- Web app
- iOS-only or Android-only — Expo handles both, ship to TestFlight + Play Console internal track

---

## 2. ARCHITECTURE (One Page)

```
┌─────────────────────────────────────────────────────────────┐
│  React Native (Expo) — iOS + Android                        │
│  - Onboarding | Chat | Quests | Panic | Resources           │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Node.js API (Express on Railway or Fly.io)                 │
│  - /auth (Supabase magic link / OTP)                        │
│  - /chat (proxy to Claude w/ RAG)                           │
│  - /quests (CRUD + progress tracking)                       │
│  - /resources (ZIP-based query)                             │
│  - /panic (logs + Twilio SMS to crisis lines)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬─────────────┐
        ▼              ▼              ▼             ▼
   ┌─────────┐   ┌──────────┐   ┌──────────┐  ┌──────────┐
   │Supabase │   │  Claude  │   │  Pinecone│  │  Twilio  │
   │ Postgres│   │   API    │   │  (vec DB)│  │   SMS    │
   │ + Auth  │   │          │   │          │  │          │
   └─────────┘   └──────────┘   └──────────┘  └──────────┘
```

**Why this stack:**
- You already know React, Node, and the Anthropic API
- Supabase handles auth, db, file storage, RLS in one box
- Claude does heavy lifting (chat + reasoning over resources)
- Pinecone for RAG so the AI gives **accurate local answers**, not hallucinated ones

---

## 3. DATA MODEL (Supabase / Postgres)

```sql
-- USERS
users (
  id uuid pk,
  phone text unique,
  zip_code text,
  state text,
  age int,
  foster_status text,  -- 'in_care' | 'aged_out' | 'extended_care'
  age_out_date date,
  created_at timestamp
)

-- CONVERSATIONS
conversations (
  id uuid pk,
  user_id uuid fk,
  created_at timestamp
)

messages (
  id uuid pk,
  conversation_id uuid fk,
  role text,            -- 'user' | 'assistant'
  content text,
  resources_cited jsonb,
  created_at timestamp
)

-- QUESTS
quests (
  id uuid pk,
  slug text unique,     -- 'first-bank-account'
  title text,
  description text,
  steps jsonb           -- ordered array of step objects
)

user_quests (
  id uuid pk,
  user_id uuid fk,
  quest_id uuid fk,
  current_step int,
  completed_at timestamp,
  started_at timestamp
)

-- RESOURCES (the curated DB you build)
resources (
  id uuid pk,
  name text,
  category text,        -- 'housing' | 'finance' | 'mental_health' | 'legal' | etc.
  description text,
  phone text,
  url text,
  address text,
  zip_codes text[],     -- which ZIPs it serves
  states text[],
  age_range int4range,
  embedding vector(1536) -- for RAG
)

-- PANIC EVENTS
panic_events (
  id uuid pk,
  user_id uuid fk,
  scenario text,        -- 'homeless' | 'kicked_out' | 'abuse' | 'eviction'
  resources_shown jsonb,
  resolved boolean,
  created_at timestamp
)
```

---

## 4. THE AI CHAT — How It Actually Works

This is the core. Get it right.

### System prompt (skeleton)

```
You are AfterCare, an AI navigator for foster youth aged 16-24.
You were built by a former foster kid who aged out at 18.

You speak plain English, like a slightly older sibling who's been through it.
NEVER lecture. NEVER condescend. NEVER use government-speak.

For every question, your reply has 3 parts:
1. SHORT ANSWER (1-2 sentences, real talk)
2. NEXT 3 STEPS (numbered, action-oriented)
3. RESOURCES (use the resources I provide via RAG — never invent)

If the question is an emergency (homeless tonight, abuse, suicidal),
recommend the Panic Button immediately and provide the local crisis line.

User context:
- ZIP: {zip}
- State: {state}
- Age: {age}
- Status: {foster_status}
```

### RAG flow per chat message

1. User sends message → embed it (OpenAI ada or Voyage)
2. Query Pinecone for top 5 resources matching: vector similarity + state filter + ZIP filter
3. Inject resources into the Claude prompt as `<resources>` block
4. Claude responds in the 3-part format
5. Save to DB, return to user

### Why this matters
A vanilla GPT will tell a kid in California to call a New York hotline. That's how you lose trust on day one. RAG over your curated DB = trust.

---

## 5. THE FIRST QUEST — "Get Your First Bank Account"

This is your hero quest. Build it perfect, then template every future quest off this one.

### Step structure (JSON in `quests.steps`)

```json
[
  {
    "step": 1,
    "title": "Get your ID together",
    "what": "You'll need a government photo ID, your Social Security card or number, and proof of address.",
    "why": "Banks legally have to verify who you are. No exceptions.",
    "action": "Take photos of your ID and SS card. We'll store them safely.",
    "ai_check": "Have you got your ID and SSN ready?"
  },
  {
    "step": 2,
    "title": "Pick a bank that doesn't charge fees",
    "what": "Most banks charge $5-15/month. You want a fee-free one.",
    "why": "$15/month = $180/year. That's your phone bill.",
    "action": "Open Chime, Current, or Capital One 360. We'll open the link.",
    "ai_check": "Did the application go through?"
  },
  {
    "step": 3,
    "title": "Set up direct deposit",
    "what": "Get paid 2 days early and avoid check-cashing fees (those are scams).",
    "why": "Check cashing places take 3-5% of your paycheck. Direct deposit is free.",
    "action": "Give your employer your routing + account numbers from the app.",
    "ai_check": "Got direct deposit set up?"
  },
  {
    "step": 4,
    "title": "Turn on overdraft protection",
    "what": "Stop the bank from charging you $35 every time your card declines.",
    "why": "One bad week = $200 in overdraft fees. Don't.",
    "action": "Open the bank app → Settings → turn off overdraft.",
    "ai_check": "Overdraft protection is on?"
  },
  {
    "step": 5,
    "title": "Start the $20/week habit",
    "what": "Set up an auto-transfer of $20/week to savings. That's $1,040/year without thinking.",
    "why": "This is the foundation of everything. $1k emergency fund changes your life.",
    "action": "Open the app → Recurring Transfer → $20/week.",
    "ai_check": "Auto-save is running?"
  }
]
```

### Why this works
- **Plain English.** Nothing reads like a government PDF.
- **The "why" is the hook.** Foster kids have been told what to do their whole lives. Nobody told them why.
- **AI checks in after each step.** You don't fire-and-forget. Claude messages them: *"Hey — did the bank account application go through? Need help?"*

---

## 6. THE PANIC BUTTON — How It Works

```
[ user taps red Panic Button ]
        ↓
[ Modal: "What's happening right now?" ]
   - I have nowhere to sleep tonight
   - I'm being kicked out
   - I'm being hurt
   - I'm about to be evicted
   - Something else
        ↓
[ AI generates a 60-second action plan ]
   - Local emergency shelter (from resource DB, ZIP-filtered)
   - Local crisis line (real number, real local org)
   - Pre-drafted SMS to caseworker (one tap to send via Twilio)
   - Walk-to-safety flow if no phone signal expected
        ↓
[ Logged to panic_events table ]
[ Optional: opt-in follow-up SMS in 6 hours: "You good?" ]
```

**Critical:** This feature must work **even if the user has zero data** in their account. Default to crisis lines + national resources (988, Covenant House, Trevor Project) and surface local ones if ZIP is set.

---

## 7. THE 6-WEEK SPRINT PLAN

### Week 1 — Foundation
**Goal:** Project bootstrapped, auth working, basic shell visible on your phone.

- Initialize Expo app with TypeScript + EAS
- Spin up Supabase project, write `users` schema
- Phone OTP auth flow (Supabase native)
- Onboarding screens: phone → ZIP → age → status
- Bottom tab nav: Chat | Quests | Panic | Profile
- Deploy backend to Railway/Fly with `/health` endpoint

**Ship target:** You can sign in, complete onboarding, see empty tabs.

### Week 2 — AI Chat (the heart)
**Goal:** A foster kid can ask a question and get a useful answer.

- Build chat UI (use react-native-gifted-chat as base, customize heavy)
- `/chat` endpoint: takes message, returns Claude response
- Wire up Claude API with the system prompt above
- Save conversations + messages to Supabase
- Build the curated resource DB seed (start with 200 hand-picked CA resources)
- Set up Pinecone, embed resources, wire RAG into chat endpoint

**Ship target:** Send "I need housing in Anaheim" → get a real answer with real local resources.

### Week 3 — First Quest + Quest Engine
**Goal:** Generic quest system that supports the bank account quest, ready to scale.

- Build the quest engine (read JSON steps, track progress)
- Quest list screen + quest detail screen
- Step-by-step UI (one step at a time, mark complete, AI check-in)
- Wire AI check-ins to chat (`Quest 1 Step 2: Did the application go through?`)
- Seed the "Get Your First Bank Account" quest

**Ship target:** Complete the bank account quest end-to-end on your own phone.

### Week 4 — Panic Button + Resource Finder
**Goal:** Emergency flow works, resource list is browseable.

- Panic button UI (red, persistent in tab bar)
- Scenario selector + AI-generated action plan
- Twilio integration for SMS-to-caseworker (manual list V1)
- Resource Finder screen: list view, filter by category + ZIP
- Deep links from chat into specific resources

**Ship target:** Tap panic → get a real plan with real local numbers in <5 seconds.

### Week 5 — Polish + Beta Prep
**Goal:** App feels good, doesn't crash, ready for real users.

- Visual polish: typography, colors, micro-animations (use NativeBase or Tamagui)
- Empty states + error states everywhere
- PostHog analytics on every screen + key events
- Onboarding video (15-sec founder intro from you)
- TestFlight build + Play Console internal track
- Privacy policy + ToS (use a generator, have a lawyer review later)

**Ship target:** 5 friends can install, complete onboarding, have a real chat without breaking it.

### Week 6 — Closed Beta Launch
**Goal:** 50 real foster youth on the app, you're collecting feedback every day.

- Send TestFlight + Play links to your concierge contacts (the 25 from Phase 1 + 25 new)
- Daily check-ins with first 10 users — ride-along their first session if possible
- Bug triage every morning, ship fixes daily
- Start logging every chat message + user-reported issues for V2 prioritization

**Ship target:** 50 installs, 25 WAU, first organic referral.

---

## 8. WHAT YOU ACTUALLY DO EACH DAY (Practical Schedule)

You're solo + Claude Code. This is doable if you protect your time.

| Time | Activity |
|---|---|
| 7–9 AM | Build (deep work, no notifications) |
| 9–10 AM | User DMs / customer interviews / concierge support |
| 10–12 PM | Build |
| 12–1 PM | Lunch + film 1 TikTok/Reel |
| 1–4 PM | Build |
| 4–5 PM | Resource DB curation (find 10 new resources, vet, add) |
| 5–6 PM | Edit + post content |
| 6 PM+ | Off (your brain needs it) |

**Rule:** No new feature ideas during build hours. Park them in a `v2-ideas.md` and revisit Sundays.

---

## 9. RISKS + MITIGATIONS

| Risk | Mitigation |
|---|---|
| Claude hallucinates a resource → kid calls a dead number | RAG-only mode. AI cannot return resources not in your DB. |
| Kid in genuine crisis, app gives bad advice | Panic button always routes to 988 + Covenant House first |
| Privacy / minor data concerns | RLS on every Supabase table, no PII in AI training, clear consent |
| You burn out solo | The 9-to-5 schedule above. Sundays off. Non-negotiable. |
| Apple App Store rejects you | Lead with "youth wellbeing" framing, not "foster care app", which triggers extra review |
| Nonprofit competitors copy you | They're slow. You ship weekly, they ship yearly. Speed is the moat. |

---

## 10. WEEK-1 STARTER COMMANDS

Copy-paste-ready to start tonight:

```bash
# Front end
npx create-expo-app@latest aftercare --template
cd aftercare
npx expo install expo-router @supabase/supabase-js \
  react-native-gifted-chat react-native-mmkv \
  @tanstack/react-query expo-notifications

# Back end
mkdir aftercare-api && cd aftercare-api
npm init -y
npm install express @anthropic-ai/sdk @supabase/supabase-js \
  twilio @pinecone-database/pinecone dotenv cors zod
```

Then:
1. Create Supabase project → grab URL + anon key
2. Get Anthropic API key
3. Get Twilio trial creds
4. Get Pinecone free-tier index
5. Push backend to Railway in 5 min

---

## 11. SUCCESS = THIS, IN 60 DAYS

By July 4, 2026:
- ✅ App live on TestFlight + Play internal
- ✅ 50+ closed beta users (real foster youth, not friends)
- ✅ 30%+ WAU
- ✅ 1 unsolicited "this app saved me" message
- ✅ 1 caseworker asking how to refer their kids
- ✅ 5+ TikToks with 10k+ views each from your build-in-public series
- ✅ Foundation grant application submitted (Pritzker or Casey Family)

If you hit those, you have a real shot at PMF by Q4 2026 and a fundable seed round in 2027.

---

## 12. WHAT I CAN BUILD FOR YOU NEXT

Pick one and I'll generate it now:

1. **Starter codebase** — bootstrap the Expo app + Express API with auth + chat endpoint already wired up
2. **The full system prompt** — the production-ready Claude prompt with all the foster-care-specific guardrails
3. **The seed resource database** — 100 curated California foster youth resources in CSV, ready to import
4. **Quest 2, 3, 4 templates** — Build Your Credit Score / Apply for Chafee Grant / Get Health Insurance, in the same JSON format as Quest 1
5. **Landing page** — single HTML file, waitlist form, founder story, ready to deploy
6. **TikTok content calendar** — 30 days of build-in-public scripts

---

*End of MVP Build Plan v1.0*
