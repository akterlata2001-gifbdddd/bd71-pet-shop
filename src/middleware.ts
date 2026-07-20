import { NextRequest, NextResponse } from "next/server";

// =====================================================
// SEO Redirect middleware
// =====================================================
// This middleware handles ONLY SEO redirects (301/302) configured
// in the CMS dashboard under URL Redirects.
//
// Previously, this middleware also rewrote all unknown URLs to "/"
// so the SPA could handle routing. That's no longer needed because
// the storefront now uses Next.js App Router with proper file-based
// routing (/shop, /product/[slug], /blog/[slug], etc.). Unknown
// URLs now fall through to Next.js's built-in 404 page (src/app/
// not-found.tsx) — which returns a proper HTTP 404 status code
// for SEO instead of a soft-404.
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
    // Negative cache hit — no redirect configured, let Next.js
    // handle the route normally (404 if no matching file).
    return NextResponse.next();
  }

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

    // Cache negative result (no redirect found) — Next.js will
    // handle the route via its file-system routing. If no route
    // matches, the user sees the custom 404 page (HTTP 404).
    redirectCache.set(pathname, { found: false, cachedAt: now });
  } catch {
    // API failed — don't block the user, let Next.js handle it.
    // Don't cache failures.
  }

  // Let Next.js handle the route normally (file-system routing
  // → matches a page, or renders the 404 page if no match).
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude: API routes, Next.js internals, static assets (images,
    // fonts, icons), and well-known root files like robots.txt,
    // sitemap.xml, ads.txt, Google Search Console verification
    // files (google*.html), etc. These are served as static files
    // from /public or via route handlers — middleware must NOT
    // intercept them.
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|google[0-9a-f]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|html|woff|woff2)$).*)",
  ],
};
