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
    id: "cat-food",
    name: "Cat Food",
    count: 0,
    desc: "Premium cat food from top brands",
    emoji: "🐱",
    bg: "from-amber-glow/30 to-terracotta/15",
    longDesc: "Premium cat food from Purina, Royal Canin, Whiskas, Drools, Sheba, Nekko, Wanpy & more.",
  },
  {
    id: "cat-litter",
    name: "Cat Litter & Hygiene",
    count: 0,
    desc: "Cat litter, litter boxes & cleaning",
    emoji: "🧹",
    bg: "from-sage/20 to-ocean/15",
    longDesc: "Bentonite cat litter, litter boxes, and hygiene products for your cat.",
  },
  {
    id: "cat-treats",
    name: "Cat Treats",
    count: 0,
    desc: "Treats, wet food & pouches",
    emoji: "🍖",
    bg: "from-terracotta/20 to-amber-glow/15",
    longDesc: "Cat treats, wet food pouches, and creamy snacks from Sheba, Wanpy & more.",
  },
  {
    id: "dog-food",
    name: "Dog Food",
    count: 0,
    desc: "Dog food from top brands",
    emoji: "🐶",
    bg: "from-sage/25 to-terracotta/15",
    longDesc: "Dog food from Purina, Royal Canin, Drools, SmartHeart, IAMS & more.",
  },
  {
    id: "water-fountains",
    name: "Water Fountains",
    count: 0,
    desc: "Automatic water fountains & bowls",
    emoji: "💧",
    bg: "from-ocean/25 to-sage/15",
    longDesc: "Automatic pet water fountains, ceramic fountains, and replacement filters.",
  },
  {
    id: "vaccines",
    name: "Vaccines & Medicine",
    count: 0,
    desc: "Pet vaccines & health products",
    emoji: "💉",
    bg: "from-terracotta/20 to-sage/15",
    longDesc: "Pet vaccines, deworming tablets, and health products.",
  },
  {
    id: "toys",
    name: "Toys & Accessories",
    count: 0,
    desc: "Toys, collars & accessories",
    emoji: "🪀",
    bg: "from-amber-glow/20 to-terracotta/10",
    longDesc: "Cat and dog toys, accessories, and fun products.",
  },
  {
    id: "bird-fish",
    name: "Bird & Fish",
    count: 0,
    desc: "Bird food, fish food & supplies",
    emoji: "🐦",
    bg: "from-ocean/20 to-amber-glow/10",
    longDesc: "Bird food, fish food, and supplies for your feathered and aquatic friends.",
  },
];

export const aboutContent = {
  title: "About BD71 Pet Shop",
  subtitle: "Your trusted partner in pet care since 2021",
  intro: "Your trusted pet supply partner in Bangladesh since 2021.",
  brands: "Purina, Royal Canin, Whiskas, Drools, Sheba, Wanpy, Orijen, SmartHeart, IAMS & more",
  story: `BD71 Pet Shop began with a simple mission: to provide pet owners in Bangladesh with access to genuine, high-quality pet food and supplies at fair prices.`,
  vision: "To become Bangladesh's most trusted pet supply platform, where every pet parent can find genuine products at fair prices with fast delivery.",
  mission: "Source 100% genuine products directly from authorized distributors, deliver them fast across the country, and provide expert support 24/7.",
  serviceTitle: "What We Do",
  serviceDesc: "We deliver premium pet food, treats, litter, toys, and accessories across Bangladesh — genuine products, fair prices, fast delivery.",
  historyTitle: "Our Journey",
  history: "Founded in 2021 by Late Akter from a small shop at Savar, Dhaka. Today we serve thousands of happy pet parents across Bangladesh with 300+ products and 24/7 availability.",
  operationsTitle: "How We Operate",
  operations: "We source directly from authorized distributors, maintain quality stock, and deliver via trusted courier partners. Same-day delivery in Dhaka, 1-2 days nationwide.",
  founderName: "Late Akter",
  founderRole: "Founder & Visionary",
  stats: [
    { label: "Happy Customers", value: "5,000+" },
    { label: "Products Available", value: "300+" },
    { label: "Orders Delivered", value: "15,000+" },
    { label: "Years of Service", value: "4+" },
  ],
  values: [
    { title: "100% Genuine Products", desc: "We source directly from authorized distributors. No counterfeits, ever." },
    { title: "Fast Delivery", desc: "Same-day delivery in Dhaka, 1-2 days nationwide. Your pet won't wait." },
    { title: "Expert Support", desc: "Our team includes pet owners who understand your needs. Call us anytime." },
    { title: "Fair Prices", desc: "We negotiate bulk deals and pass savings to you. No inflated margins." },
  ],
  faqs: [
    { q: "Are your products genuine?", a: "Yes, 100%. We source directly from authorized distributors in Bangladesh." },
    { q: "How fast is delivery?", a: "Same-day in Dhaka, 1-2 business days nationwide." },
    { q: "Do you offer returns?", a: "Yes, within 7 days if the product is unopened and in original packaging." },
    { q: "How can I contact you?", a: "Call 01627-001719 or email contact@bd71shop.com.bd — we're available 24/7." },
  ],
};

export const contactContent = {
  title: "Get in Touch",
  subtitle: "We're here 24/7 to help with your pet needs",
  sectionsTitle: "Send Us a Message",
  formFields: {
    note: "Fill out the form below and we'll get back to you within 24 hours.",
    name: "Your Name",
    email: "Email Address",
    subject: "Subject",
    message: "Your Message",
    submit: "Send Message",
  },
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
