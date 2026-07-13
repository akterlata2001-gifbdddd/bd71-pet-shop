"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { PageMeta } from "@/components/site/page-meta";
import { StoreInitializer } from "@/components/site/store-initializer";
import { getSocialLinks } from "@/lib/social-links";

// =====================================================
// LayoutShell — wraps ALL pages with header/footer/cart
// =====================================================

export function LayoutShell({ children }: { children: React.ReactNode }) {
  // Pre-fetch social links on mount so header/footer render them
  useEffect(() => {
    getSocialLinks();
  }, []);

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
