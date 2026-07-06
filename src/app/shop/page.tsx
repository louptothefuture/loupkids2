import type { Metadata } from "next";
import { LoupkidsStore } from "@/components/loupkids/LoupkidsStore";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Store — Loup Devices & Merch",
  description: "Reserve Loup OG for $149 and shop Strikeout the Algo merch.",
  alternates: { canonical: `${SITE.url}/shop` },
};

export default function ShopPage() {
  return <LoupkidsStore />;
}
