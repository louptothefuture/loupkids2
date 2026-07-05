"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type ColorBlockProps = {
  id?: string;
  bg: string;
  text?: string;
  children: ReactNode;
  className?: string;
};

export function ColorBlock({
  id,
  bg,
  text = "text-ink",
  children,
  className = "",
}: ColorBlockProps) {
  return (
    <section
      id={id}
      className={`relative flex min-h-svh flex-col items-center justify-center px-4 py-24 sm:px-6 ${bg} ${text} ${className}`}
    >
      <Reveal className="mx-auto w-full max-w-5xl text-center">{children}</Reveal>
    </section>
  );
}

export function BlockHeadline({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      className="display-landing mx-auto max-w-4xl text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.92]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  );
}

export function BlockSubline({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-5 max-w-xl text-lg font-medium leading-snug opacity-90 sm:text-xl">
      {children}
    </p>
  );
}

export function BlockTrust({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-6 max-w-lg text-sm font-semibold uppercase tracking-wide opacity-75">
      {children}
    </p>
  );
}

export function LandingFooterStrip() {
  return (
    <footer className="bg-ink px-4 py-8 text-center text-sm text-white/50 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link href="/faq" className="hover:text-white">
          FAQ
        </Link>
        <Link href="/help" className="hover:text-white">
          Help
        </Link>
        <Link href="/legal/privacy" className="hover:text-white">
          Privacy
        </Link>
        <Link href="/contact" className="hover:text-white">
          Contact
        </Link>
      </div>
      <p className="mt-4">© {new Date().getFullYear()} LOUP</p>
    </footer>
  );
}
