import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getHomepage, getPress, getTestimonials } from "@/lib/content";
import { FOUNDER_STORY } from "@/lib/content/story";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legacy Homepage",
  description: "Previous LOUP homepage design — preserved for reference.",
  robots: { index: false },
  alternates: { canonical: `${SITE.url}/legacy` },
};

const STATS = [
  { stat: "8 in 10", label: "parents hate feeling forced into the smartphone trap" },
  {
    stat: "−25%",
    label: "decline in traditional free play since smartphones went mainstream",
    tag: "The Vanishing Playground",
  },
  {
    stat: "5.5 hrs",
    label: "a day on entertainment screens for kids 8–12",
    tag: "The Play Gap",
  },
  {
    stat: "95%",
    label: 'of teens say they are "constantly" online',
    tag: "It's taken over everything",
  },
];

const DOESNT_DO = [
  "Social media", "Games", "Rabbit holes", "Scroll", "Stream",
  "Snap", "Like", "Doomscroll", "Notify", "Ping at 2am",
];

const HOW = [
  {
    step: "01",
    title: "Approved contacts only",
    body: "Give your child the freedom to connect while giving yourself total peace of mind. Only the contacts you approve in the LOUP parent app can call in or out.",
    image: "/images/lifestyle/pocket-sweatshirt.jpg",
    alt: "LOUP peeking out of a kid's sweatshirt pocket",
  },
  {
    step: "02",
    title: "App-free and focus friendly",
    body: "LOUP is intentionally designed without apps, using E-Ink technology — the same low-power, screen-free display used in e-readers.",
    image: "/images/product/loup-three-quarter.jpg",
    alt: "LOUP three-quarter view showing the e-ink contact strip",
  },
  {
    step: "03",
    title: "Set boundaries",
    body: "Use the companion app to set Quiet Hours that prevent incoming and outgoing calls on your schedule.",
    image: "/images/lifestyle/girl-crisscross.jpg",
    alt: "A girl sitting cross-legged talking into her LOUP",
  },
  {
    step: "04",
    title: "Pager mode",
    body: "Loup has a built-in pager function you can talk directly into, or ping.",
    image: "/images/lifestyle/kids-stoop.jpg",
    alt: "Kids on a stoop with their LOUP devices",
  },
  {
    step: "05",
    title: "Emergency calls",
    body: "Intentionally designed to let kids reach 911 with a press-and-hold action.",
    image: "/images/product/loup-red-front.jpg",
    alt: "LOUP in signal red, front view",
  },
];

export default async function LegacyHomePage() {
  const [copy, press, testimonials] = await Promise.all([
    getHomepage(),
    getPress(),
    getTestimonials(),
  ]);
  const featured = testimonials.filter((t) => t.featured).slice(0, 4);

  return (
    <>
      <div className="border-b-2 border-ink bg-sun px-4 py-2 text-center">
        <p className="label-mono text-sm">
          Legacy homepage —{" "}
          <Link href="/" className="underline">
            view new site
          </Link>
        </p>
      </div>

      <section className="grain relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pb-0 lg:pt-16">
          <div className="relative z-10">
            <p className="label-mono mb-5 inline-block rotate-[-1.5deg] border-2 border-ink bg-sun px-3 py-1 shadow-sticker-sm">
              For kids 6–16 · zero screen time
            </p>
            <h1 className="display text-[17vw] leading-[0.88] sm:text-8xl lg:text-[6.5rem]">
              {copy.heroHeadline}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{copy.heroSubline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/shop/loup" className="btn-sticker bg-loup-red px-8 py-4 text-xl text-paper">
                {copy.heroCta}
              </Link>
              <Link href="/story" className="link-underline label-mono py-4">
                Why we built it →
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2rem] border-2 border-b-0 border-ink bg-cream">
              <Image
                src="/images/street/phone-throw.jpg"
                alt="A kid grinning while tossing his LOUP in the air"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((item, i) => (
              <Reveal key={item.stat} delay={i * 0.06}>
                <div className="h-full rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker">
                  {item.tag && <p className="label-mono mb-2 text-loup-red">{item.tag}</p>}
                  <p className="display text-5xl text-ink">{item.stat}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-b-2 border-ink bg-ink py-3 text-paper">
        <Marquee>
          {copy.manifestoLines.map((line) => (
            <span key={line} className="display mx-6 inline-flex items-center gap-6 text-2xl">
              {line} <span className="text-loup-red">●</span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOW.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-sticker">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink bg-cream">
                  <Image src={item.image} alt={item.alt} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-ink bg-cobalt py-20 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {DOESNT_DO.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <span className="display text-3xl text-paper/80 line-through decoration-loup-red decoration-4">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          {FOUNDER_STORY.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 text-lg text-paper/75">
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="border-y-2 border-ink bg-paper py-6">
        <Marquee fast>
          {press.map((mention) => (
            <span key={mention.outlet} className="mx-10 display text-2xl">
              {mention.outlet}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((t) => (
              <figure key={t.attribution} className="rounded-2xl border-2 border-ink bg-paper p-7 shadow-sticker">
                <blockquote className="text-lg">“{t.quote}”</blockquote>
                <figcaption className="label-mono mt-4 text-ink-soft">{t.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
