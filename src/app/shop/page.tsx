import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup — Silver | $149",
  description:
    "Order Loup — First 500 for $149 (Save 25% vs $199). Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo. Ships within 60 days.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
