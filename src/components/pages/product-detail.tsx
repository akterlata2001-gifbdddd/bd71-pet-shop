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
import { getProductById, getRelatedProducts, formatPrice } from "@/lib/data";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

export function ProductDetailPage() {
  const navigate = useRouter((s) => s.navigate);
  const params = useRouter((s) => s.params);
  const addItem = useCart((s) => s.addItem);
  const product = getProductById(params.productId || 1);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

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

  const related = getRelatedProducts(product, 4);

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
                product.bg
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
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[180px] sm:text-[220px] drop-shadow-2xl select-none"
              >
                {product.emoji}
              </motion.div>
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
                  <span className="opacity-70">{product.emoji}</span>
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

            <div className="mt-3 flex items-center gap-4">
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
              {product.description}
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
              { id: "features" as const, label: `Features (${product.features.length})` },
              { id: "reviews" as const, label: `Reviews (${product.reviews})` },
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
              <div className="prose prose-sm sm:prose-base max-w-none">
                <p className="text-cocoa/80 leading-relaxed text-base">{product.description}</p>
                <p className="text-cocoa/70 leading-relaxed text-base mt-4">
                  This product is carefully selected by BD71 Pet Shop to ensure quality, safety, and
                  nutritional value for your pet. We work directly with authorized distributors in
                  Bangladesh to guarantee authenticity and freshness. Each batch is checked for
                  expiration dates and packaging integrity before shipping.
                </p>
              </div>
            )}
            {activeTab === "features" && (
              <ul className="space-y-3 max-w-2xl">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-cocoa/80"
                  >
                    <div className="h-6 w-6 rounded-full bg-sage/15 text-sage flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-base leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-3xl">
                <div className="bg-card rounded-2xl border border-border/60 p-5 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="text-center">
                    <div className="font-display text-5xl font-semibold text-cocoa">{product.rating}</div>
                    <div className="flex items-center gap-0.5 my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("h-4 w-4", s <= Math.floor(product.rating) ? "fill-amber-glow text-amber-glow" : "text-cocoa/20")} />
                      ))}
                    </div>
                    <div className="text-xs text-cocoa/60">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-cocoa/60">{star}</span>
                          <Star className="h-3 w-3 fill-amber-glow text-amber-glow" />
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-amber-glow rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-right text-cocoa/60">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {[
                  { name: "Rahim Uddin", date: "2 weeks ago", rating: 5, text: "Excellent quality! My cat loves this food. Delivery was fast and the packaging was secure. Highly recommend BD71 Pet Shop." },
                  { name: "Sadia Islam", date: "1 month ago", rating: 5, text: "Genuine product at a great price. My kitten has been thriving on this. Will definitely order again." },
                  { name: "Mahmud Hasan", date: "2 months ago", rating: 4, text: "Good product overall. Took a bit longer to deliver than expected but the quality is authentic. Customer service was responsive." },
                ].map((review, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border/60 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-display font-semibold">
                          {review.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-cocoa text-sm">{review.name}</div>
                          <div className="text-xs text-cocoa/50">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("h-3.5 w-3.5", s <= review.rating ? "fill-amber-glow text-amber-glow" : "text-cocoa/20")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-cocoa/70 leading-relaxed">{review.text}</p>
                  </div>
                ))}
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
