import type { Metadata } from "next";
import { Glb3ScrollStage } from "@/components/glb/Glb3ScrollStage";

export const metadata: Metadata = {
  title: "GLB3",
  description: "Scroll-driven textured GLB: clockwise yaw, then vertical back-flat.",
  robots: { index: false, follow: false },
};

export default function Glb3Page() {
  return <Glb3ScrollStage />;
}
