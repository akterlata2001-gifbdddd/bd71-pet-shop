// =====================================================
// Data layer — fetches from CMS API, falls back to static
// =====================================================
// This file replaces the old static data with live API calls.
// All components import from here — no changes needed in components.
// =====================================================

// ===== Types (kept same as before for compatibility) =====

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  emoji: string;
  bg: string;
  tag?: string;
  category: string;
  categoryName: string;
  weight: string;
  inStock: boolean;
  sku: string;
  slug?: string;
  description?: string;
  images?: string[];
  featured_image?: string;
};

export type BlogPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: { heading: string; body: string }[];
  date: string;
  readTime: string;
  comments: number;
  author: string;
  emoji: string;
  bg: string;
  slug?: string;
  cover_image?: string;
};

// ===== Static data (kept as fallback + for non-migrated content) =====

export const siteInfo = {
  name: "BD71 Pet Shop",
  legalName: "Bd71 Pet Shop",
  domain: "bd71shop.com.bd",
  email: "contact@bd71shop.com.bd",
  phone: "01627-001719",
  address: "Bus Stand, Savar, Dhaka",
  hours: "Monday to Sunday: Always Open (24/7)",
  founder: "Late Akter",
  founded: "2021",
};

export const categories = [
  {
    id: "cat",
    name: "For Cats",
    count: 209,
    desc: "Premium cat food, litter & care",
    emoji: "🐱",
    bg: "from-amber-glow/30 to-terracotta/15",
    longDesc: "Discover our extensive range of premium cat food, treats, litter, and accessories.",
  },
  {
    id: "dog",
    name: "For Dogs",
    count: 84,
    desc: "Dog food, toys & grooming",
    emoji: "🐶",
    bg: "from-sage/25 to-terracotta/15",
    longDesc: "Everything your dog needs — from premium food to toys and grooming supplies.",
  },
  {
    id: "fish",
    name: "Fish & Aquarium",
    count: 12,
    desc: "Aquarium supplies & fish food",
    emoji: "🐟",
    bg: "from-ocean/25 to-sage/15",
    longDesc: "Aquarium supplies, fish food, and everything for your aquatic friends.",
  },
  {
    id: "bird",
    name: "Birds",
    count: 8,
    desc: "Bird food & cages",
    emoji: "🐦",
    bg: "from-terracotta/20 to-amber-glow/15",
    longDesc: "Bird food, cages, and accessories for your feathered friends.",
  },
  {
    id: "litter",
    name: "Litter & Hygiene",
    count: 6,
    desc: "Cat litter & cleaning supplies",
    emoji: "🧹",
    bg: "from-sage/20 to-ocean/15",
    longDesc: "Cat litter, cleaning supplies, and hygiene products.",
  },
  {
    id: "care",
    name: "Pet Care",
    count: 10,
    desc: "Health & wellness products",
    emoji: "💊",
    bg: "from-terracotta/20 to-sage/15",
    longDesc: "Health and wellness products for your pets.",
  },
];

export const aboutContent = {
  title: "About BD71 Pet Shop",
  subtitle: "Your trusted partner in pet care since 2021",
  story: `BD71 Pet Shop began with a simple mission: to provide pet owners in Bangladesh with access to genuine, high-quality pet food and supplies at fair prices. Founded in 2021 by Late Akter, our journey started from a small shop at Savar, Dhaka, and has grown into one of the most trusted online pet supply destinations in the country.

What sets us apart is our commitment to authenticity. Every product we sell is 100% genuine — we source directly from authorized distributors and manufacturers. No counterfeits, no expired stock, no compromises.

Today, we serve thousands of happy pet parents across Bangladesh, delivering everything from premium cat and dog food to aquarium supplies, bird cages, and pet healthcare products. Our 24/7 availability and fast delivery ensure your pets never go hungry.`,
  stats: [
    { label: "Happy Customers", value: "5,000+" },
    { label: "Products Available", value: "300+" },
    { label: "Orders Delivered", value: "15,000+" },
    { label: "Years of Service", value: "4+" },
  ],
  values: [
    {
      title: "100% Genuine Products",
      desc: "We source directly from authorized distributors. No counterfeits, ever.",
    },
    {
      title: "Fast Delivery",
      desc: "Same-day delivery in Dhaka, 1-2 days nationwide. Your pet won't wait.",
    },
    {
      title: "Expert Support",
      desc: "Our team includes pet owners who understand your needs. Call us anytime.",
    },
    {
      title: "Fair Prices",
      desc: "We negotiate bulk deals and pass savings to you. No inflated margins.",
    },
  ],
};

export const contactContent = {
  title: "Get in Touch",
  subtitle: "We're here 24/7 to help with your pet needs",
};

export type LegalSection = { heading: string; body: string; bullets?: string[] };
export type LegalDoc = { title: string; lastUpdated: string; sections: LegalSection[] };

