"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, User, Lock, Mail, Eye, EyeOff, PawPrint, Package,
  Heart, LogOut, Settings, ShoppingBag, Phone, MapPin, Loader2, Truck, CheckCircle2,
  Clock, RotateCcw, XCircle, Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

const WISHLIST_KEY = "bd71-wishlist";

// ===== Status badge config =====
const STATUS_CONFIG: Record<string, { color: string; icon: any; label: string }> = {
  pending: { color: "bg-amber-glow/20 text-amber-glow", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-amber-glow/20 text-amber-glow", icon: Clock, label: "Confirmed" },
  shipped: { color: "bg-blue-500/15 text-blue-500", icon: Truck, label: "Shipped" },
  in_transit: { color: "bg-blue-500/15 text-blue-500", icon: Truck, label: "In Transit" },
  out_for_delivery: { color: "bg-blue-500/15 text-blue-500", icon: Truck, label: "Out for Delivery" },
  delivered: { color: "bg-sage/15 text-sage", icon: CheckCircle2, label: "Delivered" },
  returned: { color: "bg-terracotta/15 text-terracotta", icon: RotateCcw, label: "Returned" },
  cancelled: { color: "bg-red-500/15 text-red-500", icon: XCircle, label: "Cancelled" },
};

interface CustomerOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  payment_status: string;
  payment_method: string;
  status: string;
  shipping_address: any;
  created_at: string;
  items: { product_id: string; name: string; quantity: number; price: number }[];
}

interface CustomerData {
  customer: { name: string; phone: string; email: string };
  stats: { totalOrders: number; totalSpent: number; completedOrders: number; pendingOrders: number };
  orders: CustomerOrder[];
  savedAddresses: any[];
}

