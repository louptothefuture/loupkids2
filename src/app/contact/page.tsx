import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Talk to a Human",
  description:
    "Questions about LOUP, your order, or the calling plan? Email hello@loupkids.com or use the form — real humans, fast answers.",
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="label-mono text-loup-red">Contact</p>
          <h1 className="display mt-2 text-6xl sm:text-7xl">
            Talk to a human<span className="text-loup-red">.</span>
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Fitting, right? No chatbots here. Real people answer every message, usually within a
            few hours on weekdays.
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="label-mono text-ink-soft">General & support</dt>
              <dd className="display mt-1 text-2xl">
                <a href={`mailto:${SITE.email}`} className="link-underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-ink-soft">Press</dt>
              <dd className="display mt-1 text-2xl">
                <a href={`mailto:${SITE.press}`} className="link-underline">
                  {SITE.press}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-ink-soft">Order questions</dt>
              <dd className="mt-1 text-ink-soft">
                Include your order number — check your{" "}
                <a href="/account" className="underline">
                  order status
                </a>{" "}
                first for tracking.
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
