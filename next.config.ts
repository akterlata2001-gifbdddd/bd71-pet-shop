import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "glsjqdbglzfyyrqkpwfi.supabase.co" },
      { protocol: "https", hostname: "bd71shop.com.bd" },
      { protocol: "https", hostname: "cms-lac-two.vercel.app" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.vercel.app" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: false,
  // CRITICAL: Explicit rewrites to override any stale Vercel edge _redirects.
  // Next.js rewrites run AFTER edge redirects but are processed at the
  // application layer, ensuring our dynamic routes always win.
  async rewrites() {
    return [
      // Let Next.js handle ALL routes natively — no SPA fallback
      // Empty array = use file-system routing only
    ];
  },
  async headers() {
    return [
      {
        // Force CDN to revalidate every request — no stale cache
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
