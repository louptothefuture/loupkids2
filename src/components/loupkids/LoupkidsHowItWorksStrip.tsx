"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { HOME_HOW_IT_WORKS } from "@/lib/content/loupkids-home-arc";
import { LOUPKIDS_IMAGES } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

const Glb3Embed = dynamic(
  () =>
    import("@/components/glb/Glb3ScrollStage").then((m) => ({
      default: m.Glb3ScrollStage,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[var(--lk-cream)] text-sm text-[var(--lk-muted)]">
        Loading preview…
      </div>
    ),
  },
);

const [STEP_WIFI, STEP_CONTACTS, STEP_CALL] = HOME_HOW_IT_WORKS;

/** Parent app (1–2) → device GLB (3). Shared by homepage + /setup. */
export function LoupkidsHowItWorksStrip({
  showSetupLink = true,
}: {
  showSetupLink?: boolean;
}) {
  return (
    <section className="bg-[var(--lk-cream)]">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <FadeIn>
          <div className="rounded-[1.75rem] bg-[var(--lk-surface)] p-6 shadow-[var(--lk-card-shadow)] sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 className="lk-display text-[clamp(1.85rem,4vw,2.5rem)] leading-[1.08]">
                Box to first call.
              </h2>
              {showSetupLink ? (
                <Link
                  href="/setup"
                  className="inline-flex min-h-6 shrink-0 items-center text-sm font-medium text-[var(--lk-ink)] underline underline-offset-4 hover:opacity-70"
                >
                  Full setup guide →
                </Link>
              ) : null}
            </div>

            {/* Parent phase — steps 1–2 + app GIF */}
            <div className="mt-10 grid items-start gap-10 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)] md:gap-12 lg:gap-16">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--lk-muted)]">
                  In the parent app
                </p>
                <ol className="mt-6 space-y-8">
                  {[STEP_WIFI, STEP_CONTACTS].map((step) => (
                    <li key={step.step} className="list-none">
                      <FadeIn>
                        <span className="inline-flex h-6 w-fit items-center rounded-md bg-[var(--lk-ink)] px-2 text-[0.7rem] font-semibold tracking-wide text-white">
                          {step.step}
                        </span>
                        <h3 className="lk-display mt-3 text-xl leading-tight md:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--lk-muted)] md:text-[0.9375rem]">
                          {step.body}
                        </p>
                      </FadeIn>
                    </li>
                  ))}
                </ol>
              </div>

              <FadeIn delay={0.06} className="md:sticky md:top-28">
                <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl bg-[var(--lk-cream)] md:mx-0 md:max-w-none">
                  <LoupkidsImage
                    src={LOUPKIDS_IMAGES.appUx}
                    alt="Loup companion app — pair Wi-Fi and approve contacts"
                    fill
                    sizes="(max-width: 767px) 280px, 320px"
                    className="object-contain"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Handoff */}
            <div className="mt-12 flex items-center gap-4 sm:mt-14">
              <div className="h-px flex-1 bg-[var(--lk-line)]" />
              <p className="shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--lk-muted)]">
                Then on Loup
              </p>
              <div className="h-px flex-1 bg-[var(--lk-line)]" />
            </div>

            {/* Device phase — phone left, copy right */}
            <div className="mt-8 grid items-center gap-8 sm:mt-10 md:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)] md:gap-10 lg:gap-14">
              <div className="h-[min(70vh,640px)] overflow-hidden rounded-2xl ring-1 ring-black/8">
                <Glb3Embed mode="embed" />
              </div>

              <FadeIn>
                <span className="inline-flex h-6 w-fit items-center rounded-md bg-[var(--lk-ink)] px-2 text-[0.7rem] font-semibold tracking-wide text-white">
                  {STEP_CALL.step}
                </span>
                <h3 className="lk-display mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] leading-[1.08]">
                  {STEP_CALL.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--lk-muted)] md:text-[0.975rem]">
                  {STEP_CALL.body}
                </p>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
