# AfterCare — Architecture: org site vs product app

> Added Oct 13, 2026 with the separation of the org marketing site from
> the product app. One deploy today, a clean split for two domains
> tomorrow.

## The split

There are two things called "AfterCare", and they used to be tangled
together in one Next.js app with shared copy. Now they are explicit:

| | Org marketing site | Product app |
|---|---|---|
| **What it is** | The public face of the organisation: mission, founder story, services preview, download page | The tool itself: onboarding, AI chat, quests, resources, panic button |
| **Routes** | `/`, `/services`, `/download`, `/privacy`, `/terms`, 404 | `/app` (and only `/app`) |
| **Chrome** | Shared org chrome: `web/components/site-chrome.jsx` (`OrgNav`, `OrgFooter`, `CrisisStrip`) + `mk-*` classes from `web/app/marketing.css` | In-app shell: `web/components/app-shell.jsx` + `globals.css`. No org nav/footer inside the product. |
| **Copy rules** | May talk about the mission, the problem, and the org's status. Must say "social-impact project working toward nonprofit status" — never "registered nonprofit". Legal pages must keep their DRAFT notice. | May talk about what the app does. Must show verification status on every resource (Verified badge vs "Unverified — call to confirm"). Must never claim a listing is verified unless `verified === true`. |
| **Crisis numbers** | Crisis strip on every org page (a youth in crisis who never opens the app still leaves with a number) | Panic Button + 988 / Covenant House / 911 in every panic plan + offline screen in the native shell |

### What did NOT change

- **One deploy.** Both surfaces still ship from the single `web/`
  Next.js project on Vercel. The split is at the route + component
  level, not the deploy level. Splitting deploys now would double the
  ops surface for no user benefit.
- **One resource catalog.** `web/components/data.js` (curated +
  generated) feeds the app finder, the chat, and `/services`. There is
  exactly one `verified` boolean per listing, sourced from
  `supabase/seed/resources.sample.csv`.
- **One product.** The iPhone app (`app/`) is a WebView shell around
  `/app` — not a second implementation. See
  [`docs/IPHONE-SHIP-CHECKLIST.md`](./IPHONE-SHIP-CHECKLIST.md).

## Route map

```
/                  org landing (mission, story placeholder, services
                   preview, impact goals, download CTA)
 /services         resource directory (org surface, same catalog)
 /download         honest install page: Add to Home Screen now,
                   TestFlight / App Store as "not yet"
 /privacy          legal draft (DRAFT notice, CONTACT_EMAIL placeholder)
 /terms            legal draft (DRAFT notice)
 /app              PRODUCT APP ONLY — no org nav/footer in here
 /api/*            product APIs (chat, auth, state, resources, notify,
                   checkin, cron) — used by /app and /services
```

## Future two-domain path (do NOT do this yet)

When the org gets a custom domain, the intended end state is:

- `aftercare.org` (or the chosen org domain) → org marketing site
- `app.aftercare.org` → product app

How to get there without a rewrite:

1. Buy / point the custom domain at the Vercel project.
2. In Vercel, add both domains to the same project. The routes above
   already separate the surfaces, so no code move is needed on day one.
3. If the surfaces later need different deploys (e.g. different headers,
   caching, or teams), split `web/` into two Next.js projects sharing
   `web/components/data.js` + the resource catalog as a package. The
   shared chrome (`site-chrome.jsx`) and the catalog are the only two
   files both projects would need — keep them dependency-free so the
   split stays mechanical.
4. Update `APP_URL` / sitemap base / `app.json` `extra.appUrl` to the new
   app domain, and update `/download` copy to point at the store
   listings once they exist.

## What is deliberately NOT in this doc

- `api/` (Express + Supabase) is dormant. It is not part of either
  surface. Decision: revive-or-delete — do not wire it into the org
  site or the app without a deliberate decision and a live backend.
- Nonprofit registration, legal review, and the 59 unverified resources
  are tracked in [`docs/GO_LIVE.md`](./GO_LIVE.md) §4, not here.
