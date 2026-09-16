# DealiFi roadmap

Clock: **~8 weeks to a clickable Tulsa v1.**  
North star: one Tulsa FSBO can list, one buyer can offer, both reach a closing table with title/lender/inspector in the deal room.

Everything below is sequenced so week 8 is a real transaction OS — not a nationwide MLS.

---

## Phase 0 — before code (days 1–4)

- Confirm **DealiFi** name; register a `.com` if cheap (avoid DealFi).
- Download current **OREC** PDFs: disclosure, disclaimer, residential contract, confirmation of disclosures, lead-based paint packet.
- E-sign: **DocuSign** (developer keys in `web/.env.example`).
- Stripe: ACH later. **Beta prices are $0** for every seller and buyer plan.
- One **Tulsa test house** (yours or a willing FSBO) as the dogfood listing.
- One-page TOS / privacy / “not a broker, not legal advice.”
- Pricing pickers shipped at $0 for beta.

---

## Phase 1 — weeks 1–2: skeleton

**Ship**

- Auth: email magic link + optional SMS (same as signing identity later).
- Roles: seller, buyer, invitee, admin.
- Empty dashboards (seller / buyer).
- Seller intake **router**: module list, progress %, cannot publish until complete.
- First modules: account, ownership (up to 4 sellers), property type (SFR / condo / townhouse / land / 2–4 unit), Tulsa address.
- Public marketing pages: home, how it works, Tulsa, pricing (mix of plans), apply/waitlist.

**Done when:** you can create a seller account and walk empty modules without a live listing.

---

## Phase 2 — weeks 3–4: listing goes live

**Ship**

- Remaining seller modules: facts, branching (HOA, well/septic, homestead, unpermitted work, occupancy), photos, floor plan upload, utilities, repairs, price, showing rules.
- OREC disclosure / disclaimer filled from Q&A, preview PDF.
- Publish → public listing URL + share link + PDF flyer + yard-sign PDF.
- Status: draft / live / pending / sold / withdrawn. Price drop.
- Tulsa search (map + filters). Guest browse.
- Simple comps block (manual or assessor if easy; placeholder OK).

**Autofill:** Tulsa County / assessor scrape or official bulk if available. Manual override always. No MLSOK login.

**Done when:** your test house is live on DealiFi with photos and a shareable flyer.

---

## Phase 3 — week 5: buyers, showings, safety

**Ship**

- Buyer account + **readiness interview** (budget, timeline, must-haves, commute, pre-approval yes/no).
- If not pre-approved: lender referral CTA (capture lead; $ later).
- Saved search + email alerts.
- Open houses on the listing + **Tulsa County** open-house calendar.
- Private showing: request → seller approve → calendar. **ID upload required** before address / access notes. Seller toggle: require POF/pre-approval to show.
- In-app messaging (listing thread). No SMS/email chat in v1 (transactional email OK: “you have a message”).

**Done when:** a buyer can RSVP an open house and request a private showing that stays address-gated until ID is in.

---

## Phase 4 — week 6: offers and e-sign

**Ship**

- Document vault + party invites (buyers 1–4, sellers 1–4, spouse, title, lender, attorney, inspector, realtor, other).
- View-only share until invited to sign. Audit log (opened / signed / when).
- Offer: 1-pager overview + full OREC contract. **Each section** “reviewed and understood” before sign.
- Accept / counter / decline.
- Disclosures must be acknowledged by buyer **before** offer submit.
- Embed Dropbox Sign or DocuSign.

**Done when:** buyer submits an offer on the test house; seller counters once; both signed copies sit in the vault.

---

## Phase 5 — week 7: deal room to closing

**Ship**

- Shared timeline (offer, option period, inspections, appraisal, title, closing date).
- Closing checklist (seller + buyer views).
- Invite title / lender / inspector / attorney / realtor into **that deal only**.
- Showing feedback, lockbox notes (text field; hardware later).
- Repair list tied to inspection upload.

**Done when:** the test deal has a timeline both sides can follow without leaving DealiFi.

---

## Phase 6 — week 8: money, polish, Tulsa launch

**Ship**

- Stripe: seller plan picker (flat tiers vs success fee) + buyer picker (sub vs flat vs success). ACH default; card = user pays fees.
- Featured listing add-on (can be off).
- Broker-review **upsell waitlist** (you fulfill manually at first).
- Admin: hide a listing, ban a user, Tulsa-only flag.
- Mobile pass on intake + listing + dashboard.
- Dogfood the full path on the test house.

**Launch:** Tulsa only. OKC is a config flag, not extra product.

---

## Phase 7 — after v1 (next quarter)

- OKC + rest of Oklahoma (forms already OK; calendars per county).
- CoreLogic (or ATTOM) behind the same autofill adapter.
- Form / errors & omissions style insurance upsell (partner, not you underwriting).
- Paid broker review as a real queue in-app.
- **Listing exchange (MLS-lite):** other offices/FSBO tools can publish into DealiFi via API. This is “our MLS” without pretending to be MLSOK.
- SMS notifications (still not in-app SMS chat unless you change that).
- Spanish.

---

## Phase 8 — nationwide MLS (separate)

Only after Oklahoma deal volume exists. New brief, new legal entity likely, RESO compliance, member rules, compensation. **Do not staff this in the 8-week v1.** Same listing schema from Phase 2 is what you reuse.

---

## What we are not building in 8 weeks

- MLSOK in/out, Zillow, Realtor.com
- All 77 Oklahoma county calendars
- DealiFi as escrow agent
- Custom e-sign engine
- Native iOS/Android apps
- Every edge-case branch (we ship the branches in the brief; we do not ship a unique flow per legal specialty)

---

## Suggested build order inside the repo

`web/` Next.js app:

- `/` marketing  
- `/sell` intake modules  
- `/buy` buyer interview  
- `/homes` search + listing  
- `/calendar` Tulsa open houses  
- `/app` seller/buyer dashboard + deal room  
- `/sign` e-sign return URLs  
- `/admin`

Data: `profiles`, `listings`, `listing_media`, `modules`, `forms`, `envelopes`, `offers`, `showings`, `open_houses`, `threads`, `deal_parties`, `timeline_events`, `payments`.
