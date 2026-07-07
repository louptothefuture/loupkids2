import Link from "next/link";
import { getTestimonials } from "@/lib/content";
import { MISSION } from "@/lib/content/architecture";
import { FOUNDER_STORY } from "@/lib/content/story";
import { Reveal } from "@/components/Reveal";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  const featured = testimonials.filter((t) => t.featured).slice(0, 4);

  return (
    <section id="testimonials" className="border-b border-ink/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Families</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">What parents are saying</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map((t, i) => (
            <Reveal key={t.attribution} delay={i * 0.06}>
              <figure className="card flex h-full flex-col p-7">
                <blockquote className="flex-1 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-ink-soft">{t.attribution}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function AboutSection() {
  return (
    <section id="about" className="border-b border-ink/10 bg-cobalt py-20 text-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="label-mono text-steel">About</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              {FOUNDER_STORY.headline.replace(".", "")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-surface/70">
              {FOUNDER_STORY.paragraphs[0]}
            </p>
            <p className="mt-4 text-xl font-semibold tracking-tight">
              {FOUNDER_STORY.paragraphs[2]}
            </p>
            <p className="mt-4 text-surface/70">{FOUNDER_STORY.paragraphs[3]}</p>
            <Link
              href="/story"
              className="mt-8 inline-block text-sm font-medium text-surface underline-offset-4 hover:underline"
            >
              Read the whole story
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-surface/5 p-8 ring-1 ring-surface/10">
            <p className="label-mono text-steel">Mission</p>
            <p className="display mt-3 text-2xl">{MISSION.headline}</p>
            <ol className="mt-8 space-y-6 border-l border-surface/15 pl-6">
              {MISSION.timeline.map((item) => (
                <li key={item.year}>
                  <p className="label-mono text-surface/50">{item.year}</p>
                  <p className="mt-1 text-sm text-surface/70">{item.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
