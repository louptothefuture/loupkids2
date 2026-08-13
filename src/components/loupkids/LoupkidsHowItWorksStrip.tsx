"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { HOME_HOW_IT_WORKS } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { StepPhoneIcon, StepWifiIcon } from "./LoupkidsHowItWorksIcons";

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

const [STEP_WIFI, STEP_CONTACTS] = HOME_HOW_IT_WORKS;

const SETUP = [
  { ...STEP_WIFI, Icon: StepWifiIcon },
  { ...STEP_CONTACTS, Icon: StepPhoneIcon },
] as const;

function GlbStage() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[20.5rem] overflow-hidden rounded-[1.75rem] bg-[var(--lk-surface)] shadow-[var(--lk-card-shadow)] ring-1 ring-black/8 sm:max-w-[26rem] lg:max-w-[28rem]">
      <Glb3Embed mode="embed" />
    </div>
  );
}

/**
 * Homepage: GLB only. /setup keeps the Wi-Fi + contacts copy beside it.
 */
export function LoupkidsHowItWorksStrip({
  showSetupLink = true,
  showSetup = true,
}: {
  showSetupLink?: boolean;
  showSetup?: boolean;
}) {
  if (!showSetup) {
    return (
      <section className="bg-[var(--lk-cream)]">
        <h2 className="sr-only">Loup — Scroll. Click. Call.</h2>
        <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-8 sm:py-12 lg:py-14">
          <FadeIn>
            <GlbStage />
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--lk-cream)]">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <FadeIn>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 className="lk-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]">
                Box to first call.
              </h2>
              {showSetupLink ? (
                <Link
                  href="/setup"
                  className="inline-flex min-h-6 shrink-0 items-center text-sm font-medium text-[var(--lk-ink)] underline underline-offset-4 hover:opacity-70 lg:hidden"
                >
                  Full setup guide →
                </Link>
              ) : null}
            </div>

            <ol className="mt-5 space-y-7 sm:mt-6 sm:space-y-8">
              {SETUP.map(({ step, title, body, Icon }) => (
                <li key={step} className="lk-how-step flex gap-5 list-none sm:gap-6">
                  <Icon className="h-11 w-11 shrink-0 text-[var(--lk-ink)] sm:h-12 sm:w-12" />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--lk-muted)]">
                      {step}
                    </p>
                    <h3 className="lk-display mt-1 text-xl leading-tight sm:text-2xl">{title}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-snug text-[var(--lk-muted)] sm:text-[0.9375rem]">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {showSetupLink ? (
              <Link
                href="/setup"
                className="mt-8 hidden text-sm font-medium text-[var(--lk-ink)] underline underline-offset-4 hover:opacity-70 lg:inline-flex"
              >
                Full setup guide →
              </Link>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.06}>
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--lk-muted)]">
              Then on Loup · Scroll. Click. Call.
            </p>
            <GlbStage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
