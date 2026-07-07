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
  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim() || "";
  const imageUrl = p.featured_image || (p.images && p.images.length > 0 ? p.images[0] : "");

  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1000000),
    name: p.name || "Unnamed Product",
    brand: p.tags?.[0] || "BD71",
    price: p.sale_price || p.base_price || 0,
    oldPrice: p.sale_price ? p.base_price : undefined,
    rating: p.avg_rating || 0,
    reviews: p.review_count || 0,
    emoji: "🐾",
    bg: "from-amber-glow/30 to-terracotta/20",
    tag: p.is_featured ? "Featured" : undefined,
    category: (p.tags?.[0] || "cat").toLowerCase().replace(/\s+/g, "-"),
    categoryName: p.tags?.[0] || "Pet Products",
    weight: p.weight ? `${p.weight}kg` : "",
    inStock: (p.stock_quantity || 0) > 0,
    sku: p.sku || "",
    slug: p.slug || "",
    description: stripHtml(p.description),
    images: p.images || [],
    featured_image: imageUrl,
  };
}

function mapPost(p: any): BlogPost {
  let contentSections: { heading: string; body: string }[] = [];
  if (typeof p.content === "string" && p.content) {
    const stripped = p.content.replace(/<[^>]*>/g, "\n").split("\n").filter((s: string) => s.trim());
    if (stripped.length > 0) {
      contentSections = [{ heading: p.title || "", body: stripped.join("\n\n") }];
    }
  } else if (Array.isArray(p.content)) {
    contentSections = p.content;
  }

  return {
    id: parseInt(p.id?.replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1000000),
    category: p.tags?.[0] || "Pet Care",
    title: p.title || "Untitled",
    excerpt: p.excerpt?.replace(/<[^>]*>/g, "").trim() || "",
    content: contentSections,
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    readTime: "5 min read",
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
        product: params.productId ? `/product/${params.productId}` : "/shop",
        cart: "/cart",
        checkout: "/checkout",
        about: "/about",
        contact: "/contact",
        blog: "/blog",
        "blog-single": params.blogId ? `/blog/${params.blogId}` : "/blog",
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
    try {
      // Load first batch quickly (12 products + all posts)
      const [prodData, postData] = await Promise.all([
        cmsFetch<{ products: any[] }>("/products?pageSize=12"),
        cmsFetch<{ posts: any[] }>("/posts"),
      ]);
      set({
        products: prodData.products.map(mapProduct),
        blogPosts: postData.posts.map(mapPost),
        dataLoaded: true,
      });

      // Load remaining products in background silently
      cmsFetch<{ products: any[] }>("/products?pageSize=300")
        .then((restData) => {
          if (restData.products && restData.products.length > 0) {
            const existing = get().products;
            const existingIds = new Set(existing.map((p) => p.id));
            const newProducts = restData.products
              .map(mapProduct)
              .filter((p) => !existingIds.has(p.id));
            if (newProducts.length > 0) {
              set({ products: [...existing, ...newProducts] });
            }
          }
        })
        .catch(() => {});
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
