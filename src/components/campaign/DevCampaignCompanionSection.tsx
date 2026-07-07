"use client";

import { LOUPKIDS_ACCORDION, LOUPKIDS_PHONE } from "@/lib/content/loupkids-site";
import { Reveal } from "@/components/Reveal";
import { DevCampaignAccordion } from "./DevCampaignAccordion";

export function DevCampaignCompanionSection() {
  return (
    <section className="border-b-2 border-ink bg-ink py-20 text-white lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-white/60">The phone before their first smartphone</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Companion app features</h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">{LOUPKIDS_PHONE.subtitle}</p>
        </Reveal>
        <div className="mt-10 sm:mt-12">
          <DevCampaignAccordion items={LOUPKIDS_ACCORDION} dark />
        </div>
      </div>
    </section>
  );
}
