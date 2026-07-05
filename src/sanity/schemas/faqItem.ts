import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: ["Product", "Plans & Calling", "Shipping", "Returns & Warranty", "Safety & Privacy"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first within the section.",
      initialValue: 100,
    }),
  ],
  preview: { select: { title: "question", subtitle: "section" } },
});
