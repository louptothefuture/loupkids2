import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "introParagraphs", title: "Intro paragraphs", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string", title: "Label" },
          { name: "title", type: "string", title: "Title" },
          { name: "paragraphs", type: "array", of: [{ type: "text" }], title: "Paragraphs" },
          { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          { name: "imageAlt", type: "string", title: "Image alt text" },
          { name: "imageCaption", type: "string", title: "Image caption" },
        ],
      }],
    }),
    defineField({
      name: "teamBlocks",
      title: "Team blocks",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "body", type: "text", title: "Body", rows: 3 },
        ],
      }],
    }),
    defineField({ name: "manufacturingTitle", title: "Manufacturing title", type: "string" }),
    defineField({ name: "manufacturingBody", title: "Manufacturing body", type: "text", rows: 4 }),
    defineField({ name: "closing", title: "Closing line", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
});
