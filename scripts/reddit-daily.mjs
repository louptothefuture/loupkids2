#!/usr/bin/env node
/**
 * Daily Reddit digest for Loup: kids + phones/screens, last 24 hours.
 *
 * No pnpm. From a Mac home folder:
 *
 *   cd ~
 *   git clone -b cursor/reddit-daily-scraper-61e1 https://github.com/louptothefuture/loupkids2.git
 *   cd loupkids2
 *   ./scripts/reddit-daily
 *   open data/reddit-daily/latest.html
 *
 * Read-only. Never comments or hijacks Tin Can threads.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const HOUR_MS = 60 * 60 * 1000;
const DEFAULT_HOURS = 24;
const GAP_MS = 12000;

const USER_AGENT =
  process.env.REDDIT_USER_AGENT ??
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

/**
 * One search RSS per cluster (`t=day`) instead of paging /new.
 * Paging /new is what Reddit rate-limits.
 */
const SEARCHES = [
  {
    name: "parenting",
    path: "Mommit+daddit+Parenting+ScienceBasedParenting+toddlers+preteen+ADHDparenting+ParentingADHD",
    q: 'phone OR "screen time" OR ipad OR smartphone OR screenfree OR "first phone" OR gabb',
  },
  {
    name: "screens",
    path: "nosurf+digitalminimalism+dumbphones",
    q: "(kid OR child OR son OR daughter) (phone OR \"screen time\" OR screenfree)",
  },
];

const TIN_CAN =
  /\btin[\s-]?cans?\b|\btincan(?:phone)?\b|\btin can phone\b/i;

const KID =
  /\b(kids?|child(?:ren)?|sons?|daughters?|grand(?:son|daughter)s?|toddlers?|tweens?|teens?|teenagers?|preschoolers?|kindergart(?:en|ners?)|(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|\d{1,2}(?:st|nd|rd|th)?)[- ]graders?|\d{1,2}\s*(?:year[- ]olds?|yo|yr(?:s)?[- ]olds?)|my (?:boy|girl))\b/i;

