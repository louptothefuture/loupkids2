import Link from "next/link";
import { getPosts } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export async function BlogTeaserSection() {
  const posts = await getPosts();
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="border-b border-ink/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono text-steel">Journal</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">From the team</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-ink-soft hover:text-ink">
              All articles →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="card group block h-full p-6 transition-colors hover:bg-cream/40"
              >
                <p className="label-mono text-steel">{post.category.title}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-loup-red">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-ink-soft">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PreOrderSection() {
  return (
    <section id="pre-order" className="bg-ink py-24 text-surface">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Pre-order</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            Get your phone before the feed
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-surface/60">
            Pre-order for launch delivery, or join the cellular waitlist — no payment required.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/shop/loup" className="btn-sticker bg-surface px-8 py-3.5 text-ink">
              Pre-order — $129
            </Link>
            <Link
              href="/reserve"
              className="self-center text-sm font-medium text-surface/70 underline-offset-4 hover:text-surface hover:underline"
            >
              Join waitlist
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
