/**
 * Push repo journal posts into Sanity so the live site updates without a rebuild.
 *
 *   npm run publish:journal
 *   npm run publish:journal -- --slug what-kids-phones-actually-collect-gabb-ticktalk-pinwheel-troomi-bark
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN.
 */
import { createReadStream, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { splitUrls } from "../src/lib/autolink";
import { LOUPKIDS_JOURNAL_POSTS } from "../src/lib/content/journal";
import type { PlainBlock, Post } from "../src/lib/content/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing Sanity credentials. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (Editor token) in the environment, then rerun.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const slugFlag = process.argv.includes("--slug")
  ? process.argv[process.argv.indexOf("--slug") + 1]
  : undefined;

function key(prefix: string, i: number) {
  return `${prefix}${i}`;
}

function blocksToPortable(blocks: PlainBlock[]) {
  return blocks.map((block, i) => {
    if (block.kind === "h2") {
      return {
        _type: "block",
        _key: key("h", i),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: key("hs", i), text: block.text, marks: [] }],
      };
    }

    const segments = splitUrls(block.text);
    const markDefs: { _type: "link"; _key: string; href: string }[] = [];
    const children = segments.map((seg, j) => {
      if (seg.type === "url") {
        const mark = `lnk${i}${j}`;
        markDefs.push({ _type: "link", _key: mark, href: seg.value });
        return { _type: "span", _key: key("u", i * 100 + j), text: seg.value, marks: [mark] };
      }
      return { _type: "span", _key: key("t", i * 100 + j), text: seg.value, marks: [] };
    });

    return {
      _type: "block",
      _key: key("p", i),
      style: "normal",
      markDefs,
      children,
    };
  });
}

function postId(slug: string) {
  return `post-${slug}`;
}

function publicFile(coverImage: string | null) {
  if (!coverImage?.startsWith("/")) return null;
  const abs = resolve(process.cwd(), "public", coverImage.replace(/^\//, ""));
  return existsSync(abs) ? abs : null;
}

async function ensureAuthor(name: string, role: string) {
  const _id = "author-thomas-oconnell";
  await client.createOrReplace({
    _id,
    _type: "author",
    name,
    role,
  });
  return _id;
}

async function ensureCategory(title: string, slug: string) {
  const _id = `category-${slug}`;
  await client.createOrReplace({
    _id,
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
  });
  return _id;
}

async function uploadCover(slug: string, coverImage: string | null) {
  const file = publicFile(coverImage);
  if (!file) return undefined;
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: file.split("/").pop(),
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
    alt: slug.replace(/-/g, " "),
  };
}

async function publishOne(post: Post, authorId: string, categoryId: string) {
  if (post.body.source !== "plain") {
    console.log(`skip ${post.slug} (already Sanity-shaped)`);
    return;
  }

  const cover = await uploadCover(post.slug, post.coverImage);
  const related = post.relatedSlugs
    .slice(0, 4)
    .map((s) => ({ _type: "reference" as const, _key: s, _ref: postId(s), _weak: true }));

  await client.createOrReplace({
    _id: postId(post.slug),
    _type: "post",
    title: post.title.slice(0, 90),
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt.slice(0, 200),
    publishedAt: new Date(post.publishedAt).toISOString(),
    author: { _type: "reference", _ref: authorId },
    category: { _type: "reference", _ref: categoryId },
    body: blocksToPortable(post.body.blocks),
    relatedPosts: related,
    seoTitle: post.seoTitle?.slice(0, 60),
    seoDescription: post.seoDescription?.slice(0, 160),
    ...(cover ? { coverImage: cover } : {}),
  });
  console.log(`published ${post.slug}`);
}

const posts = slugFlag
  ? LOUPKIDS_JOURNAL_POSTS.filter((p) => p.slug === slugFlag)
  : LOUPKIDS_JOURNAL_POSTS;

if (!posts.length) {
  console.error(slugFlag ? `No post with slug ${slugFlag}` : "No journal posts");
  process.exit(1);
}

const authorId = await ensureAuthor(posts[0].author.name, posts[0].author.role);
const categoryId = await ensureCategory("Journal", "journal");

for (const post of posts) {
  await publishOne(post, authorId, categoryId);
}

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loupkids.com";
const secret = process.env.SANITY_REVALIDATE_SECRET;
if (secret) {
  const res = await fetch(`${site}/api/revalidate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ _type: "post", slug: { current: posts[0].slug } }),
  });
  console.log(`revalidate ${res.status}`);
} else {
  console.log("No SANITY_REVALIDATE_SECRET — site will pick up posts on the next ~5 min cache.");
}
