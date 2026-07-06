"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

export function RevealHeadline({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  instant = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  instant?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const containerProps = instant
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-10%" as const },
      };

  return (
    <motion.div
      {...containerProps}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay } },
      }}
    >
      <motion.div variants={lineVariants}>
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </motion.div>
  );
}

export function RevealLines({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={lineVariants} className={className}>
      {children}
    </motion.div>
  );
}
