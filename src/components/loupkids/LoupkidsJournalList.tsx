"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LOUPKIDS_JOURNAL_TOPIC_FILTERS,
  LOUPKIDS_JOURNAL_TOPICS,
} from "@/lib/content/journal";
import { LOUPKIDS_JOURNAL_COVERS, LOUPKIDS_JOURNAL_EXCERPTS } from "@/lib/content/loupkids-site";
import type { Post } from "@/lib/content/types";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

function formatJournalDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}

export function LoupkidsJournalList({ posts }: { posts: Post[] }) {
  const [topic, setTopic] = useState<(typeof LOUPKIDS_JOURNAL_TOPIC_FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (topic === "All") return posts;
    return posts.filter((p) => LOUPKIDS_JOURNAL_TOPICS[p.slug] === topic);
  }, [posts, topic]);

  return (
    <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
      <nav aria-label="Topics" className="hidden lg:block">
        <p className="lk-label mb-3">Topics</p>
        <ul className="space-y-2">
          {LOUPKIDS_JOURNAL_TOPIC_FILTERS.map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => setTopic(t)}
                className={`cursor-pointer text-left text-[0.9375rem] transition-colors ${
                  topic === t ? "font-medium text-[var(--lk-ink)]" : "text-[var(--lk-muted)] hover:text-[var(--lk-ink)]"
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
          {LOUPKIDS_JOURNAL_TOPIC_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`cursor-pointer border px-3 py-1.5 text-xs font-medium ${
                topic === t
                  ? "border-[var(--lk-ink)] bg-[var(--lk-ink)] text-white"
                  : "border-[var(--lk-line)] text-[var(--lk-muted)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="divide-y divide-[var(--lk-line)]">
          {filtered.map((post, i) => {
            const excerpt = LOUPKIDS_JOURNAL_EXCERPTS[post.slug] ?? post.excerpt;
            const cover = LOUPKIDS_JOURNAL_COVERS[post.slug] ?? post.coverImage;
            const reverse = i % 2 === 1;
            const postTopic = LOUPKIDS_JOURNAL_TOPICS[post.slug];

            return (
              <FadeIn key={post.slug} delay={i * 0.025}>
                <article>
                  <Link
                    href={`/journal/${post.slug}`}
                    className={`group grid items-start gap-8 py-14 sm:py-16 md:grid-cols-[minmax(0,45%)_1fr] md:gap-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    {cover ? (
                      <div className="lk-image-hover relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                        <LoupkidsImage src={cover} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-neutral-100" />
                    )}

                    <div className="flex min-h-full flex-col justify-center">
                      <p className="text-sm text-[var(--lk-muted-light)]">
                        {post.author.name} · {formatJournalDate(post.publishedAt)}
                        {postTopic ? ` · ${postTopic}` : ""}
                      </p>
                      <h2 className="lk-display lk-h3 mt-3 leading-snug group-hover:opacity-80">{post.title}</h2>
                      <p className="mt-4 line-clamp-4 text-[1.0625rem] leading-[1.65] text-[var(--lk-muted)]">{excerpt}</p>
                      <span className="lk-read-link mt-6 inline-block">Read more →</span>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
