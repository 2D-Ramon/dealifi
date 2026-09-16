# DealiFi

TurboTax-style FSBO buy/sell platform. Oklahoma first, Tulsa County first. Software only.  
**Beta:** every plan is $0. **E-sign:** DocuSign.

**Live:** [https://2d-ramon.github.io/dealifi/](https://2d-ramon.github.io/dealifi/)

- [PRODUCT.md](./PRODUCT.md) — product brief
- [ROADMAP.md](./ROADMAP.md) — 8-week v1

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel

Import **this repo** (`2D-Ramon/dealifi`) as a **new** project named **`dealifi`**.

- Project name: `dealifi` (not `web` — that name belongs to GorditoPass)
- Root Directory: leave blank / `.` (the Next.js app is at the repo root)
- Framework: Next.js

Do not reuse the GorditoPass project or a Root Directory of `web`.

## Now

- Sign in as seller or buyer (browser storage)
- Seller guided modules — cannot publish until complete
- Live listing on `/homes`
- Buyer interview
- Dashboards
- Pricing pickers (all $0)

## Next

- DocuSign keys in `.env.local` (see `.env.example`)
- Offers + section-by-section contract review
- ID-gated private showings
- Supabase when you are ready to leave localStorage
