import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LOUPKIDS_SETUP_STEPS } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Setup Guide",
  description: "Step-by-step Loup setup — Wi-Fi, contacts, quiet hours, and your first call.",
  alternates: { canonical: `${SITE.url}/setup` },
};

export default function SetupPage() {
  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Support / setup guide"
        title="Setup guide"
        description="From box to first call in about ten minutes. Video walkthrough coming at launch — for now, follow these steps."
      />

      <section className="lk-section-white lk-page-body">
        <div className="lk-container-prose">
          <ol>
            {LOUPKIDS_SETUP_STEPS.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.04}>
                <li className={i > 0 ? "border-t border-[var(--lk-line)] pt-8 mt-8" : ""}>
                  <p className="lk-label mb-2">Step {s.step}</p>
                  <h2 className="lk-display text-xl">{s.title}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{s.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn delay={0.2} className="mt-12 border-t border-[var(--lk-line)] pt-8 text-[0.9375rem] text-[var(--lk-muted)]">
            Stuck? Browse the{" "}
            <Link href="/help" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              knowledge base
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              contact support
            </Link>
            .
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
