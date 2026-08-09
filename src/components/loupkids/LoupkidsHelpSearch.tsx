"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { HelpArticle } from "@/lib/content/loupkids-support";

export function LoupkidsHelpSearch({ articles }: { articles: readonly HelpArticle[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }, [articles, query]);

  return (
    <div className="mb-10">
      <label htmlFor="help-search" className="lk-label mb-2 block">
        Search help
      </label>
      <input
        id="help-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wi-Fi, contacts, billing…"
        className="w-full border border-[var(--lk-line)] bg-[var(--lk-surface)] px-4 py-3 text-[0.9375rem] outline-none focus:border-[var(--lk-ink)]"
      />
      {query.trim() ? (
        <ul className="mt-4 space-y-2">
          {results.length === 0 ? (
            <li className="text-sm text-[var(--lk-muted)]">No articles match. Try another term or contact support.</li>
          ) : (
            results.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/help/${article.slug}`}
                  className="lk-card lk-card-sm block transition-shadow hover:shadow-[0_2px_4px_rgba(20,18,26,0.05),0_14px_36px_rgba(30,75,255,0.12)]"
                >
                  <span className="lk-label">{article.category}</span>
                  <span className="mt-1 block font-medium">{article.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
