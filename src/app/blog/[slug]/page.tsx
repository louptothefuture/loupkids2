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
    <article className="lk-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="lk-container-narrow">
        <header>
          <p className="lk-label">
            <Link href="/journal" className="hover:text-[var(--lk-ink)]">
              Journal
            </Link>{" "}
            / {post.category.title}
          </p>
          <h1 className="lk-display mt-4 text-[clamp(2rem,5vw,3rem)]">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--lk-muted)]">{post.excerpt}</p>
          <p className="lk-label mt-5">
            {post.author.name} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </header>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-neutral-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose-loup mt-10 space-y-6 text-lg leading-relaxed text-[var(--lk-muted)]">
          {post.body.source === "plain"
            ? post.body.blocks.map((block, i) =>
                block.kind === "h2" ? (
                  <h2 key={i} className="lk-display pt-4 text-2xl text-[var(--lk-ink)]">
                    {block.text}
                  </h2>
                ) : (
                  <p key={i}>{block.text}</p>
                ),
              )
            : /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              <PortableText value={post.body.value as any} />}
        </div>

        <aside className="mt-14 border border-[var(--lk-line)] p-8">
          <p className="leading-relaxed text-[var(--lk-muted)]">
            Screens are the default. We&apos;re building the alternative. LOUP gives kids a way to stay connected without handing them the internet. Voice-only, parent-controlled, designed for the years before a smartphone makes sense.
          </p>
          <Link href="/shop/loup" className="lk-btn mt-5 inline-flex">
            Pre-order Loup
          </Link>
        </aside>

        {related.length > 0 && (
          <footer className="mt-16">
            <h2 className="lk-display text-2xl">Keep reading</h2>
            <ul className="mt-6 space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/journal/${r.slug}`}
                    className="group block border border-[var(--lk-line)] p-5 transition-opacity hover:opacity-80"
                  >
                    <p className="lk-label">{r.category.title}</p>
                    <p className="lk-display mt-1 text-lg">{r.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </article>
  );
}
