import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/seo-fetchers";
import { stripSchemaMarkup } from "@/lib/clean-description";
import { ProductDetailSSR } from "./product-ssr-client";

// =====================================================
// /product/[slug] — Server-Rendered Product Page (SEO)
// =====================================================
// This route renders the FULL product HTML on the server so
// Googlebot can read title, description, price, images, and
// structured data WITHOUT executing JavaScript.
//
// The client component (ProductDetailSSR) hydrates and takes
// over interactivity after mount.
// =====================================================

export const revalidate = 60; // ISR — revalidate every 60s

// ===== Generate static metadata for SEO =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | BD71 Pet Shop",
      robots: { index: false, follow: true },
    };
  }

  const name = product.name ?? "Product";
  const description =
    product.short_description ??
    product.seo_description ??
    `${name} — premium pet product from BD71 Pet Shop. Fast delivery across Bangladesh.`;
  const image =
    product.featured_image ??
    (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null);
  const cleanDesc = stripSchemaMarkup(String(description))
    .replace(/<[^>]*>/g, "")
    .slice(0, 160);

  return {
    title: `${name} | BD71 Pet Shop`,
    description: cleanDesc,
    keywords: [name, product.brand, product.category_name, "pet food Bangladesh"].filter(Boolean),
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: name,
      description: cleanDesc,
      url: `/product/${slug}`,
      type: "website",
      images: image ? [{ url: image, alt: name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: cleanDesc,
      images: image ? [image] : [],
    },
    robots: {
      index: product.status !== "draft",
      follow: true,
    },
  };
}

// ===== Page component — server renders initial HTML =====
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const name = product.name ?? "Product";
  const price = product.sale_price ?? product.base_price ?? 0;
  const oldPrice = product.base_price && product.sale_price ? product.base_price : undefined;
  const image =
    product.featured_image ??
    (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null);
  const description = product.description ?? product.short_description ?? "";
  const cleanDesc = stripSchemaMarkup(String(description)).replace(/<[^>]*>/g, " ").trim();

  // ===== Product JSON-LD structured data for Google rich results =====
  const productSchema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: cleanDesc.slice(0, 300),
    sku: product.sku ?? undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category_name ?? undefined,
    image: image ? [image] : undefined,
    offers: {
      "@type": "Offer",
      price: Number(price),
      priceCurrency: product.currency ?? "BDT",
      availability:
        (product.stock_quantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `/product/${slug}`,
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
        .toISOString()
        .split("T")[0],
    },
    aggregateRating:
      product.avg_rating && product.avg_rating > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(product.avg_rating),
            reviewCount: Number(product.review_count ?? 0),
          }
        : undefined,
  };

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(productSchema));

  return (
    <>
      {/* Structured data — Google reads this for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
      />

      {/* Hidden SEO content — visible to bots that don't run JS */}
      <noscript>
        <div>
          <h1>{name}</h1>
          {product.brand && <p>Brand: {product.brand}</p>}
          <p>Price: ৳{Number(price).toLocaleString()}</p>
          {oldPrice && <p>Regular price: ৳{Number(oldPrice).toLocaleString()}</p>}
          {product.category_name && <p>Category: {product.category_name}</p>}
          {cleanDesc && <p>{cleanDesc.slice(0, 500)}</p>}
          {image && <img src={image} alt={name} />}
        </div>
      </noscript>

      {/* The interactive client-side product page */}
      <ProductDetailSSR product={product} />
    </>
  );
}
