import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_ODE } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ode to the Screen",
  description:
    "We love screens at their best — movie nights, playlists, games together. Loup is the pocket phone that gives kids connection without the algorithm.",
  alternates: { canonical: `${SITE.url}/ode` },
};

const TURN = 3;

export default function OdePage() {
  const intro = LOUPKIDS_ODE.paragraphs.slice(0, TURN);
  const close = LOUPKIDS_ODE.paragraphs.slice(TURN);

  return (
    <article>
      <h1 className="sr-only">{LOUPKIDS_ODE.title}</h1>

      <FadeIn>
        <figure className="px-[var(--lk-section-x)] bg-[var(--lk-bg)] pt-10 pb-8 sm:pt-12 sm:pb-10">
          <div className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-[1.75rem] shadow-[var(--lk-card-shadow)] sm:aspect-[2.2/1]">
            <LoupkidsImage
              src={LOUPKIDS_ODE.image}
              alt={LOUPKIDS_ODE.imageAlt}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-[center_42%]"
              priority
            />
          </div>
        </figure>
      </FadeIn>

      <section className="px-[var(--lk-section-x)] bg-[var(--lk-accent-soft)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lk-accent-deep)]">
            Ode to the Screen
          </p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[var(--lk-ink)] sm:text-xl">
            {intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-[var(--lk-section-x)] bg-[var(--lk-cobalt)] py-16 text-white sm:py-20">
        <FadeIn className="mx-auto max-w-2xl">
          <div className="space-y-5 text-lg leading-relaxed text-white/90 sm:text-xl">
            {close.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={LOUPKIDS_ODE.ctaHref} className="lk-btn">
              {LOUPKIDS_ODE.ctaLabel}
            </Link>
            <Link href="/about" className="lk-btn lk-btn-white">
              Read our story
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/65">Ready when you are — {LOUPKIDS_CTA.primary}.</p>
        </FadeIn>
      </section>
    </article>
  );
}
