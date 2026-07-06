import type { Metadata } from "next";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { getPress } from "@/lib/content";
import { PRESS_KIT_FACTS } from "@/lib/content/fallback";
import { LOUPKIDS_PRESS_IMAGES } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description:
    "Loup press resources: company facts, product photography, founder availability, and media contact.",
  alternates: { canonical: `${SITE.url}/press` },
};

export const revalidate = 300;

export default async function PressPage() {
  const press = await getPress();

  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Press & media kit"
        title="Writing about the anti-screen age?"
        description={`Everything you need is on this page. For interviews, review units, and anything else: ${SITE.press} — we respond within one business day.`}
      />

      <section className="lk-section-white lk-section-content">
        <div className="lk-container space-y-10">
          <FadeIn>
            <div className="lk-card lk-card-pad">
              <h2 className="lk-display lk-h3">Fast facts</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {PRESS_KIT_FACTS.map((fact) => (
                  <div key={fact.label} className="border-t border-[var(--lk-line)] pt-4 first:border-0 first:pt-0 sm:first:border-t sm:first:pt-4">
                    <dt className="lk-label">{fact.label}</dt>
                    <dd className="mt-1 font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <h2 className="lk-display lk-h3">What people are saying</h2>
            </FadeIn>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {press.map((mention, i) => (
                <FadeIn key={mention.outlet} delay={i * 0.04}>
                  <figure className="lk-card lk-card-pad h-full">
                    <p className="lk-display text-xl">{mention.outlet}</p>
                    <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)] italic">
                      &ldquo;{mention.pullQuote}&rdquo;
                    </blockquote>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn>
              <h2 className="lk-display lk-h3">Approved imagery</h2>
              <p className="lk-prose-muted mt-2">
                Right-click to save. High-resolution versions available via{" "}
                <a href={`mailto:${SITE.press}`} className="underline underline-offset-4">
                  {SITE.press}
                </a>
                .
              </p>
            </FadeIn>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              {LOUPKIDS_PRESS_IMAGES.map((img, i) => (
                <FadeIn key={img.src} delay={i * 0.03}>
                  <figure className="lk-card overflow-hidden">
                    <div className="relative aspect-square bg-neutral-100">
                      <LoupkidsImage src={img.src} alt={img.label} fill sizes="33vw" className="object-cover" />
                    </div>
                    <figcaption className="lk-label border-t border-[var(--lk-line)] px-3 py-2.5">{img.label}</figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn>
            <div className="lk-card lk-card-pad max-w-3xl">
              <h2 className="lk-display lk-h3">Boilerplate</h2>
              <p className="lk-prose lk-prose-muted mt-4 leading-relaxed">
                Loup makes the screenless phone for kids 6–16 — a machined-aluminum voice device with a physical dial,
                push-to-talk bar, and an e-ink contact strip. Kids call and send voice messages to a parent-approved
                list; there are no apps, feeds, cameras, or screens. Loup-to-Loup calling is free forever; calling real
                phone numbers is $10/month. The device costs $149 and is available at loupkids.com. Loup is headquartered
                in Brooklyn, New York.
              </p>
              <a href={`mailto:${SITE.press}`} className="lk-btn mt-6 inline-flex">
                Request press assets
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
