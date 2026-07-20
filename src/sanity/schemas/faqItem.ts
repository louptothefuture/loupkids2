import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      title: "Simple answer",
      type: "text",
      rows: 4,
      description: "Use for a single-paragraph answer.",
    }),
    defineField({
      name: "answerParagraphs",
      title: "Answer paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "answerBullets",
      title: "Answer bullet points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "answerParagraphs2",
      title: "Answer paragraphs (after bullets)",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: ["General", "Product", "Plans & Calling", "Shipping", "Returns & Warranty", "Safety & Privacy"],
      },
      initialValue: "General",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "visible",
      title: "Visible on FAQ page",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "question", subtitle: "section" } },
});
