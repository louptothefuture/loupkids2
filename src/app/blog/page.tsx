import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { getPosts } from "@/lib/content";
import { LOUPKIDS_JOURNAL_COVERS, LOUPKIDS_JOURNAL_EXCERPTS } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description: "Research and essays on screen time, first phones, and raising kids in the anti-screen age.",
  alternates: { canonical: `${SITE.url}/journal` },
};

export const revalidate = 300;

function formatJournalDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-narrow text-center">
          <h1 className="lk-display lk-h2">Journal</h1>
          <p className="lk-lead lk-prose-muted mx-auto mt-4 max-w-xl">
            Essays on screen time, first phones, and the years before a smartphone.
          </p>
        </FadeIn>
      </section>

      <div className="divide-y divide-[var(--lk-line)]">
        {posts.map((post, i) => {
          const excerpt = LOUPKIDS_JOURNAL_EXCERPTS[post.slug] ?? post.excerpt;
          const cover = LOUPKIDS_JOURNAL_COVERS[post.slug] ?? post.coverImage;
          const reverse = i % 2 === 1;

          return (
            <FadeIn key={post.slug} delay={i * 0.025}>
              <article>
                <Link
                  href={`/journal/${post.slug}`}
                  className={`lk-container group grid items-start gap-8 py-14 sm:py-16 md:grid-cols-[minmax(0,45%)_1fr] md:gap-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  {cover ? (
                    <div className="lk-image-hover relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <LoupkidsImage
                        src={cover}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-neutral-100" />
                  )}

                  <div className="flex min-h-full flex-col justify-center">
                    <p className="text-sm text-[var(--lk-muted-light)]">
                      {post.author.name} · {formatJournalDate(post.publishedAt)}
                    </p>
                    <h2 className="lk-display lk-h3 mt-3 leading-snug group-hover:opacity-80">
                      {post.title}
                    </h2>
                    <p className="mt-4 line-clamp-4 text-[1.0625rem] leading-[1.65] text-[var(--lk-muted)]">
                      {excerpt}
                    </p>
                    <span className="lk-read-link mt-6 inline-block">Read more →</span>
                  </div>
                </Link>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