const DEVICE =
  /\b(phones?|smartphones?|iphones?|ipads?|tablets?|dumbphones?|feature[- ]phones?|screen[- ]times?|screen[- ]free|screenfree|screen[- ]addiction|first[- ]phone|kids?'?[- ]phones?|android phones?|gabb|bark phone|pinwheel|troomi|ticktalk)\b/i;

const HIGH_SIGNAL =
  /\b(first[- ]phone|kids?'?[- ]phones?|screen[- ]free|screenfree|screen[- ]times?|too young for (?:a )?phone|phone (?:before|age)|no[- ]smartphone)\b/i;

const PARENTING_SUBS = new Set([
  "Mommit",
  "daddit",
  "Parenting",
  "ScienceBasedParenting",
  "toddlers",
  "preteen",
  "ADHDparenting",
  "ParentingADHD",
]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function xmlText(block, tag) {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? m[1].trim() : "";
}

function xmlAttr(block, tag, attr) {
  const m = block.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"`, "i"));
  return m ? m[1] : "";
}

function decodeEntities(s) {
  let cur = s;
  for (let i = 0; i < 3; i++) {
    const next = cur
      .replace(/&amp;/g, "&")
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
      .replace(/&nbsp;/gi, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    if (next === cur) break;
    cur = next;
  }
  return cur;
}

function htmlToText(html) {
  const decoded = decodeEntities(html);
  return decoded
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isTinCanThread(text) {
  return TIN_CAN.test(text);
}

function isWithinHours(publishedMs, nowMs, hours) {
  return publishedMs > nowMs - hours * HOUR_MS && publishedMs <= nowMs;
}

function relevance(title, body, subreddit = "") {
  const text = `${title}\n${body}`;
  if (isTinCanThread(text)) return { score: 0, reasons: ["tincan"] };
  const kid = KID.test(text);
  const device = DEVICE.test(text);
  if (!kid || !device) return { score: 0, reasons: [] };
  const high = HIGH_SIGNAL.test(text);
  if (!PARENTING_SUBS.has(subreddit) && !high) return { score: 0, reasons: [] };

  let score = 2;
  const reasons = ["kids+phone/screens"];
  if (high) {
    score += 3;
    reasons.push("first-phone/screen-free");
  }
  if (/\badhd\b/i.test(text)) {
    score += 1;
    reasons.push("adhd");
  }
  return { score, reasons };
}

function parseAtom(xml, fallbackSub) {
  const posts = [];
  const chunks = xml.split(/<entry>/i).slice(1);
  for (const chunk of chunks) {
    const entry = chunk.split(/<\/entry>/i)[0] ?? "";
    const idRaw = xmlText(entry, "id");
    const id = (idRaw.match(/t3_[a-z0-9]+/i) ?? [idRaw])[0];
    if (!id) continue;
    const title = decodeEntities(xmlText(entry, "title"));
    const published = xmlText(entry, "published") || xmlText(entry, "updated");
    const publishedMs = Date.parse(published);
    if (!Number.isFinite(publishedMs)) continue;
    const url = xmlAttr(entry, "link", "href") || `https://www.reddit.com/${id}`;
    const author = decodeEntities(xmlText(entry, "name")).replace(/^\/u\//, "");
    const sub =
      xmlAttr(entry, "category", "label").replace(/^r\//, "") ||
      xmlAttr(entry, "category", "term") ||
      fallbackSub;
    if (!sub || sub === "multi") continue;
    const body = htmlToText(xmlText(entry, "content")).replace(
      /\s*submitted by[\s\S]*$/i,
      "",
    );
    posts.push({ id, subreddit: sub, title, body, author, url, published, publishedMs });
  }
  return posts;
}

async function fetchRss(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });
    if (res.status === 429) {
      if (attempt === 0) {
        console.error("Reddit asked us to slow down. Waiting 25s and retrying once…");
        await sleep(25000);
        continue;
      }
      console.error("Still blocked. Skipping this search.");
      return { status: 429, xml: "" };
    }
    const xml = await res.text();
    return { status: res.status, xml };
  }
  return { status: 429, xml: "" };
}

async function postsFromSearch(search, nowMs, hours) {
  const qs = new URLSearchParams({
    q: search.q,
    restrict_sr: "1",
    sort: "new",
    t: "day",
    limit: "100",
  });
  const url = `https://www.reddit.com/r/${search.path}/search.rss?${qs}`;
  const { status, xml } = await fetchRss(url);
  if (status !== 200 || !xml.includes("<entry>")) {
    console.error(`skip ${search.name} (HTTP ${status})`);
    return [];
  }
  return parseAtom(xml, search.name).filter((post) =>
    isWithinHours(post.publishedMs, nowMs, hours),
  );
}

function formatAge(ms, nowMs) {
  const h = Math.max(0, (nowMs - ms) / HOUR_MS);
  if (h < 1) return `${Math.round(h * 60)}m`;
  return `${h.toFixed(1)}h`;
}

function csvCell(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(hits) {
  const header = ["published", "subreddit", "title", "url", "score", "reasons", "body"];
  const rows = hits.map((h) =>
    [
      h.published,
      h.subreddit,
      h.title,
      h.url,
      h.score,
      (h.reasons ?? []).join("|"),
      h.body,
    ].map(csvCell).join(","),
  );
  return [header.join(","), ...rows].join("\n") + "\n";
}

function htmlEscape(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toHtml(payload) {
  const day = (payload.scrapedAt ?? "").slice(0, 10);
  const posts = payload.posts ?? [];
  const cards = posts
    .map((h) => {
      const snippet = htmlEscape((h.body ?? "").slice(0, 280));
      return `<article>
  <p class="meta">r/${htmlEscape(h.subreddit)} · ${htmlEscape(h.published)} · ${htmlEscape((h.reasons ?? []).join(", "))}</p>
  <h2><a href="${htmlEscape(h.url)}">${htmlEscape(h.title)}</a></h2>
  <p>${snippet}${(h.body ?? "").length > 280 ? "…" : ""}</p>
</article>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Loup Reddit daily ${htmlEscape(day)}</title>
<style>
  body { margin: 0 auto; max-width: 44rem; padding: 2rem 1.25rem 4rem; font: 16px/1.45 ui-sans-serif, system-ui, sans-serif; color: #111; }
  h1 { font-size: 1.4rem; font-weight: 650; }
  .sub { color: #444; margin-bottom: 2rem; }
  article { border-top: 1px solid #111; padding: 1.1rem 0 1.3rem; }
  .meta { font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase; color: #555; }
  h2 { font-size: 1.05rem; margin: 0.35rem 0 0.4rem; }
  a { color: inherit; }
  p { margin: 0.4rem 0 0; }
</style>
<h1>Loup Reddit daily</h1>
<p class="sub">${htmlEscape(day)} · ${posts.length} posts · scanned ${payload.scanned ?? "?"} · ${payload.skippedTinCan ?? 0} Tin Can skipped · local file, not on loupkids.com</p>
${cards || "<p>Nothing matched kids + phones/screens in this window.</p>"}
</html>
`;
}

async function writeReports(outDir, payload) {
  const day = (payload.scrapedAt ?? new Date().toISOString()).slice(0, 10);
  await mkdir(outDir, { recursive: true });
  const jsonFile = join(outDir, `${day}.json`);
  const csvFile = join(outDir, `${day}.csv`);
  const htmlFile = join(outDir, `${day}.html`);
  const latestHtml = join(outDir, "latest.html");
  const latestCsv = join(outDir, "latest.csv");
  await writeFile(jsonFile, JSON.stringify(payload, null, 2));
  await writeFile(csvFile, toCsv(payload.posts ?? []));
  const html = toHtml(payload);
  await writeFile(htmlFile, html);
  await writeFile(latestHtml, html);
  await writeFile(latestCsv, toCsv(payload.posts ?? []));
  console.error(`wrote ${jsonFile}`);
  console.error(`wrote ${csvFile}`);
  console.error(`open ${htmlFile}`);
}

function printDigest(hits, nowMs, hours, skippedTinCan, scanned) {
  const since = new Date(nowMs - hours * HOUR_MS).toISOString();
  console.log(`Loup Reddit daily — last ${hours}h (since ${since})`);
  console.log(
    `${hits.length} relevant · scanned ${scanned} posts · ${skippedTinCan} Tin Can threads skipped\n`,
  );
  if (!hits.length) {
    console.log("Nothing matched kids + phones/screens in this window.");
    return;
  }
  for (const hit of hits) {
    console.log(
      `[r/${hit.subreddit}] ${formatAge(hit.publishedMs, nowMs)} ago · ${hit.reasons.join(", ")}`,
    );
    console.log(hit.title);
    console.log(hit.url);
    const snippet = hit.body.slice(0, 220);
    if (snippet) console.log(snippet + (hit.body.length > 220 ? "…" : ""));
    console.log("");
  }
}

function printHelp() {
  console.log(`Loup Reddit daily — kids + phones/screens, last 24h. Read-only.

From your Mac, paste this whole block:

  cd /Users/jen/loupkids2
  git pull origin cursor/reddit-daily-scraper-61e1
  /Users/jen/loupkids2/scripts/reddit-daily
  open /Users/jen/loupkids2/data/reddit-daily/latest.csv

Writes data/reddit-daily/YYYY-MM-DD.json, .csv, and .html
(local files, not a page on loupkids.com)

Options:
  --watch         run again every 24 hours
  --self-check    no network; verify filters
  --hours 24      lookback window
  --out DIR       output directory
  --from-json F   rebuild csv/html from a saved json
  --help
`);
}

function parseArgs(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exit(0);
  }
  const watch = argv.includes("--watch");
  const selfCheck = argv.includes("--self-check");
  const hoursIdx = argv.indexOf("--hours");
  const hours = hoursIdx >= 0 ? Number(argv[hoursIdx + 1]) : DEFAULT_HOURS;
  const outIdx = argv.indexOf("--out");
  const outDir = outIdx >= 0 ? argv[outIdx + 1] : join(REPO, "data/reddit-daily");
  if (!Number.isFinite(hours) || hours <= 0 || hours > 168) {
    throw new Error("--hours must be 1–168");
  }
  const fromJsonIdx = argv.indexOf("--from-json");
  const fromJson = fromJsonIdx >= 0 ? argv[fromJsonIdx + 1] : "";
  return { watch, selfCheck, hours, outDir, fromJson };
}

function selfCheck() {
  const now = Date.parse("2026-08-20T18:00:00Z");
  const checks = [
    ["tincan title dropped", isTinCanThread("Anyone try the TinCan phone for kids?")],
    ["tincan spaced dropped", isTinCanThread("tin can vs gabb for a 9 year old")],
    ["tin canister kept", !isTinCanThread("tin canister of snacks at school")],
    [
      "first phone hits",
      relevance("When should my 10 year old get a phone?", "", "daddit").score > 0,
    ],
    ["adult phone miss", relevance("Best flagship Android 2026", "", "ADHD").score === 0],
    [
      "adhd phone without kid miss",
      relevance("ADHD makes me lose my phone", "", "ADHD").score === 0,
    ],
    [
      "screen time hits",
      relevance("Screen time for my 8yo is out of control", "", "Mommit").score > 0,
    ],
    [
      "adult dumbphone miss",
      relevance(
        "The dumbphone 2 is perfect",
        "All my photos of my kids are in iCloud.",
        "dumbphones",
      ).score === 0,
    ],
    [
      "teen phone-case miss",
      relevance("Added Batman charm to my phone case", "", "teenagers").score === 0,
    ],
    ["within 24h", isWithinHours(now - 2 * HOUR_MS, now, 24)],
    ["older than 24h", !isWithinHours(now - 25 * HOUR_MS, now, 24)],
    ["future dropped", !isWithinHours(now + HOUR_MS, now, 24)],
    ["csv quotes commas", csvCell('a, "b"') === '"a, ""b"""'],
    ["html escapes", htmlEscape("<x>") === "&lt;x&gt;"],
  ];

  const xml = `<?xml version="1.0"?><feed><entry><id>t3_abc123</id><title>First phone for my son?</title><published>2026-08-20T12:00:00+00:00</published><link href="https://www.reddit.com/r/daddit/comments/abc123/first_phone/" /><author><name>/u/dad</name></author><category term="daddit" label="r/daddit"/><content type="html">&lt;p&gt;He is 11.&lt;/p&gt;</content></entry></feed>`;
  const parsed = parseAtom(xml, "daddit");
  checks.push(["atom id", parsed[0]?.id === "t3_abc123"]);
  checks.push(["atom title", parsed[0]?.title === "First phone for my son?"]);
  checks.push(["atom body", parsed[0]?.body === "He is 11."]);

  let failed = 0;
  for (const [name, ok] of checks) {
    if (!ok) {
      console.error("FAIL", name);
      failed++;
    }
  }
  if (failed) {
    process.exitCode = 1;
    return;
  }
  console.log(`self-check ok (${checks.length})`);
}

function collectHits(windowPosts) {
  let skippedTinCan = 0;
  const hits = [];
  for (const post of windowPosts) {
    const rel = relevance(post.title, post.body, post.subreddit);
    if (rel.reasons.includes("tincan")) {
      skippedTinCan++;
      continue;
    }
    if (rel.score <= 0) continue;
    hits.push({ ...post, ...rel });
  }
  hits.sort((a, b) => b.score - a.score || b.publishedMs - a.publishedMs);
  return { hits, skippedTinCan };
}

async function saveHits(outDir, nowMs, hours, windowPosts) {
  const { hits, skippedTinCan } = collectHits(windowPosts);
  await writeReports(outDir, {
    scrapedAt: new Date(nowMs).toISOString(),
    hours,
    skippedTinCan,
    scanned: windowPosts.length,
    posts: hits,
  });
  console.error(`OPEN CSV: open ${join(outDir, "latest.csv")}`);
  return { hits, skippedTinCan };
}

async function runOnce(hours, outDir) {
  const nowMs = Date.now();
  const seen = new Set();
  const windowPosts = [];
  const csvPath = join(outDir, "latest.csv");

  console.error("Leave this window open. Do not start a second copy.");
  console.error("Two Reddit searches only (last 24h). CSV is written after the first one.");
  console.error(`The CSV does not exist until you see: OPEN CSV: open ${csvPath}`);

  for (let i = 0; i < SEARCHES.length; i++) {
    const search = SEARCHES[i];
    if (i > 0) await sleep(GAP_MS);
    process.stderr.write(`search ${search.name}…\n`);
    const posts = await postsFromSearch(search, nowMs, hours);
    for (const post of posts) {
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      windowPosts.push(post);
    }
    await saveHits(outDir, nowMs, hours, windowPosts);
  }

  const { hits, skippedTinCan } = collectHits(windowPosts);
  printDigest(hits, nowMs, hours, skippedTinCan, windowPosts.length);
}

async function main() {
  if (typeof fetch !== "function") {
    console.error("Need Node 18+ (you have " + process.version + "). On a Mac: brew install node");
    process.exit(1);
  }
  const args = parseArgs(process.argv.slice(2));
  if (args.selfCheck) {
    selfCheck();
    return;
  }
  if (args.fromJson) {
    const payload = JSON.parse(await readFile(args.fromJson, "utf8"));
    await writeReports(args.outDir, payload);
    return;
  }
  await runOnce(args.hours, args.outDir);
  if (!args.watch) return;
  for (;;) {
    const next = new Date(Date.now() + args.hours * HOUR_MS);
    console.error(`sleeping until ${next.toISOString()}`);
    await sleep(args.hours * HOUR_MS);
    await runOnce(args.hours, args.outDir);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
