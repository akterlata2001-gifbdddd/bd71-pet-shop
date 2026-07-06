"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3x3, List, ChevronDown, X, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/site/product-card";
import { useRouter } from "@/lib/store";
import { products, categories, formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const brands = ["Purina", "Drools", "Orijen", "SmartHeart", "Miow Miow", "Whiskas", "Royal Canin", "Purina Pro", "Paws", "Haisenpet", "Nature Bridge", "Trendline"];

export function ShopPage() {
  const navigate = useRouter((s) => s.navigate);
  const params = useRouter((s) => s.params);
  const [selectedCategory, setSelectedCategory] = useState<string>(params.category || "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [selectedCategory, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRange([0, 20000]);
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (priceRange[0] !== 0 || priceRange[1] !== 20000 ? 1 : 0);

  const FilterSidebar = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cocoa">
            Categories
          </h3>
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-terracotta hover:underline">
              Clear all
            </button>
          )}
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center justify-between",
              selectedCategory === "all"
                ? "bg-terracotta text-primary-foreground font-medium"
                : "text-cocoa/70 hover:bg-secondary"
            )}
          >
            All Products
            <span className="text-xs opacity-70">{products.length}</span>
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center justify-between",
                  selectedCategory === cat.id
                    ? "bg-terracotta text-primary-foreground font-medium"
                    : "text-cocoa/70 hover:bg-secondary"
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.emoji}</span>
                  {cat.name}
                </span>
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border/60" />

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cocoa mb-3">
          Brands
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar pr-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-border text-terracotta focus:ring-terracotta/30"
              />
              <span className="text-sm text-cocoa/80 group-hover:text-cocoa transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/60" />

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cocoa mb-3">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cocoa/60">৳</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-2 py-1.5 rounded-lg border border-border bg-card text-cocoa text-sm"
              placeholder="Min"
            />
            <span className="text-cocoa/40">—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-2 py-1.5 rounded-lg border border-border bg-card text-cocoa text-sm"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-terracotta"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-xs text-cocoa/60 mb-4">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" />
              Home
            </button>
            <span>/</span>
            <span className="text-cocoa font-medium">Shop</span>
            {selectedCategory !== "all" && (
              <>
                <span>/</span>
                <span className="text-terracotta font-medium capitalize">
                  {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight">
                {selectedCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.id === selectedCategory)?.name || "Shop"}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-cocoa/70">
                {filtered.length} {filtered.length === 1 ? "product" : "products"} available
                {selectedCategory !== "all" && (
                  <> · {categories.find((c) => c.id === selectedCategory)?.longDesc}</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-card rounded-2xl border border-border/60 p-5">
              {FilterSidebar}
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden rounded-full border-2 border-cocoa/15"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1.5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1.5 bg-terracotta text-primary-foreground border-0 px-1.5 py-0 text-[10px]">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <div className="hidden sm:flex items-center gap-1 bg-card rounded-full border border-border/60 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                      viewMode === "grid" ? "bg-terracotta text-primary-foreground" : "text-cocoa/60 hover:text-cocoa"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                      viewMode === "list" ? "bg-terracotta text-primary-foreground" : "text-cocoa/60 hover:text-cocoa"
                    )}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-cocoa/60">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-2 rounded-full border border-border bg-card text-sm text-cocoa font-medium cursor-pointer hover:bg-secondary transition-colors"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/60 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
                <div className="h-20 w-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center text-4xl">
                  🔍
                </div>
                <h3 className="font-display text-lg font-semibold text-cocoa mb-1">No products found</h3>
                <p className="text-sm text-cocoa/60 mb-4">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters} className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full">
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((product, i) => (
                  <ProductListItem key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="absolute left-0 top-0 bottom-0 w-[300px] bg-background overflow-y-auto p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold text-cocoa">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {FilterSidebar}
            <Button
              onClick={() => setShowFilters(false)}
              className="w-full mt-6 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full"
            >
              Show {filtered.length} Results
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ProductListItem({ product, index }: { product: typeof products[0]; index: number }) {
  const navigate = useRouter((s) => s.navigate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={() => navigate("product", { productId: product.id })}
      className="group bg-card rounded-2xl border border-border/60 p-4 flex gap-4 hover:shadow-warm transition-all cursor-pointer"
    >
      <div className={`h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-xl bg-gradient-to-br ${product.bg} flex items-center justify-center text-5xl`}>
        {product.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-terracotta">{product.brand}</span>
          {product.tag && (
            <Badge className="bg-sage text-primary-foreground border-0 text-[10px] px-2 py-0">{product.tag}</Badge>
          )}
        </div>
        <h3 className="font-semibold text-cocoa line-clamp-1 group-hover:text-terracotta transition-colors">{product.name}</h3>
        <p className="text-sm text-cocoa/60 line-clamp-2 mt-1 hidden sm:block">{product.description}</p>
        <div className="flex items-center gap-1 text-xs text-cocoa/60 mt-1.5">
          <Star className="h-3 w-3 fill-amber-glow text-amber-glow" />
          <span className="font-medium text-cocoa">{product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-xs text-cocoa/40 line-through">৳{formatPrice(product.oldPrice)}</span>
          )}
          <span className="font-display text-lg font-semibold text-cocoa">৳{formatPrice(product.price)}</span>
        </div>
      </div>
    </motion.div>
  );
}
