"use client";

import { FEED_LOOP } from "@/lib/content/story";

/** Feed words on a rotating ring — what LOUP breaks out of */
export function FeedLoopRing({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-lg ${className}`}>
      <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
        {FEED_LOOP.map((word, i) => {
          const angle = (i / FEED_LOOP.length) * 360;
          return (
            <span
              key={word}
              className="absolute left-1/2 top-1/2 origin-center text-sm font-bold uppercase tracking-wide line-through decoration-2 opacity-70"
              style={{
                transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="display-landing text-center text-2xl sm:text-3xl">Break the loop</span>
      </div>
    </div>
  );
}
