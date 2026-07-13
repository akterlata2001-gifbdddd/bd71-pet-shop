"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { ProductDetailPage } from "@/components/pages/product-detail";
import { StoreInitializer } from "@/components/site/store-initializer";

// =====================================================
// Client wrapper — receives SSR product data and injects
// it into the Zustand store so ProductDetailPage finds it.
// =====================================================

export function ProductDetailSSR({ product }: { product: any }) {
  const allProducts = useRouter((s) => s.products);
  const dataLoaded = useRouter((s) => s.dataLoaded);

  useEffect(() => {
    if (!product) return;
    // Set router state WITHOUT pushing URL (we're already on the right URL).
    // Direct set() bypasses the navigate() URL push.
    useRouter.setState({
      page: "product",
      params: { productSlug: product.slug, productId: String(product.id) },
    } as any);

    // If product isn't already in store, inject it
    const exists = allProducts.find((p) => p.slug === product.slug);
    if (!exists && dataLoaded) {
      useRouter.setState((s) => ({
        products: [...s.products, mapApiProduct(product)] as any,
      }));
    }
  }, [product, allProducts.length, dataLoaded]);

  return (
    <>
      <StoreInitializer />
      <ProductDetailPage />
    </>
  );
}

function mapApiProduct(p: any) {
  return {
    id: parseInt(String(p.id).replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1e6),
    slug: p.slug,
    name: p.name,
    brand: p.brand ?? "",
    price: Number(p.sale_price ?? p.base_price ?? 0),
    oldPrice: p.base_price && p.sale_price ? Number(p.base_price) : undefined,
    rating: Number(p.avg_rating ?? 0),
    reviews: Number(p.review_count ?? 0),
    emoji: "🐾",
    bg: "from-amber-glow/20 to-terracotta/10",
    category: p.category_slug ?? "uncategorized",
    categoryName: p.category_name ?? "Product",
    weight: p.weight ? `${p.weight}kg` : "",
    inStock: (p.stock_quantity ?? 0) > 0,
    sku: p.sku ?? "",
    description: p.description ?? "",
    shortDescription: p.short_description ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    featured_image: p.featured_image ?? null,
  };
}
