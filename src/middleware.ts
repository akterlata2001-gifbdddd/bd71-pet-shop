import { NextResponse } from "next/server";

// =====================================================
// Catch-all rewrite — sends all routes to / (SPA mode)
// =====================================================
// This frontend is a client-side SPA using Zustand for routing.
// All routes (/, /shop, /blog, /product/123, etc.) should
// render the same page.tsx which handles routing internally.
// =====================================================

export function middleware() {
  // Rewrite all paths to / so the SPA handles them
  const url = new NextResponse().headers;
  return NextResponse.rewrite(new URL("/", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
}

export const config = {
  // Match all paths EXCEPT api routes, _next, static files, images
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
