import Image from "next/image";

export function LoupkidsImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  sizes,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  const unoptimized = src.endsWith(".gif") || src.endsWith(".svg");

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={className}
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      priority={priority}
      sizes={sizes}
      className={className}
      unoptimized={unoptimized}
    />
  );
}
