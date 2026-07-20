// =====================================================
// /googled3d6b5a93f9e7ccf.html — Google Search Console verification
// =====================================================
// Google Search Console requires this file to be served at the
// site root with the EXACT content below. The filename and
// content are unique per-site — Google generates them when you
// add a property to Search Console.
//
// Once Google crawls this URL and sees the matching content,
// the site is verified and you can access Search Console data:
//   - Index coverage
//   - Search performance
//   - Crawl errors
//   - Sitemap submission
//
// This is a static route handler — content is fixed at build
// time and served with no-cache so Google always sees the
// latest version.
// =====================================================

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const content = "google-site-verification: googled3d6b5a93f9e7ccf.html";
  return new Response(content, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
