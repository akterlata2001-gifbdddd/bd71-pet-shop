"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());
  const navigate = useRouter((s) => s.navigate);

  const goToCart = () => {
    setOpen(false);
    navigate("cart");
  };
  const goToCheckout = () => {
    setOpen(false);
    navigate("checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-background z-[70] flex flex-col shadow-warm"
          >
            <div className="flex items-center justify-between p-5 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-cocoa">
                    Your Cart
                  </h2>
                  <p className="text-xs text-cocoa/60">
                    {items.length === 0
                      ? "No items yet"
                      : `${items.length} ${items.length === 1 ? "item" : "items"}`}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-full hover:bg-secondary"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-5">
                  <span className="text-5xl">🛒</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-cocoa mb-1.5">
                  Your cart is empty
                </h3>
                <p className="text-sm text-cocoa/60 mb-5 max-w-xs">
                  Looks like you haven&apos;t added anything yet. Let&apos;s find something your
                  pet will love.
                </p>
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate("shop");
                  }}
                  className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-6"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 bg-card rounded-2xl p-3 border border-border/60"
                    >
                      <div className={`h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-3xl`}>
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium uppercase tracking-wider text-terracotta">
                          {item.brand}
                        </div>
                        <h3 className="text-sm font-semibold text-cocoa line-clamp-2 leading-snug">
                          {item.name}
                        </h3>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <div className="font-display text-base font-semibold text-cocoa">
                            ৳{formatPrice(item.price)}
                          </div>
                          <div className="flex items-center gap-1 bg-secondary rounded-full p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 rounded-full bg-card hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 rounded-full bg-card hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 shrink-0 rounded-full text-cocoa/40 hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/60 p-5 space-y-3 bg-card">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cocoa/70">Subtotal</span>
                    <span className="font-display text-lg font-semibold text-cocoa">
                      ৳{formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-cocoa/60">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={goToCart}
                      className="flex-1 rounded-full border-2 border-cocoa/15 hover:bg-secondary"
                    >
                      View Cart
                    </Button>
                    <Button
                      onClick={goToCheckout}
                      className="flex-1 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full group"
                    >
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
