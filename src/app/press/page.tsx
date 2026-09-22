import type { Metadata } from "next";
import { PressActions } from "@/components/press/PressActions";
import { PrintButton } from "@/components/press/PrintButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media Kit — LOUP",
  description: "LOUP press kit: product overview, founder background, and press contact for journalists, editors, and podcast hosts.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/press` },
};

const PRESS_EMAIL = "hi@loupkids.com";
const YEAR = "2026";

export default function PressPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { margin: 1.4cm 1.6cm; size: A4 portrait; }
          .no-print { display: none !important; }
          header.lk-nav, footer { display: none !important; }
          html, body { background: white !important; }
          .press-page { max-width: 100% !important; padding: 0 !important; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      <article className="press-page mx-auto max-w-[680px] px-6 py-14 sm:py-20">

        {/* Masthead */}
        <header className="mb-10 flex items-end justify-between border-b-2 border-[var(--lk-ink)] pb-5">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">Media Kit · {YEAR}</p>
            <h1 className="lk-display mt-1 text-[3.5rem] leading-none tracking-[-0.04em]">LOUP</h1>
            <p className="mt-1.5 text-sm text-[var(--lk-muted)]">Phones for the anti-screen age.</p>
          </div>
          <div className="text-right text-xs text-[var(--lk-muted)]">
            <p>{SITE.url.replace("https://", "")}</p>
            <p>{PRESS_EMAIL}</p>
          </div>
        </header>

        {/* Stats strip */}
        <div className="mb-10 grid grid-cols-4 gap-6 border-b border-t border-[var(--lk-line)] py-6">
          {[
            ["80%", "of parents feel pushed to give kids a smartphone too early"],
            ["5.5 hrs", "avg daily screen time, kids 8–12"],
            ["$4B", "US TAM · $45M SAM · 7–18% CAGR — no one owns it yet"],
            ["Global", "school phone bans accelerating — Australia, UK, EU, and growing"],
          ].map(([n, l]) => (
            <div key={n}>
              <p className="lk-display text-[1.75rem] leading-none">{n}</p>
              <p className="mt-1 text-[0.65rem] leading-snug text-[var(--lk-muted)]">{l}</p>
            </div>
          ))}
        </div>

        {/* The problem */}
        <section className="mb-8">
          <p className="press-label mb-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">The problem</p>
          <h2 className="lk-display mt-2 text-[1.65rem] leading-[1.1] tracking-tight">
            The first phone used to be a rite of passage. Now it&apos;s a liability.
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
            A portal to attention merchants, social comparison, and algorithmically-optimized distraction. Parents know it. Kids feel it. And the pressure to hand one over — for safety, for logistics, for not being the only family that hasn&apos;t — arrives years before it should.
          </p>
        </section>

        {/* The enemy */}
        <section className="mb-8 border-l-2 border-[var(--lk-ink)] pl-5">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">Big tech knows</p>
          <p className="lk-display mt-2 text-xl">They designed it this way.</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
            Meta&apos;s own internal research showed Instagram was harming teenage girls&apos; mental health. They kept going. The feeds, the loops, the dopamine hits — none of it is accidental. Attention is the product. Children are the market. The industry monetizes the anxiety it creates.
          </p>
        </section>

        <hr className="my-8 border-[var(--lk-line)]" />

        {/* Alternatives */}
        <section className="mb-8">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">The alternatives are bandaids</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
            Gabb and TickTalk remove the apps but keep the architecture — lobotomized smartphones, designed for 5-year-olds, that require carrier plans and continuously GPS-track children. They&apos;re not a philosophy. They&apos;re a workaround. LOUP is built from the ground up.
          </p>
        </section>

        <hr className="my-8 border-[var(--lk-line)]" />

        {/* What LOUP is */}
        <section className="mb-8">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">What LOUP is</p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-[var(--lk-ink)]">
            A WiFi voice device for kids — calls only, to approved contacts, and nobody else. No texts, no internet, no apps, no feeds. Anodized aluminum frame, e-ink display, tactile scroll dial. v1 is WiFi-only. v2 adds LTE — same closed contact list, cellular range.
          </p>
        </section>

        <hr className="my-8 border-[var(--lk-line)]" />

        {/* Two-col: How it works + Hardware */}
        <div className="mb-8 grid gap-8 sm:grid-cols-2">
          <section>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">How it works</p>
            <ol className="mt-3 space-y-3">
              {[
                "Parents whitelist contacts in the companion app. Nobody outside the list can call in or out.",
                "Kids scroll the dial, find a name, press call. That's the whole interface.",
                "Quiet hours, schedules, and parent-to-device paging. Setup: ten minutes.",
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--lk-muted)]">
                  <span className="lk-display shrink-0 text-xs text-[var(--lk-ink)]">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">The hardware</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">
              Anodized aluminum frame. E-ink display — no glow, no video, no algorithm. Tactile scroll dial. Designed to be held and kept, not stared at. Not a plastic toy. A considered object built for the space between a walkie-talkie and a smartphone.
            </p>
          </section>
        </div>

        <hr className="my-8 border-[var(--lk-line)]" />

        {/* Who + Founder */}
        <div className="mb-8 grid gap-8 sm:grid-cols-2">
          <section>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">Who it&apos;s for</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-ink)]">
              Kids 6–16. Parents who want their kids reachable without handing them the internet. Families navigating the gap between too young for a smartphone and ready for one.
            </p>
          </section>

          <section className="rounded-xl bg-[var(--lk-surface)] p-6">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">Founders</p>
            <p className="lk-display mt-2 text-base">Thomas O&apos;Connell</p>
            <p className="text-xs text-[var(--lk-muted)]">CEO + Founder</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">
              When Thomas and his wife became parents, the pressure to hand kids a phone arrived years before it should have. Thomas had spent 20 years building attention machinery — brand strategy for Nike, LEGO, Google. His wife watched the same forces shape their kids&apos; world from the other side. The answer they needed didn&apos;t exist. So they built it.
            </p>
          </section>
        </div>

        <hr className="my-8 border-[var(--lk-line)]" />

        {/* Specs */}
        <section className="mb-10">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">At a glance</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-[0.8125rem] sm:grid-cols-3">
            {[
              ["Category", "Screenless voice phone for kids"],
              ["Display", "E-ink — no glow, no video"],
              ["Connectivity", "WiFi (v1) · WiFi + LTE (v2)"],
              ["Calling", "Approved contacts only"],
              ["Price", "WiFi $149 · LTE $199 pre-order"],
              ["Monthly", "WiFi $10/mo · LTE $20/mo"],
              ["Ages", "6–16"],
              ["Ships", "Within 60 days"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--lk-muted)]">{label}</dt>
                <dd className="mt-0.5 text-[var(--lk-ink)]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <hr className="mb-8 border-2 border-[var(--lk-ink)]" />

        {/* Footer */}
        <footer className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">Press contact</p>
            <p className="lk-display mt-1 text-sm">{PRESS_EMAIL}</p>
            <p className="text-xs text-[var(--lk-muted)]">{SITE.url}</p>
          </div>
          <div className="text-right text-[0.7rem] leading-relaxed text-[var(--lk-muted)]">
            <p>High-res images and product renders available on request.</p>
            <p>Founders available for interview.</p>
          </div>
        </footer>

        {/* Buttons */}
        <div className="no-print mt-12 flex flex-wrap justify-center gap-3">
          <PressActions />
          <PrintButton />
        </div>
      </article>
    </>
  );
}
