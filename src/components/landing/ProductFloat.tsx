"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type ProductFloatProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/** Signature landing interaction — product tilts toward cursor, settles on scroll. */
export function ProductFloat({ src, alt, priority, className = "" }: ProductFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const lift = useTransform(sy, [-0.5, 0.5], [8, -8]);

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto aspect-square w-full max-w-md lg:max-w-lg ${className}`}
      style={{ perspective: 900 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, y: lift }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 90vw, 480px"
          className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.25)]"
        />
      </motion.div>
    </motion.div>
  );
}
