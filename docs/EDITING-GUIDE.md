# LOUP Site Editing Guide (No Code Required)

This guide covers everything the team can change without touching code.
There are two admin panels:

| What you want to change | Where you go |
| --- | --- |
| Blog posts, FAQ, testimonials, press logos, product specs, homepage copy | **Sanity Studio** → `loupkids.com/studio` |
| Prices, inventory, variants, discounts, shipping rates, orders, refunds | **Shopify Admin** → `your-store.myshopify.com/admin` |

---

## Part 1 — Content (Sanity Studio)

Go to **loupkids.com/studio** and sign in. Changes appear on the live site
within 5 minutes of pressing **Publish** (the site caches content briefly).

### Publish a blog post

1. Click **Blog Post** → **+ Create new**.
2. Write the **Title**, then click **Generate** next to URL Slug.
3. Fill in the **Excerpt** (1–2 sentences — this is what Google shows).
4. Upload a **Cover Image** and write the alt text (describe what's in the photo).
5. Pick a **Topic Cluster** (Screen Time / First Phone / Design…). Posts in the
   same cluster automatically strengthen each other for SEO.
6. Write the body. Use **Heading 2** for section titles — Google reads these.
7. In the **SEO** tab: add 2–4 **Related Posts**. This creates the internal
   links that build topical authority. Optionally override the SEO title
   (under 60 characters) and description (under 160).
8. Press **Publish**.

### Edit the FAQ

**FAQ Item** → click any question to edit, or **+ Create new**. Choose the
right **Section** (Product, Plans & Calling, Shipping, Returns & Warranty,
Safety & Privacy). Lower **Sort Order** numbers appear first. FAQ answers are
automatically added to Google's FAQ rich-result markup — write them in plain,
complete sentences.

### Swap testimonials

**Testimonial / Review** → edit or create. Toggle **Show on homepage** for the
four you want featured. These also feed the review stars on the product page.

### Swap press logos / quotes

**Press Logo / Mention** → add the outlet name, a pull quote, the article URL,
and (ideally) an SVG or transparent-PNG logo. Shows in the homepage ticker and
on the Press page.

### Update product specs

**Product Spec** → each row on the product page's spec tables is one document.
Edit the value (e.g. change battery life), pick the right **Group**, publish.

### Change homepage copy

**Homepage Copy** → there's exactly one document. You can change the hero
headline, subline, button text, the black-ticker manifesto lines, and the
"how it works" intro.

> **Photos on the homepage/product page layouts** are part of the design
> system. To swap them, send the new image to your developer — or ask them to
> move that section into Sanity if you'll change it often.

---

## Part 2 — Commerce (Shopify Admin)

Everything about money and inventory lives in Shopify. The website reads from
Shopify automatically — no site changes needed.

### Change the price

**Products → LOUP → Pricing** → change → **Save**. The site updates within
5 minutes. The structured data Google reads updates with it.

### Manage inventory

**Products → LOUP → Variants** → set quantity per colorway. When a variant
hits zero the site automatically shows it as unavailable.

### Add a variant (e.g. a new color)

**Products → LOUP → Variants → Add variant**. Give it a name and an image.
It appears on the product page automatically.

### Create a discount code

**Discounts → Create discount**. Codes are entered by customers at checkout —
nothing to configure on the site.

### Shipping rates, tax, returns

**Settings → Shipping and delivery** / **Settings → Taxes**. All handled at
Shopify checkout. Refunds: **Orders → (order) → Refund**.

### Abandoned carts

**Orders → Abandoned checkouts**. Shopify emails these automatically if you
enable it under **Marketing → Automations**.

---

## Part 3 — First-time setup (one-time, ~30 min, developer-assisted)

1. **Sanity**: create a free project at sanity.io/manage, put the project ID
   in the site's environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`),
   redeploy. Then invite teammates: **Manage → Members**.
2. **Shopify**: create the store, add the LOUP product (handle **`loup`**) and
   Custom Back Plates (handle **`custom-back-plates`**), create a custom app
   with Storefront API access, and set `SHOPIFY_STORE_DOMAIN` +
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Until then the site runs in preview mode
   with a built-in catalog.
3. **Purchase tracking webhook**: Shopify **Settings → Notifications →
   Webhooks** → add `orders/paid` → `https://loupkids.com/api/webhooks/shopify`,
   and set `SHOPIFY_WEBHOOK_SECRET`.
