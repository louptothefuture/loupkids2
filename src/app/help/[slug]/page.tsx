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
      <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose text-left">
          <Link href="/help" className="lk-read-link inline-block">
            ← Help center
          </Link>
          <p className="lk-eyebrow mt-6 mb-2">{article.category}</p>
          <h1 className="lk-display lk-h2">{article.title}</h1>
          <p className="lk-lead lk-prose-muted mt-4">{article.summary}</p>
        </FadeIn>
      </section>

      <section className="lk-section-white lk-page-body">
        <FadeIn className="lk-container-prose">
          <div>
            {article.sections.map((section, i) => (
              <div
                key={i}
                className={i > 0 ? "border-t border-[var(--lk-line)] pt-8 mt-8" : ""}
              >
                {section.heading ? (
                  <h2 className="lk-display mb-3 text-lg sm:text-xl">{section.heading}</h2>
                ) : null}
                <p className="lk-prose lk-prose-muted leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-[var(--lk-line)] pt-8">
            <p className="text-sm text-[var(--lk-muted)]">
              Still stuck?{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                Contact support
              </Link>
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
