"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type LandingButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

export function LandingButton({
  href,
  children,
  variant = "dark",
  className = "",
}: LandingButtonProps) {
  const styles =
    variant === "dark"
      ? "bg-ink text-white hover:bg-black"
      : "bg-white text-ink hover:bg-white/90";

  return (
    <motion.div whileHover={{ scale: 1.04, rotate: -1.2 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-bold tracking-tight shadow-[0_8px_0_rgba(0,0,0,0.15)] transition-colors ${styles} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
