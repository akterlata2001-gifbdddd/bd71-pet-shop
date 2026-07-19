"use client";

import { useEffect } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { setNavigationAdapter } from "@/lib/store";

// =====================================================
// NavigationBridge — connects Next.js App Router to the
// Zustand store's navigate() function.
// =====================================================
//
// Problem:
//   The Zustand store is a plain JavaScript module — it
//   can't call React hooks like `useRouter()` from
//   next/navigation. So when navigate() was called, it
//   used `window.location.href` (full page reload),
//   causing the loading flash between page transitions.
//
// Solution:
//   This component:
//     1. Calls `useRouter()` from next/navigation (client-side router)
//     2. Registers `router.push` as the global navigation adapter
//     3. On unmount, deregisters it (cleanup)
//
//   Now when store.navigate("shop") is called, it invokes
//   the adapter → router.push("/shop") → Next.js handles
//   the route change client-side. No page reload. No flash.
//
//   This component is rendered ONCE in the root layout,
//   so it's always mounted across all pages.
// =====================================================

export function NavigationBridge() {
  const router = useNextRouter();

  useEffect(() => {
    // Register the adapter — store.navigate() will call this
    setNavigationAdapter((url: string) => {
      router.push(url);
    });

    // Cleanup on unmount (safety — should never unmount in practice)
    return () => {
      setNavigationAdapter(null);
    };
  }, [router]);

  return null;
}
