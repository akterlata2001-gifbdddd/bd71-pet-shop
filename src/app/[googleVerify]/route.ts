// =====================================================
// /google<hash>.html — Dynamic Google Search Console verification
// =====================================================
// Matches any URL like /google<hash>.html and returns the
// verification content from CMS store_settings
// (seo_googleVerification).
//
// IMPORTANT: This is a catch-all dynamic route — it matches
// ANY single-segment URL. We must strictly validate that the
// requested path matches the pattern `google[0-9a-f]+.html`
// before processing. If it doesn't match, we return 404 so
// Next.js can render the custom not-found page instead.
//
// Google generates a unique verification file per property.
// The tenant admin pastes the verification content (e.g.
// "google-site-verification: google123abc.html") in the CMS
// dashboard's "Google Search Console" field under
// Integrations → Google.
// =====================================================

import { NextRequest } from "next/server";
import { getSiteIntegrations, extractGoogleVerificationFilename } from "@/lib/site-integrations";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

// Strict pattern: google + hex chars + .html
// Example: google123abc.html, googled3d6b5a93f9e7ccf.html
const GOOGLE_VERIFICATION_PATTERN = /^google[0-9a-f]+\.html$/i;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ googleVerify: string }> }
) {
  const { googleVerify: rawParam } = await params;

  // Reconstruct the full filename from the route param.
  // Next.js strips the .html extension from the param, so we
  // need to re-add it. The param is everything between "google"
  // and ".html" — but only if the original URL had .html.
  //
  // Example: URL = /google123abc.html → param = "123abc"
  //          URL = /google → param = "" (no .html, should 404)
  //          URL = /google-test → param = "-test" (should 404)
  //
  // We check the raw URL path to see if it ends with .html.
  const url = new URL(_req.url);
  const fullPath = url.pathname; // e.g. /google123abc.html or /google

  // Strict validation: only process if the path matches the
  // Google verification file pattern exactly.
  const filename = fullPath.replace(/^\//, ""); // remove leading /
  if (!GOOGLE_VERIFICATION_PATTERN.test(filename)) {
    // Not a valid Google verification file URL — return 404
    // so Next.js renders the custom not-found page.
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Fetch verification content from CMS
  const integrations = await getSiteIntegrations();

  if (!integrations.googleVerification) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Extract the expected filename from the verification content
  const expectedFilename = extractGoogleVerificationFilename(integrations.googleVerification);
  if (!expectedFilename) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Security: only serve the file if the request matches the
  // expected filename. This prevents enumeration of arbitrary paths.
  if (filename !== expectedFilename) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response(integrations.googleVerification, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
