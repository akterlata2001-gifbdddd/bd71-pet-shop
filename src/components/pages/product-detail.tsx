"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw, ChevronRight,
  Minus, Plus, Home as HomeIcon, Check, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter, useCart } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/site/product-card";

export function ProductDetailPage() {
  const navigate = useRouter((s) => s.navigate);
  const params = useRouter((s) => s.params);
  const addItem = useCart((s) => s.addItem);
  const allProducts = useRouter((s) => s.products);
  const dataLoaded = useRouter((s) => s.dataLoaded);

  // ALL hooks MUST be called before any early return (React rules)
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "shipping">("description");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // Find by slug (preferred) or by productId (fallback)
  const product = params.productSlug
    ? allProducts.find((p) => p.slug === params.productSlug)
    : params.productId
    ? allProducts.find((p) => p.id === params.productId)
    : null;

  // Loading state — data not loaded yet
  if (!dataLoaded) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">🐾</div>
          <p className="text-cocoa/60 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  // Product not found after data loaded
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-6xl mb-4">😿</div>
        <h1 className="font-display text-2xl font-semibold text-cocoa mb-2">Product not found</h1>
        <p className="text-cocoa/60 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={() => navigate("shop")} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
          Back to Shop
        </Button>
      </div>
    );
  }

  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      emoji: product.emoji,
      bg: product.bg,
    }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      emoji: product.emoji,
      bg: product.bg,
    }, quantity);
    navigate("checkout");
  };

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60 flex-wrap">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => navigate("shop")} className="hover:text-terracotta">Shop</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => navigate("shop", { category: product.category })} className="hover:text-terracotta capitalize">
              {product.categoryName}
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "relative aspect-square rounded-3xl bg-gradient-to-br overflow-hidden flex items-center justify-center",
                (product.bg || "from-amber-glow/30 to-terracotta/20")
              )}
            >
              {product.tag && (
                <Badge className="absolute top-4 left-4 z-10 border-0 text-xs font-bold px-3 py-1.5 bg-terracotta text-primary-foreground">
                  {product.tag}
                </Badge>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-warm hover:scale-110 transition-transform"
                aria-label="Add to wishlist"
              >
                <Heart className={cn("h-5 w-5", wishlisted ? "fill-terracotta text-terracotta" : "text-cocoa/60")} />
              </button>
              {product.featured_image ? (
                <img
                  src={product.featured_image}
                  alt={product.name}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />
              ) : (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[180px] sm:text-[220px] drop-shadow-2xl select-none"
                >
                  {product.emoji}
                </motion.div>
              )}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-dashed border-white/20" />
              </div>
            </motion.div>

            {/* Thumbnail strip (decorative) */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-xl bg-gradient-to-br flex items-center justify-center text-3xl border-2 cursor-pointer transition-all",
                    i === 0 ? "border-terracotta" : "border-border hover:border-terracotta/40",
                    product.bg
                  )}
                >
                  {product.featured_image ? (
                    <img src={product.featured_image} alt="" className="w-full h-full object-cover rounded-xl opacity-70" />
                  ) : (
                    <span className="opacity-70">{product.emoji}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                {product.brand}
              </span>
              <span className="text-xs text-cocoa/40">·</span>
              <span className="text-xs text-cocoa/60">SKU: {product.sku}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-cocoa tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-4 flex-wrap">
              {product.reviews > 0 ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-4 w-4",
                          s <= Math.floor(product.rating) ? "fill-amber-glow text-amber-glow" : "text-cocoa/20"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-cocoa">{product.rating}</span>
                  <span className="text-sm text-cocoa/60">({product.reviews} reviews)</span>
                </div>
              ) : (
                <Badge className="bg-sage/15 text-sage border-0">
                  <Check className="h-3 w-3 mr-1" /> New Arrival
                </Badge>
              )}
              {product.inStock ? (
                <Badge className="bg-sage/15 text-sage border-0">
                  <Check className="h-3 w-3 mr-1" /> In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-3xl sm:text-4xl font-semibold text-cocoa">
                ৳{formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-cocoa/40 line-through mb-1">
                    ৳{formatPrice(product.oldPrice)}
                  </span>
                  <Badge className="bg-terracotta text-primary-foreground border-0 mb-2">
                    Save ৳{formatPrice(product.oldPrice - product.price)}
                  </Badge>
                </>
              )}
            </div>

            <p className="mt-5 text-sm sm:text-base text-cocoa/70 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            <div className="mt-4 flex items-center gap-3 text-sm text-cocoa/70">
              <span className="font-medium">Weight:</span>
              <span className="px-3 py-1 rounded-full bg-secondary text-cocoa text-xs font-medium">{product.weight}</span>
            </div>

            {/* Quantity & actions */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-1 bg-card rounded-full border-2 border-border p-1.5 self-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-9 w-9 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-display text-base font-semibold text-cocoa">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-9 w-9 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 h-12 rounded-full text-sm font-medium transition-all",
                  added ? "bg-sage hover:bg-sage text-primary-foreground" : "bg-terracotta hover:bg-terracotta/90 text-primary-foreground"
                )}
              >
                {added ? (
                  <><Check className="h-4 w-4 mr-2" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart</>
                )}
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-12 rounded-full bg-cocoa hover:bg-cocoa/90 text-primary-foreground text-sm font-medium"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 border-cocoa/15 hover:bg-secondary"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Fast Delivery", sub: "1-3 days nationwide" },
                { icon: ShieldCheck, label: "100% Authentic", sub: "Genuine guarantee" },
                { icon: RefreshCw, label: "Easy Returns", sub: "7-day return policy" },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl border border-border/60 p-3 text-center">
                  <item.icon className="h-5 w-5 text-terracotta mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-cocoa">{item.label}</div>
                  <div className="text-[10px] text-cocoa/60 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-border/60 flex gap-1">
            {[
              { id: "description" as const, label: "Description" },
              { id: "shipping" as const, label: "Shipping & Returns" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 sm:px-5 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id ? "text-terracotta" : "text-cocoa/60 hover:text-cocoa"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4">
                {/* Full description as HTML */}
                {product.rawDescription ? (
                  <div
                    className="blog-content text-cocoa/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.rawDescription }}
                  />
                ) : (
                  <p className="text-cocoa/70 leading-relaxed text-base">
                    {product.description || "No description available."}
                  </p>
                )}

                {/* Quick details card */}
                <div className="bg-secondary/60 rounded-2xl p-5 mt-6">
                  <h3 className="font-display text-base font-semibold text-cocoa mb-3">Quick Details</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-cocoa/60">Brand:</span>
                      <span className="font-medium text-cocoa">{product.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cocoa/60">Weight:</span>
                      <span className="font-medium text-cocoa">{product.weight || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cocoa/60">Category:</span>
                      <span className="font-medium text-cocoa">{product.categoryName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cocoa/60">SKU:</span>
                      <span className="font-medium text-cocoa font-mono text-xs">{product.sku || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="max-w-3xl space-y-5">
                <div className="bg-card rounded-2xl border border-border/60 p-5">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-terracotta mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-cocoa mb-1">Delivery Information</h3>
                      <p className="text-sm text-cocoa/70 leading-relaxed">
                        We deliver nationwide across Bangladesh through trusted courier services.
                        Dhaka deliveries are typically completed within 1–2 business days, while
                        other districts may take 2–4 business days.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl border border-border/60 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-sage mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-cocoa mb-1">Damaged or Wrong Product</h3>
                      <p className="text-sm text-cocoa/70 leading-relaxed">
                        If you receive a damaged or incorrect item, please contact us within 24 hours
                        of delivery. We will arrange a replacement or refund as quickly as possible.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl border border-border/60 p-5">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-amber-glow mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-cocoa mb-1">100% Authentic Guarantee</h3>
                      <p className="text-sm text-cocoa/70 leading-relaxed">
                        We source all our products directly from authorized distributors and
                        importers to ensure 100% authenticity and freshness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
