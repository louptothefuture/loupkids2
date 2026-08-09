"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const FACES = {
  front: "/images/renders/shop/face-front.jpg",
  back: "/images/renders/shop/face-back.jpg",
  scroll: "/images/renders/shop/face-scroll.jpg",
  volume: "/images/renders/shop/face-volume.jpg",
  bottom: "/images/renders/shop/face-bottom.jpg",
  top: "/images/renders/shop/face-top.jpg",
} as const;

/** CSS 3D box from gallery angles — drag to orbit (no WebGL). */
export function LoupkidsHardware3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: -18, y: -32 });
  const drag = useRef<{
    active: boolean;
    x: number;
    y: number;
    rotX: number;
    rotY: number;
  } | null>(null);
  const [auto, setAuto] = useState(true);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion.current) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || reduceMotion.current) return;
    const id = window.setInterval(() => {
      if (drag.current?.active) return;
      setRot((r) => ({ ...r, y: r.y + 0.35 }));
    }, 32);
    return () => window.clearInterval(id);
  }, [auto]);

  const onPointerDown = (e: React.PointerEvent) => {
    setAuto(false);
    drag.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      rotX: rot.x,
      rotY: rot.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current?.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    setRot({
      x: Math.max(-60, Math.min(60, drag.current.rotX - dy * 0.35)),
      y: drag.current.rotY + dx * 0.4,
    });
  };

  const onPointerUp = () => {
    if (drag.current) drag.current.active = false;
  };

  // Phone-ish proportions (depth slightly exaggerated so sides read)
  const W = 168;
  const H = 300;
  const D = 36;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="lk-display text-xl sm:text-2xl">3D composite</h2>
          <p className="mt-1 text-sm text-[var(--lk-muted)]">
            Drag to orbit · built from front, back, sides, and bottom photos
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAuto((v) => !v)}
          className="cursor-pointer border border-[var(--lk-line)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--lk-muted)] hover:border-[var(--lk-ink)] hover:text-[var(--lk-ink)]"
        >
          {auto ? "Pause spin" : "Auto spin"}
        </button>
      </div>

      <div
        ref={stageRef}
        className="relative mt-6 flex h-[min(62vh,520px)] cursor-grab items-center justify-center overflow-hidden rounded-2xl bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)] active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label="Interactive 3D Loup composite — drag to rotate"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-[var(--lk-muted)]">
          Drag
        </div>

        <div
          className="relative"
          style={{
            width: W,
            height: H,
            perspective: 900,
            perspectiveOrigin: "50% 45%",
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
              transition: drag.current?.active ? "none" : "transform 0.05s linear",
            }}
          >
            {/* Front */}
            <Face
              src={FACES.front}
              style={{
                width: W,
                height: H,
                transform: `translateZ(${D / 2}px)`,
              }}
            />
            {/* Back */}
            <Face
              src={FACES.back}
              style={{
                width: W,
                height: H,
                transform: `rotateY(180deg) translateZ(${D / 2}px)`,
              }}
            />
            {/* Scroll side (viewer left when front faces camera) */}
            <Face
              src={FACES.scroll}
              style={{
                width: D,
                height: H,
                left: (W - D) / 2,
                transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
              }}
            />
            {/* Volume side */}
            <Face
              src={FACES.volume}
              style={{
                width: D,
                height: H,
                left: (W - D) / 2,
                transform: `rotateY(90deg) translateZ(${W / 2}px)`,
              }}
            />
            {/* Top */}
            <Face
              src={FACES.top}
              style={{
                width: W,
                height: D,
                top: (H - D) / 2,
                transform: `rotateX(90deg) translateZ(${H / 2}px)`,
              }}
            />
            {/* Bottom */}
            <Face
              src={FACES.bottom}
              style={{
                width: W,
                height: D,
                top: (H - D) / 2,
                transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Face({
  src,
  style,
}: {
  src: string;
  style: CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-neutral-200"
      style={{
        ...style,
        backfaceVisibility: "hidden",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
      }}
    />
  );
}
