"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/lib/store";
import type { PageId } from "@/lib/store";

// =====================================================
// RouteSync — keeps the Zustand store's `page` and
// `params` fields in sync with the actual URL.
// =====================================================
//
// When the user navigates (either via store.navigate()
// → router.push(), or via browser back/forward, or via a
// direct link), Next.js updates the URL. This component
// listens for pathname changes and updates the store so
// every page component sees the correct page ID + params.
//
// Without this, pressing the browser Back button would
// change the URL but NOT update the store's `page` field,
// causing the wrong page component to render.
// =====================================================

// URL path → page mapping
const PATH_TO_PAGE: Record<string, PageId> = {
  "/": "home",
  "/shop": "shop",
  "/cart": "cart",
  "/checkout": "checkout",
  "/about": "about",
  "/contact": "contact",
  "/blog": "blog",
  "/privacy": "privacy",
  "/terms": "terms",
  "/dmca": "dmca",
  "/disclaimer": "disclaimer",
  "/account": "account",
};

export function RouteSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Normalize: remove trailing slash (except root)
    const path = pathname.replace(/\/$/, "") || "/";

    // Direct page match
    if (PATH_TO_PAGE[path]) {
      useRouter.setState({ page: PATH_TO_PAGE[path], params: {} } as any);
      return;
    }

    // /product/{slug}
    if (path.startsWith("/product/")) {
      const slug = path.split("/")[2];
      if (slug) {
        useRouter.setState({
          page: "product",
          params: { productSlug: slug },
        } as any);
      }
      return;
    }

    // /blog/{slug}
    if (path.startsWith("/blog/")) {
      const slug = path.split("/")[2];
      if (slug) {
        useRouter.setState({
          page: "blog-single",
          params: { blogSlug: slug },
        } as any);
      }
      return;
    }

    // Unknown path — default to home
    useRouter.setState({ page: "home", params: {} } as any);
  }, [pathname]);

  return null;
}
