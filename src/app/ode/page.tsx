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

export default function OdePage() {
  return (
    <>
      <section className="lk-section-white lk-section">
        <FadeIn className="lk-container-narrow">
          <h1 className="lk-display text-[clamp(2rem,5vw,3rem)]">{LOUPKIDS_ODE.title}</h1>
          <div className="mt-10 space-y-5 leading-[1.75]">
            {LOUPKIDS_ODE.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {LOUPKIDS_ODE.images.map((src, i) => (
          <FadeIn key={src} delay={i * 0.08} className="relative aspect-[4/3] bg-neutral-100">
            <LoupkidsImage src={src} alt="" fill sizes="50vw" className="object-cover" />
          </FadeIn>
        ))}
      </section>
    </>
  );
}
