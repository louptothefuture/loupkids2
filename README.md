# loupkids.com

Launch site for **LOUP** — the screenless voice phone for kids 6–16.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
Sanity (optional CMS) · Stripe Checkout · Docker.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

With no CMS or Shopify environment variables, built-in content and mock product
data keep the site browsable. A working pre-order requires Stripe runtime
secrets.

```bash
cp .env.example .env.local   # fill in what you have
```

## Architecture

```
src/
  app/                  # routes (App Router, static + ISR)
    api/checkout        # current Stripe Checkout session creation
    api/cart            # legacy Shopify Storefront cart or cookie-backed mock
    api/contact         # contact form intake (optional webhook forward)
    api/webhooks/stripe # Stripe checkout completion → GA4 purchase
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

Current implementation:

- **Stripe Checkout is the active pre-order path.** The older Shopify cart and
  webhook code still exist and must either be removed or deliberately restored
  as the single commerce architecture before production.
- **Content is never hard-coded for the team.** Everything editors touch lives
  in Sanity (`/studio`). The fallback content in `src/lib/content/fallback.ts`
  exists only so the site is complete before credentials arrive.
- **Browser pixels handle the funnel.** Stripe and Shopify webhooks contain
  server-side purchase reporting, with the differences and remaining risks
  documented in `docs/AWS-DEVOPS-HANDOFF.md`.

## Build and run

```bash
pnpm lint
pnpm build
docker compose build
docker compose up -d
curl --fail http://127.0.0.1:3000/api/health
```

The application builds as a portable Next.js standalone container. Public
`NEXT_PUBLIC_*` values are Docker build arguments; secrets are injected only at
runtime. See the AWS handoff before deploying or changing DNS.

## Handoff docs

- `docs/EDITING-GUIDE.md` — how the team edits everything with zero code
- `docs/SEO-CHECKLIST.md` — what's implemented + launch-day tasks
- `docs/AWS-DEVOPS-HANDOFF.md` — architecture, backend review, AWS security,
  deployment, monitoring, rollback, and production acceptance
