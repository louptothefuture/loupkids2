# CMS Guide

This guide is for anyone updating Loup website copy or images without touching code.

## Log in

1. Open **https://loupkids.com/studio** (or your preview URL + `/studio`).
2. Sign in with the Sanity account invited to the LOUP project.
3. You’ll see documents grouped by page: Homepage, About page, Setup guide, FAQ items, Journal posts, Testimonials, and more.

If `/studio` shows a configuration error, ask a developer to confirm `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in Vercel.

## Change homepage text

1. Open **Homepage** (there is only one document).
2. Edit **Hero headline**, **Hero subline**, **Hero pricing line**, or **Hero button label**.
3. Update **Feature accordion** items for the black phone section.
4. Edit **Final CTA** fields and **Footer intro copy** at the bottom of the document.
5. Click **Publish**.

Changes appear on the live site within about 5 minutes, or immediately if the Sanity webhook is configured.

## Replace homepage hero image

1. Open **Homepage**.
2. Upload a new image under **Hero image**.
3. Fill in **Hero image alt text** (required for accessibility).
4. Publish.

## Edit About page

1. Open **About page**.
2. Edit the title, intro paragraphs, timeline blocks, team blocks, manufacturing copy, and closing line.
3. Optional: upload timeline images with alt text and captions.
4. Publish.

## Edit How It Works / Setup

1. Open **How it works / Setup**.
2. Edit the page title, intro, and each step (title + body).
3. Optional: replace the side image and caption.
4. Publish.

## Edit FAQ

1. Open any **FAQ Item** document, or create a new one.
2. For simple answers, use **Simple answer**.
3. For answers with bullets, use **Answer paragraphs**, **Answer bullet points**, and **Answer paragraphs (after bullets)**.
4. Set **Sort order** (lower numbers appear first).
5. Toggle **Visible on FAQ page** off to hide without deleting.
6. Publish.

## Edit testimonials

1. Open **Testimonial** documents.
2. Edit quote, attribution, and rating.
3. Turn on **Featured** to show in the homepage carousel.
4. Publish.

## Edit journal posts

1. Open **Post** documents.
2. Edit title, excerpt, cover image (with alt text), body, SEO title, and SEO description.
3. Publish.

## Add alt text to images

Every Sanity image field has a companion **alt text** field. Always fill it in before publishing.

## How publishing works

- Click **Publish** in Studio when edits are ready.
- The site refreshes cached content automatically (about 5 minutes max).
- With webhook setup, updates can appear in under a minute.

## What stays in Shopify

Do **not** move these to Sanity:

- Live product price
- Inventory and variants
- Discounts
- Checkout, taxes, shipping
- Orders and refunds

Shopify (or Stripe checkout configuration) owns commerce. Sanity owns marketing copy and editorial content.
