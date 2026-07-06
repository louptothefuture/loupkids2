import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
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
    <article className="lk-section">
      <FadeIn className="lk-container-narrow">
        <p className="lk-label mb-4">About</p>
        <h1 className="lk-display text-[clamp(2rem,5vw,3.5rem)]">{LOUPKIDS_ABOUT.title}</h1>
        <div className="mt-10 space-y-5 leading-[1.75] text-[var(--lk-muted)]">
          {LOUPKIDS_ABOUT.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/shop/loup" className="lk-btn">
            Pre-order Loup
          </Link>
          <Link href="/faq" className="lk-btn lk-btn-outline">
            Read the FAQ
          </Link>
        </div>
      </FadeIn>
    </article>
  );
}
