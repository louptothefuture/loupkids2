import type { Metadata } from "next";
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
      <h1 className="sr-only">Journal</h1>

      <section className="lk-section-white lk-section-content">
        <div className="lk-container">
          <LoupkidsJournalList posts={posts} />
        </div>
      </section>
    </div>
  );
}
