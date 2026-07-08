import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LOUPKIDS_STORY_TEASER } from "@/lib/content/loupkids-site";
import { ImageBox } from "./ImageBox";

const DIFFERENTIATORS = [
  {
    title: "Zero screen time",
    body: "E-Ink contact list, not a feed.",
  },
  {
    title: "Approved contacts only",
    body: "Enforced in hardware, not an app setting.",
  },
  {
    title: "No SIM by default",
    body: "Wi-Fi at home and school — no surprise bills.",
  },
  {
    title: "Closed data",
    body: "No ads, no profiling, no selling your family.",
  },
  {
    title: "Loup-to-Loup calls free",
    body: "Kid-to-kid without a monthly plan.",
  },
] as const;

export function DevCampaignStorySection() {
  return (
    <section className="border-y-2 border-ink bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display text-4xl text-ink sm:text-5xl">{LOUPKIDS_STORY_TEASER.headline}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              {LOUPKIDS_STORY_TEASER.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <Link
              href={LOUPKIDS_STORY_TEASER.cta.href}
              className="link-underline label-mono mt-8 inline-block text-ink"
            >
              {LOUPKIDS_STORY_TEASER.cta.label} →
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <ImageBox className="aspect-[4/3] w-full rounded-2xl" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.title} className="rounded-2xl border-2 border-ink bg-neutral-50 p-5">
                <h3 className="display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
