# loupkids.com

Launch site for **LOUP** — the screenless voice phone for kids 6–16.

Next.js (App Router) · Tailwind CSS v4 · Framer Motion · Sanity (headless CMS)
· Shopify Storefront API (headless commerce) · Vercel.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

With no environment variables the site runs fully in **preview mode**:
built-in launch content stands in for Sanity, and a mock catalog/cart stands
in for Shopify (checkout lands on `/checkout-preview`). Add credentials and
both switch to live data with zero code changes.

```bash
cp .env.example .env.local   # fill in what you have
```

## Architecture

```
src/
  app/                  # routes (App Router, static + ISR)
    api/cart            # cart ops — Shopify Storefront API or cookie-backed mock
    api/contact         # contact form intake (optional webhook forward)
    api/webhooks/shopify# orders/paid → GA4 + Meta CAPI server-side purchases
    studio/             # embedded Sanity Studio at /studio
  components/           # header/footer, cart drawer, PDP, waveform, SEO JSON-LD
  lib/
    shopify/            # Storefront API client, queries, types, mock provider
    content/            # Sanity client + typed getters with launch-content fallback
    analytics.ts        # GA4 + Meta Pixel funnel events
  sanity/schemas/       # post, faq, testimonial, pressLogo, productSpec, homepage
scripts/prepare-images.mjs  # brand photo pipeline (sharp) → public/images
docs/                   # EDITING-GUIDE.md, SEO-CHECKLIST.md
lighthouse/             # performance reports
```

Key decisions:

- **Commerce is never hand-rolled.** Inventory, tax, shipping, discounts,
  checkout, and customer accounts are all Shopify. The site only reads the
  catalog and manages a cart via the Storefront API.
- **Content is never hard-coded for the team.** Everything editors touch lives
  in Sanity (`/studio`). The fallback content in `src/lib/content/fallback.ts`
  exists only so the site is complete before credentials arrive.
- **Conversion tracking is server-side for purchases.** Browser pixels handle
  the funnel (`view_item`, `add_to_cart`, `begin_checkout`); the Shopify
  `orders/paid` webhook posts `purchase` events to GA4 Measurement Protocol and
  Meta Conversions API so ad-blockers can't erase revenue data.

## Deploy (Vercel)

1. Push to GitHub, import in Vercel. Framework preset: Next.js. No special config.
2. Add environment variables from `.env.example`.
3. Set the domain, then run the launch-day list in `docs/SEO-CHECKLIST.md`.

## Handoff docs

- `docs/EDITING-GUIDE.md` — how the team edits everything with zero code
- `docs/SEO-CHECKLIST.md` — what's implemented + launch-day tasks
