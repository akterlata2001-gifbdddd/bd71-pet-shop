"use client";

import { useMemo } from "react";
import { useRouter } from "@/lib/store";
import { ProductDetailPage } from "@/components/pages/product-detail";

// =====================================================
// Client wrapper — receives SSR product data and injects
// it into the Zustand store so ProductDetailPage finds it.
// =====================================================

export function ProductDetailSSR({ product }: { product: any }) {
  // ===== Inject the SSR product SYNCHRONOUSLY during render =====
  // We use useMemo (which runs DURING render, not after) so the
  // store has the product BEFORE the first paint. This eliminates
  // any "Product not found" flash during page navigation.
  //
  // useEffect would run AFTER paint, causing a one-frame blank
  // or "not found" state. useMemo runs DURING render, so the
  // setState call here causes an immediate re-render with the
  // product already in the store.
  useMemo(() => {
    if (!product) return;

    // Set router state
    useRouter.setState({
      page: "product",
      params: { productSlug: product.slug, productId: String(product.id) },
    } as any);

    // Inject product into store if not already present
    const current = useRouter.getState().products;
    const exists = current.find((p) => p.slug === product.slug);
    if (!exists) {
      useRouter.setState((s) => ({
        products: [...s.products, mapApiProduct(product)] as any,
      }));
    }
  }, [product]);

  return <ProductDetailPage />;
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
