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
  productId?: number;
  blogId?: number;
  category?: string;
  [key: string]: string | number | undefined;
};

type RouterState = {
  page: PageId;
  params: RouteParams;
  navigate: (page: PageId, params?: RouteParams) => void;
  // CMS data (loaded on mount)
  products: Product[];
  blogPosts: BlogPost[];
  dataLoaded: boolean;
  loadData: () => Promise<void>;
};

// CMS API config
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

function mapProduct(p: any): Product {
  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || 0,
    name: p.name,
    brand: p.tags?.[0] || "BD71",
    price: p.sale_price || p.base_price,
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

function mapPost(p: any): BlogPost {
  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || 0,
    category: p.tags?.[0] || "Pet Care",
    title: p.title,
    excerpt: p.excerpt || "",
    content: [{ heading: p.title, body: p.content || "" }],
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    readTime: "5 min read",
    comments: 0,
    author: p.author_name || "BD71",
    emoji: "🐾",
    bg: "from-amber-glow/20 to-terracotta/15",
    slug: p.slug,
    cover_image: p.cover_image,
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
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },
  loadData: async () => {
    if (get().dataLoaded) return;
    try {
      const [prodData, postData] = await Promise.all([
        cmsFetch<{ products: any[] }>("/products"),
        cmsFetch<{ posts: any[] }>("/posts"),
      ]);
      set({
        products: prodData.products.map(mapProduct),
        blogPosts: postData.posts.map(mapPost),
        dataLoaded: true,
      });
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
