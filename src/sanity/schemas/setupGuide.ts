import { defineField, defineType } from "sanity";

export const setupGuide = defineType({
  name: "setupGuide",
  title: "How it works / Setup",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Page title", type: "string" }),
    defineField({ name: "description", title: "Intro description", type: "text", rows: 2 }),
    defineField({ name: "steps", title: "Steps", type: "array", of: [{ type: "setupStep" }] }),
    defineField({ name: "heroImage", title: "Side image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Side image alt text", type: "string" }),
    defineField({ name: "heroCaption", title: "Side image caption", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
});
