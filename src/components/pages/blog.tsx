"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Home as HomeIcon, ChevronRight, Calendar, MessageCircle, Search, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/lib/store";
import { cn } from "@/lib/utils";

// Build category filter list dynamically from the actual posts' categories
// (falls back to a sensible default while posts are loading).
const DEFAULT_CATEGORIES = ["All", "Pet Care", "Dog Care", "Cat Care", "Pet Foods"];

// ===== Pagination config =====
const POSTS_PER_PAGE = 9;
const MAX_VISIBLE_PAGE_BUTTONS = 5; // odd number — current page in the middle

export function BlogPage() {
  const blogPosts = useRouter((s) => s.blogPosts);
  const navigate = useRouter((s) => s.navigate);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Build the category filter list from the actual post categories
  const categories = useMemo(() => {
    if (blogPosts.length === 0) return DEFAULT_CATEGORIES;
    const set = new Set<string>();
    for (const p of blogPosts) {
      if (p.category) set.add(p.category);
    }
    const list = Array.from(set).sort();
    return ["All", ...list];
  }, [blogPosts]);

  const filtered = useMemo(() => {
    let result = [...blogPosts];
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search, blogPosts]);

  // Reset to page 1 whenever filters change so users don't end up on a
  // page that doesn't exist after narrowing the list.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  // ===== Pagination math =====
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  // Build the page-number button list (windowed around current page)
  const pageButtons = useMemo(() => {
    const buttons: (number | "…")[] = [];
    if (totalPages <= MAX_VISIBLE_PAGE_BUTTONS) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
      return buttons;
    }
    const half = Math.floor(MAX_VISIBLE_PAGE_BUTTONS / 2);
    let start = safePage - half;
    let end = safePage + half;
    if (start < 1) {
      start = 1;
      end = MAX_VISIBLE_PAGE_BUTTONS;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - MAX_VISIBLE_PAGE_BUTTONS + 1;
    }
    if (start > 1) {
      buttons.push(1);
      if (start > 2) buttons.push("…");
    }
    for (let i = start; i <= end; i++) buttons.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) buttons.push("…");
      buttons.push(totalPages);
    }
    return buttons;
  }, [safePage, totalPages]);

  const featured = blogPosts.length > 0 ? blogPosts[0] : null;

  if (!featured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-cocoa/60">Loading blog posts...</p>
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
            <span className="text-cocoa font-medium">Blog</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight mt-3">
            The BD71 Blog
          </h1>
          <p className="mt-2 text-base text-cocoa/70 max-w-2xl">
            Pet care tips, expert guides, and stories from our community of pet lovers across
            Bangladesh.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Featured post */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("blog-single", { blogSlug: featured.slug || String(featured.id) })}
          className="group w-full bg-card rounded-3xl border border-border/60 overflow-hidden hover:shadow-warm transition-all mb-10 text-left"
        >
          <div className="grid lg:grid-cols-2">
            <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${featured.bg} flex items-center justify-center overflow-hidden`}>
              {featured.cover_image ? (
                <img src={featured.cover_image} alt={featured.title} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
              ) : (
                <span className="text-9xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  {featured.emoji}
                </span>
              )}
              <Badge className="absolute top-4 left-4 bg-card/90 text-cocoa border-0 font-semibold">
                ⭐ Featured
              </Badge>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 h-24 w-24 rounded-full border-2 border-dashed border-cocoa/30 group-hover:rotate-90 transition-transform duration-700" />
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-terracotta/10 text-terracotta border-0">{featured.category}</Badge>
                <span className="text-xs text-cocoa/60">{featured.readTime}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cocoa leading-tight group-hover:text-terracotta transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-cocoa/70 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs text-cocoa/60">
                <span className="inline-flex items-center gap-1.5">
                  <div className="h-7 w-7 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold text-xs">
                    B
                  </div>
                  {featured.author}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {featured.date}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {featured.comments}
                </span>
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
                Read full article
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </motion.button>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full bg-card border-border"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                  activeCategory === cat
                    ? "bg-terracotta text-primary-foreground border-terracotta"
                    : "bg-card text-cocoa/70 border-border hover:bg-secondary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border/60 p-12 text-center">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-lg font-semibold text-cocoa mb-1">No articles found</h3>
            <p className="text-sm text-cocoa/60">Try a different search or category filter</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {paginated.map((post, i) => (
                <motion.button
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => navigate("blog-single", { blogSlug: post.slug || String(post.id) })}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col text-left"
                >
                  <div className={`relative h-48 bg-gradient-to-br ${post.bg} overflow-hidden flex items-center justify-center`}>
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
                    ) : (
                      <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                        {post.emoji}
                      </span>
                    )}
                    <Badge className="absolute top-3 left-3 bg-card/90 text-cocoa border-0 text-[11px] font-semibold px-2.5 py-1">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-cocoa/60 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-cocoa leading-tight line-clamp-2 group-hover:text-terracotta transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-cocoa/65 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs font-medium text-cocoa/50">{post.author}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* ===== Pagination ===== */}
            {totalPages > 1 && (
              <nav
                aria-label="Blog pagination"
                className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-xs text-cocoa/60">
                  Showing{" "}
                  <span className="font-medium text-cocoa">
                    {(safePage - 1) * POSTS_PER_PAGE + 1}–
                    {Math.min(safePage * POSTS_PER_PAGE, filtered.length)}
                  </span>{" "}
                  of <span className="font-medium text-cocoa">{filtered.length}</span> articles
                </p>

                <div className="flex items-center gap-1.5">
                  {/* Prev */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center transition-colors border",
                      safePage === 1
                        ? "opacity-40 cursor-not-allowed border-border/40 text-cocoa/40"
                        : "border-border text-cocoa hover:bg-terracotta hover:text-primary-foreground hover:border-terracotta"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page numbers */}
                  {pageButtons.map((b, i) =>
                    b === "…" ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="h-9 w-9 flex items-center justify-center text-cocoa/40 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={b}
                        onClick={() => {
                          setCurrentPage(b);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-current={b === safePage ? "page" : undefined}
                        className={cn(
                          "h-9 min-w-9 px-3 rounded-full flex items-center justify-center text-sm font-medium transition-colors border",
                          b === safePage
                            ? "bg-terracotta text-primary-foreground border-terracotta"
                            : "border-border text-cocoa hover:bg-terracotta hover:text-primary-foreground hover:border-terracotta"
                        )}
                      >
                        {b}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center transition-colors border",
                      safePage === totalPages
                        ? "opacity-40 cursor-not-allowed border-border/40 text-cocoa/40"
                        : "border-border text-cocoa hover:bg-terracotta hover:text-primary-foreground hover:border-terracotta"
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
