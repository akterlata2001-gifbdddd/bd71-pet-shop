"use client";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { PageMeta } from "@/components/site/page-meta";
import { StoreInitializer } from "@/components/site/store-initializer";

// =====================================================
// LayoutShell — wraps ALL pages with header/footer/cart
// =====================================================
// Lives in root layout so every route gets the same chrome.
// =====================================================

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreInitializer />
      <PageMeta />
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
