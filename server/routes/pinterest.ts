import type { RequestHandler } from "express";
import { XMLParser } from "fast-xml-parser";
import type { PinterestResponse, PinterestPin } from "@shared/api";

function toRssUrl(url: string) {
  const u = url.trim();
  if (u.endsWith(".rss")) return u;
  // Pinterest board RSS format: https://www.pinterest.com/<user>/<board>.rss (no trailing slash)
  return u.replace(/\/$/, "") + ".rss";
}

function extractImageFromItem(item: any): string | undefined {
  // 1) media:content variants
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

  // 2) enclosure element
  const enclosure = item.enclosure;
  if (enclosure) {
    if (Array.isArray(enclosure)) {
      for (const e of enclosure) {
        const url = e?.["@_url"] || e?.url;
        if (typeof url === "string") return url;
      }
    } else {
      const url = enclosure?.["@_url"] || enclosure?.url;
      if (typeof url === "string") return url;
    }
  }

  // 3) media:thumbnail
  const thumb = item["media:thumbnail"] || item.mediaThumbnail;
  if (thumb) {
    if (Array.isArray(thumb)) {
      for (const t of thumb) {
        const url = t?.["@_url"] || t?.url;
        if (typeof url === "string") return url;
      }
    } else {
      const url = thumb?.["@_url"] || thumb?.url;
      if (typeof url === "string") return url;
    }
  }

  // 4) content:encoded OR description HTML, pick first <img src="...">
  const html = item["content:encoded"] || item.content || item.description || "";
  if (typeof html === "string") {
    const imgTag = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgTag) return imgTag[1];
    // sometimes data-pin-media has the image
    const dataMedia = html.match(/data-pin-media=["']([^"']+)["']/i);
    if (dataMedia) return dataMedia[1];
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

    const r = await fetch(rssUrl, { headers: { "user-agent": "WellSmithBot/1.0", accept: "application/rss+xml, text/xml; q=0.9, */*;q=0.8" } });
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
