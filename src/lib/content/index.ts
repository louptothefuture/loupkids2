import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  FALLBACK_FAQS,
  FALLBACK_HOMEPAGE,
  FALLBACK_POSTS,
  FALLBACK_PRESS,
  FALLBACK_SPECS,
  FALLBACK_TESTIMONIALS,
} from "./fallback";
import { LOUPKIDS_JOURNAL_COVERS, LOUPKIDS_JOURNAL_EXCERPTS } from "./loupkids-site";
import type { Faq, HomepageCopy, Post, PressMention, Spec, Testimonial } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isSanityConfigured = Boolean(projectId);

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

/* eslint-disable @typescript-eslint/no-explicit-any */
function urlFor(source: any): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(1600).auto("format").url();
}

export async function getPosts(): Promise<Post[]> {
  if (!client) {
    return FALLBACK_POSTS.map((p) => ({
      ...p,
      coverImage: LOUPKIDS_JOURNAL_COVERS[p.slug] ?? p.coverImage,
      excerpt: LOUPKIDS_JOURNAL_EXCERPTS[p.slug] ?? p.excerpt,
    }));
  }
  const raw = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current, title, excerpt, publishedAt,
      "author": author->{name, role},
      "category": category->{title, "slug": slug.current},
      coverImage, body,
      "relatedSlugs": relatedPosts[]->slug.current,
      seoTitle, seoDescription
    }`,
    {},
    { next: { revalidate: 300 } },
  );
  return raw.map((r: any) => ({
    ...r,
    author: r.author ?? { name: "LOUP", role: "" },
    category: r.category ?? { title: "Journal", slug: "journal" },
    coverImage: urlFor(r.coverImage),
    body: { source: "sanity", value: r.body },
    relatedSlugs: r.relatedSlugs ?? [],
  }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getFaqs(): Promise<Faq[]> {
  if (!client) return FALLBACK_FAQS;
  return client.fetch(
    `*[_type == "faqItem"] | order(section asc, order asc) { question, answer, section }`,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!client) return FALLBACK_TESTIMONIALS;
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) { quote, attribution, rating, featured }`,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getPress(): Promise<PressMention[]> {
  if (!client) return FALLBACK_PRESS;
  const raw = await client.fetch(
    `*[_type == "pressLogo"] | order(order asc) { outlet, pullQuote, url, logo }`,
    {},
    { next: { revalidate: 300 } },
  );
  return raw.map((r: any) => ({ ...r, logoUrl: urlFor(r.logo) }));
}

export async function getSpecs(): Promise<Spec[]> {
  if (!client) return FALLBACK_SPECS;
  return client.fetch(
    `*[_type == "productSpec"] | order(group asc, order asc) { label, value, group }`,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getHomepage(): Promise<HomepageCopy> {
  if (!client) return FALLBACK_HOMEPAGE;
  const doc = await client.fetch(
    `*[_type == "homepage"][0] { heroHeadline, heroSubline, heroCta, manifestoLines, howItWorksIntro }`,
    {},
    { next: { revalidate: 300 } },
  );
  return { ...FALLBACK_HOMEPAGE, ...(doc ?? {}) };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
