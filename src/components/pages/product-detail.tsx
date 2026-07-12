"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw, ChevronRight,
  Minus, Plus, Home as HomeIcon, Check, Share2, MessageSquare, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useRouter, useCart } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/site/product-card";
import {
  parseFAQFromText,
  generateProductSchema,
  generateFAQSchema,
  serializeSchema,
} from "@/lib/schema";
import { stripSchemaMarkup } from "@/lib/clean-description";

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

  // ===== FAQ detection + JSON-LD schema =====
  // Parse the description for FAQ Q&A patterns so we can render them as an
  // expandable accordion (better UX) and emit FAQPage structured data (SEO).
  //
  // stripSchemaMarkup is called defensively here too — even though
  // mapProduct already strips schema, the product may have been loaded
  // from a stale localStorage cache populated before the fix shipped.
  const rawDescription = stripSchemaMarkup(
    product.rawDescription || product.description || ""
  );
  const descriptionIsHtml = /<[a-z][\s\S]*>/i.test(rawDescription);
  const { regularText, faqs } = descriptionIsHtml
    ? { regularText: [] as string[], faqs: [] as { question: string; answer: string }[] }
    : parseFAQFromText(rawDescription);

  const productSchema = generateProductSchema(product);
  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

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
      {/* JSON-LD structured data for SEO — hidden from users, visible to search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(faqSchema) }}
        />
      )}

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
                {/* Full description — render plain text as paragraphs (with FAQ
                    detection) or HTML as-is. */}
                {(() => {
                  // Always strip schema markup before rendering — even
                  // HTML descriptions may contain <script> blocks left
                  // behind by the WP SEO plugin.
                  const raw = stripSchemaMarkup(
                    product.rawDescription || product.description || ""
                  );
                  if (!raw.trim()) return <p className="text-cocoa/70">No description available.</p>;

                  // If it's HTML (has tags), render as-is — FAQ parsing only
                  // applies to plain text.
                  if (descriptionIsHtml) {
                    return (
                      <div
                        className="blog-content text-cocoa/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: raw }}
                      />
                    );
                  }

                  // Plain text — render regular paragraphs (non-FAQ lines) using
                  // the same heading / label-value heuristics as before.
                  const renderParagraph = (para: string, i: number) => {
                    // Heading: short line ending with ":"
                    const isHeading = para.length < 80 && para.trim().endsWith(":");
                    if (isHeading) {
                      return (
                        <h3 key={i} className="font-display text-lg font-semibold text-cocoa mt-4 mb-1">
                          {para.trim()}
                        </h3>
                      );
                    }
                    // "Label: Value" pattern
                    const labelMatch = para.match(/^([^:]{3,50}):\s*(.*)/);
                    if (labelMatch && para.length < 300) {
                      return (
                        <div key={i} className="flex gap-2">
                          <span className="font-semibold text-cocoa shrink-0">{labelMatch[1]}:</span>
                          <span className="text-cocoa/75">{labelMatch[2]}</span>
                        </div>
                      );
                    }
                    // Regular paragraph
                    return (
                      <p key={i} className="text-cocoa/75 leading-relaxed text-base">
                        {para.trim()}
                      </p>
                    );
                  };

                  return (
                    <div className="space-y-4">
                      {regularText.map(renderParagraph)}
                    </div>
                  );
                })()}

                {/* FAQs parsed from the description, rendered as an accordion */}
                {faqs.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold text-cocoa mb-3">
                      Frequently Asked Questions
                    </h3>
                    <Accordion type="single" collapsible className="w-full rounded-2xl bg-card border border-border/60 px-4">
                      {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`}>
                          <AccordionTrigger className="text-cocoa font-medium text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-cocoa/75 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
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

        {/* Customer Reviews */}
        <ProductReviews productSlug={product.slug} productName={product.name} />
      </div>
    </div>
  );
}

// =====================================================
// ProductReviews — review list + submit form
// =====================================================
function ProductReviews({ productSlug, productName }: { productSlug: string; productName: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ customerName: "", rating: 5, title: "", content: "" });

  const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
  const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";

  useEffect(() => {
    if (!productSlug) return;
    fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/products/${productSlug}/reviews`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setReviews(json.data.reviews ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/products/${productSlug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setShowForm(false);
        setForm({ customerName: "", rating: 5, title: "", content: "" });
      }
    } catch {} finally { setSubmitting(false); }
  }

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-terracotta" />
          Customer Reviews
        </h2>
        {!showForm && !submitted && (
          <Button variant="outline" onClick={() => setShowForm(true)} className="rounded-full">
            Write a Review
          </Button>
        )}
      </div>

      {submitted && (
        <div className="bg-sage/10 rounded-2xl p-5 mb-6 text-center">
          <Check className="h-8 w-8 text-sage mx-auto mb-2" />
          <p className="font-medium text-cocoa">Thank you for your review!</p>
          <p className="text-sm text-cocoa/60 mt-1">It will appear here after admin approval.</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/60 p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-cocoa">Your Name *</label>
              <input
                type="text" required value={form.customerName}
                onChange={e => setForm({ ...form, customerName: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-cocoa">Rating *</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}>
                    <Star className={cn("h-6 w-6", s <= form.rating ? "fill-amber-glow text-amber-glow" : "text-cocoa/20")} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-cocoa">Title (optional)</label>
            <input
              type="text" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm"
              placeholder="Great product!"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-cocoa">Review *</label>
            <textarea
              required value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={submitting} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
              {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting</> : "Submit Review"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">Cancel</Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin inline text-cocoa/40" /></div>
      ) : reviews.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border/60 p-8 text-center">
          <MessageSquare className="h-10 w-10 mx-auto text-cocoa/20 mb-3" />
          <p className="text-cocoa/60">No reviews yet. Be the first to review {productName}!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Rating summary */}
          <div className="flex items-center gap-4 bg-card rounded-2xl border border-border/60 p-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-cocoa">{avgRating.toFixed(1)}</div>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={cn("h-4 w-4", s <= Math.round(avgRating) ? "fill-amber-glow text-amber-glow" : "text-cocoa/20")} />
                ))}
              </div>
              <div className="text-xs text-cocoa/60 mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
            </div>
            <div className="flex-1" />
          </div>

          {/* Review list */}
          {reviews.map((r, i) => (
            <div key={r.id ?? i} className="bg-card rounded-2xl border border-border/60 p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-bold text-sm">
                    {r.customer_name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-cocoa text-sm">{r.customer_name}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={cn("h-3 w-3", s <= r.rating ? "fill-amber-glow text-amber-glow" : "text-cocoa/20")} />
                      ))}
                    </div>
                  </div>
                </div>
                {r.is_verified_purchase && (
                  <Badge className="bg-sage/15 text-sage border-0 text-[10px]">
                    <Check className="h-2.5 w-2.5 mr-1" />Verified
                  </Badge>
                )}
              </div>
              {r.title && <p className="font-semibold text-cocoa text-sm mb-1">{r.title}</p>}
              {r.content && <p className="text-sm text-cocoa/70 leading-relaxed">{r.content}</p>}
              <p className="text-xs text-cocoa/40 mt-2">
                {r.created_at ? new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
