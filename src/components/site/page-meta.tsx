"use client";

// =====================================================
// <PageMeta /> — sets dynamic SEO metadata for the current SPA route.
// =====================================================
// Mount once at the top of the app (in app/page.tsx). It listens to
// router state + product/post data and updates document.title, meta
// description, OG tags, and canonical URL whenever the route changes.
// =====================================================

import { useEffect, useMemo } from "react";
import { useRouter } from "@/lib/store";
import { setPageMeta, type PageMeta } from "@/lib/use-page-meta";

const BASE_URL = "https://bd71shop.com.bd";

const STATIC_META: Record<string, PageMeta> = {
  home: {
    title: "BD71 Pet Shop | Premium Pet Food Online in Bangladesh",
    description:
      "Shop premium pet food for cats, dogs, birds & fish at BD71 Pet Shop. Genuine products, affordable prices & fast delivery across Bangladesh.",
    path: "/",
    keywords:
      "pet food Bangladesh, cat food, dog food, BD71 Pet Shop, pet shop Dhaka, premium pet food",
  },
  shop: {
    title: "Shop All Pet Products | BD71 Pet Shop",
    description:
      "Browse our full range of premium pet food, treats, litter, toys, and accessories. Genuine products with fast delivery across Bangladesh.",
    path: "/shop",
    keywords: "pet shop, pet food, cat food, dog food, pet accessories Bangladesh",
  },
  cart: {
    title: "Your Cart | BD71 Pet Shop",
    description: "Review your cart and proceed to checkout.",
    path: "/cart",
  },
  checkout: {
    title: "Checkout | BD71 Pet Shop",
    description: "Secure checkout with cash on delivery and bKash/Nagad support.",
    path: "/checkout",
  },
  about: {
    title: "About Us | BD71 Pet Shop",
    description:
      "BD71 Pet Shop is Bangladesh's trusted source for premium pet food and supplies since 2021. Genuine products, fair prices, fast delivery.",
    path: "/about",
  },
  contact: {
    title: "Contact Us | BD71 Pet Shop",
    description:
      "Get in touch with BD71 Pet Shop. Call 01627-001719 or message us — we're open 24/7.",
    path: "/contact",
  },
  blog: {
    title: "Pet Care Blog | BD71 Pet Shop",
    description:
      "Pet care tips, expert guides, and stories from our community of pet lovers across Bangladesh.",
    path: "/blog",
  },
  privacy: {
    title: "Privacy Policy | BD71 Pet Shop",
    description: "How BD71 Pet Shop collects, uses, and protects your data.",
    path: "/privacy",
  },
  terms: {
    title: "Terms & Conditions | BD71 Pet Shop",
    description: "Terms and conditions for using BD71 Pet Shop.",
    path: "/terms",
  },
  dmca: {
    title: "DMCA Policy | BD71 Pet Shop",
    description: "DMCA policy and takedown procedure for BD71 Pet Shop.",
    path: "/dmca",
  },
  disclaimer: {
    title: "Disclaimer | BD71 Pet Shop",
    description: "Disclaimer for BD71 Pet Shop products and content.",
    path: "/disclaimer",
  },
  account: {
    title: "My Account | BD71 Pet Shop",
    description: "View your orders and account details.",
    path: "/account",
  },
  "not-found": {
    title: "Page Not Found | BD71 Pet Shop",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
  },
};

export function PageMeta() {
  const page = useRouter((s) => s.page);
  const params = useRouter((s) => s.params);
  const products = useRouter((s) => s.products);
  const blogPosts = useRouter((s) => s.blogPosts);

  // Compute the metadata for the current page
  const meta: PageMeta | null = useMemo(() => {
    // ===== Product detail page =====
    if (page === "product") {
      const product = params.productSlug
        ? products.find((p) => p.slug === params.productSlug)
        : params.productId
        ? products.find((p) => p.id === params.productId)
        : null;

      if (!product) {
        return {
          title: "Loading product… | BD71 Pet Shop",
          description: "Loading product details.",
          path: params.productSlug ? `/product/${params.productSlug}` : "/shop",
        };
      }

      const seo = product.seo;
      // ===== Fallback chain =====
      // Use migrated Yoast data first (preserves WP ranking signals),
      // then product fields, then a sensible default.
      const title = seo?.seo_title || `${product.name} — ৳${product.price}`;
      const description = seo?.seo_description
        || product.shortDescription
        || (product.description || "").slice(0, 160)
        || `${product.name} — buy online at BD71 Pet Shop with fast delivery across Bangladesh.`;
      const image = seo?.og_image || product.featured_image;
      const keywords = seo?.focus_keyword
        || `${product.name}, ${product.brand}, ${product.categoryName}, buy online Bangladesh`;

      return {
        title,
        description,
        // Canonical = the CURRENT product page URL on the new domain.
        // Never the old WP canonical_url — that URL no longer exists.
        path: `/product/${product.slug || product.id}`,
        image,
        keywords,
        isArticle: true,
        robotsIndex: seo?.robots_index ?? true,
        robotsFollow: seo?.robots_follow ?? true,
      };
    }

    // ===== Blog archive (with optional category filter) =====
    if (page === "blog") {
      return STATIC_META.blog;
    }

    // ===== Blog single post =====
    if (page === "blog-single") {
      const post = params.blogSlug
        ? blogPosts.find((p) => p.slug === params.blogSlug)
        : null;
      if (!post) {
        return {
          title: "Article | BD71 Pet Shop",
          description: "Loading article.",
          path: params.blogSlug ? `/blog/${params.blogSlug}` : "/blog",
        };
      }

      const seo = post.seo;
      const title = seo?.seo_title || `${post.title} | BD71 Pet Shop Blog`;
      const description = seo?.seo_description
        || post.excerpt
        || "Read the latest pet care tips on the BD71 Pet Shop blog.";
      const image = seo?.og_image || post.cover_image;
      const keywords = seo?.focus_keyword || post.category;

      return {
        title,
        description,
        path: `/blog/${post.slug || post.id}`,
        image,
        keywords,
        isArticle: true,
        robotsIndex: seo?.robots_index ?? true,
        robotsFollow: seo?.robots_follow ?? true,
      };
    }

    // ===== Shop with category filter =====
    if (page === "shop" && params.category) {
      const cat = products.find((p) => p.category === params.category)?.categoryName;
      return {
        title: cat ? `${cat} — Shop Online | BD71 Pet Shop` : "Shop | BD71 Pet Shop",
        description: cat
          ? `Browse ${cat} at BD71 Pet Shop. Genuine products, fair prices, fast delivery across Bangladesh.`
          : "Browse our full range of premium pet products.",
        path: `/shop?category=${encodeURIComponent(params.category as string)}`,
      };
    }

    // ===== Static pages =====
    return STATIC_META[page] ?? STATIC_META.home;
  }, [page, params.productSlug, params.productId, params.blogSlug, params.category, products, blogPosts]);

  useEffect(() => {
    if (meta) setPageMeta(meta);
  }, [meta]);

  return null;
}
