import Image from "next/image";
import Link from "next/link";
import { getHomepage } from "@/lib/content";
import { HERO } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";

export async function HeroSection() {
  const copy = await getHomepage();

  return (
    <section id="hero" className="relative overflow-hidden border-b border-ink/10 bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:pb-20 lg:pt-24">
        <Reveal className="relative z-10">
          <h1 className="display mt-4 text-[2.75rem] sm:text-6xl lg:text-[4.25rem] lg:leading-[0.95]">
            {copy.heroHeadline}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{HERO.subline}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/shop/loup" className="btn-sticker bg-ink px-7 py-3.5 text-surface">
              {HERO.cta}
            </Link>
            <Link href="/reserve" className="text-sm font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline">
              {HERO.ctaSecondary}
            </Link>
          </div>
          <p className="mt-8 text-sm text-ink-soft">{HERO.trust.join(" · ")}</p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/10">
            <Image
              src={HERO.videoPoster}
              alt="Kid with LOUP — a phone, not a toy"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
