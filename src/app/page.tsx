"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { HomePage } from "@/components/pages/home";
import { ShopPage } from "@/components/pages/shop";
import { ProductDetailPage } from "@/components/pages/product-detail";
import { CartPage } from "@/components/pages/cart";
import { CheckoutPage } from "@/components/pages/checkout";
import { AboutPage } from "@/components/pages/about";
import { ContactPage } from "@/components/pages/contact";
import { BlogPage } from "@/components/pages/blog";
import { BlogSinglePage } from "@/components/pages/blog-single";
import { LegalPage } from "@/components/pages/legal";
import { NotFoundPage } from "@/components/pages/not-found";
import { AccountPage } from "@/components/pages/account";
import { useRouter } from "@/lib/store";
import { ErrorBoundary } from "@/components/error-boundary";

// URL path → page mapping
const PATH_TO_PAGE: Record<string, { page: string; params?: any }> = {
  "/": { page: "home" },
  "/shop": { page: "shop" },
  "/cart": { page: "cart" },
  "/checkout": { page: "checkout" },
  "/about": { page: "about" },
  "/contact": { page: "contact" },
  "/blog": { page: "blog" },
  "/privacy": { page: "privacy" },
  "/terms": { page: "terms" },
  "/dmca": { page: "dmca" },
  "/disclaimer": { page: "disclaimer" },
  "/account": { page: "account" },
};

export default function Home() {
  const page = useRouter((s) => s.page);
  const loadData = useRouter((s) => s.loadData);

  // Load CMS data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // On first load, read URL and set the right page
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, "") || "/";

    if (PATH_TO_PAGE[path]) {
      useRouter.setState(PATH_TO_PAGE[path]);
      return;
    }

    // /product/{slug} — use slug, not ID
    if (path.startsWith("/product/")) {
      const slug = path.split("/")[2];
      if (slug) {
        useRouter.setState({ page: "product", params: { productSlug: slug } });
        return;
      }
    }

    // /blog/{slug} — use slug, not ID
    if (path.startsWith("/blog/")) {
      const slug = path.split("/")[2];
      if (slug) {
        useRouter.setState({ page: "blog-single", params: { blogSlug: slug } });
        return;
      }
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.page) {
        useRouter.setState({ page: e.state.page, params: e.state.params || {} });
      } else {
        const path = window.location.pathname.replace(/\/$/, "") || "/";
        if (PATH_TO_PAGE[path]) {
          useRouter.setState(PATH_TO_PAGE[path]);
        } else if (path.startsWith("/product/")) {
          useRouter.setState({ page: "product", params: { productSlug: path.split("/")[2] } });
        } else if (path.startsWith("/blog/")) {
          useRouter.setState({ page: "blog-single", params: { blogSlug: path.split("/")[2] } });
        } else {
          useRouter.setState({ page: "home", params: {} });
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "shop": return <ShopPage />;
      case "product": return <ProductDetailPage />;
      case "cart": return <CartPage />;
      case "checkout": return <CheckoutPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "blog": return <BlogPage />;
      case "blog-single": return <BlogSinglePage />;
      case "privacy": return <LegalPage page="privacy" />;
      case "terms": return <LegalPage page="terms" />;
      case "dmca": return <LegalPage page="dmca" />;
      case "disclaimer": return <LegalPage page="disclaimer" />;
      case "account": return <AccountPage />;
      case "not-found": return <NotFoundPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ErrorBoundary key={page}>
              {renderPage()}
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
