"use client";

/** Page chrome title bands removed — keep an accessible page name only. */
export function LoupkidsPageHeader({
  title,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return <h1 className="sr-only">{title}</h1>;
}
