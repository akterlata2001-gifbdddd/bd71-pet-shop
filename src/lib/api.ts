// =====================================================
// CMS API Client — connects to Cynlex CMS backend
// =====================================================
// Environment variables needed (.env.local):
//   NEXT_PUBLIC_CMS_API_URL=https://cms-lac-two.vercel.app
//   NEXT_PUBLIC_CMS_SITE_ID=lata-test
//   NEXT_PUBLIC_CMS_API_KEY=pk_xxx (for orders/writes only)
// =====================================================

const API_URL = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1/sites/${SITE_ID}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? "API error");
  return json.data as T;
}

// ===== Types =====
export interface CMSProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  sku: string | null;
  base_price: number;
  sale_price: number | null;
  currency: string;
  stock_quantity: number;
  is_featured: boolean;
  images: string[];
  featured_image: string | null;
  category_id: string | null;
  tags: string[];
  attributes: Record<string, string[]>;
  avg_rating: number;
  review_count: number;
  weight: number | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface CMSPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string | null;
  tags: string[];
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface CMSSettings {
  site_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  currency: string;
  currency_symbol: string;
  flat_shipping_rate: number;
  free_shipping_threshold: number | null;
}

// ===== Products =====
export async function getProducts(opts?: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}) {
  const params = new URLSearchParams();
  params.set("page", String(opts?.page ?? 1));
  params.set("pageSize", String(opts?.pageSize ?? 12));
  if (opts?.category) params.set("categorySlug", opts.category);
  if (opts?.search) params.set("search", opts.search);
  return api<{ products: CMSProduct[] }>(`/products?${params}`);
}

export async function getProductBySlug(slug: string) {
  const { products } = await api<{ products: CMSProduct[] }>(`/products?search=${slug}`);
  return products[0] ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  const { products } = await api<{ products: CMSProduct[] }>(`/products?pageSize=${limit}`);
  return products.filter((p) => p.is_featured).slice(0, limit);
}

// ===== Posts (Blog) =====
export async function getPosts(page = 1) {
  return api<{ posts: CMSPost[] }>(`/posts?page=${page}`);
}

export async function getPostBySlug(slug: string) {
  const { posts } = await api<{ posts: CMSPost[] }>(`/posts?search=${slug}`);
  return posts[0] ?? null;
}

// ===== Pages =====
export async function getPages() {
  return api<{ pages: CMSPage[] }>(`/pages`);
}

export async function getPageBySlug(slug: string) {
  const { pages } = await api<{ pages: CMSPage[] }>(`/pages?search=${slug}`);
  return pages[0] ?? null;
}

// ===== Settings =====
export async function getSettings() {
  return api<{ settings: CMSSettings }>(`/settings`);
}

// ===== Orders =====
export async function createOrder(data: {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    zip?: string;
    country: string;
  };
  items: { productId: string; quantity: number; price: number }[];
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  couponCode?: string;
}) {
  return api<{ order: { id: string; order_number: string } }>(`/orders`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ===== Coupons =====
export async function validateCoupon(code: string, cartTotal: number) {
  return api<{ valid: boolean; discountAmount: number; newTotal: number; reason?: string }>(
    `/coupons/validate`,
    { method: "POST", body: JSON.stringify({ code, cartTotal }) }
  );
}
