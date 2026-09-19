import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup — WiFi $149 · WiFi + LTE $199",
  description:
    "Order Loup — WiFi $149 pre-order ($199 launch) or WiFi + LTE $199 ($249 launch). LOUP↔LOUP always free. External contacts $10/mo. Closed network.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
