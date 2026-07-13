"use client";

import { useState, useEffect } from "react";
import { siteInfo as defaultSiteInfo } from "@/lib/data";
import { getSocialLinks, type SocialLink } from "@/lib/social-links";

// =====================================================
// Site Config — dynamic site identity from CMS
// =====================================================
// Fetches branding + settings from CMS and overrides
// the hardcoded siteInfo. Used by LayoutShell to pass
// dynamic data to Header, Footer, and all pages.
// =====================================================

export interface SiteConfig {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  brandColor: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
}

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

const DEFAULT_CONFIG: SiteConfig = {
  siteName: defaultSiteInfo.name,
  logoUrl: "",
  faviconUrl: "",
  brandColor: "#F97316",
  tagline: defaultSiteInfo.name,
  phone: defaultSiteInfo.phone,
  email: defaultSiteInfo.email,
  address: defaultSiteInfo.address,
  socialLinks: [],
};

let cachedConfig: SiteConfig | null = null;

export async function fetchSiteConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig;

  try {
    const [settingsRes, socialLinks] = await Promise.all([
      fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/settings`, {
        headers: { "X-API-Key": CMS_API_KEY },
        next: { revalidate: 300 },
      }),
      getSocialLinks(),
    ]);

    const settingsJson = await settingsRes.json();
    const settings = settingsJson.success ? (settingsJson.data?.settings ?? {}) : {};

    // Try to fetch branding (logo/favicon)
    let branding: any = {};
    try {
      const brandingRes = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/branding`, {
        headers: { "X-API-Key": CMS_API_KEY },
        next: { revalidate: 300 },
      });
      const brandingJson = await brandingRes.json();
      if (brandingJson.success) branding = brandingJson.data?.branding ?? {};
    } catch {}

    const config: SiteConfig = {
      siteName: settings.site_name || defaultSiteInfo.name,
      logoUrl: branding.logo_url || settings.logo_url || "",
      faviconUrl: branding.favicon_url || "",
      brandColor: branding.brand_color || "#F97316",
      tagline: branding.tagline || branding.brand_name || settings.site_name || defaultSiteInfo.name,
      phone: settings.phone || defaultSiteInfo.phone,
      email: settings.notification_email || settings.contact_email || defaultSiteInfo.email,
      address: settings.address || defaultSiteInfo.address,
      socialLinks,
    };

    cachedConfig = config;

    // Update favicon if set
    if (config.faviconUrl && typeof document !== "undefined") {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = config.faviconUrl;
    }

    // Update document title with site name
    if (config.siteName && typeof document !== "undefined") {
      document.title = document.title.replace(defaultSiteInfo.name, config.siteName);
    }

    return config;
  } catch {
    return { ...DEFAULT_CONFIG, socialLinks: cachedConfig?.socialLinks ?? [] };
  }
}

// React hook for components
export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(cachedConfig ?? DEFAULT_CONFIG);

  useEffect(() => {
    fetchSiteConfig().then(setConfig);
  }, []);

  return config;
}

export function getSiteConfigSync(): SiteConfig {
  return cachedConfig ?? DEFAULT_CONFIG;
}
