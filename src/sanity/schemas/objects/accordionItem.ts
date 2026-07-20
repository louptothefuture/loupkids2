import { defineField, defineType } from "sanity";

export const accordionItem = defineType({
  name: "accordionItem",
  title: "Accordion item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
});
