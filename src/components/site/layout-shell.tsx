"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { PageMeta } from "@/components/site/page-meta";
import { StoreInitializer } from "@/components/site/store-initializer";
import { fetchSiteConfig, type SiteConfig } from "@/lib/site-config";

// =====================================================
// LayoutShell — wraps ALL pages with header/footer/cart
// =====================================================

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetchSiteConfig().then(setConfig);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreInitializer />
      <PageMeta />
      <SiteHeader
        socialLinks={config?.socialLinks ?? []}
        siteName={config?.siteName}
        logoUrl={config?.logoUrl}
        phone={config?.phone}
      />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter
        socialLinks={config?.socialLinks ?? []}
        siteName={config?.siteName}
        logoUrl={config?.logoUrl}
        phone={config?.phone}
        email={config?.email}
        address={config?.address}
      />
      <CartDrawer />
    </div>
  );
}
