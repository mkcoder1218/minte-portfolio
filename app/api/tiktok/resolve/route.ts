import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "vt.tiktok.com",
  "vm.tiktok.com",
]);

function extractVideoId(value: string) {
  return value.match(/\/video\/(\d+)/)?.[1]
    ?? value.match(/\"itemId\"\s*:\s*\"(\d+)\"/)?.[1]
    ?? value.match(/data-video-id=[\"'](\d+)[\"']/)?.[1]
    ?? null;
}

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing TikTok URL" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid TikTok URL" }, { status: 400 });
  }

  if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: "Only TikTok URLs are allowed" }, { status: 400 });
  }

  const directId = extractVideoId(target.toString());
  if (directId) {
    return NextResponse.json({ videoId: directId });
  }

  try {
    const response = await fetch(target.toString(), {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MintePortfolio/1.0)",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const resolvedUrl = response.url;
    let videoId = extractVideoId(resolvedUrl);

    if (!videoId) {
      const html = await response.text();
      videoId = extractVideoId(html);
    }

    if (!videoId) {
      return NextResponse.json({ error: "TikTok video ID could not be resolved" }, { status: 422 });
    }

    const result = NextResponse.json({ videoId });
    result.headers.set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return result;
  } catch {
    return NextResponse.json({ error: "TikTok preview could not be resolved" }, { status: 502 });
  }
}
