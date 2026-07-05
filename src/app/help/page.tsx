import type { Metadata } from "next";
import Link from "next/link";
import { HELP_ARTICLES } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: "LOUP knowledge base — setup, parent app, billing, and troubleshooting.",
  alternates: { canonical: `${SITE.url}/help` },
};

export default function HelpPage() {
  const categories = [...new Set(HELP_ARTICLES.map((a) => a.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Support / knowledge base</p>
        <h1 className="display mt-2 text-6xl">Help center</h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Searchable guides for setup, the parent app, and everyday troubleshooting.
        </p>
        <input
          type="search"
          placeholder="Search articles…"
          className="mt-8 w-full max-w-md rounded-lg border-2 border-ink px-4 py-3 focus:border-loup-red focus:outline-none"
          aria-label="Search help articles"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Categories" className="hidden lg:block">
          <p className="label-mono text-ink-soft">Categories</p>
          <ul className="mt-4 space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <a href={`#${cat.replace(/\s+/g, "-").toLowerCase()}`} className="link-underline text-sm">
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat} id={cat.replace(/\s+/g, "-").toLowerCase()}>
              <h2 className="display text-2xl">{cat}</h2>
              <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border-2 border-ink bg-paper">
                {HELP_ARTICLES.filter((a) => a.category === cat).map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/faq#${article.slug}`}
                      className="flex items-center justify-between px-5 py-4 text-sm hover:bg-cream"
                    >
                      {article.title}
                      <span className="label-mono text-ink-soft">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 rounded-2xl border-2 border-ink bg-cream p-8 text-center">
          <p className="display text-2xl">Still need help?</p>
          <Link href="/contact" className="btn-sticker mt-4 inline-flex bg-loup-red px-6 py-3 text-paper">
            Contact support →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
