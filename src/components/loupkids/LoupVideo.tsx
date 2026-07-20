"use client";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  fit?: "contain" | "cover";
  autoPlay?: boolean;
};

/** Minimal autoplay loop video for product/lifestyle clips. */
export function LoupVideo({ src, poster, className = "", fit = "contain", autoPlay = true }: Props) {
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";
  return (
    <video
      className={`h-full w-full ${fitClass} ${className}`}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
