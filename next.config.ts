import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "glsjqdbglzfyyrqkpwfi.supabase.co" },
      { protocol: "https", hostname: "bd71shop.com.bd" },
      { protocol: "https", hostname: "cms-lac-two.vercel.app" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Enable experimental features for better caching
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
