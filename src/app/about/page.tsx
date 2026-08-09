import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { getAboutPageContent } from "@/lib/content/cms";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "The Story — How Loup Started",
  description:
    "Why we built a phone with no screens, no feeds, and no algorithms — the story behind Loup.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default async function AboutPage() {
  const about = await getAboutPageContent();

  return (
    <article>
      <h1 className="sr-only">The Story</h1>

      <section className="border-b border-white/10 bg-[var(--lk-ink)] px-[var(--lk-section-x)] py-12 sm:py-14 text-white">
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-white/60">1 year in the making</p>
          <p className="lk-display mt-2 text-2xl text-white sm:text-3xl">12 steps of failure.</p>
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-[var(--lk-navy-deep)] md:rounded-3xl">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Loup in 12 steps of failure"
            >
              <source src="/videos/loup-12-steps.mp4?v=3" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-12 sm:py-14">
        <div className="mx-auto grid max-w-3xl gap-0 overflow-hidden rounded-2xl shadow-[var(--lk-card-shadow)] sm:grid-cols-3 md:rounded-3xl">
          {[
            ["12", "hardware iterations"],
            ["1 year", "in the making"],
            ["July 26th", "Production ready Prototype in Hand"],
          ].map(([value, label], i) => (
            <FadeIn
              key={value}
              className={`px-5 py-5 ${i > 0 ? "border-t border-[var(--lk-line)] sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="lk-display text-2xl tracking-tight sm:text-3xl">{value}</p>
              <p className="mt-1 text-sm text-[var(--lk-muted)]">{label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Chapters — zig-zag on desktop, stacked on mobile */}
      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <div className="lk-container space-y-16 md:space-y-28">
          {about.timeline.map((item, index) => {
            const imageLeft = index % 2 === 1;
            return (
              <FadeIn key={item.label}>
                <div
                  className={`flex flex-col items-center gap-8 md:gap-14 ${
                    imageLeft ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="w-full flex-1">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 md:text-sm">
                      {item.label}
                    </p>
                    <h2 className="lk-display text-2xl tracking-tight md:text-4xl">{item.title}</h2>
                    <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-neutral-600 md:text-base">
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 36)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {item.image ? (
                    <figure className="w-full flex-1">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)] md:rounded-3xl">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </figure>
                  ) : null}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <FadeIn className="lk-container flex flex-col items-center gap-8 md:flex-row md:gap-14">
          <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-2xl bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)] md:rounded-3xl">
            <Image
              src="/images/renders/shop/a_4.jpg"
              alt="Loup production prototype"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-contain object-center p-6"
            />
          </div>
          <div className="w-full flex-1">
            <h2 className="lk-display text-2xl tracking-tight md:text-4xl">{about.manufacturingTitle}</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-neutral-600 md:text-base">
              {about.manufacturingBody}
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <div className="lk-container">
          <h2 className="lk-display text-2xl md:text-4xl">Who&apos;s behind it</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.teamBlocks.map((block) => (
              <FadeIn
                key={block.title}
                className="lk-card rounded-2xl p-6 md:rounded-3xl"
              >
                <p className="lk-display text-xl">{block.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{block.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="lk-section-black px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24 text-center">
        <FadeIn className="mx-auto max-w-2xl">
          <p className="lk-display text-[clamp(1.5rem,4vw,2.5rem)] text-white">{about.closing}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop/loup" className="lk-btn lk-btn-white">
              {LOUPKIDS_CTA.primary}
            </Link>
            <Link
              href="/faq"
              className="lk-btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Read the FAQ
            </Link>
          </div>
        </FadeIn>
      </section>
    </article>
  );
}
