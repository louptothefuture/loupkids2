import type { Metadata } from "next";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { LOUPKIDS_ODE } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ode to the Screen",
  description: LOUPKIDS_ODE.paragraphs[0],
  alternates: { canonical: `${SITE.url}/ode` },
};

/** Praise, then the turn — photo sits between as the shared experience, not a footer dump */
const TURN = 3;

export default function OdePage() {
  const praise = LOUPKIDS_ODE.paragraphs.slice(0, TURN);
  const concern = LOUPKIDS_ODE.paragraphs.slice(TURN);

  return (
    <>
      <section className="lk-section-white lk-section pb-0 sm:pb-0">
        <FadeIn className="lk-container-narrow">
          <h1 className="lk-display text-[clamp(2rem,5vw,3rem)]">{LOUPKIDS_ODE.title}</h1>
          <div className="mt-10 space-y-5 leading-[1.75]">
            {praise.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <FadeIn className="mt-12 sm:mt-16">
        <figure className="lk-container">
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 sm:aspect-[2.2/1]">
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

      <section className="lk-section-white lk-section pt-12 sm:pt-16">
        <FadeIn className="lk-container-narrow">
          <div className="space-y-5 leading-[1.75]">
            {concern.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
