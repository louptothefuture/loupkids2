import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { LOUPKIDS_HELP_ARTICLES } from "@/lib/content/loupkids-support";
import { getProducts } from "@/lib/shopify";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([getPosts(), getProducts()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/ode`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/reserve`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/journal`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/setup`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/help`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/legal/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/coppa`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/warranty`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/shipping`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/accessibility`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const helpPages: MetadataRoute.Sitemap = LOUPKIDS_HELP_ARTICLES.map((a) => ({
    url: `${SITE.url}/help/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/shop/${p.handle}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/journal/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...helpPages, ...productPages, ...postPages];
}
