import type { Metadata } from "next";
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
          @page { margin: 1.8cm 2cm; size: A4 portrait; }
          .no-print { display: none !important; }
          .lk-main, body, html { background: white !important; }
          .press-page { max-width: 100% !important; padding: 0 !important; }
          .press-divider { border-color: #ccc !important; }
          a { color: inherit !important; text-decoration: none !important; }
          .press-founder { background: #f0f0f0 !important; }
          .print-break-avoid { break-inside: avoid; }
        }
      `}</style>

      <article className="press-page mx-auto max-w-[680px] px-6 py-14 sm:py-20 print:py-0">

        {/* Header */}
        <header className="mb-12 flex items-end justify-between border-b border-[var(--lk-ink)] pb-6 print:mb-8">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
              Media Kit · {YEAR}
            </p>
            <h1 className="lk-display mt-1 text-[3.5rem] leading-none tracking-[-0.04em]">
              LOUP
            </h1>
            <p className="mt-1 text-sm tracking-wide text-[var(--lk-muted)]">
              Phones for the anti-screen age.
            </p>
          </div>
          <div className="text-right text-xs text-[var(--lk-muted)]">
            <p>{SITE.url.replace("https://", "")}</p>
            <p>{PRESS_EMAIL}</p>
          </div>
        </header>

        {/* The problem */}
        <section className="print-break-avoid mb-10">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
            The problem
          </p>
          <h2 className="lk-display mt-2 text-[1.6rem] leading-[1.1] tracking-tight">
            The first phone used to be a rite of passage.
            Now it's a liability.
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
            A portal to attention merchants, social comparison, and algorithmically-optimized distraction. Parents know it. Kids feel it. And for a decade, the only available answer has been parental controls layered onto a device that was never designed to be controlled. The category that should exist — a purposeful first phone — didn't. Until now.
          </p>
        </section>

        <hr className="press-divider mb-10 border-[var(--lk-line)]" />

        {/* What LOUP is */}
        <section className="print-break-avoid mb-10">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
            What it is
          </p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-[var(--lk-ink)]">
            LOUP is a WiFi voice device for kids. It makes and receives calls — to the people parents have approved, and nobody else. No texts, no internet, no apps, no feeds, no algorithm deciding what comes next. The hardware is purpose-built: anodized aluminum frame, tactile rotary scroll dial, e-ink display. v1 ships WiFi-only. v2 adds LTE — same closed contact list, cellular range.
          </p>
        </section>

        <hr className="press-divider mb-10 border-[var(--lk-line)]" />

        {/* Two-column: How it works + Hardware */}
        <div className="mb-10 grid gap-8 sm:grid-cols-2 print-break-avoid">
          <section>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
              How it works
            </p>
            <ul className="mt-3 space-y-3 text-[0.875rem] leading-relaxed text-[var(--lk-muted)]">
              <li className="flex gap-3">
                <span className="lk-display mt-0.5 shrink-0 text-xs text-[var(--lk-ink)]">01</span>
                <span>Parents whitelist contacts in the companion app. Nobody outside the list can call in or out.</span>
              </li>
              <li className="flex gap-3">
                <span className="lk-display mt-0.5 shrink-0 text-xs text-[var(--lk-ink)]">02</span>
                <span>Kids scroll the dial, find a name, press call. That's the entire interface.</span>
              </li>
              <li className="flex gap-3">
                <span className="lk-display mt-0.5 shrink-0 text-xs text-[var(--lk-ink)]">03</span>
                <span>Quiet hours, schedules, and parent-to-device paging are all in the companion app. Setup takes about ten minutes.</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
              The hardware
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--lk-muted)]">
              The frame is anodized aluminum. The display is e-ink — no glow, no video, no notifications pulling attention. The scroll dial is tactile and deliberate. It was designed to be held, carried, and kept — not to be stared at.
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--lk-muted)]">
              This is not a plastic toy. It is a considered object, built for the space between a walkie-talkie and a smartphone.
            </p>
          </section>
        </div>

        <hr className="press-divider mb-10 border-[var(--lk-line)]" />

        {/* Who it's for */}
        <section className="print-break-avoid mb-10">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
            Who it's for
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-ink)]">
            Kids 6–16. Parents who want their kids reachable without handing them the internet. Families navigating the space between too young for a smartphone and ready for one — which, it turns out, is most families.
          </p>
        </section>

        <hr className="press-divider mb-10 border-[var(--lk-line)]" />

        {/* Founder */}
        <section className="press-founder print-break-avoid mb-10 rounded-xl bg-[var(--lk-surface)] px-6 py-6 print:rounded-none print:px-4 print:py-4">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
            Founder
          </p>
          <p className="lk-display mt-2 text-base">Thomas O'Connell</p>
          <p className="mt-0.5 text-xs text-[var(--lk-muted)]">CEO + Founder</p>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-[var(--lk-muted)]">
            Thomas spent 20 years building brands for organizations that were very good at capturing attention — Nike, LEGO, Google. Then he had kids and watched the same machinery he'd helped build get aimed at them. LOUP is what he built instead. The problem was personal. The answer didn't exist. So he made it.
          </p>
        </section>

        <hr className="press-divider mb-10 border-[var(--lk-line)]" />

        {/* Specs at a glance */}
        <section className="print-break-avoid mb-10">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
            At a glance
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-[0.8125rem]">
            {[
              ["Category", "Screenless voice phone for kids"],
              ["Display", "E-ink — no glow, no video"],
              ["Connectivity", "WiFi (v1) · WiFi + LTE (v2)"],
              ["Calling", "Approved contacts only — no open dialing"],
              ["Price", "WiFi $149 pre-order · LTE $199 pre-order"],
              ["Monthly", "WiFi $10/mo · LTE $20/mo"],
              ["Ages", "6–16"],
              ["Ships", "Within 60 days of order"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--lk-muted)]">{label}</dt>
                <dd className="mt-0.5 text-[var(--lk-ink)]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <hr className="press-divider mb-8 border-[var(--lk-ink)] print:border-[#ccc]" />

        {/* Footer / contact */}
        <footer className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--lk-muted)]">
              Press contact
            </p>
            <p className="lk-display mt-1 text-sm">{PRESS_EMAIL}</p>
            <p className="mt-0.5 text-xs text-[var(--lk-muted)]">{SITE.url}</p>
          </div>
          <div className="text-right text-[0.7rem] leading-relaxed text-[var(--lk-muted)]">
            <p>High-res images and product renders available on request.</p>
            <p>Founder available for interview.</p>
          </div>
        </footer>

        {/* Print button — hidden in print */}
        <div className="no-print mt-12 flex justify-center">
          <PrintButton />
        </div>

      </article>
    </>
  );
}
