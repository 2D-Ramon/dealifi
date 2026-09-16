# DealiFi — product brief

**Working name:** DealiFi (not DealFi — DealFi® / dealfi.net is a live auto F&I lender platform)  
**One line:** TurboTax for buying and selling a home without a required agent — Oklahoma first, Tulsa first.  
**Legal posture:** Software only. Users are FSBO / unrepresented. Optional paid upsells: broker review, lender referral, form-insurance. Your personal license is a backstop if a future product *requires* a broker, not the v1 wrapper.  
**v1 geography:** Tulsa County → Tulsa + OKC → all Oklahoma → other states.  
**v1 languages:** English.  
**v1 success:** A seller lists a real Tulsa home end-to-end; a buyer with an account makes an offer on state forms; both dashboards track the timeline to closing; they can invite title, lender, inspector, attorney, realtor, extra owners/buyers into the same deal room.

This is **not** a traditional MLS in v1. Listings live on DealiFi. A nationwide MLS is a later, separate product (see ROADMAP.md).

---

## What it is

Two products that share one transaction:

1. **Guided intake (TurboTax feel)** — branching Q&A that fills OREC / public Oklahoma forms and a listing. Modules can be done in any order. The listing cannot go live until required modules are complete.
2. **Deal dashboard (after live / after offer)** — documents, e-sign, messages, showings, offers, timeline, parties. Listing-forward public pages for search, open houses, and share links.

Sellers and buyers both get an account, a Q&A, and a dashboard. Guests can browse listings. An account is required to message, request a showing, or offer.

---

## Non-negotiables

- **Do not** use a personal MLSOK agent login to pull or push listings. That violates MLS rules and can cost the license. Autofill in v1 = county/assessor public data + user-entered fields + later CoreLogic.
- **Do not** hold earnest money. Title / escrow holds funds. DealiFi generates the offer and tracks status.
- **Do not** give legal advice in the product copy. Every form screen: *This is a legally binding document. If you do not understand it, talk to an attorney.* Section-by-section “I reviewed and understand” is required before sign.
- Use **public OREC / statutory Oklahoma forms** (Residential Property Condition Disclosure / Disclaimer, Uniform Contract of Sale, lead-based paint, confirmation of disclosures, etc.). Confirm current PDFs from [oklahoma.gov/orec](https://oklahoma.gov/orec/contract-forms-and-related-addenda.html) before go-live. Association-only realtor forms are out unless licensed.
- Software-only TOS: user is responsible for accuracy of answers. Optional insurance / broker-review upsells sit *next to* that, not instead of it.

---

## Roles

| Role | Can do |
|------|--------|
| Guest | Search Tulsa listings, view public details, see county open-house calendar |
| Seller | Intake, listing, docs, showings, offers, deal room |
| Buyer | Intake (readiness), search/alerts, ID for private showing, disclosures, offer, deal room |
| Invitee | View or sign a specific packet (spouse, additional owner, buyer 2–4, title, lender, attorney, inspector, realtor, other) |
| Optional broker (upsell) | Review packet / listing if seller or buyer opts in |
| Admin (you) | Users, listings, form templates, Tulsa launch flags, abuse |

Private showing rule: **request → seller approves time → buyer ID on file → then address / access instructions.** Seller can require proof of funds / pre-approval before showing (default recommend: on).

---

## Money (v1 mix)

Sellers pick one:

- Flat listing fee (tiers: basic live listing / plus docs+e-sign / full deal room)
- Success fee at closing (invoice at closing; title does not have to collect unless we later partner)

Buyers pick one:

- Subscription (search + alerts + messaging)
- Flat fee to unlock offer
- Success fee at closing

Also: **lender referral** when a buyer is not pre-approved. Featured listing / flyer pack as add-ons.

Payments: **Stripe**. Prefer **ACH**. If card, buyer/seller covers processing. No DealiFi escrow.

Exact dollar amounts TBD before week 6 of the build.

---

## v1 feature set (must ship)

**Seller modules (all required before LIVE)**  
Identity & ownership → property type & address → facts (beds, baths, legal, taxes, HOA, utilities) → situation branches (homestead, HOA, well/septic, unpermitted work, occupied vs vacant, inherited/divorce/investor as *data*, not separate products) → photos / floor plan → disclosures (OREC) → repairs & inclusions → pricing → showing rules (ID, POF, lockbox later) → review → LIVE.

**Public listing**  
DealiFi page, share link, PDF flyer, yard-sign PDF. Status: coming soon / active / pending / sold / withdrawn.

**Buyer**  
Account required to act. Full interview (budget, pre-approval, timeline, must-haves, commute). Rank + saved search + alerts. If not pre-approved: lender-help CTA. Must e-sign disclosure receipt before offer.

**Showings**  
Seller posts private slots + open houses. Public listing calendar + **Tulsa County** open-house calendar (not all 77 counties in v1). RSVP. ID before private access.

**Offers**  
Structured 1-pager (price, dates, financing, contingencies, earnest money *to title*). Full OREC contract filled from Q&A. Each contract section acknowledged. Accept / counter / decline in-app. Up to 4 buyers and 4 sellers + other parties.

**Deal room**  
Timeline to closing, checklist, document vault, e-sign (**DocuSign**), in-app messages only, invite parties.

**Also in v1:** comps (simple, public-data or manual), price drop, showing feedback, closing checklist.

**Explicitly later:** CoreLogic, MLSOK syndication, nationwide MLS, Spanish, DealiFi-held escrow, SMS chat, all-county calendars, form insurance product, full broker-of-record transactions.

---

## MLS — three products, do not mix them

| | What it is | When |
|--|------------|------|
| **A. DealiFi marketplace** | Your listings, search, calendars. Looks like “the MLS” to a FSBO consumer. | **v1 (this project)** |
| **B. DealiFi listing exchange** | Other brokerages / FSBO sites opt in to share listings with you (RESO-like feed you control). | After Tulsa is working |
| **C. True nationwide MLS** | Broker membership, cooperation/compensation rules, data standards, statewide/national coverage, NAR/RESO politics. | **Separate company / years**, not the 2-month build |

**Recommendation:** Build A now with a listing data model that can become B (standard fields, photos, status, open houses, office/agent optional). Do not start C in this repo. Do not pipe your agent MLS login into A.

---

## Stack (recommendation)

**Next.js + Supabase + Vercel + Stripe + DocuSign + R2/S3 for files.** Same control surface as GorditoPass: you can change copy, flows, and Tulsa rules without a mobile-app store. Best consumer path is a **mobile-web app** that feels native, not a required App Store app in two months. Beta plans are **$0**.

Autofill adapter: `PublicRecordsProvider` (Tulsa County / OK assessor first) so CoreLogic can plug in later without rewriting screens.
