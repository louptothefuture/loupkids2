import type { Metadata } from "next";
import { LoupkidsHome } from "@/components/loupkids/LoupkidsHome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Loup | Phones for the Anti-Screen Age",
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return <LoupkidsHome />;
}
