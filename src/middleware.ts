import { NextRequest, NextResponse } from "next/server";

// =====================================================
// SPA fallback + SEO Redirect middleware
// =====================================================
// This frontend is a client-side SPA using Zustand for routing.
// All routes (/, /shop, /blog, /product/123, etc.) render
// the same page.tsx which handles routing internally.
//
// SEO REDIRECTS: Before rewriting to /, we check the CMS API
// for any redirect rules. If a redirect exists for the current
// path, we return the appropriate HTTP redirect (301/302).
// This preserves SEO link juice when URLs change.
// =====================================================

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

// In-memory redirect cache (5 min TTL)
interface CachedRedirect {
  found: boolean;
  destination?: string;
  statusCode?: number;
  cachedAt: number;
}
const redirectCache = new Map<string, CachedRedirect>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Don't process the root path or Next.js internals
  if (pathname === "/" || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ===== SEO Redirect Check =====
  // Check cache first
  const cached = redirectCache.get(pathname);
  const now = Date.now();
  if (cached && now - cached.cachedAt < CACHE_TTL) {
    if (cached.found && cached.destination) {
      return NextResponse.redirect(
        new URL(cached.destination, req.url),
        cached.statusCode ?? 301
      );
    }
  } else {
    // Cache expired or not found — check CMS API
    try {
      const res = await fetch(
        `${CMS_API}/api/v1/sites/${CMS_SITE_ID}/redirects?path=${encodeURIComponent(pathname)}`,
        {
          headers: { "X-API-Key": CMS_API_KEY },
          signal: AbortSignal.timeout(3000), // 3s timeout — don't block too long
        }
      );
      const json = await res.json();

      if (json.found && json.redirect?.destination) {
        // Cache positive result
        redirectCache.set(pathname, {
          found: true,
          destination: json.redirect.destination,
          statusCode: json.redirect.statusCode,
          cachedAt: now,
        });

        return NextResponse.redirect(
          new URL(json.redirect.destination, req.url),
          json.redirect.statusCode ?? 301
        );
      }

      // Cache negative result (no redirect found)
      redirectCache.set(pathname, { found: false, cachedAt: now });
    } catch {
      // API failed — don't block the user, just continue to SPA
      // Don't cache failures
    }
  }

  // Rewrite all other paths to / — the SPA handles routing
  return NextResponse.rewrite(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
