"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#products", hasMenu: true },
  { label: "Categories", href: "#categories" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const shopMenu = [
  { label: "Cat Food", desc: "Premium nutrition for felines" },
  { label: "Dog Food", desc: "Healthy meals for dogs" },
  { label: "Bird Food", desc: "Quality seeds & mixes" },
  { label: "Fish Food", desc: "Aquatic nutrition" },
  { label: "Cat Litter", desc: "All flavors available" },
  { label: "Pet Care", desc: "Wellness essentials" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-terracotta text-primary-foreground text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-2 sm:gap-6 text-center">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>+880 1700-000000</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Truck className="h-3.5 w-3.5" />
            <span>Free delivery within 10km • Get 10% off your first order</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="font-semibold">৳</span>
            <span>Cash on Delivery</span>
          </span>
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
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2.5 shrink-0 group">
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
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasMenu && setShopOpen(true)}
                  onMouseLeave={() => link.hasMenu && setShopOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="px-3.5 py-2 text-sm font-medium text-cocoa/80 hover:text-terracotta transition-colors flex items-center gap-1 rounded-lg hover:bg-secondary/60"
                  >
                    {link.label}
                    {link.hasMenu && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>
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
                              <Link
                                key={item.label}
                                href="#products"
                                className="px-3 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors group/item"
                              >
                                <div className="text-sm font-semibold text-cocoa group-hover/item:text-terracotta transition-colors">
                                  {item.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {item.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Search"
              >
                <Search className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Wishlist"
              >
                <Heart className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10 rounded-full text-cocoa hover:bg-secondary/80"
                aria-label="Account"
              >
                <User className="h-4.5 w-4.5" />
              </Button>
              <button
                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-secondary hover:bg-terracotta hover:text-primary-foreground text-cocoa transition-all flex items-center justify-center group"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-glow text-cocoa text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu */}
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
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 text-base font-medium text-cocoa/90 hover:bg-secondary/60 hover:text-terracotta rounded-xl transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="my-3 h-px bg-border/60" />
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Shop by Pet
                    </div>
                    {shopMenu.map((item) => (
                      <Link
                        key={item.label}
                        href="#products"
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-2.5 text-sm text-cocoa/80 hover:text-terracotta rounded-xl hover:bg-secondary/60 transition-colors flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted-foreground" />
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
