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

    // Determine what the store SHOULD be for this URL
    let newPage: PageId = "home";
    let newParams: any = {};

    if (PATH_TO_PAGE[path]) {
      newPage = PATH_TO_PAGE[path];
    } else if (path.startsWith("/product/")) {
      const slug = path.split("/")[2];
      if (slug) {
        newPage = "product";
        newParams = { productSlug: slug };
      }
    } else if (path.startsWith("/blog/")) {
      const slug = path.split("/")[2];
      if (slug) {
        newPage = "blog-single";
        newParams = { blogSlug: slug };
      }
    }

    // Only update the store if the page or params ACTUALLY changed.
    // Without this check, every navigation triggers:
    //   1. navigate() → set({ page, params })  → UI renders
    //   2. router.push() → URL changes
    //   3. RouteSync → set({ page, params })  → UI renders AGAIN
    // This causes the "content appears, then page reloads, then
    // content appears again" double-render pattern.
    const current = useRouter.getState();
    const currentSlug = current.params?.productSlug || current.params?.blogSlug;
    const newSlug = newParams?.productSlug || newParams?.blogSlug;
    if (current.page === newPage && currentSlug === newSlug) {
      // Already in sync — no update needed
      return;
    }

    useRouter.setState({ page: newPage, params: newParams } as any);
  }, [pathname]);

  return null;
}
