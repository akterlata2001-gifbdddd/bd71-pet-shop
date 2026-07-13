"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Truck,
  ChevronDown,
  User,
  Heart,
  Globe,
  Facebook,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PawIcon } from "./icons";
import { SearchModal } from "./search-modal";
import { cn } from "@/lib/utils";
import { useRouter, useCart, type PageId } from "@/lib/store";
import { siteInfo } from "@/lib/data";

const navLinks: { label: string; page: PageId; hasMenu?: boolean }[] = [
  { label: "Home", page: "home" },
  { label: "Shop", page: "shop", hasMenu: true },
  { label: "Blog", page: "blog" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useRouter((s) => s.navigate);
  const dynamicCategories = useRouter((s) => s.categories);
  const cartCount = useCart((s) => s.count());
  const setOpen = useCart((s) => s.setOpen);

  // Global keyboard shortcut: Cmd/Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Build the dropdown shop menu from the actual CMS categories.
  // Only show categories that have at least 1 product.
  // No fallback demo categories — if no CMS data, dropdown is empty.
  const shopMenu = dynamicCategories
    .filter((c) => c.count > 0)
    .slice(0, 8)
    .map((c) => ({
        label: c.name,
        desc: c.desc || `${c.count} product${c.count === 1 ? "" : "s"}`,
        category: c.slug,
      }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (page: PageId, params?: Record<string, unknown>) => {
    navigate(page, params as never);
    setMobileOpen(false);
    setShopOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <div className="bg-terracotta text-primary-foreground text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-2 sm:gap-6 text-center">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>{siteInfo.phone}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Truck className="h-3.5 w-3.5" />
            <span>Free delivery within 10km • Get 10% off your first order</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="font-semibold">৳</span>
            <span>Cash on Delivery</span>
          </span>
          {/* Social icons */}
          <div className="ml-auto flex items-center gap-1.5">
            <a href="#" aria-label="Facebook" className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary-foreground/15 transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="Instagram" className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary-foreground/15 transition-colors">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href={`https://wa.me/${siteInfo.phone.replace(/[^+\d]/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary-foreground/15 transition-colors">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-soft border-b border-border/60"
            : "bg-background/40 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            <button
              onClick={() => goTo("home")}
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="BD71 Pet Shop home"
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-terracotta flex items-center justify-center shadow-warm transition-transform group-hover:scale-105">
                <PawIcon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-glow ring-2 ring-background" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl sm:text-2xl font-semibold text-cocoa tracking-tight">
                  BD71
                </span>
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-terracotta uppercase">
                  Pet Shop
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasMenu && setShopOpen(true)}
                  onMouseLeave={() => link.hasMenu && setShopOpen(false)}
                >
                  <button
                    onClick={() => goTo(link.page)}
                    className="px-3.5 py-2 text-sm font-medium text-cocoa/80 hover:text-terracotta transition-colors flex items-center gap-1 rounded-lg hover:bg-secondary/60"
                  >
                    {link.label}
                    {link.hasMenu && <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                  {link.hasMenu && (
                    <AnimatePresence>
                      {shopOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 pt-2 w-[460px]"
                        >
                          <div className="bg-card rounded-2xl shadow-warm border border-border/60 p-3 grid grid-cols-2 gap-1">
                            {shopMenu.map((item) => (
                              <button
                                key={item.label}
                                onClick={() =>
                                  goTo("shop", { category: item.category })
                                }
                                className="px-3 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors group/item text-left"
                              >
                                <div className="text-sm font-semibold text-cocoa group-hover/item:text-terracotta transition-colors">
                                  {item.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {item.desc}
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search bar — desktop */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-10 px-3.5 rounded-full bg-secondary hover:bg-secondary/80 text-cocoa/60 transition-colors group"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm">Search products, posts...</span>
              </button>
              {/* Search icon — mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Wishlist"
                onClick={() => goTo("account")}
              >
                <Heart className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Account"
                onClick={() => goTo("account")}
              >
                <User className="h-4.5 w-4.5" />
              </Button>
              <button
                onClick={() => setOpen(true)}
                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa transition-all flex items-center justify-center group"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-glow text-cocoa text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                    {cartCount}
                  </span>
                )}
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                  <SheetHeader className="p-5 border-b border-border/60">
                    <SheetTitle className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-terracotta flex items-center justify-center">
                        <PawIcon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="font-display text-lg font-semibold text-cocoa">
                          BD71
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.2em] text-terracotta uppercase">
                          Pet Shop
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col p-3">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => goTo(link.page)}
                        className="px-4 py-3 text-left text-base font-medium text-cocoa/90 hover:bg-secondary/60 hover:text-terracotta rounded-xl transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                    <div className="my-3 h-px bg-border/60" />
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Shop by Pet
                    </div>
                    {shopMenu.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => goTo("shop", { category: item.category })}
                        className="px-4 py-2.5 text-left text-sm text-cocoa/80 hover:text-terracotta rounded-xl hover:bg-secondary/60 transition-colors flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted-foreground" />
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Global search overlay */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
