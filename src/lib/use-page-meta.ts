"use client";

// =====================================================
// Dynamic SEO metadata for the storefront SPA.
// =====================================================
// Background:
//   This site is a single-page-app — `app/layout.tsx` exports a static
//   Next.js `metadata` object that's the same on every URL. Search
//   engines and social scrapers see identical title/description no
//   matter which page they fetch.
//
//   This hook runs client-side and updates `document.title`, the
//   `<meta name="description">` tag, Open Graph tags, and the canonical
//   URL whenever the router navigates to a new page or the active
//   product/post changes.
//
// Usage:
//   import { usePageMeta } from "@/lib/use-page-meta";
//   function SomePage() {
//     usePageMeta({ title: "...", description: "..." });
//     ...
//   }
//
//   Or call `setPageMeta(...)` directly when you need to update meta
//   from inside an effect (e.g. after fetching a product by slug).
// =====================================================

import { useEffect } from "react";

export type PageMeta = {
  title: string;
  description: string;
  /** Canonical path (e.g. "/product/whiskas-1kg"). Optional. */
  path?: string;
  /** OG image URL. Falls back to site default. */
  image?: string;
  /** Optional keywords (comma-separated string). */
  keywords?: string;
  /** Set true for product/article pages — switches OG type to "article". */
  isArticle?: boolean;
};

const SITE_NAME = "BD71 Pet Shop";
const DEFAULT_IMAGE = "https://bd71shop.com.bd/og-default.jpg";
const BASE_URL = "https://bd71shop.com.bd";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Imperative setter — use when you can't use the hook. */
export function setPageMeta(meta: PageMeta) {
  if (typeof window === "undefined") return;

  const fullTitle = meta.title.includes(SITE_NAME)
    ? meta.title
    : `${meta.title} | ${SITE_NAME}`;

  document.title = fullTitle;

  upsertMeta("name", "description", meta.description);
  if (meta.keywords) upsertMeta("name", "keywords", meta.keywords);

  // Open Graph
  upsertMeta("property", "og:title", fullTitle);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:type", meta.isArticle ? "article" : "website");
  upsertMeta("property", "og:image", meta.image || DEFAULT_IMAGE);

  // Twitter
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", fullTitle);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", meta.image || DEFAULT_IMAGE);

  // Canonical
  const canonical = meta.path
    ? meta.path.startsWith("http")
      ? meta.path
      : `${BASE_URL}${meta.path}`
    : `${BASE_URL}${window.location.pathname}`;
  upsertCanonical(canonical);
}

/**
 * Hook: updates document meta whenever `meta` changes.
 * Pass `null` to skip (useful while loading).
 */
export function usePageMeta(meta: PageMeta | null) {
  useEffect(() => {
    if (!meta) return;
    setPageMeta(meta);
  }, [
    meta?.title,
    meta?.description,
    meta?.path,
    meta?.image,
    meta?.keywords,
    meta?.isArticle,
  ]);
}
