import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { getPosts } from "@/lib/content";
import { LOUPKIDS_JOURNAL_COVERS, LOUPKIDS_JOURNAL_EXCERPTS } from "@/lib/content/loupkids-site";
import { LOUPKIDS_JOURNAL_INTRO } from "@/lib/content/loupkids-start-here";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description: LOUPKIDS_JOURNAL_INTRO.description,
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
      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-10 sm:py-12">
        <FadeIn className="lk-container max-w-3xl">
          <h1 className="lk-display lk-h2">Journal</h1>
          <p className="lk-display mt-4 text-[clamp(1.25rem,2.5vw,1.625rem)] leading-snug">
            {LOUPKIDS_JOURNAL_INTRO.title}
          </p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-[var(--lk-muted)]">
            {LOUPKIDS_JOURNAL_INTRO.description}
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
                  className={`lk-container group grid items-start gap-6 py-10 sm:gap-8 sm:py-12 md:grid-cols-[minmax(0,420px)_1fr] ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  {cover ? (
                    <div className="lk-image-hover relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <LoupkidsImage
                        src={cover}
                        alt=""
                        fill
                        sizes="420px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-neutral-100" />
                  )}

                  <div className="flex min-h-full flex-col pt-1">
                    <p className="text-sm font-medium text-[var(--lk-muted)]">
                      {post.author.name} · {formatJournalDate(post.publishedAt)}
                    </p>
                    <h2 className="lk-display mt-3 text-[clamp(1.375rem,2.5vw,1.875rem)] leading-snug group-hover:opacity-85">
                      {post.title}
                    </h2>
                    <p className="mt-4 line-clamp-4 text-[1.0625rem] leading-[1.65] text-[var(--lk-muted)]">
                      {excerpt}
                    </p>
                    <span className="lk-label mt-6 inline-block group-hover:text-[var(--lk-ink)]">
                      Read more
                    </span>
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
