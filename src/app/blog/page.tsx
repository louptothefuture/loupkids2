import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The LOUP Journal — Screen Time, First Phones & Raising Kids Offline",
  description:
    "Honest research and practical guides on screen time, smartphone alternatives, first phones, and raising connected kids without feeds.",
  alternates: { canonical: `${SITE.url}/journal` },
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <div className="overflow-x-hidden">
      <section className="bg-block-fuchsia px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <PopLabel className="mb-3 block text-white/80">The journal</PopLabel>
          <PopHeadline as="h1" size="hero">
            Raising kids in the anti-screen age
          </PopHeadline>
          <p className="mt-6 max-w-xl text-lg font-semibold text-white">
            Research summaries without the panic, and playbooks that survive contact with real
            children.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {lead && (
          <Link
            href={`/journal/${lead.slug}`}
            className="pop-card group grid gap-0 overflow-hidden bg-white transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] border-b-3 border-ink md:border-b-0 md:border-r-3">
              {lead.coverImage && (
                <Image
                  src={lead.coverImage}
                  alt={lead.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full border-3 border-ink bg-block-sun px-3 py-1 text-xs font-black uppercase">
                Start here
              </span>
            </div>
            <div className="flex flex-col justify-center bg-white p-8 text-ink">
              <p className="text-eyebrow text-ink/60">{lead.category.title}</p>
              <h2 className="display mt-2 text-3xl sm:text-4xl">{lead.title}</h2>
              <p className="mt-3 font-medium text-ink/75">{lead.excerpt}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-ink/50">
                {new Date(lead.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className={`pop-card group flex h-full flex-col overflow-hidden bg-white transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${i % 2 === 0 ? "pop-card-tilt-left" : "pop-card-tilt-right"}`}
            >
              <div className="relative aspect-[16/10] border-b-3 border-ink bg-block-sun/30">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 text-ink">
                <p className="text-eyebrow text-ink/60">{post.category.title}</p>
                <h2 className="display mt-2 text-2xl leading-tight group-hover:text-block-fuchsia">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm font-medium text-ink/75">{post.excerpt}</p>
                <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-ink/50">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
