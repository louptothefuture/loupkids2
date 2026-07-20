import Link from "next/link";
import { getPosts } from "@/lib/content";

export async function JournalSection() {
  const posts = await getPosts();
  const latest = posts.slice(0, 3);

  return (
    <section id="journal" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-left text-4xl sm:text-5xl">From the team</h2>
          </div>
          <Link
            href="/journal"
            className="text-sm font-bold text-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            All articles →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className={`pop-card group block h-full bg-white p-6 text-ink transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${i % 2 === 0 ? "pop-card-tilt-left" : "pop-card-tilt-right"}`}
            >
              <p className="text-eyebrow text-ink">{post.category.title}</p>
              <h3 className="display mt-3 text-xl leading-tight text-ink group-hover:text-block-fuchsia">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-ink">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
