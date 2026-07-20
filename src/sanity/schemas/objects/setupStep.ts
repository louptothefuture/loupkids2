import { defineField, defineType } from "sanity";

export const setupStep = defineType({
  name: "setupStep",
  title: "Setup step",
  type: "object",
  fields: [
    defineField({ name: "step", title: "Step number", type: "string" }),
    defineField({ name: "section", title: "Section label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "image", title: "Step image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 100 }),
  ],
});
