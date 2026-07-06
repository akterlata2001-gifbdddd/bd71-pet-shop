"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, CreditCard, Truck, MapPin, User, Lock, Check, ArrowRight, Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart, useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CheckoutPage() {
  const navigate = useRouter((s) => s.navigate);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clearCart = useCart((s) => s.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "card">("cod");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => `BD71${Math.floor(100000 + Math.random() * 900000)}`);

  const deliveryFee = subtotal > 2000 ? 0 : 60;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="font-display text-2xl font-semibold text-cocoa mb-2">Your cart is empty</h1>
        <p className="text-cocoa/60 mb-6">Add some products before checking out.</p>
        <Button onClick={() => navigate("shop")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
          Browse Products
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen flex items-center">
        <div className="mx-auto max-w-xl px-4 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-card rounded-3xl border border-border/60 p-8 sm:p-10 text-center shadow-soft"
          >
            <div className="h-20 w-20 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-5">
              <Check className="h-10 w-10" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-2">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-cocoa/70 mb-5">
              Thank you for your order. We&apos;ve received your request and will contact you shortly
              to confirm delivery details.
            </p>
            <div className="bg-secondary/60 rounded-xl p-4 mb-6">
              <div className="text-xs text-cocoa/60 uppercase tracking-wider">Order Number</div>
              <div className="font-display text-xl font-semibold text-terracotta">{orderNumber}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left mb-6">
              <div className="bg-secondary/40 rounded-xl p-3">
                <div className="text-xs text-cocoa/60">Total Amount</div>
                <div className="font-display text-lg font-semibold text-cocoa">৳{formatPrice(total)}</div>
              </div>
              <div className="bg-secondary/40 rounded-xl p-3">
                <div className="text-xs text-cocoa/60">Payment Method</div>
                <div className="font-semibold text-cocoa text-sm mt-1">
                  {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  clearCart();
                  navigate("home");
                }}
                className="flex-1 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  navigate("shop");
                }}
                className="flex-1 rounded-full border-2 border-cocoa/15 hover:bg-secondary"
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
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
            <button onClick={() => navigate("cart")} className="hover:text-terracotta">Cart</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">Checkout</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa tracking-tight mt-3">
            Checkout
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            window.scrollTo({ top: 0 });
          }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left: forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="bg-card rounded-2xl border border-border/60 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-cocoa">Contact Information</h2>
                  <p className="text-xs text-cocoa/60">We&apos;ll use this to confirm your order</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-cocoa">First Name *</Label>
                  <Input id="firstName" required placeholder="Rahim" className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-cocoa">Last Name *</Label>
                  <Input id="lastName" required placeholder="Uddin" className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-cocoa">Phone Number *</Label>
                  <Input id="phone" required type="tel" placeholder="01XXXXXXXXX" className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-cocoa">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-card rounded-2xl border border-border/60 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-xl bg-sage/15 text-sage flex items-center justify-center">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-cocoa">Shipping Address</h2>
                  <p className="text-xs text-cocoa/60">Where should we deliver your order?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-cocoa">Street Address *</Label>
                  <Input id="address" required placeholder="House #, Road #, Area" className="mt-1.5 rounded-xl" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-cocoa">City *</Label>
                    <Input id="city" required placeholder="Dhaka" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="area" className="text-sm font-medium text-cocoa">Area</Label>
                    <Input id="area" placeholder="Gulshan" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="postal" className="text-sm font-medium text-cocoa">Postal Code</Label>
                    <Input id="postal" placeholder="1212" className="mt-1.5 rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-cocoa">Order Notes (optional)</Label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Any special delivery instructions?"
                    className="mt-1.5 w-full px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-card rounded-2xl border border-border/60 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-xl bg-amber-glow/20 text-amber-glow flex items-center justify-center">
                  <CreditCard className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-cocoa">Payment Method</h2>
                  <p className="text-xs text-cocoa/60">Choose how you want to pay</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "cod" as const, label: "Cash on Delivery", desc: "Pay when you receive", icon: Banknote, badge: "Popular" },
                  { id: "bkash" as const, label: "bKash", desc: "Mobile wallet payment", icon: CreditCard },
                  { id: "nagad" as const, label: "Nagad", desc: "Mobile wallet payment", icon: CreditCard },
                  { id: "card" as const, label: "Credit/Debit Card", desc: "VISA, Mastercard", icon: CreditCard },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                      paymentMethod === method.id
                        ? "border-terracotta bg-terracotta/5"
                        : "border-border hover:border-cocoa/20"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      paymentMethod === method.id ? "bg-terracotta text-primary-foreground" : "bg-secondary text-cocoa"
                    )}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-cocoa text-sm">{method.label}</div>
                      <div className="text-xs text-cocoa/60">{method.desc}</div>
                    </div>
                    {method.badge && (
                      <Badge className="bg-sage text-primary-foreground border-0 text-[10px] absolute top-2 right-2">
                        {method.badge}
                      </Badge>
                    )}
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                      paymentMethod === method.id ? "border-terracotta bg-terracotta" : "border-border"
                    )}>
                      {paymentMethod === method.id && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </button>
                ))}
              </div>

              {paymentMethod !== "cod" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-border/60"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="payNumber" className="text-sm font-medium text-cocoa">
                        {paymentMethod === "card" ? "Card Number" : `${paymentMethod.toUpperCase()} Number`}
                      </Label>
                      <Input id="payNumber" placeholder={paymentMethod === "card" ? "0000 0000 0000 0000" : "01XXXXXXXXX"} className="mt-1.5 rounded-xl" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card rounded-2xl border border-border/60 p-6">
              <h2 className="font-display text-lg font-semibold text-cocoa mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className={`relative h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br ${item.bg} flex items-center justify-center text-2xl`}>
                      {item.emoji}
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-terracotta text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-cocoa line-clamp-2">{item.name}</div>
                      <div className="text-xs text-cocoa/60 mt-0.5">৳{formatPrice(item.price)} × {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-cocoa text-sm">
                      ৳{formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-t border-border/60 text-sm">
                <div className="flex justify-between">
                  <span className="text-cocoa/70">Subtotal</span>
                  <span className="font-medium text-cocoa">৳{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa/70">Delivery</span>
                  <span className="font-medium text-cocoa">
                    {deliveryFee === 0 ? <span className="text-sage">FREE</span> : `৳${formatPrice(deliveryFee)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-cocoa/60">
                  <span className="inline-flex items-center gap-1"><Truck className="h-3 w-3" /> Estimated delivery</span>
                  <span>1-3 business days</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border/60 mb-5">
                <span className="font-display text-base font-semibold text-cocoa">Total</span>
                <span className="font-display text-2xl font-semibold text-cocoa">
                  ৳{formatPrice(total)}
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium group"
              >
                <Lock className="h-4 w-4 mr-2" />
                Place Order
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="mt-4 text-center text-xs text-cocoa/50">
                By placing your order, you agree to our{" "}
                <button type="button" onClick={() => navigate("terms")} className="text-terracotta hover:underline">Terms of Use</button>
                {" "}and{" "}
                <button type="button" onClick={() => navigate("privacy")} className="text-terracotta hover:underline">Privacy Policy</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
