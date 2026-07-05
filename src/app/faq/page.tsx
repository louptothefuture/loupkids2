import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/content";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Shipping, Returns, Warranty & How LOUP Works",
  description:
    "Everything parents ask about LOUP: what it does, the $10/month calling plan, shipping times, 30-day returns, the 2-year kid-proof warranty, and privacy.",
  alternates: { canonical: `${SITE.url}/faq` },
};

export const revalidate = 300;

const SECTION_IDS: Record<string, string> = {
  Shipping: "shipping",
  "Returns & Warranty": "returns",
  "Plans & Calling": "plans",
  Product: "product",
  "Safety & Privacy": "safety",
};

const SECTION_COLORS = [
  "bg-block-cobalt text-white",
  "bg-block-fuchsia text-white",
  "bg-block-coral text-white",
  "bg-block-sun text-ink",
  "bg-block-ink text-white",
];

export default async function FaqPage() {
  const faqs = await getFaqs();
  const sections = [...new Set(faqs.map((f) => f.section))];

  return (
    <div className="overflow-x-hidden">
      <FaqJsonLd faqs={faqs} />

      <section className="bg-block-cobalt px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <PopLabel className="mb-3 block text-white/80">FAQ</PopLabel>
          <PopHeadline as="h1" size="hero">
            Asked.
            <br />
            Answered.
          </PopHeadline>
          <p className="mt-6 max-w-xl text-lg font-semibold text-white">
            Can&apos;t find it here?{" "}
            <Link href="/contact" className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Talk to a human
            </Link>{" "}
            — we answer fast.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav aria-label="FAQ sections" className="flex flex-wrap gap-3">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${SECTION_IDS[s] ?? s.toLowerCase()}`}
              className="rounded-full border-3 border-ink bg-white px-4 py-2 text-sm font-bold uppercase text-ink shadow-[3px_3px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {s}
            </a>
          ))}
        </nav>

        {sections.map((section, si) => (
          <section
            key={section}
            id={SECTION_IDS[section] ?? section.toLowerCase()}
            className="mt-14 scroll-mt-24"
          >
            <h2 className={`display text-3xl sm:text-4xl ${SECTION_COLORS[si % SECTION_COLORS.length].includes("text-ink") ? "text-ink" : "text-block-cobalt"}`}>
              {section}
            </h2>
            <div className="mt-6 space-y-4">
              {faqs
                .filter((f) => f.section === section)
                .map((faq) => (
                  <details
                    key={faq.question}
                    className="pop-card group bg-white text-ink open:shadow-[10px_10px_0_#0a0a0a]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-bold [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                      <span className="text-lg">{faq.question}</span>
                      <span
                        className="display shrink-0 text-2xl text-block-fuchsia transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="border-t-3 border-ink/10 px-6 pb-6 pt-4 text-base font-medium leading-relaxed text-ink/80">
                      {faq.answer}
                    </p>
                  </details>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
