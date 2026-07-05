import { defineField, defineType } from "sanity";

export const productSpec = defineType({
  name: "productSpec",
  title: "Product Spec",
  type: "document",
  description: "Hardware spec rows shown on the product page",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: { list: ["Hardware", "Calling", "Battery & Charging", "In the Box"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Sort Order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});
