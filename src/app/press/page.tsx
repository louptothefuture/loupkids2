import type { Metadata } from "next";
import { PrintButton } from "@/components/press/PrintButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media Kit — LOUP",
  description:
    "LOUP press kit: product overview, founder background, and press contact for journalists, editors, and podcast hosts.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/press` },
};

const PRESS_EMAIL = "hi@loupkids.com";
const YEAR = "2026";

export default function PressPage() {
  return (
    <>
      {/*
        Two layouts share the same markup:
        Screen  → readable single-column, comfortable spacing
        Print   → 1-page A4 portrait, 2-column body, 7pt base type
      */}
      <style>{`
        /* ── PRINT: force everything onto exactly 1 × A4 page ── */
        @media print {
          @page {
            size: A4 portrait;
            margin: 1.4cm 1.6cm;
          }

          /* Kill site chrome */
          header.lk-nav,
          footer,
          .no-print { display: none !important; }

          html, body { background: white !important; font-size: 7pt; }

          /* Outer wrapper */
          .press-wrap {
            max-width: 100% !important;
            padding: 0 !important;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          /* Masthead */
          .press-masthead {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            border-bottom: 1.5pt solid #111;
            padding-bottom: 6pt;
            margin-bottom: 10pt;
          }
          .press-wordmark { font-size: 28pt; letter-spacing: -0.04em; font-weight: 700; line-height: 1; }
          .press-tagline { font-size: 7pt; color: #555; margin-top: 2pt; }
          .press-eyebrow { font-size: 5.5pt; text-transform: uppercase; letter-spacing: 0.18em; color: #777; }
          .press-contact-top { text-align: right; font-size: 6.5pt; color: #555; line-height: 1.5; }

          /* 2-column body */
          .press-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 20pt;
            flex: 1;
            align-content: start;
          }
          .press-full { grid-column: 1 / -1; }

          /* Section label */
          .press-label {
            font-size: 5.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: #777;
            margin-bottom: 3pt;
            display: block;
          }

          /* Headings */
          .press-headline {
            font-size: 11pt;
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.02em;
            margin-bottom: 4pt;
          }

          /* Body copy */
          .press-copy {
            font-size: 7pt;
            line-height: 1.5;
            color: #333;
            margin-bottom: 0;
          }

          /* Steps */
          .press-step { display: flex; gap: 5pt; margin-bottom: 4pt; }
          .press-step-num { font-size: 6pt; font-weight: 700; flex-shrink: 0; padding-top: 0.5pt; color: #111; }

          /* Founder block */
          .press-founder {
            background: #f2f2f0 !important;
            padding: 6pt 8pt;
            margin-top: 8pt;
            border-radius: 3pt;
          }
          .press-founder-name { font-size: 8pt; font-weight: 700; }
          .press-founder-role { font-size: 6pt; color: #666; margin-bottom: 3pt; }

          /* Divider */
          .press-rule { border: none; border-top: 0.5pt solid #ddd; margin: 8pt 0; }
          .press-rule-full { border: none; border-top: 0.5pt solid #ddd; margin: 8pt 0; grid-column: 1 / -1; }

          /* Specs grid */
          .press-specs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4pt 10pt;
            margin-top: 4pt;
          }
          .press-spec-label { font-size: 5pt; text-transform: uppercase; letter-spacing: 0.15em; color: #888; font-weight: 700; }
          .press-spec-value { font-size: 6.5pt; color: #111; margin-top: 1pt; }

          /* Footer */
          .press-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 8pt;
            border-top: 1.5pt solid #111;
            padding-top: 5pt;
            grid-column: 1 / -1;
          }
          .press-footer-contact { font-size: 6pt; line-height: 1.6; }
          .press-footer-contact strong { font-size: 7pt; }
          .press-footer-note { font-size: 5.5pt; color: #777; text-align: right; line-height: 1.6; }

          /* Spacing helpers */
          .ps-mb { margin-bottom: 8pt; }
        }

        /* ── SCREEN: readable layout ── */
        @media screen {
          .press-masthead { border-bottom: 2px solid var(--lk-ink); padding-bottom: 1.5rem; margin-bottom: 3rem; display: flex; align-items: flex-end; justify-content: space-between; }
          .press-wordmark { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
          .press-tagline { font-size: 0.875rem; color: var(--lk-muted); margin-top: 0.25rem; }
          .press-eyebrow { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--lk-muted); font-weight: 700; }
          .press-contact-top { text-align: right; font-size: 0.75rem; color: var(--lk-muted); line-height: 1.6; }
          .press-body { display: flex; flex-direction: column; gap: 0; }
          .press-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: var(--lk-muted); margin-bottom: 0.5rem; display: block; }
          .press-headline { font-size: 1.6rem; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1rem; }
          .press-copy { font-size: 0.9375rem; line-height: 1.65; color: var(--lk-muted); margin-bottom: 0; }
          .press-rule { border: none; border-top: 1px solid var(--lk-line); margin: 2.5rem 0; }
          .press-rule-full { border: none; border-top: 1px solid var(--lk-line); margin: 2.5rem 0; }
          .press-step { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; font-size: 0.875rem; line-height: 1.55; color: var(--lk-muted); }
          .press-step-num { font-size: 0.7rem; font-weight: 700; flex-shrink: 0; padding-top: 0.125rem; color: var(--lk-ink); }
          .press-col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 0; }
          .press-founder { background: var(--lk-surface); padding: 1.5rem; border-radius: 0.75rem; }
          .press-founder-name { font-size: 1rem; font-weight: 700; }
          .press-founder-role { font-size: 0.75rem; color: var(--lk-muted); margin-bottom: 0.75rem; }
          .press-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 2rem; margin-top: 1rem; }
          .press-spec-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lk-muted); font-weight: 700; }
          .press-spec-value { font-size: 0.8125rem; color: var(--lk-ink); margin-top: 0.125rem; }
          .press-footer { display: flex; justify-content: space-between; align-items: flex-end; border-top: 2px solid var(--lk-ink); padding-top: 1.5rem; flex-wrap: wrap; gap: 1rem; }
          .press-footer-contact { font-size: 0.8125rem; line-height: 1.6; }
          .press-footer-contact strong { font-size: 0.875rem; }
          .press-footer-note { font-size: 0.75rem; color: var(--lk-muted); text-align: right; line-height: 1.6; }
          .ps-mb { margin-bottom: 2.5rem; }
        }
      `}</style>

      <div className="loupkids-theme mx-auto max-w-[680px] px-6 py-14 sm:py-20 print:p-0">
        <article className="press-wrap">

          {/* ── Masthead ── */}
          <header className="press-masthead">
            <div>
              <span className="press-eyebrow">Media Kit · {YEAR}</span>
              <div className="press-wordmark lk-display">LOUP</div>
              <div className="press-tagline">Phones for the anti-screen age.</div>
            </div>
            <div className="press-contact-top">
              <div>{SITE.url.replace("https://", "")}</div>
              <div>{PRESS_EMAIL}</div>
            </div>
          </header>

          {/* ── Body ── */}
          <div className="press-body">

            {/* Problem — full width */}
            <div className="press-full ps-mb">
              <span className="press-label">The problem</span>
              <div className="press-headline lk-display">
                The first phone used to be a rite of passage. Now it&apos;s a liability.
              </div>
              <p className="press-copy">
                A portal to attention merchants, social comparison, and algorithmically-optimized distraction.
                Parents know it. Kids feel it. And for a decade, the only answer has been parental controls
                on a device that was never designed to be controlled. The category that should exist —
                a purposeful first phone — didn&apos;t. Until now.
              </p>
            </div>

            <hr className="press-rule-full" />

            {/* What it is — full width */}
            <div className="press-full ps-mb">
              <span className="press-label">What LOUP is</span>
              <p className="press-copy" style={{color: 'var(--lk-ink)', fontSize: '1rem', lineHeight: '1.6'}}>
                LOUP is a WiFi voice device for kids — calls only, to the people parents have approved,
                and nobody else. No texts, no internet, no apps, no feeds. The hardware is purpose-built:
                anodized aluminum frame, tactile rotary scroll dial, e-ink display. v1 is WiFi-only.
                v2 adds LTE — same closed contact list, cellular range. It looks like something
                worth carrying. It is.
              </p>
            </div>

            <hr className="press-rule-full" />

            {/* How it works — left col */}
            <div className="ps-mb press-col2 print:block print:col-span-1">

              <div>
                <span className="press-label">How it works</span>
                <div className="press-step">
                  <span className="press-step-num">01</span>
                  <span className="press-copy">Parents whitelist contacts in the companion app. Nobody outside the list can call in or out.</span>
                </div>
                <div className="press-step">
                  <span className="press-step-num">02</span>
                  <span className="press-copy">Kids scroll the dial, find a name, press call. That&apos;s the whole interface.</span>
                </div>
                <div className="press-step">
                  <span className="press-step-num">03</span>
                  <span className="press-copy">Quiet hours, schedules, and parent-to-device paging live in the companion app. Setup is about ten minutes.</span>
                </div>
              </div>

              {/* Hardware — right col */}
              <div>
                <span className="press-label">The hardware</span>
                <p className="press-copy">
                  Anodized aluminum frame. E-ink display — no glow, no video, no algorithm.
                  Tactile scroll dial. Designed to be held and kept, not stared at.
                  This is not a plastic toy. It is a considered object built for the space
                  between a walkie-talkie and a smartphone.
                </p>
                <div style={{marginTop: '0.75rem'}} className="print:mt-1">
                  <span className="press-label">Who it&apos;s for</span>
                  <p className="press-copy">
                    Kids 6–16. Parents who want connection without compromise.
                    Families in the gap between too young for a smartphone and ready for one —
                    which is most families.
                  </p>
                </div>
              </div>

            </div>

            <hr className="press-rule-full" />

            {/* Founder — full width */}
            <div className="press-full ps-mb">
              <div className="press-founder">
                <span className="press-label">Founder</span>
                <div className="press-founder-name lk-display">Thomas O&apos;Connell</div>
                <div className="press-founder-role">CEO + Founder</div>
                <p className="press-copy">
                  Thomas spent 20 years building brands for organizations that were very good at capturing
                  attention — Nike, LEGO, Google. Then he had kids and watched the same machinery get
                  aimed at them. LOUP is what he built instead. The problem was personal.
                  The answer didn&apos;t exist. So he made it.
                </p>
              </div>
            </div>

            <hr className="press-rule-full" />

            {/* Specs — full width */}
            <div className="press-full ps-mb">
              <span className="press-label">At a glance</span>
              <div className="press-specs">
                {[
                  ["Category", "Screenless voice phone for kids"],
                  ["Display", "E-ink — no glow, no video"],
                  ["Connectivity", "WiFi (v1) · WiFi + LTE (v2)"],
                  ["Calling", "Approved contacts only"],
                  ["Price", "WiFi $149 · LTE $199 (pre-order)"],
                  ["Monthly", "WiFi $10/mo · LTE $20/mo"],
                  ["Ages", "6–16"],
                  ["Ships", "Within 60 days"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="press-spec-label">{label}</div>
                    <div className="press-spec-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="press-footer">
              <div className="press-footer-contact">
                <strong>Press contact</strong><br />
                {PRESS_EMAIL}<br />
                {SITE.url.replace("https://", "")}
              </div>
              <div className="press-footer-note">
                High-res images and product renders available on request.<br />
                Founder available for interview.
              </div>
            </div>

          </div>
        </article>

        {/* Save as PDF — screen only */}
        <div className="no-print mt-12 flex justify-center">
          <PrintButton />
        </div>
      </div>
    </>
  );
}
