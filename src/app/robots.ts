import type { MetadataRoute } from "next";

// =====================================================
// /robots.txt — Dynamic robots.txt with sitemap reference
// =====================================================
// Next.js App Router: any file named robots.ts in /app
// automatically serves /robots.txt.
// =====================================================

const BASE_URL = "https://bd71shop.com.bd";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/account"], // private/user-specific pages
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/cart", "/checkout", "/account"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
