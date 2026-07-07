import { create } from "zustand";
import type { Product, BlogPost } from "@/lib/data";

export type PageId =
  | "home"
  | "shop"
  | "product"
  | "cart"
  | "checkout"
  | "about"
  | "contact"
  | "blog"
  | "blog-single"
  | "privacy"
  | "terms"
  | "dmca"
  | "disclaimer"
  | "not-found"
  | "account"
  | "category";

export type RouteParams = {
  productId?: string;
  productSlug?: string;
  blogId?: number;
  blogSlug?: string;
  category?: string;
  [key: string]: string | number | undefined;
};

type RouterState = {
  page: PageId;
  params: RouteParams;
  navigate: (page: PageId, params?: RouteParams) => void;
  products: Product[];
  blogPosts: BlogPost[];
  dataLoaded: boolean;
  loadData: () => Promise<void>;
};

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
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? "API error");
  return json.data as T;
}

// ===== LocalStorage Cache (stale-while-revalidate) =====
const CACHE_KEY_PRODUCTS = `cms_${CMS_SITE_ID}_products_v5`;
const CACHE_KEY_POSTS = `cms_${CMS_SITE_ID}_posts_v5`;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function loadFromCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    return data as T;
  } catch {
    return null;
  }
}

function saveToCache<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage full or unavailable — skip caching
  }
}

function isCacheFresh(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const { timestamp } = JSON.parse(raw);
    return Date.now() - timestamp < CACHE_TTL;
  } catch {
    return false;
  }
}

function mapProduct(p: any): Product {
  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim() || "";
  const imageUrl = p.featured_image || (p.images && p.images.length > 0 ? p.images[0] : "");

  // Determine category from tags
  const tags = p.tags || [];
  const tagStr = tags.join(" ").toLowerCase();

  // Map WP tags to our category IDs
  let category = "cat-food"; // default
  let categoryName = "Cat Food";

  if (tagStr.includes("dog") || tagStr.includes("puppy")) {
    category = "dog-food"; categoryName = "Dog Food";
  } else if (tagStr.includes("litter") || tagStr.includes("litter box")) {
    category = "cat-litter"; categoryName = "Cat Litter & Hygiene";
  } else if (tagStr.includes("treat") || tagStr.includes("wet") || tagStr.includes("pouch") || tagStr.includes("jerky") || tagStr.includes("snack") || tagStr.includes("creamy")) {
    category = "cat-treats"; categoryName = "Cat Treats";
  } else if (tagStr.includes("fountain") || tagStr.includes("water") || tagStr.includes("drinker")) {
    category = "water-fountains"; categoryName = "Water Fountains";
  } else if (tagStr.includes("vaccine") || tagStr.includes("medicine") || tagStr.includes("deworm")) {
    category = "vaccines"; categoryName = "Vaccines & Medicine";
  } else if (tagStr.includes("toy") || tagStr.includes("ball") || tagStr.includes("feather") || tagStr.includes("stick")) {
    category = "toys"; categoryName = "Toys & Accessories";
  } else if (tagStr.includes("bird") || tagStr.includes("fish") || tagStr.includes("aquarium") || tagStr.includes("nutribird") || tagStr.includes("taiyo")) {
    category = "bird-fish"; categoryName = "Bird & Fish";
  } else if (tagStr.includes("cat") || tagStr.includes("kitten") || tagStr.includes("whiskas") || tagStr.includes("purina") || tagStr.includes("royal canin") || tagStr.includes("drools") || tagStr.includes("sheba") || tagStr.includes("nekko") || tagStr.includes("wanpy") || tagStr.includes("orijen") || tagStr.includes("smartheart") || tagStr.includes("felicia") || tagStr.includes("haisenpet") || tagStr.includes("miow") || tagStr.includes("friskies") || tagStr.includes("trendline") || tagStr.includes("mito")) {
    category = "cat-food"; categoryName = "Cat Food";
  }

  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1000000),
    name: p.name || "Unnamed Product",
    brand: tags[0] || "BD71",
    price: p.sale_price || p.base_price || 0,
    oldPrice: p.sale_price ? p.base_price : undefined,
    rating: p.avg_rating || 0,
    reviews: p.review_count || 0,
    emoji: "🐾",
    bg: "from-amber-glow/30 to-terracotta/20",
    tag: p.is_featured ? "Featured" : undefined,
    category,
    categoryName,
    weight: p.weight ? `${p.weight}kg` : "",
    inStock: (p.stock_quantity || 0) > 0,
    sku: p.sku || "",
    slug: p.slug || "",
    description: stripHtml(p.description),
    shortDescription: stripHtml(p.short_description),
    rawDescription: p.description || "",
    images: p.images || [],
    featured_image: imageUrl,
  };
}

