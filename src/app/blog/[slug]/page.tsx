import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPost, getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `${SITE.url}/journal/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const related = post.relatedSlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    image: post.coverImage ? [`${SITE.url}${post.coverImage}`] : undefined,
    mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header>
        <p className="label-mono text-loup-red">
          <Link href="/journal" className="link-underline">
            Journal
          </Link>{" "}
          / {post.category.title}
        </p>
        <h1 className="display mt-4 text-5xl leading-[0.95] sm:text-6xl">{post.title}</h1>
        <p className="mt-4 text-lg text-ink">{post.excerpt}</p>
        <p className="label-mono mt-5 text-ink/50">
          {post.author.name} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </header>

      {post.coverImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border-2 border-ink">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose-loup mt-10 space-y-6 text-lg leading-relaxed text-ink">
        {post.body.source === "plain"
          ? post.body.blocks.map((block, i) =>
              block.kind === "h2" ? (
                <h2 key={i} className="display pt-4 text-3xl text-ink">
                  {block.text}
                </h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )
          : /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            <PortableText value={post.body.value as any} />}
      </div>

      {/* inline CTA */}
      <aside className="mt-14 rounded-2xl border-2 border-ink bg-cream p-8 shadow-sticker">
        <p className="display text-3xl">A voice, not a screen.</p>
        <p className="mt-2 text-ink-soft">
          LOUP is the screenless phone for kids 6–16. Calls and voice messages to people you
          approve — nothing else.
        </p>
        <Link href="/shop/loup" className="btn-sticker mt-5 bg-loup-red px-6 py-3 text-lg text-paper">
          Get LOUP — $149
        </Link>
      </aside>

      {related.length > 0 && (
        <footer className="mt-16">
          <h2 className="display text-3xl">Keep reading</h2>
          <ul className="mt-6 space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/journal/${r.slug}`} className="group block rounded-xl border-2 border-ink bg-paper p-5 shadow-sticker-sm transition-transform hover:-translate-y-0.5">
                  <p className="label-mono text-loup-red">{r.category.title}</p>
                  <p className="display mt-1 text-xl group-hover:underline">{r.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
