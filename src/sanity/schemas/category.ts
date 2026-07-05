import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Topic Cluster",
  type: "document",
  description: "SEO topic clusters — e.g. Screen Time, First Phone, Child Development",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Shown on the category page. Write it for Google as much as for people.",
    }),
  ],
});
