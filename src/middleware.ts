import { NextRequest, NextResponse } from "next/server";

// =====================================================
// SPA fallback — rewrite all routes to / 
// =====================================================
// This frontend is a client-side SPA using Zustand for routing.
// All routes (/, /shop, /blog, /product/123, etc.) render
// the same page.tsx which handles routing internally.
// =====================================================

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Don't rewrite the root path or Next.js internals
  if (pathname === "/" || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Rewrite all other paths to / — the SPA handles routing
  return NextResponse.rewrite(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