export const legalContent: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "March 2025",
    sections: [
      { heading: "Information We Collect", body: "We collect information you provide when placing orders, creating accounts, or contacting us. This includes name, phone number, email, and delivery address." },
      { heading: "How We Use Your Information", body: "Order processing, delivery, customer support, and promotional communications (with your consent)." },
      { heading: "Information Sharing", body: "We share delivery details with courier partners only. We never sell your data to third parties." },
      { heading: "Data Security", body: "We use SSL encryption and secure servers. Payment information is processed through certified payment gateways." },
      { heading: "Contact Us", body: "For privacy concerns, email contact@bd71shop.com.bd or call 01627-001719." },
    ],
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "March 2025",
    sections: [
      { heading: "1. Orders & Payment", body: "By placing an order, you agree to pay the listed price including delivery charges. Prices may change without notice." },
      { heading: "2. Delivery", body: "We deliver across Bangladesh. Dhaka: same-day or next-day. Outside Dhaka: 1-3 business days." },
      { heading: "3. Returns & Refunds", body: "Products can be returned within 7 days if unopened and in original packaging. Refunds processed within 7 business days." },
      { heading: "4. Product Authenticity", body: "All products are 100% genuine, sourced from authorized distributors." },
      { heading: "5. Contact", body: "Questions? Email contact@bd71shop.com.bd or call 01627-001719." },
    ],
  },
  dmca: {
    title: "DMCA Policy",
    lastUpdated: "March 2025",
    sections: [
      { heading: "Copyright Infringement Notification", body: "If you believe any content on our website infringes your copyright, submit a formal DMCA takedown request." },
      { heading: "Required Information", body: "Physical/electronic signature, identification of copyrighted work, your contact information, and good faith belief statement." },
      { heading: "Contact Us", body: "Send DMCA notices to contact@bd71shop.com.bd." },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "March 2025",
    sections: [
      { heading: "General Information", body: "Product information, images, and descriptions are provided for general guidance only. Actual products may vary." },
      { heading: "Pet Care Advice", body: "Blog articles are for informational purposes only. Always consult a veterinarian for medical advice." },
      { heading: "Product Availability", body: "We strive to keep stock updated but cannot guarantee availability. Out-of-stock items will be refunded." },
      { heading: "External Links", body: "We are not responsible for content on external websites we may link to." },
      { heading: "Contact Us", body: "Questions? Email contact@bd71shop.com.bd." },
    ],
  },
};

// ===== CMS API Connection =====

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

async function cmsFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": CMS_API_KEY,
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? "API error");
  return json.data as T;
}

// Map CMS product to frontend Product type
function mapProduct(p: any): Product {
  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || 0,
    name: p.name,
    brand: p.tags?.[0] || "BD71",
    price: p.base_price,
    oldPrice: p.sale_price ? p.base_price : undefined,
    rating: p.avg_rating || 0,
    reviews: p.review_count || 0,
    emoji: "🐾",
    bg: "from-amber-glow/30 to-terracotta/20",
    tag: p.is_featured ? "Featured" : undefined,
    category: p.tags?.[0]?.toLowerCase() || "cat",
    categoryName: p.tags?.[0] || "Pet Products",
    weight: p.weight ? `${p.weight}kg` : "",
    inStock: p.stock_quantity > 0,
    sku: p.sku || "",
    slug: p.slug,
    description: p.description,
    images: p.images,
    featured_image: p.featured_image || p.images?.[0],
  };
}

// Map CMS post to frontend BlogPost type
function mapPost(p: any): BlogPost {
  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || 0,
    category: p.tags?.[0] || "Pet Care",
    title: p.title,
    excerpt: p.excerpt || "",
    content: [{ heading: p.title, body: p.content || "" }],
    date: new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    comments: 0,
    author: p.author_name || "BD71",
    emoji: "🐾",
    bg: "from-amber-glow/20 to-terracotta/15",
    slug: p.slug,
    cover_image: p.cover_image,
  };
}

// ===== Live data fetchers (with static fallback) =====

let _productsCache: Product[] | null = null;
let _postsCache: BlogPost[] | null = null;

export async function fetchProducts(): Promise<Product[]> {
  if (_productsCache) return _productsCache;
  try {
    const data = await cmsFetch<{ products: any[] }>("/products");
    _productsCache = data.products.map(mapProduct);
    return _productsCache;
  } catch (e) {
    console.warn("CMS API fetch failed, using empty products:", e);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await cmsFetch<{ products: any[] }>(`/products?search=${slug}`);
    return data.products.length > 0 ? mapProduct(data.products[0]) : null;
  } catch {
    return null;
  }
}

export async function fetchPosts(): Promise<BlogPost[]> {
  if (_postsCache) return _postsCache;
  try {
    const data = await cmsFetch<{ posts: any[] }>("/posts");
    _postsCache = data.posts.map(mapPost);
    return _postsCache;
  } catch (e) {
    console.warn("CMS API fetch failed for posts:", e);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await cmsFetch<{ posts: any[] }>(`/posts?search=${slug}`);
    return data.posts.length > 0 ? mapPost(data.posts[0]) : null;
  } catch {
    return null;
  }
}

export async function fetchSettings(): Promise<any> {
  try {
    const data = await cmsFetch<{ settings: any }>("/settings");
    return data.settings;
  } catch {
    return null;
  }
}

export async function createOrder(orderData: any): Promise<{ order_number: string }> {
  const data = await cmsFetch<{ order: { id: string; order_number: string } }>("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return data.order;
}

// ===== Static products (kept as fallback, used by client components before hydration) =====
// These are empty — real data comes from API
export const products: Product[] = [];
export const blogPosts: BlogPost[] = [];

// ===== Utility functions =====

export function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}

export async function getProductById(id: number) {
  const all = await fetchProducts();
  return all.find((p) => p.id === id);
}

export async function getBlogById(id: number) {
  const all = await fetchPosts();
  return all.find((p) => p.id === id);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const all = await fetchProducts();
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
