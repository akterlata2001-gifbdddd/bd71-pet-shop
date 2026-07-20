// =====================================================
// /google<hash>.html — Dynamic Google Search Console verification
// =====================================================
// Matches any URL like /google<hash>.html and returns the
// verification content from CMS store_settings
// (seo_googleVerification).
//
// Google generates a unique verification file per property.
// The tenant admin pastes the verification content (e.g.
// "google-site-verification: google123abc.html") in the CMS
// dashboard's "Google Search Console" field under
// Integrations → Google.
//
// This dynamic route handles ALL google*.html requests, so
// tenants don't need to redeploy when Google generates a new
// verification file.
// =====================================================

import { NextRequest } from "next/server";
import { getSiteIntegrations, extractGoogleVerificationFilename } from "@/lib/site-integrations";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ googleVerify: string }> }
) {
  const { googleVerify: requestedFile } = await params;

  // Fetch verification content from CMS
  const integrations = await getSiteIntegrations();

  if (!integrations.googleVerification) {
    return new Response("Google Search Console verification not configured", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Extract the expected filename from the verification content
  const expectedFilename = extractGoogleVerificationFilename(integrations.googleVerification);
  if (!expectedFilename) {
    return new Response("Invalid verification format", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // The URL path is /google<hash>.html — the param is the part
  // after "google" and before ".html". Reconstruct the filename.
  const requestedFilename = `google${requestedFile}.html`;

  // Security: only serve the file if the request matches the
  // expected filename. This prevents enumeration of arbitrary paths.
  if (requestedFilename !== expectedFilename) {
    return new Response("Not found", {
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
