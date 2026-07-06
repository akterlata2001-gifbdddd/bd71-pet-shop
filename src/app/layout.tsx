import type { Metadata } from "next";
import { Fredoka, Quicksand, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    "Shop premium pet food for cats, dogs, birds & fish at BD71 Pet Shop. Genuine products, affordable prices & fast delivery across Bangladesh.",
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
      "Shop premium pet food for cats, dogs, birds & fish at BD71 Pet Shop. Genuine products, affordable prices & fast delivery.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${quicksand.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
