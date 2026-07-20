import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description: "Global site settings — navigation, footer, SEO defaults, and contact info.",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "announcementBar", title: "Announcement bar", type: "string" }),
    defineField({
      name: "navigation",
      title: "Navigation links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ]}],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ]}],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "platform", type: "string", title: "Platform" },
        { name: "url", type: "url", title: "URL" },
      ]}],
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text", rows: 3 }),
    defineField({ name: "defaultSocialImage", title: "Default social image", type: "image", options: { hotspot: true } }),
  ],
});
