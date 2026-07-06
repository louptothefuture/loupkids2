import type { Metadata } from "next";
import { LoupkidsHome } from "@/components/loupkids/LoupkidsHome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Loup | Reach Your Kid Without Handing Them the Internet",
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return <LoupkidsHome />;
}
