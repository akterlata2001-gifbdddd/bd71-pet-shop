"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Package, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

// =====================================================
// SearchModal — global search overlay
// =====================================================
// Triggered from header search button. Searches in-memory
// products + blog posts (already loaded in the Zustand store).
// Returns live results with keyboard navigation:
//   ↑↓ — move selection
//   Enter — go to selected result
//   Esc — close
// =====================================================

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: string;
  type: "product" | "post" | "category";
  title: string;
  subtitle?: string;
  image?: string;
  emoji?: string;
  bg?: string;
  price?: number;
  category?: string;
  slug?: string;
  href: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const navigate = useRouter((s) => s.navigate);
  const products = useRouter((s) => s.products);
  const blogPosts = useRouter((s) => s.blogPosts);
  const categories = useRouter((s) => s.categories);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Build search index
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() || query.trim().length < 1) return [];

    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    const matches = (text: string): boolean => {
      const t = text.toLowerCase();
      return terms.every(term => t.includes(term));
    };

    const out: SearchResult[] = [];

    // Search products
    for (const p of products) {
      const haystack = `${p.name} ${p.brand} ${p.categoryName} ${p.category} ${p.sku} ${p.description ?? ""} ${p.shortDescription ?? ""}`;
      if (matches(haystack)) {
        out.push({
          id: `p-${p.id}`,
          type: "product",
          title: p.name,
          subtitle: p.brand,
          image: p.featured_image,
          emoji: p.emoji,
          bg: p.bg,
          price: p.price,
          category: p.categoryName,
          slug: p.slug,
          href: () => navigate("product", p.slug ? { productSlug: p.slug } : { productId: String(p.id) }),
        });
      }
      if (out.length >= 20) break;
    }

    // Search blog posts
    for (const post of blogPosts) {
      const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author}`;
      if (matches(haystack)) {
        out.push({
          id: `b-${post.id}`,
          type: "post",
          title: post.title,
          subtitle: post.category,
          image: post.cover_image,
          emoji: post.emoji,
          bg: post.bg,
          slug: post.slug,
          href: () => navigate("blog-single", post.slug ? { blogSlug: post.slug } : { blogId: post.id }),
        });
      }
      if (out.length >= 30) break;
    }

    // Search categories
    for (const cat of categories) {
      if (matches(`${cat.name} ${cat.slug} ${cat.desc}`)) {
        out.push({
          id: `c-${cat.id}`,
          type: "category",
          title: cat.name,
          subtitle: `${cat.count} products`,
          emoji: cat.emoji,
          bg: cat.bg,
          href: () => navigate("shop", { category: cat.slug }),
        });
      }
    }

    return out;
  }, [query, products, blogPosts, categories, navigate]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].href();
        onClose();
      }
    }
  }

  // Scroll selected result into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const el = resultsRef.current.querySelector(`[data-idx="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const r of results) {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    }
    return groups;
  }, [results]);

  const groupLabels: Record<string, string> = {
    product: "Products",
    post: "Blog Posts",
    category: "Categories",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-cocoa/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-[10vh] max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border/60 overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
                <Search className="h-5 w-5 text-cocoa/40 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, blog posts, categories..."
                  className="flex-1 bg-transparent outline-none text-base text-cocoa placeholder:text-cocoa/40"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-cocoa/40 hover:text-cocoa p-1 rounded"
                    aria-label="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-cocoa/50 bg-secondary rounded border border-border">ESC</kbd>
              </div>

              {/* Results */}
              <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
                {query.trim().length === 0 ? (
                  <div className="p-12 text-center">
                    <Search className="h-10 w-10 mx-auto text-cocoa/20 mb-3" />
                    <p className="text-sm text-cocoa/60">Start typing to search across our catalog</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-sm text-cocoa/60 mb-1">No results for &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-cocoa/40">Try a different keyword or check spelling</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {/* Build a flat list for keyboard nav indexing */}
                    {Object.entries(grouped).map(([type, items]) => (
                      <div key={type} className="mb-2">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cocoa/40">
                          {groupLabels[type] ?? type} ({items.length})
                        </div>
                        {items.map((item) => {
                          const flatIdx = results.indexOf(item);
                          const selected = flatIdx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              data-idx={flatIdx}
                              onClick={() => { item.href(); onClose(); }}
                              onMouseEnter={() => setSelectedIndex(flatIdx)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                                selected ? "bg-secondary" : "hover:bg-secondary/60"
                              )}
                            >
                              {/* Thumbnail */}
                              {item.image ? (
                                <div className="h-10 w-10 rounded-lg overflow-hidden bg-secondary shrink-0">
                                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                                </div>
                              ) : (
                                <div className={cn(
                                  "h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl shrink-0",
                                  item.bg || "from-terracotta/15 to-amber-glow/10"
                                )}>
                                  {item.emoji || (item.type === "post" ? "📝" : "🐾")}
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-cocoa truncate">
                                  {item.title}
                                </div>
                                {item.subtitle && (
                                  <div className="text-xs text-cocoa/60 truncate">
                                    {item.subtitle}{item.category ? ` • ${item.category}` : ""}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {item.price !== undefined && (
                                  <span className="text-sm font-semibold text-terracotta">
                                    ৳{formatPrice(item.price)}
                                  </span>
                                )}
                                <ArrowRight className={cn(
                                  "h-3.5 w-3.5 transition-opacity",
                                  selected ? "opacity-100 text-terracotta" : "opacity-30"
                                )} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {results.length > 0 && (
                <div className="px-5 py-2.5 border-t border-border/60 bg-secondary/30 flex items-center justify-between text-[11px] text-cocoa/60">
                  <div className="flex items-center gap-3">
                    <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                    <span><kbd className="font-mono">↵</kbd> select</span>
                    <span><kbd className="font-mono">esc</kbd> close</span>
                  </div>
                  <span>{results.length} result{results.length !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
