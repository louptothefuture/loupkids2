import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_ABOUT } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — How Loup Started",
  description:
    "The story behind Loup — from a kid pretending to call on an old phone to a screenless device built for real connection.",
  alternates: { canonical: `${SITE.url}/about` },
};

const STORY_MEDIA = [
  {
    src: "/images/renders/shop/a_3.jpg",
    alt: "Early Loup hardware form",
    label: "Sketch to hardware",
  },
  {
    src: "/images/renders/shop/a_9.jpg",
    alt: "Loup hardware detail",
    label: "25 hardware iterations",
  },
  {
    src: "/images/renders/shop/a_11.jpg",
    alt: "Loup enclosure development",
    label: "100+ enclosure prints",
  },
  {
    src: "/images/renders/shop/a_4.jpg",
    alt: "Loup production design",
    label: "Prototype in hand",
  },
] as const;

export default function AboutPage() {
  const [
    oldPhone,
    pretendCalls,
    walkieTalkies,
    kidQuotes,
    simple,
    headlines,
    parentPressure,
    notAgainstScreens,
    internetRisks,
    publicHealth,
    startedBuilding,
    nameStory,
    closing,
  ] = LOUPKIDS_ABOUT.paragraphs;

  const timeline = [
    {
      label: "01 / Play became real",
      title: "The calls started as pretend.",
      paragraphs: [walkieTalkies, kidQuotes, simple],
    },
    {
      label: "02 / The pressure arrived",
      title: "Connection came with a cost.",
      paragraphs: [headlines, parentPressure],
    },
    {
      label: "03 / The line we drew",
      title: "The first phone shouldn’t be a feed.",
      paragraphs: [notAgainstScreens, internetRisks, publicHealth],
    },
    {
      label: "04 / The name found us",
      title: "Wolves howl to stay close.",
      paragraphs: [nameStory],
    },
  ];

  return (
    <article className="bg-[#fafaf8] text-[var(--lk-ink)]">
      <section className="border-b border-[var(--lk-line)] bg-white px-[var(--lk-section-x)] py-16 sm:py-24">
        <FadeIn className="mx-auto max-w-5xl">
          <p className="lk-label">About</p>
          <div className="mt-4 inline-flex rounded-full border border-[#7657d5]/25 bg-[#7657d5]/[0.08] px-3 py-1 text-xs font-medium text-[#5c42b5]">
            Built, not promised
          </div>
          <h1 className="lk-display mt-6 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] tracking-[-0.055em]">
            {LOUPKIDS_ABOUT.title}
          </h1>
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--lk-muted)] sm:text-xl">
            <p>{oldPhone}</p>
            <p>{pretendCalls}</p>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="lk-label">Proof, in numbers</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["25×", "hardware iterations"],
              ["100+", "enclosure prints"],
              ["Shenzhen", "prototype in hand"],
            ].map(([value, label]) => (
              <FadeIn
                key={value}
                className="border-t-2 border-[#7657d5] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(33,24,60,0.05)]"
              >
                <p className="lk-display text-3xl tracking-tight">{value}</p>
                <p className="mt-1 text-sm text-[var(--lk-muted)]">{label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="lk-label">The build — timeline + media</p>
          <ol className="relative mt-10 space-y-12 before:absolute before:bottom-4 before:left-[5px] before:top-3 before:w-px before:bg-[#7657d5]/35 sm:space-y-16">
            {timeline.map((item, i) => (
              <li key={item.label} className="relative pl-8">
                <span className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-[#fafaf8] bg-[#7657d5] ring-1 ring-[#7657d5]/30" />
                <FadeIn className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#654bbd]">
                      {item.label}
                    </p>
                    <h2 className="lk-display mt-3 text-2xl tracking-tight sm:text-3xl">
                      {item.title}
                    </h2>
                    <div className="mt-4 max-w-2xl space-y-3 leading-relaxed text-[var(--lk-muted)]">
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 36)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <figure>
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--lk-line)] bg-white">
                      <Image
                        src={STORY_MEDIA[i].src}
                        alt={STORY_MEDIA[i].alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 15rem"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--lk-muted)]">
                      {STORY_MEDIA[i].label}
                    </figcaption>
                  </figure>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] bg-white px-[var(--lk-section-x)] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="lk-label">Who’s behind it</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FadeIn className="rounded-2xl border border-[var(--lk-line)] p-6 sm:p-8">
              <div className="h-11 w-11 rounded-full bg-[#7657d5]/10" />
              <p className="lk-display mt-5 text-xl">A parent who wanted another option</p>
              <p className="mt-3 leading-relaxed text-[var(--lk-muted)]">
                The question was simple: how do you give a kid independence without handing them the internet?
              </p>
            </FadeIn>
            <FadeIn delay={0.06} className="rounded-2xl border border-[var(--lk-line)] p-6 sm:p-8">
              <div className="h-11 w-11 rounded-full bg-[#7657d5]/10" />
              <p className="lk-display mt-5 text-xl">A daughter who named the wolf</p>
              <p className="mt-3 leading-relaxed text-[var(--lk-muted)]">
                She turned Loop into Loup—and gave the product its reason for being: staying close to the pack.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-14 sm:py-20">
        <FadeIn className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--lk-line)] bg-white">
            <Image
              src="/images/renders/shop/a_4.jpg"
              alt="Loup production prototype"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="lk-label">Manufacturing partner</p>
            <h2 className="lk-display mt-4 text-3xl tracking-tight sm:text-4xl">
              From idea to prototype.
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--lk-muted)]">{startedBuilding}</p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-white px-[var(--lk-section-x)] py-16 text-center sm:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <p className="lk-label">Where we are now</p>
          <p className="lk-display mt-5 text-3xl tracking-tight sm:text-5xl">{closing}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop/loup" className="lk-btn">
              {LOUPKIDS_CTA.primary}
            </Link>
            <Link href="/faq" className="lk-btn lk-btn-outline">
              Read the FAQ
            </Link>
          </div>
        </FadeIn>
      </section>
    </article>
  );
}
