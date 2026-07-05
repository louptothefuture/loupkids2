import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial / Review",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "attribution",
      title: "Who said it",
      type: "string",
      description: 'e.g. "Sarah M., mom of two, Austin TX"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Star Rating (1–5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort Order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "attribution", subtitle: "quote" } },
});
