"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { PageMeta } from "@/components/site/page-meta";
import { StoreInitializer } from "@/components/site/store-initializer";
import { getSocialLinks, type SocialLink } from "@/lib/social-links";

// =====================================================
// LayoutShell — wraps ALL pages with header/footer/cart
// =====================================================

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  // Fetch social links on mount
  useEffect(() => {
    getSocialLinks().then(setSocialLinks);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreInitializer />
      <PageMeta />
      <SiteHeader socialLinks={socialLinks} />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter socialLinks={socialLinks} />
      <CartDrawer />
    </div>
  );
}
