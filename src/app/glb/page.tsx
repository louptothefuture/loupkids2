import type { Metadata } from "next";
import { GlbScrollStage } from "@/components/glb/GlbScrollStage";

export const metadata: Metadata = {
  title: "GLB",
  description: "Scroll-driven GLB product rotation demo.",
  robots: { index: false, follow: false },
};

export default function GlbPage() {
  return <GlbScrollStage />;
}
