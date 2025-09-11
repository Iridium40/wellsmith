import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}='${key}']`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (!href) return;
  let link = document.head.querySelector<HTMLLinkElement>(
    "link[rel='canonical']",
  );
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  image,
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);

    // Robots
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");

    // Open Graph
    if (title) upsertMeta("property", "og:title", title);
    if (description) upsertMeta("property", "og:description", description);
    if (image) upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:type", type);
    if (publishedTime) upsertMeta("property", "article:published_time", publishedTime);
    if (modifiedTime) upsertMeta("property", "article:modified_time", modifiedTime);
    if (author) upsertMeta("property", "article:author", author);
    if (section) upsertMeta("property", "article:section", section);
    if (tags) {
      tags.forEach(tag => upsertMeta("property", "article:tag", tag));
    }

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    if (title) upsertMeta("name", "twitter:title", title);
    if (description) upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    // Canonical
    const url =
      canonical || (typeof window !== "undefined" ? window.location.href : "");
    if (url) setCanonical(url);
  }, [title, description, image, canonical, type, publishedTime, modifiedTime, author, section, tags, noindex]);

  return null;
}
