import type { Metadata } from "next";
import { Fredoka, Quicksand, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteInfo } from "@/lib/data";
import { generateOrganizationSchema, serializeSchema } from "@/lib/schema";
import { LayoutShell } from "@/components/site/layout-shell";
import { getSiteIntegrations } from "@/lib/site-integrations";
import { getSiteName, DEFAULT_SITE_NAME } from "@/lib/site-name";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// =====================================================
// Revalidate layout every 60 seconds so changes to CMS
// integrations (AdSense, Analytics, etc.) appear without
// a full redeploy. The layout is a server component that
// fetches from CMS — without this, it would be cached at
// build time and CMS changes wouldn't show until next deploy.
// =====================================================
export const revalidate = 60;

// =====================================================
// Dynamic metadata — uses the site_name from CMS so each
// tenant's pages show their own brand name in the title.
// Falls back to "BD71 Pet Shop" if CMS is unreachable.
// =====================================================
export async function generateMetadata(): Promise<Metadata> {
  const siteName = await getSiteName();

  return {
    title: {
      default: `${siteName} | Premium Pet Food Online in Bangladesh`,
      template: `%s | ${siteName}`,
    },
    description:
      `Shop premium pet food for cats, dogs, birds & fish at ${siteName}. Genuine products, affordable prices, fast delivery across Bangladesh.`,
    keywords: [
      "pet food Bangladesh",
      "cat food",
      "dog food",
      siteName,
      "pet shop Dhaka",
      "premium pet food",
    ],
    authors: [{ name: siteName }],
    openGraph: {
      title: `${siteName} | Premium Pet Food Online in Bangladesh`,
      description:
        `Shop premium pet food for cats, dogs, birds & fish at ${siteName}. Genuine products, affordable prices, fast delivery.`,
      url: "https://bd71shop.com.bd",
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: "Premium pet food online in Bangladesh",
    },
  };
}

// =====================================================
// Inline script — sets logo + site config from localStorage
// BEFORE React hydrates. This ensures the logo <img> tag
// renders with the correct src on the very first paint.
// No flash, no delay, no placeholder.
// =====================================================
const logoInitScript = `
(function(){
  try {
    var raw = localStorage.getItem('pn_site_config_v1');
    if (!raw) return;
    var config = JSON.parse(raw);
    window.__SITE_CONFIG__ = config;
    if (config.faviconUrl) {
      var link = document.querySelector("link[rel='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = config.faviconUrl;
      if (!link.parentNode) document.head.appendChild(link);
    }
  } catch(e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema(siteInfo);

  // Fetch all third-party integrations from CMS (Google Analytics,
  // Tag Manager, AdSense, Search Console verification, custom
  // header/body scripts). Cached for 5 minutes server-side.
  const integrations = await getSiteIntegrations();

  // Build dynamic verification meta tags
  const verification: any = {};
  if (integrations.googleVerification) {
    verification.google = integrations.googleVerification;
  }
  if (integrations.bingVerification) {
    verification.other = { "msvalidate.01": integrations.bingVerification };
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ===== Favicon — server-rendered for instant load ===== */}
        {/* This <link> tag is in the HTML from the very first byte,
            so the browser loads the favicon immediately — no JS
            delay. The inline script below is a fallback for when
            the CMS branding changes (it updates the href after
            React hydrates). */}
        {integrations.faviconUrl && (
          <>
            <link rel="icon" href={integrations.faviconUrl} type="image/png" />
            <link rel="apple-touch-icon" href={integrations.faviconUrl} />
          </>
        )}
        {/* Fallback favicon if CMS branding is not configured */}
        {!integrations.faviconUrl && (
          <link rel="icon" href="/favicon.ico" />
        )}

        {/* Pre-load site config from localStorage BEFORE React */}
        <script dangerouslySetInnerHTML={{ __html: logoInitScript }} />
        {/* Site-wide Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(organizationSchema) }}
        />

        {/* ===== Google Tag Manager (head part) ===== */}
        {/* GTM loads analytics, ads, and other tags via a single
            container. If both GTM and GA4 are set, GTM takes
            precedence (GA4 can be loaded via GTM). */}
        {integrations.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${integrations.googleTagManagerId}');`,
            }}
          />
        )}

        {/* ===== Google Analytics 4 (only if no GTM) ===== */}
        {/* If GTM is configured, GA4 should be loaded via GTM
            instead of this standalone script to avoid double
            counting. */}
        {integrations.googleAnalyticsId && !integrations.googleTagManagerId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${integrations.googleAnalyticsId}');`,
              }}
            />
          </>
        )}

        {/* ===== Google AdSense ===== */}
        {/* Loaded async so it doesn't block page render. The
            publisher ID (ca-pub-XXX) is configured per-tenant
            in the CMS dashboard.
            
            The inline script initializes adsbygoogle and pushes
            an empty ad request — this enables Auto ads (Google
            automatically places ads in optimal positions).
            
            Without the push call, the AdSense script loads but
            never actually requests ads — that's why ads weren't
            showing even though the script was in <head>. */}
        {integrations.adsensePublisherId && (
          <>
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${integrations.adsensePublisherId}`}
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
              }}
            />
          </>
        )}

        {/* ===== Facebook Pixel ===== */}
        {integrations.facebookPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${integrations.facebookPixelId}');
fbq('track', 'PageView');`,
            }}
          />
        )}

        {/* ===== Custom header scripts (raw HTML from CMS) ===== */}
        {/* Tenant admins can paste any <script>, <meta>, <link>
            tags here via the CMS dashboard's "Header Scripts"
            field in SEO settings. */}
        {integrations.headerScripts && (
          <div dangerouslySetInnerHTML={{ __html: integrations.headerScripts }} />
        )}
      </head>
      <body
        className={`${fredoka.variable} ${quicksand.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* Google Tag Manager (noscript body part) */}
        {integrations.googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${integrations.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <LayoutShell>{children}</LayoutShell>

        {/* Custom body scripts (raw HTML from CMS) — loaded at end of body */}
        {integrations.bodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: integrations.bodyScripts }} />
        )}

        <Toaster />
      </body>
    </html>
  );
}
