import { defineField, defineType } from "sanity";

/** Simple lead CRM — pre-order / waitlist emails from the site. */
export const waitlistLead = defineType({
  name: "waitlistLead",
  title: "Waitlist lead",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where they signed up (popup, nav, offer, pdp, …)",
    }),
    defineField({
      name: "createdAt",
      title: "Signed up",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "userAgent",
      title: "User agent",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "source", createdAt: "createdAt" },
    prepare({ title, subtitle, createdAt }) {
      return {
        title: title || "Lead",
        subtitle: [subtitle, createdAt ? new Date(createdAt).toLocaleDateString() : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Newest",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
});
