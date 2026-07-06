import type { Metadata } from "next";
import { LoupkidsHome } from "@/components/loupkids/LoupkidsHome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Loup | No Apps. No Feed. Just Your People.",
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return <LoupkidsHome />;
}
