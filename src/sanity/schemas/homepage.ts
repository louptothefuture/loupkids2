import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  description: "Edit homepage copy, hero image, and key sections. There is only one homepage document.",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubline", title: "Hero subline", type: "text", rows: 3 }),
    defineField({ name: "heroPriceLine", title: "Hero pricing line", type: "string" }),
    defineField({ name: "heroCtaLabel", title: "Hero button label", type: "string" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string" }),
    defineField({ name: "pullQuote", title: "Pull quote (phone section)", type: "text", rows: 2 }),
    defineField({ name: "phoneSectionTitle", title: "Phone section title", type: "string" }),
    defineField({ name: "phoneSectionSubtitle", title: "Phone section subtitle", type: "text", rows: 2 }),
    defineField({
      name: "accordionItems",
      title: "Feature accordion",
      type: "array",
      of: [{ type: "accordionItem" }],
    }),
    defineField({ name: "finalCtaHeadline", title: "Final CTA headline", type: "string" }),
    defineField({ name: "finalCtaBody", title: "Final CTA body", type: "text", rows: 2 }),
    defineField({ name: "finalCtaLabel", title: "Final CTA button label", type: "string" }),
    defineField({ name: "footerBody", title: "Footer intro copy", type: "text", rows: 3 }),
    defineField({ name: "testimonialHeadline", title: "Testimonials headline", type: "string" }),
    defineField({
      name: "manifestoLines",
      title: "Manifesto lines (legacy)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "howItWorksIntro", title: "How it works intro (legacy)", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
});
