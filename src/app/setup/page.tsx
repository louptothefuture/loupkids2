import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { getSetupGuideContent } from "@/lib/content/cms";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Setup Guide",
  description: "Step-by-step Loup setup — Wi-Fi, contacts, quiet hours, and your first call.",
  alternates: { canonical: `${SITE.url}/setup` },
};

export default async function SetupPage() {
  const guide = await getSetupGuideContent();

  return (
    <div>
      <LoupkidsPageHeader eyebrow={guide.eyebrow} title={guide.title} description={guide.description} />

      <section className="lk-section-white lk-page-body">
        <div className="lk-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div>
            <ol>
              {guide.steps.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.04}>
                  <li className={i > 0 ? "mt-8 border-t border-[var(--lk-line)] pt-8" : ""}>
                    <p className="lk-label mb-2">{s.section}</p>
                    <h2 className="lk-display text-xl">{s.title}</h2>
                    <p className="lk-prose-muted mt-2">{s.body}</p>
                  </li>
                </FadeIn>
              ))}
            </ol>

            <FadeIn delay={0.2} className="lk-prose-muted mt-12 border-t border-[var(--lk-line)] pt-8">
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

          <FadeIn delay={0.08} className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 sm:aspect-[5/6]">
              <LoupkidsImage
                src={guide.heroImage}
                alt={guide.heroImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[40%_30%]"
                priority
              />
            </div>
            <p className="mt-3 text-sm text-[var(--lk-muted)]">{guide.heroCaption}</p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
