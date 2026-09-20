import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup",
  description:
    "Order Loup — WiFi $149 or WiFi + LTE $199. LOUP↔LOUP always free. External contacts $10/mo.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
  robots: { index: false, follow: true },
};

/** Legacy waitlist URL — send buyers to the live PDP. */
export default function ReservePage() {
  redirect("/shop/loup");
}
