import type { Metadata } from "next";
import { GraphScroll } from "@/components/loupkids/GraphScroll";

export const metadata: Metadata = {
  title: "Graph",
  description: "Scroll-driven 5-year growth chart. Test page. Not in nav.",
  robots: { index: false, follow: false },
};

export default function GraphPage() {
  return <GraphScroll />;
}
