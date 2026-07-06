import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LOUPKIDS_START_HERE } from "@/lib/content/loupkids-start-here";
import { getHelpCategories, LOUPKIDS_HELP_ARTICLES } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Loup knowledge base — setup, parent app, billing, and troubleshooting.",
  alternates: { canonical: `${SITE.url}/help` },
};

export default function HelpPage() {
  const categories = getHelpCategories();

  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Support / knowledge base"
        title="Help center"
        description="Guides for setup, the parent app, billing, and everyday troubleshooting."
      />

      <section className="lk-section-cards lk-section-muted">
        <div className="lk-container">
          <FadeIn className="mb-8">
            <p className="lk-eyebrow mb-2">{LOUPKIDS_START_HERE.eyebrow}</p>
            <h2 className="lk-display lk-h3">{LOUPKIDS_START_HERE.title}</h2>
            <p className="lk-prose-muted mt-3 max-w-2xl">{LOUPKIDS_START_HERE.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {LOUPKIDS_START_HERE.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="lk-card lk-card-pad inline-flex min-w-[140px] flex-col transition-shadow hover:lk-card-active"
                >
                  <span className="lk-label">{item.type}</span>
                  <span className="lk-display mt-1 text-base">{item.title}</span>
                </Link>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Categories" className="hidden lg:block">
            <FadeIn className="lk-card lk-card-pad sticky top-24">
              <p className="lk-label mb-3">Categories</p>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`#${cat.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-[0.9375rem] text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </nav>

          <div className="space-y-8">
            {categories.map((cat, ci) => (
              <section key={cat} id={cat.replace(/\s+/g, "-").toLowerCase()}>
                <FadeIn delay={ci * 0.04}>
                  <h2 className="lk-display lk-h3 mb-4">{cat}</h2>
                </FadeIn>
                <div className="flex flex-col gap-3">
                  {LOUPKIDS_HELP_ARTICLES.filter((a) => a.category === cat).map((article, i) => (
                    <FadeIn key={article.slug} delay={0.04 + i * 0.03}>
                      <Link href={`/help/${article.slug}`} className="lk-card lk-card-pad group block transition-shadow hover:lk-card-active">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="lk-display text-lg sm:text-xl">{article.title}</h3>
                            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{article.summary}</p>
                          </div>
                          <span className="shrink-0 text-lg text-[var(--lk-muted-light)] transition-transform group-hover:translate-x-0.5">
                            →
                          </span>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </section>
            ))}
          </div>
          </div>
        </div>

        <FadeIn delay={0.1} className="lk-container mt-10">
          <div className="lk-card lk-card-pad mx-auto max-w-xl text-center">
            <p className="lk-display lk-h3">Still need help?</p>
            <p className="lk-prose-muted mt-2">Our team responds within one business day.</p>
            <Link href="/contact" className="lk-btn mt-5 inline-flex">
              Contact support
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
