import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserve Loup — Silver | $149",
  description: "Pre-order Loup in silver anodized aluminum — $149 pre-order, ships Q4 2026.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
