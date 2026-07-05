import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "avatar", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
  ],
});
