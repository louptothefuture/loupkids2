import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup — Silver | $129",
  description:
    "Order Loup — First 500 for $129 (Save 33% vs $199). Year 1 unlimited domestic included, then $10/mo. Ships within 60 days.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
