import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_ABOUT } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — How Loup Started",
  description:
    "The story behind Loup — from a kid pretending to call on an old phone to a screenless device built for real connection.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <div>
      <LoupkidsPageHeader eyebrow="About" title={LOUPKIDS_ABOUT.title} />

      <article className="lk-section-white lk-page-body">
        <FadeIn className="lk-container-prose">
          <div className="space-y-5 leading-[1.75] text-[var(--lk-muted)]">
            {LOUPKIDS_ABOUT.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4 border-t border-[var(--lk-line)] pt-8">
            <Link href="/shop/loup" className="lk-btn">
              {LOUPKIDS_CTA.primary}
            </Link>
            <Link href="/faq" className="lk-btn lk-btn-outline">
              Read the FAQ
            </Link>
          </div>
        </FadeIn>
      </article>
    </div>
  );
}
