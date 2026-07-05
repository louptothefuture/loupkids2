import type { Metadata } from "next";
import Image from "next/image";
import { getPress } from "@/lib/content";
import { PRESS_KIT_FACTS } from "@/lib/content/fallback";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description:
    "LOUP press resources: company facts, product photography, founder availability, and media contact. LOUP is the screenless phone for kids 6–16.",
  alternates: { canonical: `${SITE.url}/press` },
};

export const revalidate = 300;

const PRESS_IMAGES = [
  { src: "/images/product/loup-red-hero.jpg", label: "LOUP — Signal Red, studio" },
  { src: "/images/product/loup-black-hero.jpg", label: "LOUP — Black, studio" },
  { src: "/images/product/loup-three-quarter.jpg", label: "LOUP — three-quarter detail" },
  { src: "/images/street/phone-throw.jpg", label: "Lifestyle — B&W editorial" },
  { src: "/images/street/two-kids-hi.jpg", label: "Lifestyle — friends" },
  { src: "/images/product/loup-box.jpg", label: "Packaging" },
];

export default async function PressPage() {
  const press = await getPress();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Press & media kit</p>
        <h1 className="display mt-2 max-w-3xl text-6xl sm:text-7xl">Writing about the anti-screen age?</h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Everything you need is on this page. For interviews, review units, and anything else:{" "}
          <a href={`mailto:${SITE.press}`} className="underline">
            {SITE.press}
          </a>{" "}
          — we respond within one business day.
        </p>
      </Reveal>

      {/* facts */}
      <Reveal delay={0.05}>
        <section className="mt-12 rounded-2xl border-2 border-ink bg-cream p-8 shadow-sticker">
          <h2 className="display text-3xl">Fast facts</h2>
          <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {PRESS_KIT_FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col border-b border-ink/10 pb-3">
                <dt className="label-mono text-ink-soft">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* what they're saying */}
      <section className="mt-16">
        <Reveal>
          <h2 className="display text-4xl">What people are saying</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {press.map((mention, i) => (
            <Reveal key={mention.outlet} delay={i * 0.05}>
              <figure className="h-full rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker">
                <p className="display text-2xl">{mention.outlet}</p>
                <blockquote className="mt-3 italic text-ink-soft">“{mention.pullQuote}”</blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* imagery */}
      <section className="mt-16">
        <Reveal>
          <h2 className="display text-4xl">Approved imagery</h2>
          <p className="mt-2 text-ink-soft">
            Right-click to save. High-resolution versions available via{" "}
            <a href={`mailto:${SITE.press}`} className="underline">
              {SITE.press}
            </a>
            .
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {PRESS_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.04}>
              <figure className="overflow-hidden rounded-xl border-2 border-ink bg-cream">
                <div className="relative aspect-square">
                  <Image src={img.src} alt={img.label} fill sizes="33vw" className="object-cover" />
                </div>
                <figcaption className="label-mono border-t-2 border-ink px-3 py-2 text-ink-soft">
                  {img.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* boilerplate */}
      <Reveal delay={0.05}>
        <section className="mt-16 max-w-3xl">
          <h2 className="display text-4xl">Boilerplate</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            LOUP makes the screenless phone for kids 6–16 — a machined-aluminum voice device with
            a physical dial, push-to-talk bar, and an e-ink contact strip. Kids call and send
            voice messages to a parent-approved list; there are no apps, feeds, cameras, or
            screens. LOUP-to-LOUP calling is free forever; calling real phone numbers is
            $10/month. The device costs $149 and is available at loupkids.com. LOUP is
            headquartered in Brooklyn, New York.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
