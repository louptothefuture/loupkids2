# LOUP SEO Implementation Checklist

## Implemented in code (verify after deploy)

### Structured data (JSON-LD)
- [x] `Organization` — sitewide (name, logo, sameAs socials)
- [x] `Product` + per-variant `Offer` — `/shop/loup`, `/shop/custom-back-plates`
      (price, availability, free shipping details, 30-day return policy)
- [x] `AggregateRating` + `Review` on the LOUP product page
- [x] `FAQPage` — `/faq` (mirrors visible questions exactly, per Google policy)
- [x] `BlogPosting` — every journal article
- Validate after deploy: https://search.google.com/test/rich-results

### Metadata
- [x] Unique `<title>` + meta description on every route (template: `%s | LOUP`)
- [x] Canonical URLs on all indexable pages
- [x] Open Graph + Twitter card with product imagery
- [x] Per-post SEO title/description overrides editable in Sanity
- [x] Product page titles/descriptions editable via Shopify SEO fields

### Indexing & crawling
- [x] `sitemap.xml` — auto-generated, includes all products + posts, updates with ISR
- [x] `robots.txt` — blocks `/studio`, `/api/`, `/cart`, `/account`, `/checkout-preview`
- [x] Clean semantic URLs: `/shop/loup`, `/blog/right-age-first-phone`
- [x] `noindex` on account/checkout-preview utility pages

### Performance (Core Web Vitals)
- [x] Static generation + ISR (5 min) — no server render on the hot path
- [x] `next/image` everywhere: AVIF/WebP, responsive sizes, lazy below fold
- [x] Hero image `priority` for LCP; fonts self-hosted via `next/font` (no layout shift)
- [x] All images pre-compressed at build (largest file ≈ 300 KB)
- [x] Animations are transform/opacity only; `prefers-reduced-motion` respected
- Verify: `pnpm build && pnpm start`, then Lighthouse (report in `/lighthouse`)

### Topical authority (blog architecture)
- [x] Cluster model: every post belongs to a Topic Cluster (Sanity `category`)
- [x] Related-posts field creates deliberate internal links between cluster members
- [x] Pillar post ("Complete Guide to Smartphone Alternatives") links to all spokes
- [x] Every post carries an inline product CTA linking to `/shop/loup`

## Target keyword → page mapping

| Keyword | Page |
| --- | --- |
| smartphone alternative for kids | Home + pillar blog post |
| screen time device kids | Home, `/story`, screen-time cluster |
| kids communication device no screen | Home, `/shop/loup` |
| best first phone alternative | `/blog/right-age-first-phone`, pillar post |
| buy LOUP | `/shop/loup` |
| walkie talkie vs phone for kids | dedicated blog post |

## Launch-day tasks (manual, ~1 hour)

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://loupkids.com` in Vercel
- [ ] Add domain in Vercel, confirm https + www→apex redirect
- [ ] Google Search Console: verify domain, submit `sitemap.xml`
- [ ] Bing Webmaster Tools: same
- [ ] Rich results test on `/`, `/shop/loup`, `/faq`, one blog post
- [ ] Confirm GA4 + Meta Pixel fire (Realtime view / Pixel Helper)
- [ ] Shopify `orders/paid` webhook configured → test purchase shows in GA4 as `purchase`
- [ ] Check PageSpeed Insights on production URL (field data starts collecting)

## Ongoing (content team)

- [ ] 2–4 posts/month, always assigned to a cluster with 2+ related-post links
- [ ] New FAQ entries for every recurring support question (free FAQ rich results)
- [ ] Update pillar post quarterly (Google favors fresh comparison content)
- [ ] Collect real customer reviews → replace launch testimonials in Sanity
