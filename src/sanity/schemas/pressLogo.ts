import { defineField, defineType } from "sanity";

export const pressLogo = defineType({
  name: "pressLogo",
  title: "Press Logo / Mention",
  type: "document",
  fields: [
    defineField({ name: "outlet", title: "Outlet Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo (SVG or transparent PNG preferred)",
      type: "image",
    }),
    defineField({ name: "pullQuote", title: "Pull Quote", type: "text", rows: 2 }),
    defineField({ name: "url", title: "Article URL", type: "url" }),
    defineField({ name: "order", title: "Sort Order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "outlet", subtitle: "pullQuote", media: "logo" } },
});
