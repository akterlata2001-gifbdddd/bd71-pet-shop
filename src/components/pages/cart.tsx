"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Plus, Minus, Trash2, ArrowRight, Home as HomeIcon, ChevronRight, Tag, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { ProductCard } from "@/components/site/product-card";

export function CartPage() {
  const products = useRouter((s) => s.products);
  const navigate = useRouter((s) => s.navigate);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clearCart = useCart((s) => s.clearCart);
  const subtotal = useCart((s) => s.subtotal());

  const deliveryFee = subtotal > 0 ? (subtotal > 2000 ? 0 : 60) : 0;
  const total = subtotal + deliveryFee;
  const recommended = products.filter((p) => !items.find((i) => i.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
        <div className="bg-card border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
              <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
                <HomeIcon className="h-3 w-3" /> Home
              </button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-cocoa font-medium">Cart</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa tracking-tight mt-3">
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="h-32 w-32 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center text-6xl"
          >
            🛒
          </motion.div>
          <h2 className="font-display text-2xl font-semibold text-cocoa mb-2">
            Your cart is empty
          </h2>
          <p className="text-cocoa/60 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. Browse our premium pet
            products and find something your pet will love.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("shop")}
              className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-7"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("home")}
              className="rounded-full border-2 border-cocoa/15 hover:bg-secondary px-7"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">Cart</span>
          </nav>
          <div className="flex items-center justify-between mt-3">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa tracking-tight">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-cocoa/60 hover:text-destructive transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card rounded-2xl border border-border/60 p-4 flex gap-4"
                >
                  <button
                    onClick={() => navigate("product", { productId: item.id })}
                    className={`h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-5xl hover:scale-105 transition-transform`}
                  >
                    {item.emoji}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-terracotta">
                      {item.brand}
                    </div>
                    <button
                      onClick={() => navigate("product", { productId: item.id })}
                      className="font-semibold text-cocoa line-clamp-2 leading-snug text-left hover:text-terracotta transition-colors"
                    >
                      {item.name}
                    </button>
                    <div className="mt-1 text-xs text-cocoa/60">Unit price: ৳{formatPrice(item.price)}</div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full bg-card hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full bg-card hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg font-semibold text-cocoa">
                          ৳{formatPrice(item.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-cocoa/50 hover:text-destructive inline-flex items-center gap-1 mt-0.5"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => navigate("shop")}
              className="text-sm text-terracotta hover:underline inline-flex items-center gap-1 mt-2"
            >
              <Plus className="h-3.5 w-3.5" /> Add more items
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card rounded-2xl border border-border/60 p-6">
              <h2 className="font-display text-lg font-semibold text-cocoa mb-4">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-background text-sm"
                    />
                  </div>
                  <Button variant="outline" className="rounded-full border-2 border-cocoa/15 hover:bg-secondary">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="space-y-2.5 py-4 border-t border-border/60">
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa/70">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-cocoa">৳{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa/70">Delivery fee</span>
                  <span className="font-medium text-cocoa">
                    {deliveryFee === 0 ? (
                      <span className="text-sage">FREE</span>
                    ) : (
                      `৳${formatPrice(deliveryFee)}`
                    )}
                  </span>
                </div>
                {subtotal < 2000 && (
                  <div className="text-xs text-terracotta bg-terracotta/5 rounded-lg p-2 flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5" />
                    Add ৳{formatPrice(2000 - subtotal)} more for FREE delivery
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border/60 mb-5">
                <span className="font-display text-base font-semibold text-cocoa">Total</span>
                <span className="font-display text-2xl font-semibold text-cocoa">
                  ৳{formatPrice(total)}
                </span>
              </div>

              <Button
                onClick={() => navigate("checkout")}
                className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium group"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("shop")}
                className="w-full mt-2 rounded-full border-2 border-cocoa/15 hover:bg-secondary"
              >
                Continue Shopping
              </Button>

              <div className="mt-5 flex items-center justify-center gap-3 text-[10px] text-cocoa/50">
                <span>🔒 Secure checkout</span>
                <span>·</span>
                <span>💳 COD available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended */}
        {recommended.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-cocoa mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {recommended.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
