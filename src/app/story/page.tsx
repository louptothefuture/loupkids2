import type { Metadata } from "next";
import { StoryScroll } from "@/components/story/StoryScroll";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our LOUP Story",
  description:
    "Why we built LOUP — better connection, not less. The founder story, told in full.",
  alternates: { canonical: `${SITE.url}/story` },
};

export default function StoryPage() {
  return <StoryScroll />;
}
