import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order Loup — Silver | $129",
  description: "Pre-order Loup — aluminum sides & buttons, ABS front — $129 pre-launch, ships October 2026.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
