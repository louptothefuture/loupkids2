import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order Loup — Silver | $149",
  description:
    "Pre-order Loup — aluminum sides & buttons, ABS front — $149 launch ($199 MSRP), includes 1 year free unlimited domestic calling, ships within 60 days.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
};

/** ponytail: one SKU — store index is the PDP */
export default function ShopPage() {
  redirect("/shop/loup");
}
