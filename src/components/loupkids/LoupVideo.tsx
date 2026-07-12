"use client";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Mute + autoplay loop — default for marketing clips */
  autoPlay?: boolean;
};

/** Minimal autoplay loop video for product/lifestyle clips. */
export function LoupVideo({ src, poster, className = "", autoPlay = true }: Props) {
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
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
