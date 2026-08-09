import type { Metadata } from "next";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: `Contact Loup — ${SITE.email}`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-12 sm:py-14">
      <FadeIn className="lk-container-narrow">
        <h1 className="sr-only">Get in Touch</h1>
        <div>
          <ContactForm />
        </div>
        <dl className="mt-12 space-y-4 border-t border-[var(--lk-line)] pt-8 text-[var(--lk-muted)]">
          <div>
            <dt className="lk-label">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${SITE.email}`} className="hover:text-[var(--lk-ink)]">
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="lk-label">Press</dt>
            <dd className="mt-1">
              <a href={`mailto:${SITE.press}`} className="hover:text-[var(--lk-ink)]">
                {SITE.press}
              </a>
            </dd>
          </div>
          <div>
            <dt className="lk-label">Interest in investing</dt>
            <dd className="mt-1">
              <a href={`mailto:${SITE.email}?subject=Investing%20in%20Loup`} className="hover:text-[var(--lk-ink)]">
                {SITE.email}
              </a>
            </dd>
          </div>
        </dl>
      </FadeIn>
    </section>
  );
}
