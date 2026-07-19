"use client";

import { useMemo } from "react";
import { useRouter } from "@/lib/store";
import { BlogSinglePage } from "@/components/pages/blog-single";

// =====================================================
// Client wrapper — receives SSR post data and injects
// it into the Zustand store so BlogSinglePage finds it.
// =====================================================

export function BlogSingleSSR({ post }: { post: any }) {
  // ===== Inject the SSR post SYNCHRONOUSLY during render =====
  // useMemo runs DURING render (not after, like useEffect), so
  // the store has the post BEFORE the first paint. No "Loading
  // article..." flash during page navigation.
  useMemo(() => {
    if (!post) return;

    useRouter.setState({
      page: "blog-single",
      params: { blogSlug: post.slug, blogId: post.id },
    } as any);

    const current = useRouter.getState().blogPosts;
    const exists = current.find((p: any) => p.slug === post.slug);
    if (!exists) {
      useRouter.setState((s) => ({
        blogPosts: [...s.blogPosts, mapApiPost(post)] as any,
      }));
    }
  }, [post]);

  return <BlogSinglePage />;
}

function mapApiPost(p: any) {
  return {
    id: parseInt(String(p.id).replace(/-/g, "").slice(0, 8), 16) || Math.floor(Math.random() * 1e6),
    slug: p.slug,
    title: p.title ?? "Untitled",
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    image: p.featured_image ?? "",
    author: p.author ?? "BD71 Pet Shop",
    date: p.published_at ?? p.created_at ?? new Date().toISOString(),
    category: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags[0] : "General",
    readTime: p.read_time ?? 5,
    tags: p.tags ?? [],
  };
}
