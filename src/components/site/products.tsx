"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Star, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  emoji: string;
  bg: string;
  tag?: string;
  category: "cat" | "dog" | "new";
};

const products: Product[] = [
  { id: 1, name: "Purina Friskies Meaty Grills", brand: "Purina", price: 400, rating: 4.8, reviews: 124, emoji: "🍖", bg: "from-amber-glow/30 to-terracotta/20", tag: "Cat", category: "cat" },
  { id: 2, name: "Drools Kitten Booster Milk Replacer", brand: "Drools", price: 820, rating: 4.9, reviews: 89, emoji: "🥛", bg: "from-sage/20 to-secondary", category: "new" },
  { id: 3, name: "Miow Miow First Milk Kitten Powder", brand: "Miow Miow", price: 520, rating: 4.7, reviews: 56, emoji: "🍼", bg: "from-terracotta/15 to-amber-glow/15", category: "cat" },
  { id: 4, name: "Orijen Cat Food Healthy Meals", brand: "Orijen", price: 1400, oldPrice: 1500, rating: 4.9, reviews: 210, emoji: "🐟", bg: "from-sage/25 to-amber-glow/15", tag: "-7%", category: "cat" },
  { id: 5, name: "Smartheart Cat Pouch Tuna & Chicken", brand: "SmartHeart", price: 80, rating: 4.6, reviews: 312, emoji: "🐟", bg: "from-amber-glow/25 to-terracotta/15", category: "new" },
  { id: 6, name: "Drools Puppy Dog Food Chicken & Egg 3kg", brand: "Drools", price: 1100, rating: 4.8, reviews: 145, emoji: "🦴", bg: "from-terracotta/20 to-amber-glow/20", tag: "Free 700g", category: "dog" },
  { id: 7, name: "Drools Adult Dog Food Chicken & Egg 3kg", brand: "Drools", price: 1300, rating: 4.7, reviews: 98, emoji: "🦴", bg: "from-sage/20 to-terracotta/15", category: "dog" },
  { id: 8, name: "Purina Pro Plan Puppy Chicken & Rice", brand: "Purina Pro", price: 10500, rating: 4.9, reviews: 76, emoji: "🍗", bg: "from-amber-glow/20 to-sage/15", category: "dog" },
  { id: 9, name: "Purina Pro Plan Puppy Medium Breed 2.5kg", brand: "Purina Pro", price: 4600, rating: 4.8, reviews: 64, emoji: "🍗", bg: "from-terracotta/15 to-amber-glow/25", category: "new" },
  { id: 10, name: "PURINA PRO Plan Puppy Large Breed", brand: "Purina Pro", price: 18000, rating: 4.9, reviews: 42, emoji: "🦴", bg: "from-amber-glow/25 to-terracotta/20", tag: "Premium", category: "dog" },
];

const tabs = [
  { id: "new", label: "New Arrivals" },
  { id: "cat", label: "For Cats" },
  { id: "dog", label: "For Dogs" },
] as const;

function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 flex flex-col"
    >
      {/* Product visual */}
      <div className={cn(
        "relative aspect-square bg-gradient-to-br overflow-hidden flex items-center justify-center",
        product.bg
      )}>
        {product.tag && (
          <Badge
            className={cn(
              "absolute top-3 left-3 z-10 border-0 text-[10px] font-bold px-2.5 py-1",
              product.tag.startsWith("-")
                ? "bg-terracotta text-primary-foreground"
                : product.tag === "Premium"
                ? "bg-cocoa text-primary-foreground"
                : "bg-sage text-primary-foreground"
            )}
          >
            {product.tag}
          </Badge>
        )}

        {/* Floating emoji as product illustration */}
        <motion.div
          animate={hover ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-7xl sm:text-8xl drop-shadow-lg select-none"
          aria-hidden="true"
        >
          {product.emoji}
        </motion.div>

        {/* Decorative circle */}
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-dashed border-white/30 group-hover:rotate-45 transition-transform duration-700" />
        </div>

        {/* Hover quick actions */}
        <div
          className={cn(
            "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-300",
            hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 sm:flex sm:opacity-0 sm:translate-y-3"
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 rounded-full bg-card shadow-warm border border-border/40 hover:bg-secondary"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 rounded-full bg-card shadow-warm border border-border/40 hover:bg-secondary"
            aria-label="Add to wishlist"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-terracotta">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs text-cocoa/70">
            <Star className="h-3 w-3 fill-amber-glow text-amber-glow" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-cocoa/40">({product.reviews})</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-cocoa leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-cocoa/40 line-through">
                ৳{formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-display text-lg font-semibold text-cocoa">
              ৳{formatPrice(product.price)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            className={cn(
              "h-9 px-3 rounded-full text-xs font-medium transition-all",
              added
                ? "bg-sage hover:bg-sage text-primary-foreground"
                : "bg-terracotta hover:bg-terracotta/90 text-primary-foreground"
            )}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function Products() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("new");
  const filtered = products.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
              Our Products
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
              Curated nutrition for every pet
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cocoa/70 text-pretty">
              Hand-picked premium products from brands you trust.
            </p>
          </div>

          {/* Tabs */}
          <div className="inline-flex p-1 rounded-full bg-secondary/80 border border-border/60 self-start sm:self-end">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors",
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-cocoa/70 hover:text-cocoa"
                )}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-terracotta rounded-full shadow-warm"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 sm:gap-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See more */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-7 rounded-full border-2 border-cocoa/15 text-cocoa hover:bg-secondary hover:border-cocoa/25 text-base font-medium group"
            asChild
          >
            <a href="#products">
              See More Products
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
