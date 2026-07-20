import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our LOUP Story",
  description:
    "Why we built LOUP — better connection, not less. The founder story, told in full.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function StoryPage() {
  redirect("/about");
}
