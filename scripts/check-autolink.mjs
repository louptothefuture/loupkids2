/**
 * Self-check for journal source autolinking.
 *
 * Usage: node --experimental-strip-types scripts/check-autolink.mjs
 */
import assert from "node:assert/strict";
import { splitUrls } from "../src/lib/autolink.ts";

const cited = splitUrls("UNESCO guidance: https://www.unesco.org/en/articles/guidance. Read it.");
assert.deepEqual(cited, [
  { type: "text", value: "UNESCO guidance: " },
  { type: "url", value: "https://www.unesco.org/en/articles/guidance" },
  { type: "text", value: ". Read it." },
]);

assert.deepEqual(splitUrls("No links here."), [{ type: "text", value: "No links here." }]);

const two = splitUrls("http://a.example/x and https://b.example/y");
assert.equal(two.filter((s) => s.type === "url").length, 2);

// A URL containing punctuation mid-path must survive intact.
assert.deepEqual(splitUrls("https://x.example/a,b/c"), [
  { type: "url", value: "https://x.example/a,b/c" },
]);

console.log("autolink checks passed");
