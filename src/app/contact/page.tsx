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
    <section className="lk-section">
      <FadeIn className="lk-container-narrow">
        <h1 className="lk-display text-[clamp(2rem,5vw,3.5rem)]">Get in Touch</h1>
        <div className="mt-10">
          <ContactForm />
        </div>
        <dl className="mt-12 space-y-4 border-t border-[var(--lk-line)] pt-8 text-sm text-[var(--lk-muted)]">
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
        </dl>
      </FadeIn>
    </section>
  );
}
