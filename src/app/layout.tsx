import type { Metadata } from "next";
import { Fredoka, Quicksand, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteInfo } from "@/lib/data";
import { generateOrganizationSchema, serializeSchema } from "@/lib/schema";
import { LayoutShell } from "@/components/site/layout-shell";

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

export const metadata: Metadata = {
  title: "BD71 Pet Shop | Premium Pet Food Online in Bangladesh",
  description:
    "Shop premium pet food for cats, dogs, birds & fish at BD71 Pet Shop. Genuine products, affordable prices, fast delivery across Bangladesh.",
  keywords: [
    "pet food Bangladesh",
    "cat food",
    "dog food",
    "BD71 Pet Shop",
    "pet shop Dhaka",
    "premium pet food",
  ],
  authors: [{ name: "BD71 Pet Shop" }],
  openGraph: {
    title: "BD71 Pet Shop | Premium Pet Food Online in Bangladesh",
    description:
      "Shop premium pet food for cats, dogs, birds & fish at BD71 Pet Shop. Genuine products, affordable prices, fast delivery.",
    url: "https://bd71shop.com.bd",
    siteName: "BD71 Pet Shop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD71 Pet Shop",
    description: "Premium pet food online in Bangladesh",
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema(siteInfo);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-load site config from localStorage BEFORE React */}
        <script dangerouslySetInnerHTML={{ __html: logoInitScript }} />
        {/* Site-wide Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(organizationSchema) }}
        />
      </head>
      <body
        className={`${fredoka.variable} ${quicksand.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <LayoutShell>{children}</LayoutShell>
        <Toaster />
      </body>
    </html>
  );
}
