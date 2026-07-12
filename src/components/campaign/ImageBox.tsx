import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";

/** Campaign chrome image slot — real asset, same footprint as old ImageBox. */
export function ImageBox({
  src,
  alt = "",
  className = "",
  objectFit = "cover",
}: {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      <LoupkidsImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={objectFit === "contain" ? "object-contain p-4" : "object-cover"}
      />
    </div>
  );
}
