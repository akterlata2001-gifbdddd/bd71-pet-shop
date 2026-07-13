import { fetchAllProducts, fetchAllPosts, fetchCategories } from "@/lib/seo-fetchers";

// =====================================================
// /sitemap.xml — Dynamic sitemap generated from CMS data
// =====================================================
// Next.js App Router: any file named sitemap.ts in /app
// automatically serves /sitemap.xml.
//
// Includes:
//   - Static pages (home, shop, about, contact, blog)
//   - All active products (/product/[slug])
//   - All published blog posts (/blog/[slug])
//   - All categories (/category/[slug])
// =====================================================

const BASE_URL = "https://bd71shop.com.bd";

export default async function sitemap() {
  // Fetch all data in parallel
  const [products, posts, categories] = await Promise.all([
    fetchAllProducts(),
    fetchAllPosts(),
    fetchCategories(),
  ]);

  // Static pages
  const staticPages = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "daily" as const, lastModified: new Date() },
    { url: `${BASE_URL}/shop`, priority: 0.9, changeFrequency: "daily" as const, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "daily" as const, lastModified: new Date() },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: "monthly" as const, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: "monthly" as const, lastModified: new Date() },
  ];

  // Product pages
  const productPages = (products ?? [])
    .filter((p: any) => p.status !== "draft" && p.slug)
    .map((p: any) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    }));

  // Blog post pages
  const postPages = (posts ?? [])
    .filter((p: any) => p.status !== "draft" && p.slug)
    .map((p: any) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      priority: 0.6,
      changeFrequency: "weekly" as const,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(p.published_at ?? new Date()),
    }));

  // Category pages
  const categoryPages = (categories ?? [])
    .filter((c: any) => c.slug)
    .map((c: any) => ({
      url: `${BASE_URL}/category/${c.slug}`,
      priority: 0.6,
      changeFrequency: "weekly" as const,
      lastModified: new Date(),
    }));

  return [...staticPages, ...productPages, ...postPages, ...categoryPages];
}
