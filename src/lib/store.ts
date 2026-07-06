import { create } from "zustand";

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
};

export const useRouter = create<RouterState>((set) => ({
  page: "home",
  params: {},
  navigate: (page, params = {}) => {
    set({ page, params });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