export function AccountPage() {
  const products = useRouter((s) => s.products);
  const navigate = useRouter((s) => s.navigate);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "settings">("orders");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Load customer from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bd71-customer");
      if (saved) {
        const c = JSON.parse(saved);
        setForm({ name: c.name ?? "", email: c.email ?? "", phone: c.phone ?? "", password: "" });
        if (c.phone || c.email) {
          fetchCustomer(c.phone, c.email);
        }
      }
    } catch {}
    try {
      const w = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
      setWishlistIds(Array.isArray(w) ? w : []);
    } catch {}
  }, []);

  async function fetchCustomer(phone: string, email: string) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (phone) params.set("phone", phone);
      if (email) params.set("email", email);
      const res = await fetch(
        `${CMS_API}/api/v1/sites/${CMS_SITE_ID}/customers/me?${params}`,
        { headers: { "X-API-Key": CMS_API_KEY } }
      );
      const json = await res.json();
      if (json.success && json.data) {
        setCustomer(json.data as CustomerData);
        // Update name from latest order if customer had no name
        if (!form.name && json.data.customer?.name) {
          setForm(f => ({ ...f, name: json.data.customer.name }));
        }
      } else {
        // No orders yet — that's OK, show empty state
        setCustomer({
          customer: { name: form.name, phone, email },
          stats: { totalOrders: 0, totalSpent: 0, completedOrders: 0, pendingOrders: 0 },
          orders: [],
          savedAddresses: [],
        });
      }
    } catch (err) {
      setError("Could not load your orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      if (!form.phone && !form.email) {
        setError("Phone or email required to sign in");
        return;
      }
    } else {
      if (!form.name || !form.phone) {
        setError("Name and phone required to register");
        return;
      }
    }
    // Save customer to localStorage
    localStorage.setItem("bd71-customer", JSON.stringify({
      name: form.name, email: form.email, phone: form.phone,
    }));
    fetchCustomer(form.phone, form.email);
  };

  const handleLogout = () => {
    localStorage.removeItem("bd71-customer");
    setCustomer(null);
    setForm({ name: "", email: "", phone: "", password: "" });
    navigate("home");
  };

  // ===== Wishlist helpers =====
  const wishlist = products.filter(p => wishlistIds.includes(String(p.id)));
  const removeFromWishlist = (id: string) => {
    const next = wishlistIds.filter(x => x !== id);
    setWishlistIds(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  // ===== Logged-in dashboard =====
  if (customer) {
    return (
      <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
        <div className="bg-card border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
              <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
                <HomeIcon className="h-3 w-3" /> Home
              </button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-cocoa font-medium">My Account</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border/60 p-5 sticky top-28">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border/60">
                  <div className="h-12 w-12 rounded-full bg-terracotta text-primary-foreground flex items-center justify-center font-display font-semibold text-lg">
                    {form.name?.[0]?.toUpperCase() || form.phone?.[0] || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-cocoa truncate">{form.name || "Valued Customer"}</div>
                    <div className="text-xs text-cocoa/60 truncate">{form.phone || form.email}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-5 pb-5 border-b border-border/60">
                  <div className="text-center">
                    <div className="text-lg font-bold text-cocoa">{customer.stats.totalOrders}</div>
                    <div className="text-[10px] text-cocoa/60 uppercase">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-sage">{customer.stats.completedOrders}</div>
                    <div className="text-[10px] text-cocoa/60 uppercase">Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-glow">{customer.stats.pendingOrders}</div>
                    <div className="text-[10px] text-cocoa/60 uppercase">Active</div>
                  </div>
                </div>

                <nav className="space-y-1">
                  {[
                    { id: "orders" as const, label: "My Orders", icon: Package, badge: customer.stats.totalOrders },
                    { id: "wishlist" as const, label: "Wishlist", icon: Heart, badge: wishlist.length },
                    { id: "addresses" as const, label: "Addresses", icon: MapPin, badge: customer.savedAddresses.length },
                    { id: "settings" as const, label: "Settings", icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        activeTab === item.id
                          ? "bg-terracotta text-primary-foreground"
                          : "text-cocoa/70 hover:bg-secondary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full",
                          activeTab === item.id ? "bg-primary-foreground/20" : "bg-secondary"
                        )}>{item.badge}</span>
                      )}
                    </button>
                  ))}
                </nav>

                <div className="mt-4 pt-4 border-t border-border/60">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cocoa/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeTab === "orders" && (
                  <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-5">My Orders</h1>
                    {loading ? (
                      <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-terracotta" />
                        <p className="text-sm text-cocoa/60 mt-3">Loading your orders...</p>
                      </div>
                    ) : customer.orders.length === 0 ? (
                      <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
                        <Package className="h-12 w-12 mx-auto text-cocoa/30 mb-3" />
                        <h3 className="font-semibold text-cocoa mb-1">No orders yet</h3>
                        <p className="text-sm text-cocoa/60 mb-5">When you place your first order, it'll show here.</p>
                        <Button onClick={() => navigate("shop")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
                          <ShoppingBag className="h-4 w-4 mr-2" /> Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {customer.orders.map((order) => {
                          const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                          const addr = typeof order.shipping_address === "string"
                            ? JSON.parse(order.shipping_address)
                            : order.shipping_address;
                          return (
                            <div key={order.id} className="bg-card rounded-2xl border border-border/60 p-5">
                              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div>
                                  <div className="font-display text-lg font-semibold text-cocoa">#{order.order_number}</div>
                                  <div className="text-xs text-cocoa/60 mt-0.5">
                                    {new Date(order.created_at).toLocaleDateString("en-US", {
                                      year: "numeric", month: "short", day: "numeric",
                                      hour: "2-digit", minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full", sc.color)}>
                                    <sc.icon className="h-3 w-3 inline mr-1" />{sc.label}
                                  </span>
                                  <span className={cn(
                                    "text-xs font-semibold px-3 py-1.5 rounded-full",
                                    order.payment_status === "paid"
                                      ? "bg-sage/15 text-sage"
                                      : "bg-amber-glow/20 text-amber-glow"
                                  )}>
                                    {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                                  </span>
                                </div>
                              </div>

                              {/* Items */}
                              <div className="space-y-2 py-3 border-t border-border/40">
                                {order.items.length === 0 ? (
                                  <p className="text-xs text-cocoa/60 italic">Item details unavailable</p>
                                ) : order.items.map((it, i) => (
                                  <div key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-xs font-bold text-cocoa/50 shrink-0">×{it.quantity}</span>
                                      <span className="text-cocoa truncate">{it.name}</span>
                                    </div>
                                    <span className="text-cocoa/70 shrink-0 ml-2">৳{formatPrice(it.price * it.quantity)}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
                                {addr && (
                                  <div className="text-xs text-cocoa/60 flex items-start gap-1.5 max-w-md">
                                    <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                                    <span>
                                      {[addr.line1, addr.line2, addr.city, addr.zip].filter(Boolean).join(", ")}
                                    </span>
                                  </div>
                                )}
                                <div className="text-right ml-auto">
                                  {order.discount > 0 && (
                                    <div className="text-xs text-sage line-through">৳{formatPrice(order.subtotal + order.shipping_cost)}</div>
                                  )}
                                  <div className="font-display text-lg font-semibold text-cocoa">
                                    ৳{formatPrice(order.total)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "wishlist" && (
                  <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-5">My Wishlist</h1>
                    {wishlist.length === 0 ? (
                      <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
                        <Heart className="h-12 w-12 mx-auto text-cocoa/30 mb-3" />
                        <h3 className="font-semibold text-cocoa mb-1">Your wishlist is empty</h3>
                        <p className="text-sm text-cocoa/60 mb-5">Tap the heart icon on any product to save it here.</p>
                        <Button onClick={() => navigate("shop")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
                          <ShoppingBag className="h-4 w-4 mr-2" /> Browse Products
                        </Button>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {wishlist.map((p) => (
                          <div key={p.id} className="bg-card rounded-2xl border border-border/60 p-4 flex gap-4">
                            <button
                              onClick={() => navigate("product", { productSlug: p.slug, productId: String(p.id) })}
                              className={`h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br ${p.bg} flex items-center justify-center text-4xl`}
                            >
                              {p.emoji}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-terracotta">{p.brand}</div>
                              <h3 className="font-semibold text-cocoa line-clamp-2 text-sm">{p.name}</h3>
                              <div className="font-display text-base font-semibold text-cocoa mt-1">৳{formatPrice(p.price)}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  onClick={() => navigate("product", { productSlug: p.slug, productId: String(p.id) })}
                                  className="h-8 rounded-full bg-terracotta hover:bg-terracotta/90 text-primary-foreground text-xs"
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromWishlist(String(p.id))}
                                  className="h-8 rounded-full text-xs border-cocoa/15"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "addresses" && (
                  <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-1">Saved Addresses</h1>
                    <p className="text-sm text-cocoa/60 mb-5">Addresses from your previous orders</p>
                    {customer.savedAddresses.length === 0 ? (
                      <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
                        <MapPin className="h-12 w-12 mx-auto text-cocoa/30 mb-3" />
                        <h3 className="font-semibold text-cocoa mb-1">No saved addresses</h3>
                        <p className="text-sm text-cocoa/60">Addresses you use at checkout will appear here.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {customer.savedAddresses.map((addr, i) => (
                          <div key={i} className="bg-card rounded-2xl border border-border/60 p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="h-8 w-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
                                <MapPin className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-semibold text-cocoa">Address #{i + 1}</span>
                            </div>
                            <div className="text-sm text-cocoa/80 space-y-1">
                              {addr.line1 && <div>{addr.line1}</div>}
                              {addr.line2 && <div>{addr.line2}</div>}
                              <div>{[addr.city, addr.zip].filter(Boolean).join(", ")}</div>
                              {addr.country && <div>{addr.country}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-5">Account Settings</h1>
                    <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-5">
                      <div>
                        <Label className="text-sm font-medium text-cocoa">Full Name</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="mt-1.5 rounded-xl"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-cocoa">Email</Label>
                          <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="mt-1.5 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-cocoa">Phone</Label>
                          <Input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="mt-1.5 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                        <p className="text-xs text-cocoa/60">
                          Changes are saved locally on this device.
                        </p>
                        <Button
                          onClick={() => {
                            localStorage.setItem("bd71-customer", JSON.stringify({
                              name: form.name, email: form.email, phone: form.phone,
                            }));
                            if (form.phone || form.email) fetchCustomer(form.phone, form.email);
                          }}
                          className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border/60 p-6 mt-4">
                      <h3 className="font-semibold text-cocoa mb-2">Total Spent</h3>
                      <p className="text-3xl font-display font-bold text-terracotta">৳{formatPrice(customer.stats.totalSpent)}</p>
                      <p className="text-xs text-cocoa/60 mt-1">
                        Across {customer.stats.totalOrders} orders ({customer.stats.completedOrders} delivered)
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== Login / Register screen =====
  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">{mode === "login" ? "Login" : "Register"}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-3xl border border-border/60 p-6 sm:p-8 shadow-soft"
        >
          <div className="text-center mb-6">
            <div className="inline-flex h-14 w-14 rounded-2xl bg-terracotta text-primary-foreground items-center justify-center mb-3 shadow-warm">
              <PawPrint className="h-7 w-7" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-cocoa">
              {mode === "login" ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-sm text-cocoa/60 mt-1">
              {mode === "login"
                ? "Sign in with your phone or email to see orders"
                : "Join the BD71 family for exclusive offers"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex p-1 rounded-full bg-secondary mb-6">
            <button
              onClick={() => setMode("login")}
              className={cn(
                "flex-1 py-2 rounded-full text-sm font-medium transition-colors",
                mode === "login" ? "bg-terracotta text-primary-foreground shadow-warm" : "text-cocoa/70"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={cn(
                "flex-1 py-2 rounded-full text-sm font-medium transition-colors",
                mode === "register" ? "bg-terracotta text-primary-foreground shadow-warm" : "text-cocoa/70"
              )}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-cocoa">Full Name</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rahim Uddin"
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-cocoa">Phone Number</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-cocoa">Email Address</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-cocoa">Password (optional)</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10 pr-10 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa/40 hover:text-cocoa"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-cocoa/50 mt-1">
                For now, you can sign in with just your phone or email.
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading...</>
              ) : (
                <><Search className="h-4 w-4 mr-2" />{mode === "login" ? "Sign In" : "Create Account"}</>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-cocoa/60">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-terracotta font-medium hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <p className="text-xs text-cocoa/50 mb-3">Or continue shopping as guest</p>
            <Button
              variant="outline"
              onClick={() => navigate("shop")}
              className="rounded-full border-2 border-cocoa/15 hover:bg-secondary"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