function mapPost(p: any): BlogPost {
  // Content: keep raw HTML for rendering with dangerouslySetInnerHTML
  let contentSections: { heading: string; body: string }[] = [];
  if (typeof p.content === "string" && p.content) {
    // Split HTML content into sections by h2/h3 headings
    const html = p.content;
    // Try to split by headings
    const parts = html.split(/<h[23][^>]*>(.*?)<\/h[23]>/i);
    if (parts.length > 1) {
      // Has headings — create sections
      for (let i = 1; i < parts.length; i += 2) {
        const heading = parts[i]?.replace(/<[^>]*>/g, "").trim() || "";
        const body = (parts[i + 1] || "").trim();
        if (heading || body) {
          contentSections.push({ heading, body });
        }
      }
    }
    // If no sections created, put entire content as one section
    if (contentSections.length === 0) {
      contentSections = [{ heading: "", body: html }];
    }
  } else if (Array.isArray(p.content)) {
    contentSections = p.content;
  }

  // Calculate read time from content length
  const wordCount = (p.content || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1000000),
    category: p.tags?.[0] || "Pet Care",
    title: p.title || "Untitled",
    excerpt: p.excerpt?.replace(/<[^>]*>/g, "").trim() || "",
    content: contentSections,
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    readTime,
    comments: 0,
    author: p.author_name || "BD71",
    emoji: "🐾",
    bg: "from-amber-glow/20 to-terracotta/15",
    slug: p.slug || "",
    cover_image: p.cover_image || "",
  };
}

export const useRouter = create<RouterState>((set, get) => ({
  page: "home",
  params: {},
  products: [],
  blogPosts: [],
  dataLoaded: false,
  navigate: (page, params = {}) => {
    set({ page, params });
    if (typeof window !== "undefined") {
      // Update URL bar so it reflects the current page
      const urlMap: Record<string, string> = {
        home: "/",
        shop: "/shop",
        product: params.productSlug ? `/product/${params.productSlug}` : "/shop",
        cart: "/cart",
        checkout: "/checkout",
        about: "/about",
        contact: "/contact",
        blog: "/blog",
        "blog-single": params.blogSlug ? `/blog/${params.blogSlug}` : "/blog",
        privacy: "/privacy",
        terms: "/terms",
        dmca: "/dmca",
        disclaimer: "/disclaimer",
        account: "/account",
      };
      const newUrl = urlMap[page] || "/";
      window.history.pushState({ page, params }, "", newUrl);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },
  loadData: async () => {
    if (get().dataLoaded) return;

    // Step 1: Instantly load from localStorage cache (if exists)
    const cachedProducts = loadFromCache<Product[]>(CACHE_KEY_PRODUCTS);
    const cachedPosts = loadFromCache<BlogPost[]>(CACHE_KEY_POSTS);

    if (cachedProducts && cachedPosts) {
      // Show cached data IMMEDIATELY — zero loading time
      set({
        products: cachedProducts,
        blogPosts: cachedPosts,
        dataLoaded: true,
      });

      // If cache is fresh (< 5 min), don't even bother fetching
      if (isCacheFresh(CACHE_KEY_PRODUCTS) && isCacheFresh(CACHE_KEY_POSTS)) {
        return;
      }

      // Cache is stale — silently revalidate in background
      // User already sees data, this just updates it
      try {
        const [prodData, postData] = await Promise.all([
          cmsFetch<{ products: any[] }>("/products?pageSize=300"),
          cmsFetch<{ posts: any[] }>("/posts"),
        ]);
        const freshProducts = prodData.products.map(mapProduct);
        const freshPosts = postData.posts.map(mapPost);
        set({ products: freshProducts, blogPosts: freshPosts });
        saveToCache(CACHE_KEY_PRODUCTS, freshProducts);
        saveToCache(CACHE_KEY_POSTS, freshPosts);
      } catch {
        // Background revalidation failed — keep showing cached data
      }
      return;
    }

    // Step 2: No cache — first visit. Show loading, fetch from API
    try {
      const [prodData, postData] = await Promise.all([
        cmsFetch<{ products: any[] }>("/products?pageSize=300"),
        cmsFetch<{ posts: any[] }>("/posts"),
      ]);
      const products = prodData.products.map(mapProduct);
      const blogPosts = postData.posts.map(mapPost);

      set({ products, blogPosts, dataLoaded: true });

      // Save to cache for next visit (instant load)
      saveToCache(CACHE_KEY_PRODUCTS, products);
      saveToCache(CACHE_KEY_POSTS, blogPosts);
    } catch (e) {
      console.error("Failed to load CMS data:", e);
      set({ dataLoaded: true });
    }
  },
}));

// ===== Cart Store =====
export type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  emoji: string;
  bg: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
  addItem: (item, qty = 1) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: qty }] });
    }
    set({ isOpen: true });
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  updateQuantity: (id, qty) =>
    set({
      items: get()
        .items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        .filter((i) => i.quantity > 0),
    }),
  clearCart: () => set({ items: [] }),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
