import type { ReactNode } from "react";

export function Marquee({
  children,
  className = "",
  fast = false,
}: {
  children: ReactNode;
  className?: string;
  fast?: boolean;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex w-max items-center ${fast ? "animate-marquee-fast" : "animate-marquee"}`}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
