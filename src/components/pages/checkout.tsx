"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, CreditCard, Truck, MapPin, User, Lock, Check, ArrowRight, Banknote, Loader2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart, useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTurnstile } from "@/components/site/turnstile-widget";

// CMS API config (same as store.ts)
const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

export function CheckoutPage() {
  const navigate = useRouter((s) => s.navigate);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clearCart = useCart((s) => s.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "card">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderNumber: string; total: number; error?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<{ valid: boolean; discount: number; message: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const { token: turnstileToken, widget: turnstileWidget } = useTurnstile();

  // Form refs — read values on submit
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // ===== Handle payment return (gateway redirects back here with ?payment=status&order=...) =====
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const orderNum = params.get("order");
    if (paymentStatus && orderNum) {
      setSubmitted(true);
      if (paymentStatus === "success") {
        setOrderResult({ orderNumber: orderNum, total: 0 });
        setError(null);
      } else if (paymentStatus === "cancelled") {
        setOrderResult({ orderNumber: orderNum, total: 0, error: "Payment was cancelled." });
        setError("Payment was cancelled. Please try again.");
      } else if (paymentStatus === "failed") {
        setOrderResult({ orderNumber: orderNum, total: 0, error: "Payment failed." });
        setError("Payment verification failed. Please contact us if money was deducted.");
      } else if (paymentStatus === "error") {
        setOrderResult({ orderNumber: orderNum, total: 0, error: "Payment error." });
        setError("There was an error processing your payment. Please try again or contact us.");
      }
      // Clean URL
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
      window.scrollTo({ top: 0 });
    }
  }, []);

  const deliveryFee = subtotal > 2000 ? 0 : 60;
  const discount = couponStatus?.valid ? couponStatus.discount : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true); setCouponStatus(null);
    try {
      const res = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": CMS_API_KEY },
        body: JSON.stringify({ code: couponCode.trim(), cartTotal: subtotal }),
      });
      const json = await res.json();
      if (json.success && json.data.valid) {
        setCouponStatus({ valid: true, discount: json.data.discountAmount, message: `Saved ৳${json.data.discountAmount}` });
      } else {
        setCouponStatus({ valid: false, discount: 0, message: json.data?.reason || "Invalid coupon" });
      }
    } catch {
      setCouponStatus({ valid: false, discount: 0, message: "Failed to validate" });
    } finally { setCouponLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Collect form data
      const fullName = fullNameRef.current?.value || "";
      const phone = phoneRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const address = addressRef.current?.value || "";
      const notes = notesRef.current?.value || "";

      // Validate full name
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        setSubmitting(false);
        return;
      }

      // Validate Bangladeshi phone number
      // Accepts: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
      const phoneClean = phone.replace(/[\s-]/g, "");
      const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
      if (!phoneRegex.test(phoneClean)) {
        setError("Please enter a valid Bangladeshi phone number (e.g., 01712345678).");
        setSubmitting(false);
        return;
      }

      // Validate address
      if (!address.trim()) {
        setError("Please enter your full delivery address.");
        setSubmitting(false);
        return;
      }

      // Build order items from cart
      const orderItems = items.map((item) => ({
        product_id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        variant_id: null,
      }));

      // Build shipping address — single field
      const shippingAddress = {
        full_address: address.trim(),
        country: "Bangladesh",
      };

      // Step 1: Create order in CMS (always with COD as fallback method initially)
      const res = await fetch(
        `${CMS_API}/api/v1/sites/${CMS_SITE_ID}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": CMS_API_KEY,
            ...(turnstileToken ? { "x-turnstile-token": turnstileToken } : {}),
          },
          body: JSON.stringify({
            customerName: fullName.trim(),
            customerEmail: email || undefined,
            customerPhone: phoneClean,
            shippingAddress,
            items: orderItems,
            subtotal,
            shippingCost: deliveryFee,
            discount,
            couponCode: couponStatus?.valid ? couponCode : undefined,
            tax: 0,
            total,
            paymentMethod,
          }),
        }
      );

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message ?? "Failed to place order");
      }

      const orderId = json.data?.order?.id;
      const orderNum = json.data?.order?.order_number ?? `ORD-${Date.now().toString().slice(-6)}`;

      // Step 2: If payment method is NOT COD, initiate gateway redirect
      if (paymentMethod !== "cod" && orderId) {
        try {
          const initRes = await fetch(
            `${CMS_API}/api/v1/sites/${CMS_SITE_ID}/payments/initiate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": CMS_API_KEY,
              },
              body: JSON.stringify({
                orderId,
                method: paymentMethod === "card" ? "stripe" : paymentMethod,
                returnUrl: `${window.location.origin}/checkout`,
              }),
            }
          );
          const initJson = await initRes.json();

          if (initJson.success && initJson.data?.redirectUrl) {
            // Clear cart before redirect (order will show as success after return)
            clearCart();
            // Redirect to gateway (SSLCommerz / bKash / Stripe)
            window.location.href = initJson.data.redirectUrl;
            return;
          }

          // No redirect URL — either demo mode or gateway error.
          // If demo mode, treat as success. Otherwise show error.
          if (initJson.data?.isDemo) {
            setOrderResult({ orderNumber: orderNum, total });
            setSubmitted(true);
            clearCart();
            window.scrollTo({ top: 0 });
            return;
          }

          // Gateway failed to initiate — show warning but order is still created
          setError(
            initJson.data?.error
              ? `Order placed, but payment gateway error: ${initJson.data.error}. Our team will contact you.`
              : "Order placed, but payment gateway could not be reached. Our team will contact you."
          );
          setOrderResult({ orderNumber: orderNum, total });
          setSubmitted(true);
          clearCart();
          window.scrollTo({ top: 0 });
          return;
        } catch (err) {
          // Payment initiation failed — still record order, mark as COD
          setError(
            `Order placed (Order #${orderNum}), but payment initiation failed: ${
              err instanceof Error ? err.message : "Network error"
            }. Our team will contact you to confirm payment.`
          );
          setOrderResult({ orderNumber: orderNum, total });
          setSubmitted(true);
          clearCart();
          window.scrollTo({ top: 0 });
          return;
        }
      }

      // COD success!
      setOrderResult({ orderNumber: orderNum, total });
      setSubmitted(true);
      clearCart();
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ===== Empty cart state =====
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

  // ===== Success state =====
  if (submitted && orderResult) {
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
              <div className="font-display text-xl font-semibold text-terracotta">{orderResult.orderNumber}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left mb-6">
              <div className="bg-secondary/40 rounded-xl p-3">
                <div className="text-xs text-cocoa/60">Total Amount</div>
                <div className="font-display text-lg font-semibold text-cocoa">৳{formatPrice(orderResult.total)}</div>
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
                onClick={() => navigate("home")}
                className="flex-1 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("shop")}
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

  // ===== Checkout form =====
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
        {error && (
          <div className="mb-6 bg-destructive/10 text-destructive p-4 rounded-xl flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
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
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-cocoa">Full Name *</Label>
                  <Input id="fullName" ref={fullNameRef} required placeholder="e.g., Rahim Uddin" className="mt-1.5 rounded-xl" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-cocoa">Phone Number *</Label>
                    <Input id="phone" ref={phoneRef} required type="tel" placeholder="01XXXXXXXXX" pattern="^(?:\+?88)?01[3-9]\d{8}$" className="mt-1.5 rounded-xl" />
                    <p className="text-[11px] text-cocoa/50 mt-1">Bangladeshi number only (e.g., 01712345678)</p>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-cocoa">Email Address (optional)</Label>
                    <Input id="email" ref={emailRef} type="email" placeholder="you@example.com" className="mt-1.5 rounded-xl" />
                  </div>
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
                  <h2 className="font-display text-lg font-semibold text-cocoa">Delivery Address</h2>
                  <p className="text-xs text-cocoa/60">Where should we deliver your order?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-cocoa">Full Address *</Label>
                  <textarea
                    id="address"
                    ref={addressRef}
                    required
                    rows={3}
                    placeholder="House #, Road #, Area, City — full delivery address"
                    className="mt-1.5 w-full px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-cocoa">Order Notes (optional)</Label>
                  <textarea
                    id="notes"
                    ref={notesRef}
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
                  <div className="bg-amber-glow/10 rounded-lg p-3 text-xs text-amber-glow">
                    ⚠ {paymentMethod === "card" ? "Card" : paymentMethod.toUpperCase()} payment will be processed after order confirmation. Our team will contact you.
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

              {/* Coupon input */}
              <div className="py-4 border-t border-border/60">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponStatus(null); }}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-sm text-cocoa focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                  <Button type="button" onClick={applyCoupon} disabled={couponLoading || !couponCode} variant="outline" className="rounded-xl">
                    {couponLoading ? "..." : "Apply"}
                  </Button>
                </div>
                {couponStatus && (
                  <p className={`text-xs mt-1.5 ${couponStatus.valid ? "text-sage" : "text-red-500"}`}>
                    {couponStatus.valid ? `✓ ${couponStatus.message}` : `✗ ${couponStatus.message}`}
                  </p>
                )}
              </div>

              <div className="space-y-2 py-4 border-t border-border/60 text-sm">
                <div className="flex justify-between">
                  <span className="text-cocoa/70">Subtotal</span>
                  <span className="font-medium text-cocoa">৳{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>Discount</span>
                    <span className="font-medium">−৳{formatPrice(discount)}</span>
                  </div>
                )}
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

              {turnstileWidget}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium group"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Placing Order...</>
                ) : (
                  <><Lock className="h-4 w-4 mr-2" /> Place Order <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                )}
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
