"use client";

import Link from "next/link";
import { useState } from "react";
import {
  COMPARE_PHONES,
  COMPARE_ROWS,
  COMPARE_SECTIONS,
  type PhoneValue,
} from "@/lib/content/loupkids-compare-phones";

// ── Value cell content ────────────────────────────────────────────────────────

function CellContent({
  val,
  isLoup,
  highlighted,
}: {
  val: PhoneValue;
  isLoup: boolean;
  highlighted: boolean;
}) {
  const muted = isLoup ? "text-white/55" : highlighted ? "text-[var(--lk-ink)]/70" : "text-[var(--lk-muted)]";
  const strong = isLoup ? "text-white" : "text-[var(--lk-ink)]";

  if (val.kind === "yes")
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium ${strong}`}>
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" className={isLoup ? "stroke-white/30" : "stroke-emerald-500/40"} />
          <path d="M4.5 8l2.5 2.5 4.5-5" stroke={isLoup ? "white" : "#10b981"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Yes
      </span>
    );

  if (val.kind === "no")
    return (
      <span className={`inline-flex items-center gap-1.5 ${muted}`}>
        <svg className="h-4 w-4 shrink-0 opacity-50" viewBox="0 0 16 16" fill="none">
          <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        No
      </span>
    );

  if (val.kind === "partial")
    return <span className={`text-xs leading-snug ${muted}`}>{val.label}</span>;

  return <span className={`font-medium ${strong}`}>{val.label}</span>;
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PhonesPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  // Flatten rows for indexing
  const allRows = COMPARE_ROWS;

  return (
    <article className="bg-[var(--lk-bg)] min-h-screen">
      {/* Header */}
      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-14">
        <div className="mx-auto max-w-[1400px]">
          <p className="lk-eyebrow">Full comparison</p>
          <h1 className="lk-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
            LOUP vs. every alternative.
          </h1>
          <p className="mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-[var(--lk-muted)]">
            Every kids' phone, walkie-talkie, landline, and smartphone on one table. Device price, monthly cost, what kids can access, and what the company collects. Sources at the bottom.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop/loup" className="lk-btn">Pre-order LOUP — from $149</Link>
            <Link href="/phones#sources" className="lk-btn lk-btn-outline">Sources</Link>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="relative">
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ minWidth: `${COMPARE_PHONES.length * 140 + 220}px` }}
          >
            {/* Sticky header row */}
            <thead>
              <tr className="sticky top-[var(--lk-nav-h,56px)] z-20">
                {/* Row label spacer */}
                <th className="border-b-2 border-[var(--lk-ink)] bg-[var(--lk-bg)] w-[220px] min-w-[220px] px-4 py-4 text-left align-bottom">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--lk-muted)]">Feature</span>
                </th>

                {COMPARE_PHONES.map((phone, ci) => {
                  const colHighlighted = hoveredCol === ci;
                  return (
                    <th
                      key={phone.id}
                      onMouseEnter={() => setHoveredCol(ci)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`border-b-2 border-[var(--lk-ink)] px-4 py-4 text-left align-bottom min-w-[140px] cursor-default transition-colors duration-100 ${
                        phone.isLoup
                          ? "bg-[var(--lk-ink)]"
                          : colHighlighted
                          ? "bg-[var(--lk-ink)]/8"
                          : "bg-[var(--lk-bg)]"
                      }`}
                    >
                      <span className={`block text-sm font-semibold leading-tight ${phone.isLoup ? "text-white" : "text-[var(--lk-ink)]"}`}>
                        {phone.nameShort}
                      </span>
                      <span className={`block text-[0.7rem] mt-1 font-normal ${phone.isLoup ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                        {phone.device}
                      </span>
                      <span className={`block text-[0.7rem] font-semibold ${phone.isLoup ? "text-white/80" : "text-[var(--lk-muted)]"}`}>
                        {phone.monthly}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {COMPARE_SECTIONS.map((section) => {
                const sectionRows = allRows.filter((r) => r.section === section);

                return (
                  <>
                    {/* Section header */}
                    <tr key={`sec-${section}`}>
                      <td
                        colSpan={COMPARE_PHONES.length + 1}
                        className="border-t border-[var(--lk-line)] bg-[var(--lk-surface)] px-4 pt-5 pb-2"
                      >
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--lk-ink)]">
                          {section}
                        </span>
                      </td>
                    </tr>

                    {sectionRows.map((row, localRi) => {
                      const globalRi = allRows.indexOf(row);
                      const rowHighlighted = hoveredRow === globalRi;

                      return (
                        <tr
                          key={row.label}
                          onMouseEnter={() => setHoveredRow(globalRi)}
                          onMouseLeave={() => setHoveredRow(null)}
                          className="border-b border-[var(--lk-line)] last:border-0"
                        >
                          {/* Sticky feature label */}
                          <td
                            className={`sticky left-0 z-10 w-[220px] min-w-[220px] px-4 py-3.5 align-top transition-colors duration-100 ${
                              rowHighlighted ? "bg-[var(--lk-ink)] text-white" : "bg-[var(--lk-bg)] text-[var(--lk-ink)]"
                            }`}
                          >
                            <span className={`block text-[0.8125rem] font-medium leading-snug`}>
                              {row.label}
                            </span>
                            {row.detail && (
                              <span className={`block mt-0.5 text-[0.7rem] leading-snug ${rowHighlighted ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                                {row.detail}
                              </span>
                            )}
                          </td>

                          {COMPARE_PHONES.map((phone, ci) => {
                            const val = row.values[ci];
                            const colHighlighted = hoveredCol === ci;
                            const active = rowHighlighted || colHighlighted;

                            let bg: string;
                            if (phone.isLoup) {
                              bg = rowHighlighted ? "bg-white/10" : "bg-[var(--lk-ink)]";
                            } else if (rowHighlighted && colHighlighted) {
                              bg = "bg-[var(--lk-ink)]/12";
                            } else if (rowHighlighted) {
                              bg = "bg-[var(--lk-ink)]/6";
                            } else if (colHighlighted) {
                              bg = "bg-[var(--lk-ink)]/5";
                            } else {
                              bg = "";
                            }

                            return (
                              <td
                                key={phone.id}
                                onMouseEnter={() => { setHoveredRow(globalRi); setHoveredCol(ci); }}
                                onMouseLeave={() => { setHoveredRow(null); setHoveredCol(null); }}
                                className={`px-4 py-3.5 align-top text-sm transition-colors duration-100 ${bg}`}
                              >
                                {val ? (
                                  <CellContent val={val} isLoup={phone.isLoup} highlighted={active} />
                                ) : (
                                  <span className="text-[var(--lk-muted)] opacity-30">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources + CTA */}
      <section id="sources" className="border-t border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--lk-muted)]">Sources</p>
            <ul className="mt-5 space-y-2 text-xs leading-relaxed text-[var(--lk-muted)]">
              {[
                { label: "Gabb Phone 4 pricing", url: "https://gabb.com/gabb-phone-4/" },
                { label: "Gabb children's data collection", url: "https://gabb.com/privacy-policy/" },
                { label: "TickTalk 5 pricing & plans", url: "https://www.myticktalk.com/products/ticktalk-5" },
                { label: "TickTalk continuous location disclosure", url: "https://www.myticktalk.com/policies/privacy-policy" },
                { label: "Pinwheel plans & pricing", url: "https://www.pinwheel.com/phones" },
                { label: "Pinwheel deleted texts visible", url: "https://www.pinwheel.com/howitworks" },
                { label: "Bark Phone pricing", url: "https://www.bark.us/pricing/" },
                { label: "Bark content scanning consent", url: "https://www.bark.us/privacy/" },
                { label: "Relay pricing & plans", url: "https://relaygo.com" },
                { label: "FTC kids smartwatch COPPA warning (2018)", url: "https://www.ftc.gov/business-guidance/blog/2018/04/where-world-warning-letters-address-geolocation-coppa-coverage" },
                { label: "FTC Apitor geolocation enforcement (2025)", url: "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-takes-action-against-robot-toy-maker-allowing-collection-childrens-data-without-parental-consent" },
              ].map(({ label, url }) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-[var(--lk-line)] mt-1 text-[var(--lk-muted)]/70">
                Prices current September 2026. Competitor pricing subject to change.
              </li>
            </ul>
          </div>

          <div>
            <div className="rounded-2xl bg-[var(--lk-ink)] p-8 text-white">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/50">Ready?</p>
              <h2 className="lk-display mt-3 text-2xl leading-tight text-white">
                The only one that starts without a carrier contract.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                LOUP WiFi runs on home WiFi. No SIM, no carrier, no monthly surprise — just $10/month for external contacts. Add LTE at $199 when you want cellular coverage anywhere.
              </p>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <Link href="/shop/loup" className="lk-btn lk-btn-white">
                  Pre-order LOUP — from $149
                </Link>
                <Link href="/faq" className="lk-btn border border-white/30 bg-transparent text-white hover:bg-white/10">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
