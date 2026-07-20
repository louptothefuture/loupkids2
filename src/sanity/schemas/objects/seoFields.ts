import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string" }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3 }),
    defineField({ name: "canonical", title: "Canonical URL override", type: "url" }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", options: { hotspot: true } }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});
