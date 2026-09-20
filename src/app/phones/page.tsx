import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPARE_PHONES,
  COMPARE_ROWS,
  COMPARE_SECTIONS,
} from "@/lib/content/loupkids-compare-phones";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "LOUP vs. the alternatives — full comparison",
  description:
    "Side-by-side: LOUP WiFi and LOUP WiFi + LTE vs Gabb, TickTalk, Pinwheel, Bark Phone, and Relay. Every feature that matters to parents.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/phones` },
};

function Cell({ val, isLoup }: { val: (typeof COMPARE_ROWS)[0]["values"][0]; isLoup: boolean }) {
  const base = `px-4 py-3.5 text-sm align-top ${isLoup ? "font-medium" : ""}`;

  if (val.kind === "yes")
    return (
      <td className={base}>
        <span className={`inline-flex items-center gap-1.5 ${isLoup ? "text-white" : "text-[var(--lk-ink)]"}`}>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7.5" className={isLoup ? "stroke-white/40" : "stroke-[var(--lk-line)]"} />
            <path d="M4.5 8l2.5 2.5 4.5-5" stroke={isLoup ? "white" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Yes
        </span>
      </td>
    );

  if (val.kind === "no")
    return (
      <td className={base}>
        <span className={`inline-flex items-center gap-1.5 ${isLoup ? "text-white/50" : "text-[var(--lk-muted)]"}`}>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
            <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          No
        </span>
      </td>
    );

  if (val.kind === "partial")
    return (
      <td className={base}>
        <span className={`text-xs leading-snug ${isLoup ? "text-white/75" : "text-[var(--lk-muted)]"}`}>
          {val.label}
        </span>
      </td>
    );

  return (
    <td className={base}>
      <span className={isLoup ? "text-white" : "text-[var(--lk-ink)]"}>{val.label}</span>
    </td>
  );
}

export default function PhonesPage() {
  return (
    <article className="bg-[var(--lk-bg)]">
      {/* Header */}
      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-14 sm:py-18">
        <div className="mx-auto max-w-[1200px]">
          <p className="lk-eyebrow">Comparison · Not in nav</p>
          <h1 className="lk-display mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
            LOUP vs. the alternatives.
          </h1>
          <p className="mt-5 max-w-2xl text-[0.975rem] leading-relaxed text-[var(--lk-muted)] sm:text-base">
            Every kids' phone on the market, compared on the things parents actually decide on. Device price, monthly cost, what kids can and can't access, and what the company collects. Sources linked in footnotes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop/loup" className="lk-btn">
              Pre-order LOUP
            </Link>
            <Link href="/faq" className="lk-btn lk-btn-outline">
              FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing summary cards */}
      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-12">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lk-muted)]">At a glance</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARE_PHONES.slice(0, 4).map((phone) => (
              <div
                key={phone.id}
                className={`rounded-2xl p-5 ${phone.isLoup ? "bg-[var(--lk-ink)] text-white" : "border border-[var(--lk-line)] bg-[var(--lk-bg)]"}`}
              >
                <p className={`text-[0.65rem] font-bold uppercase tracking-[0.1em] ${phone.isLoup ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                  {phone.nameShort}
                </p>
                <p className={`lk-display mt-1 text-xl ${phone.isLoup ? "text-white" : "text-[var(--lk-ink)]"}`}>
                  {phone.device}
                </p>
                <p className={`mt-1 text-xs ${phone.isLoup ? "text-white/70" : "text-[var(--lk-muted)]"}`}>
                  {phone.monthly}
                </p>
                <p className={`mt-3 text-xs leading-snug ${phone.isLoup ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                  {phone.tagline}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {COMPARE_PHONES.slice(4).map((phone) => (
              <div
                key={phone.id}
                className="rounded-2xl border border-[var(--lk-line)] bg-[var(--lk-bg)] p-5"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--lk-muted)]">
                  {phone.nameShort}
                </p>
                <p className="lk-display mt-1 text-xl text-[var(--lk-ink)]">{phone.device}</p>
                <p className="mt-1 text-xs text-[var(--lk-muted)]">{phone.monthly}</p>
                <p className="mt-3 text-xs leading-snug text-[var(--lk-muted)]">{phone.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full comparison table */}
      <section className="px-[var(--lk-section-x)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              {/* Sticky column headers */}
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-[var(--lk-bg)] py-4 pr-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--lk-muted)] min-w-[160px]">
                    Feature
                  </th>
                  {COMPARE_PHONES.map((phone) => (
                    <th
                      key={phone.id}
                      className={`px-4 py-4 text-left align-bottom text-sm font-medium min-w-[130px] ${
                        phone.isLoup
                          ? "bg-[var(--lk-ink)] text-white"
                          : "text-[var(--lk-ink)]"
                      }`}
                    >
                      <span className="block">{phone.nameShort}</span>
                      <span className={`block text-[0.7rem] font-normal mt-0.5 ${phone.isLoup ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                        {phone.device}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {COMPARE_SECTIONS.map((section) => {
                  const rows = COMPARE_ROWS.filter((r) => r.section === section);
                  return (
                    <>
                      {/* Section divider */}
                      <tr key={`section-${section}`}>
                        <td
                          colSpan={COMPARE_PHONES.length + 1}
                          className="border-t-2 border-[var(--lk-ink)] pt-8 pb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--lk-ink)]"
                        >
                          {section}
                        </td>
                      </tr>

                      {rows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-[var(--lk-line)] last:border-0 hover:bg-[var(--lk-surface)]/60"
                        >
                          <td className="sticky left-0 bg-[var(--lk-bg)] py-3.5 pr-4 align-top text-[0.8125rem] leading-snug hover:bg-[var(--lk-surface)]/60">
                            <span className="block font-medium text-[var(--lk-ink)]">{row.label}</span>
                            {row.detail && (
                              <span className="block mt-0.5 text-xs text-[var(--lk-muted)]">{row.detail}</span>
                            )}
                          </td>
                          {COMPARE_PHONES.map((phone, ci) => (
                            <Cell key={phone.id} val={row.values[ci]} isLoup={phone.isLoup} />
                          ))}
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sources + CTA */}
      <section className="border-t border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-12">
        <div className="mx-auto max-w-[1200px] grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--lk-muted)]">Sources</p>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[var(--lk-muted)]">
              {COMPARE_PHONES.filter((p) => p.source).map((phone) => (
                <li key={phone.id}>
                  <span className="font-medium text-[var(--lk-ink)]">{phone.name}:</span>{" "}
                  <a
                    href={`https://${phone.source}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[var(--lk-ink)]"
                  >
                    {phone.source}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[var(--lk-line)] mt-2">
                Gabb privacy policy — children&apos;s data collection:{" "}
                <a href="https://gabb.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  gabb.com/privacy-policy
                </a>
              </li>
              <li>
                TickTalk continuous location disclosure:{" "}
                <a href="https://www.myticktalk.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  myticktalk.com/policies/privacy-policy
                </a>
              </li>
              <li>
                Pinwheel deleted texts visible:{" "}
                <a href="https://www.pinwheel.com/howitworks" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  pinwheel.com/howitworks
                </a>
              </li>
              <li>
                Bark content scanning consent:{" "}
                <a href="https://www.bark.us/privacy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  bark.us/privacy
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-[var(--lk-muted)]">
              Prices current as of September 2026. Competitor pricing subject to change.
            </p>
          </div>

          <div className="lk-card rounded-2xl p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--lk-muted)]">Ready to order?</p>
            <h2 className="lk-display mt-3 text-2xl leading-tight">
              The only one that starts without a carrier.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">
              LOUP WiFi runs on your home network — no carrier contract, no SIM, no monthly surprise. Add LTE when you want coverage anywhere. Same closed contact list on both.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/shop/loup" className="lk-btn">
                Pre-order LOUP — from $149
              </Link>
              <Link href="/faq" className="lk-btn lk-btn-outline">
                Questions?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
