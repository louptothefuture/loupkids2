"use client";

import dynamic from "next/dynamic";

const Glb3Embed = dynamic(
  () =>
    import("@/components/glb/Glb3ScrollStage").then((m) => ({
      default: m.Glb3ScrollStage,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[var(--lk-cream)] text-sm text-[var(--lk-muted)]">
        Loading 3D preview…
      </div>
    ),
  },
);

/** /raise product section — same embed as homepage feature band */
export function RaiseGlbStage() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)]">
      <Glb3Embed mode="embed" />
    </div>
  );
}
