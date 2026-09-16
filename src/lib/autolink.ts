/** Splits prose into text and bare-URL segments so cited sources render as links. */
export type LinkSegment = { type: "text" | "url"; value: string };

const URL_PATTERN = /https?:\/\/[^\s<>"]+/g;

export function splitUrls(text: string): LinkSegment[] {
  const segments: LinkSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const start = match.index ?? 0;
    // Trailing sentence punctuation belongs to the prose, not the href.
    const url = match[0].replace(/[.,;:)\]]+$/, "");

    if (start > cursor) segments.push({ type: "text", value: text.slice(cursor, start) });
    segments.push({ type: "url", value: url });
    cursor = start + url.length;
  }

  if (cursor < text.length) segments.push({ type: "text", value: text.slice(cursor) });
  return segments;
}
