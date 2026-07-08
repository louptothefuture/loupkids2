import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LOUPKIDS_JOURNAL_COVERS, LOUPKIDS_JOURNAL_EXCERPTS } from "@/lib/content/loupkids-site";
import { LOUPKIDS_RESOURCES } from "@/lib/content/loupkids-support";
import { LOUPKIDS_START_HERE } from "@/lib/content/loupkids-start-here";
import { getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parent Resource Hub",
  description: "Guides and research on delaying smartphones, screen time, and kids' first phones.",
  alternates: { canonical: `${SITE.url}/resources` },
};

export default async function ResourcesPage() {
  const { title, description, links, journalSlug } = LOUPKIDS_START_HERE;
  const posts = await getPosts();
  const startArticle = posts.find((p) => p.slug === journalSlug) ?? posts[0];
  const startCover = startArticle
    ? LOUPKIDS_JOURNAL_COVERS[startArticle.slug] ?? startArticle.coverImage
    : null;
  const startExcerpt = startArticle
    ? LOUPKIDS_JOURNAL_EXCERPTS[startArticle.slug] ?? startArticle.excerpt
    : "";

  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Parent resources"
        title="Resource hub"
        description="Guides and research for delaying smartphones and choosing a first phone. For setup and troubleshooting, visit the help center."
      />

      <section className="lk-section-white lk-section-content">
        <div className="lk-container">
          <FadeIn className="mb-6">
            <h2 className="lk-display lk-h3">{title}</h2>
            <p className="lk-prose-muted mt-3 max-w-2xl text-[0.9375rem] leading-relaxed">{description}</p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item, i) => (
              <FadeIn key={item.href} delay={i * 0.04}>
                <Link href={item.href} className="lk-card lk-card-pad group block h-full transition-shadow hover:lk-card-active">
                  <p className="lk-label">{item.type}</p>
                  <h3 className="lk-display mt-2 text-lg">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{item.description}</p>
                  <span className="mt-4 inline-block text-sm text-[var(--lk-muted-light)] transition-transform group-hover:translate-x-0.5">
                    Go →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          {startArticle ? (
            <FadeIn delay={0.1} className="mt-8">
              <Link
                href={`/journal/${startArticle.slug}`}
                className="lk-card group grid overflow-hidden transition-shadow hover:lk-card-active md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[4/3] bg-neutral-100 md:aspect-auto md:min-h-[260px]">
                  {startCover ? (
                    <LoupkidsImage src={startCover} alt={startArticle.title} fill sizes="50vw" className="object-cover" />
                  ) : null}
                  <span className="lk-label absolute left-4 top-4 border border-[var(--lk-line)] bg-white px-3 py-1.5">
                    Start here
                  </span>
                </div>
                <div className="lk-card-pad flex flex-col justify-center">
                  <p className="lk-label">Journal</p>
                  <h3 className="lk-display mt-2 text-xl sm:text-2xl">{startArticle.title}</h3>
                  <p className="lk-prose-muted mt-3 line-clamp-4 leading-relaxed">{startExcerpt}</p>
                  <span className="lk-label mt-5 inline-block">Read article →</span>
                </div>
              </Link>
            </FadeIn>
          ) : null}

          <FadeIn delay={0.12} className="mt-10">
            <p className="lk-label mb-4">From the journal</p>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2">
            {LOUPKIDS_RESOURCES.map((item, i) => (
              <FadeIn key={item.href} delay={0.08 + i * 0.04}>
                <Link href={item.href} className="lk-card lk-card-pad group block h-full transition-shadow hover:lk-card-active">
                  <p className="lk-label">{item.type}</p>
                  <h2 className="lk-display mt-2 text-xl sm:text-2xl">{item.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{item.description}</p>
                  <span className="mt-4 inline-block text-sm text-[var(--lk-muted-light)] transition-transform group-hover:translate-x-0.5">
                    Read →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} className="mt-6">
            <div className="lk-card lk-card-pad lk-section-black text-white">
              <h2 className="lk-display lk-h3 text-white">More coming weekly</h2>
              <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-white/70">
                Downloadable playbooks, school-pact templates, and conversation scripts — all hosted here, not on a feed.
              </p>
              <Link href="/journal" className="mt-5 inline-block text-sm underline underline-offset-4 text-white/80 hover:text-white">
                Browse the journal →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
