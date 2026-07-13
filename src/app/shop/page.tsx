import type { Metadata } from "next";
import { ShopSSR } from "./shop-ssr-client";

// =====================================================
// /shop — Server-Rendered Shop Page (SEO)
// =====================================================

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shop All Pet Products | BD71 Pet Shop",
  description:
    "Browse our full range of premium pet food, treats, litter, toys, and accessories. Genuine products with fast delivery across Bangladesh.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop All Pet Products | BD71 Pet Shop",
    description: "Browse our full range of premium pet food, treats, litter, toys, and accessories.",
    url: "/shop",
    type: "website",
  },
};

export default function ShopPage() {
  return <ShopSSR />;
}
