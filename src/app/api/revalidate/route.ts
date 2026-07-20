import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ROUTE_TAGS: Record<string, string[]> = {
  homepage: ["/"],
  about: ["/about"],
  setup: ["/setup"],
  faq: ["/faq"],
  testimonials: ["/"],
  post: ["/journal", "/blog"],
  "site-settings": ["/"],
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Revalidation not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const type = body._type ?? "all";
  const revalidated: string[] = [];

  if (type === "all") {
    for (const tag of Object.keys(ROUTE_TAGS)) {
      revalidateTag(tag);
      revalidated.push(tag);
    }
    revalidatePath("/", "layout");
  } else {
    revalidateTag(type);
    revalidated.push(type);
    for (const route of ROUTE_TAGS[type] ?? []) {
      revalidatePath(route);
      if (body.slug?.current && (type === "post")) {
        revalidatePath(`/journal/${body.slug.current}`);
        revalidatePath(`/blog/${body.slug.current}`);
      }
    }
  }

  return NextResponse.json({ ok: true, revalidated, receivedType: type });
}
