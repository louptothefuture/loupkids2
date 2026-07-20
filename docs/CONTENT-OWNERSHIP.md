# Content Ownership

Clear split between CMS, commerce, and code.

## Sanity (marketing & editorial)

| Content | Where in Studio |
|---------|-----------------|
| Homepage hero copy & image | Homepage |
| Feature accordion | Homepage |
| Footer intro copy | Homepage |
| About page story | About page |
| Setup / How It Works steps | How it works / Setup |
| FAQ questions & answers | FAQ Item |
| Testimonials | Testimonial |
| Press mentions | Press Logo |
| Product marketing specs | Product Spec |
| Journal / blog posts | Post |
| Site-wide SEO defaults | Site settings |
| Navigation & footer links | Site settings |

**Who edits:** Marketing, founders, content team — no code required.

## Shopify / Stripe (commerce)

| Content | System |
|---------|--------|
| Live product price | Shopify catalog or Stripe price IDs |
| Inventory & variants | Shopify |
| Discounts & promotions | Shopify / Stripe |
| Checkout flow | Stripe Checkout |
| Taxes & shipping rules | Stripe / Shopify |
| Orders & refunds | Stripe / Shopify dashboards |

**Who edits:** Operations, finance — not Sanity.

## GitHub / code (product & design)

| Content | Location |
|---------|----------|
| Page layouts & components | `src/components/` |
| Styling & animations | CSS, Framer Motion |
| Business logic & integrations | `src/lib/`, `src/app/api/` |
| Routing & redirects | `next.config.ts` |
| Fallback copy (offline safety net) | `src/lib/content/` |

**Who edits:** Developers in Cursor — for layout, new sections, integrations, and bug fixes.

## Rule of thumb

- **Changing words or images?** → Sanity Studio
- **Changing price or checkout?** → Shopify / Stripe
- **Changing layout or behavior?** → GitHub + Vercel deploy
