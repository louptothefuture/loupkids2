import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage Copy",
  type: "document",
  description: "Edit homepage headlines and copy. There is only one of these documents.",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "The big one. Keep it under ~40 characters.",
    }),
    defineField({ name: "heroSubline", title: "Hero Subline", type: "text", rows: 2 }),
    defineField({ name: "heroCta", title: "Hero Button Text", type: "string" }),
    defineField({
      name: "manifestoLines",
      title: "Manifesto Lines",
      type: "array",
      of: [{ type: "string" }],
      description: "Short punchy lines shown in the scrolling manifesto section.",
    }),
    defineField({
      name: "howItWorksIntro",
      title: "How It Works — Intro",
      type: "text",
      rows: 2,
    }),
  ],
});
