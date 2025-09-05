import type { RequestHandler } from "express";
import { XMLParser } from "fast-xml-parser";
import type { PinterestResponse, PinterestPin } from "@shared/api";

function toRssUrl(url: string) {
  const u = url.trim();
  if (u.endsWith(".rss")) return u;
  // Pinterest board URLs look like https://www.pinterest.com/<user>/<board>/
  return u.replace(/\/?$/, "/") + ".rss";
}

function extractImageFromItem(item: any): string | undefined {
  // Try media:content first
  const media = item["media:content"] || item.mediaContent || item.media || undefined;
  if (media) {
    if (Array.isArray(media)) {
      for (const m of media) {
        const url = m?.["@_url"] || m?.url;
        if (typeof url === "string") return url;
      }
    } else {
      const url = media?.["@_url"] || media?.url;
      if (typeof url === "string") return url;
    }
  }
  // Fallback to content:encoded and pick first img src
  const html = item["content:encoded"] || item.content || "";
  if (typeof html === "string") {
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m) return m[1];
  }
  return undefined;
}

export const handlePinterest: RequestHandler = async (req, res) => {
  try {
    const board = (req.query.board as string) || process.env.PINTEREST_BOARD_URL;
    if (!board) {
      return res.status(400).json({ error: "Missing Pinterest board URL. Provide ?board= or set PINTEREST_BOARD_URL." });
    }
    const rssUrl = toRssUrl(board);

    const r = await fetch(rssUrl, { headers: { "user-agent": "WellSmithBot/1.0" } });
    if (!r.ok) {
      return res.status(502).json({ error: `Failed to fetch RSS (${r.status})` });
    }
    const xml = await r.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const data = parser.parse(xml);

    const items: any[] = data?.rss?.channel?.item || [];
    const pins: PinterestPin[] = items.map((it) => ({
      title: String(it.title ?? ""),
      link: String(it.link ?? ""),
      image: extractImageFromItem(it) || "",
    })).filter((p) => p.image && p.link);

    const resp: PinterestResponse = { pins };
    res.json(resp);
  } catch (e) {
    console.error("Pinterest route error", e);
    res.status(500).json({ error: "Internal error" });
  }
};
