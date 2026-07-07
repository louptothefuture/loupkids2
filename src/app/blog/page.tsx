import type { Metadata } from "next";
import { BrainComparisonSection } from "@/components/loupkids/BrainComparisonSection";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsJournalList } from "@/components/loupkids/LoupkidsJournalList";
import { getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description: "Research and essays on screen time, first phones, and raising kids in the anti-screen age.",
  alternates: { canonical: `${SITE.url}/journal` },
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose text-center">
          <h1 className="lk-display lk-h2">Journal</h1>
          <p className="lk-lead lk-prose-muted mx-auto mt-4">
            Essays on screen time, first phones, and the years before a smartphone.
          </p>
        </FadeIn>
      </section>

      <BrainComparisonSection />

      <section className="lk-section-white lk-section-content">
        <div className="lk-container">
          <LoupkidsJournalList posts={posts} />
        </div>
      </section>
    </div>
  );
}
