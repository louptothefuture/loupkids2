import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/checkout-preview", "/cart", "/account"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
