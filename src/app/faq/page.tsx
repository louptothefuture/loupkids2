import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { FaqAnswer } from "@/components/loupkids/FaqAnswer";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { getPublicFaqs } from "@/lib/content/cms";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Everything parents ask about Loup: approved contacts, Wi-Fi calling, the companion app, shipping, and privacy.",
  alternates: { canonical: `${SITE.url}/faq` },
};

export default async function FaqPage() {
  const faqItems = await getPublicFaqs();
  const faqs = faqItems.map((f) => ({
    question: f.q,
    answer: typeof f.a === "string" ? f.a : f.a.paragraphs.join(" "),
  }));

  return (
    <div>
      <FaqJsonLd faqs={faqs.map((f) => ({ ...f, section: "General" }))} />

      <section className="lk-section border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-narrow">
          <h1 className="lk-display text-[clamp(2rem,5vw,3.5rem)]">FAQ</h1>
        </FadeIn>
      </section>

      <section className="lk-section">
        <div className="lk-container-narrow">
          {faqItems.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.03}>
              <details className="group border-b border-[var(--lk-line)] py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="lk-display text-lg sm:text-xl">{faq.q}</span>
                  <span
                    className="mt-1 shrink-0 text-xl text-[var(--lk-muted)] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-4 max-w-prose">
                  <FaqAnswer answer={faq.a} />
                </div>
              </details>
            </FadeIn>
          ))}
          <p className="mt-10 text-[var(--lk-muted)]">
            Still stuck? Browse the{" "}
            <Link href="/help" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              help center
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
