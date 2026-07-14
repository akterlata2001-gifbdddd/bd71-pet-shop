"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Star, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter, useCart } from "@/lib/store";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useRouter((s) => s.navigate);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      emoji: product.emoji,
      bg: product.bg || "from-amber-glow/30 to-terracotta/20",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const goToProduct = () => navigate("product", { productSlug: product.slug || String(product.id) });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={goToProduct}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className={cn(
        "relative aspect-square bg-gradient-to-br overflow-hidden flex items-center justify-center",
        product.bg || "from-amber-glow/30 to-terracotta/20"
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

        {product.featured_image ? (
          <motion.img
            src={product.featured_image}
            alt={product.name}
            animate={hover ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover absolute inset-0"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              // Try next image from images array
              const allImages = product.images || [];
              const currentIdx = allImages.indexOf(product.featured_image);
              if (currentIdx >= 0 && currentIdx < allImages.length - 1) {
                img.src = allImages[currentIdx + 1];
              } else {
                img.style.display = "none";
                const fallback = img.parentElement?.querySelector('[data-fallback]') as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          data-fallback
          className="absolute inset-0 items-center justify-center"
          style={{ display: product.featured_image ? "none" : "flex" }}
        >
          <motion.div
            animate={hover ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-7xl sm:text-8xl drop-shadow-lg select-none"
            aria-hidden="true"
          >
            {product.emoji}
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-dashed border-white/30 group-hover:rotate-45 transition-transform duration-700" />
        </div>

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
            onClick={(e) => {
              e.stopPropagation();
              goToProduct();
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 rounded-full bg-card shadow-warm border border-border/40 hover:bg-secondary"
            aria-label="Add to wishlist"
            onClick={(e) => e.stopPropagation()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-terracotta">
            {product.brand}
          </span>
          {product.reviews > 0 ? (
            <div className="flex items-center gap-1 text-xs text-cocoa/70">
              <Star className="h-3 w-3 fill-amber-glow text-amber-glow" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-cocoa/40">({product.reviews})</span>
            </div>
          ) : (
            <span className="text-[10px] font-medium uppercase tracking-wider text-sage bg-sage/10 px-2 py-0.5 rounded-full">
              New
            </span>
          )}
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
                <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
