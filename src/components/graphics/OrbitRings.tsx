"use client";

import { motion } from "framer-motion";

type OrbitRingsProps = {
  className?: string;
  color?: string;
  size?: number;
};

/** Concentric orbital rings — loop energy without the ∞ symbol */
export function OrbitRings({ className = "", color = "currentColor", size = 420 }: OrbitRingsProps) {
  const c = size / 2;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      {[0.42, 0.52, 0.62, 0.72].map((r, i) => (
        <motion.ellipse
          key={r}
          cx={c}
          cy={c}
          rx={size * r * 0.5}
          ry={size * r * 0.38}
          stroke={color}
          strokeWidth={2 - i * 0.3}
          strokeOpacity={0.25 + i * 0.12}
          strokeDasharray={i % 2 === 0 ? "8 14" : "4 10"}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 18 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: `${c}px`, originY: `${c}px` }}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const rx = size * 0.31;
        const ry = size * 0.24;
        return (
          <motion.circle
            key={i}
            r={5}
            fill={color}
            fillOpacity={0.7}
            animate={{
              cx: [c + Math.cos(angle) * rx, c + Math.cos(angle + Math.PI * 2) * rx],
              cy: [c + Math.sin(angle) * ry, c + Math.sin(angle + Math.PI * 2) * ry],
            }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </svg>
  );
}
