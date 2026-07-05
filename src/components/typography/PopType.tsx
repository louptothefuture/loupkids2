import type { ElementType, ReactNode } from "react";

type PopHeadlineProps = {
  children: ReactNode;
  as?: ElementType;
  /** light = white fill on dark/color blocks; dark = ink fill on light blocks */
  tone?: "light" | "dark";
  className?: string;
  size?: "hero" | "xl" | "lg" | "md";
};

const sizes = {
  hero: "text-[clamp(3rem,12vw,7.5rem)]",
  xl: "text-[clamp(2.25rem,8vw,5rem)]",
  lg: "text-[clamp(1.75rem,5vw,3.5rem)]",
  md: "text-[clamp(1.25rem,3vw,2rem)]",
};

/** Feastables-style chunky type — white fill, black stroke, gradient shadow breakout */
export function PopHeadline({
  children,
  as: Tag = "h2",
  tone = "light",
  className = "",
  size = "xl",
}: PopHeadlineProps) {
  return (
    <Tag
      className={`pop-headline ${tone === "dark" ? "pop-headline-dark" : ""} ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function PopLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`pop-label ${className}`}>{children}</span>;
}

export function PopPrice({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`pop-price ${className}`}>{children}</span>;
}
