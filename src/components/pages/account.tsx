"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, PawPrint, Package,
  Heart, LogOut, ShoppingBag, Phone, MapPin, Loader2, Truck, CheckCircle2,
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
const CUSTOMER_SESSION_KEY = "pn_customer_session";

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
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "settings">("orders");
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Auto-login from localStorage (session saved after order or manual login)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_SESSION_KEY);
      if (saved) {
        const session = JSON.parse(saved);
        if (session.phone) {
          setPhone(session.phone);
          fetchCustomer(session.phone);
        }
      }
    } catch {}

    try {
      const w = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
      setWishlistIds(Array.isArray(w) ? w : []);
    } catch {}
  }, []);

  async function fetchCustomer(phoneNum: string) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("phone", phoneNum.trim());
      const res = await fetch(
        `${CMS_API}/api/v1/sites/${CMS_SITE_ID}/customers/me?${params}`,
        { headers: { "X-API-Key": CMS_API_KEY } }
      );
      const json = await res.json();
      if (json.success && json.data) {
        setCustomer(json.data as CustomerData);
        // Save session
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify({
          phone: phoneNum.trim(),
          name: json.data.customer?.name || "",
        }));
      } else {
        setError("No orders found for this phone number.");
        setCustomer(null);
      }
    } catch {
      setError("Could not load your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const phoneClean = phone.replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(phoneClean)) {
      setError("Please enter a valid Bangladeshi phone number (e.g., 01712345678).");
      return;
    }
    fetchCustomer(phoneClean);
  }

  function handleLogout() {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    setCustomer(null);
    setPhone("");
    navigate("home");
  }

  const removeFromWishlist = (id: string) => {
    const next = wishlistIds.filter(x => x !== id);
    setWishlistIds(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  const wishlist = products.filter(p => wishlistIds.includes(String(p.id)));

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
                    {customer.customer?.name?.[0]?.toUpperCase() || phone[0] || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-cocoa truncate">{customer.customer?.name || "Customer"}</div>
                    <div className="text-xs text-cocoa/60 truncate">{phone}</div>
                  </div>
                </div>

                <nav className="space-y-1">
                  {[
                    { id: "orders" as const, label: "My Orders", icon: Package, badge: customer.stats?.totalOrders },
                    { id: "wishlist" as const, label: "Wishlist", icon: Heart, badge: wishlist.length },
                    { id: "addresses" as const, label: "Saved Addresses", icon: MapPin, badge: customer.savedAddresses?.length },
                    { id: "settings" as const, label: "Settings", icon: ShoppingBag },
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
                      {item.label}
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full ml-auto",
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
                                    {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full", sc.color)}>
                                    <sc.icon className="h-3 w-3 inline mr-1" />{sc.label}
                                  </span>
                                  <span className={cn(
                                    "text-xs font-semibold px-3 py-1.5 rounded-full",
                                    order.payment_status === "paid" ? "bg-sage/15 text-sage" : "bg-amber-glow/20 text-amber-glow"
                                  )}>
                                    {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                                  </span>
                                </div>
                              </div>
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
                                    <span>{addr.full_address || [addr.line1, addr.line2, addr.city, addr.zip].filter(Boolean).join(", ")}</span>
                                  </div>
                                )}
                                <div className="font-display text-lg font-semibold text-cocoa ml-auto">
                                  ৳{formatPrice(order.total)}
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
                        <Button onClick={() => navigate("shop")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full mt-4">
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
                                <Button size="sm" onClick={() => navigate("product", { productSlug: p.slug, productId: String(p.id) })}
                                  className="h-8 rounded-full bg-terracotta hover:bg-terracotta/90 text-primary-foreground text-xs">View</Button>
                                <Button size="sm" variant="outline" onClick={() => removeFromWishlist(String(p.id))}
                                  className="h-8 rounded-full text-xs border-cocoa/15">Remove</Button>
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
                              {addr.full_address || [addr.line1, addr.line2, addr.city, addr.zip].filter(Boolean).map((v, j) => <div key={j}>{v}</div>)}
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
                        <Input value={customer.customer?.name || ""} readOnly className="mt-1.5 rounded-xl bg-muted" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-cocoa">Phone Number</Label>
                        <Input value={phone} readOnly className="mt-1.5 rounded-xl bg-muted font-mono" />
                      </div>
                      <div className="pt-4 border-t border-border/60">
                        <div className="flex justify-between text-sm">
                          <span className="text-cocoa/70">Total Orders</span>
                          <span className="font-bold">{customer.stats?.totalOrders ?? 0}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-cocoa/70">Total Spent</span>
                          <span className="font-bold text-terracotta">৳{formatPrice(customer.stats?.totalSpent ?? 0)}</span>
                        </div>
                      </div>
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

  // ===== Login screen — phone only, no password =====
  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">My Account</span>
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
            <h1 className="font-display text-2xl font-semibold text-cocoa">My Account</h1>
            <p className="text-sm text-cocoa/60 mt-1">Enter your phone number to see your orders</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-cocoa">Phone Number *</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  pattern="^(?:\+?88)?01[3-9]\d{8}$"
                  className="pl-10 rounded-xl"
                />
              </div>
              <p className="text-[11px] text-cocoa/50 mt-1">Bangladeshi number only. No password needed.</p>
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
                <><Search className="h-4 w-4 mr-2" /> View My Orders</>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-cocoa/60">
            Don&apos;t have an account?{" "}
            <button onClick={() => navigate("shop")} className="text-terracotta font-medium hover:underline">
              Start shopping
            </button>
            <p className="mt-1 text-cocoa/40">An account is created automatically when you place your first order.</p>
          </div>

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <p className="text-xs text-cocoa/50 mb-3">Or continue shopping as guest</p>
            <Button variant="outline" onClick={() => navigate("shop")} className="rounded-full border-2 border-cocoa/15 hover:bg-secondary">
              <ShoppingBag className="h-4 w-4 mr-2" /> Browse Products
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
