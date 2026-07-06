import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { getHelpArticle, LOUPKIDS_HELP_ARTICLES } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return LOUPKIDS_HELP_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return { title: "Help article" };

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `${SITE.url}/help/${slug}` },
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();

  return (
    <div>
      <section className="lk-section-muted lk-section-cards border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-narrow">
          <Link href="/help" className="lk-label inline-block hover:text-[var(--lk-ink)]">
            ← Help center
          </Link>
          <p className="lk-eyebrow mt-4 mb-2">{article.category}</p>
          <h1 className="lk-display lk-h2">{article.title}</h1>
          <p className="lk-lead lk-prose-muted mt-4">{article.summary}</p>
        </FadeIn>
      </section>

      <section className="lk-section-cards lk-section-white">
        <FadeIn className="lk-container-narrow">
          <div className="flex flex-col gap-4">
            {article.sections.map((section, i) => (
              <div key={i} className="lk-card lk-card-pad">
                {section.heading ? (
                  <h2 className="lk-display mb-3 text-lg sm:text-xl">{section.heading}</h2>
                ) : null}
                <p className="lk-prose lk-prose-muted leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-[0.9375rem]">
            <Link href="/setup" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              Setup guide
            </Link>
            <Link href="/faq" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              FAQ
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              Contact support
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
