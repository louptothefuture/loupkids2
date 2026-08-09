import type { Metadata } from "next";
import { Glb2ScrollStage } from "@/components/glb/Glb2ScrollStage";

export const metadata: Metadata = {
  title: "GLB2",
  description: "Scroll-driven GLB: clockwise yaw, then flip to back plate.",
  robots: { index: false, follow: false },
};

export default function Glb2Page() {
  return <Glb2ScrollStage />;
}
