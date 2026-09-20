import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export async function GET() {
  const posts = await getPosts();
  const journalLinks = posts
    .slice(0, 10)
    .map((p) => `- [${p.title}](${SITE.url}/journal/${p.slug})`)
    .join("\n");

  const body = `# LOUP — ${SITE.tagline}

> ${SITE.description}

LOUP is a screenless, parent-controlled first phone for children. It replaces the smartphone-or-nothing dilemma with a purpose-built voice device: approved contacts only, no feeds, no browser, no algorithms. Parents set contacts and quiet hours from a companion app. Kids get real independence without the internet.

## Product

- **Name:** LOUP
- **Price:** WiFi $149 pre-order / $199 launch · WiFi + LTE $199 pre-order / $249 launch
- **Calling:** Loup-to-Loup is free. External contacts $10/month. LTE included on the WiFi + LTE model.
- **Hardware:** E-ink display, tactile scroll wheel, anodized aluminum sides, USB-C, mute, speaker, volume
- **Parent app:** iOS and Android; whitelist contacts, set quiet hours, page the device
- **Website:** ${SITE.url}
- **Shop:** ${SITE.url}/shop/loup

## Key pages

- [Home](${SITE.url})
- [Shop — Loup device](${SITE.url}/shop/loup)
- [How it works / Setup](${SITE.url}/setup)
- [The story / About](${SITE.url}/about)
- [FAQ](${SITE.url}/faq)
- [Journal](${SITE.url}/journal)
- [Resources for parents](${SITE.url}/resources)
- [Help center](${SITE.url}/help)

## Journal (selected)

${journalLinks}

## Brand

- **Mission:** Give kids connection without distraction. Give parents peace of mind without surveillance.
- **Category:** Screenless kids phone / screenless wellness / first phone
- **Founded:** 2025
- **Contact:** ${SITE.email}
- **Press:** ${SITE.press}

## What LOUP is not

LOUP is not a lobotomized smartphone, a smartwatch, or a tethered landline. It is a purpose-built communication device with no app store, no open browser, and no algorithmic feed — designed from the ground up for children ages 6–14.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
