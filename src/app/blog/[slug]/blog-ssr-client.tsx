"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { BlogSinglePage } from "@/components/pages/blog-single";
import { StoreInitializer } from "@/components/site/store-initializer";

// =====================================================
// Client wrapper — receives SSR post data and injects
// it into the Zustand store so BlogSinglePage finds it.
// =====================================================

export function BlogSingleSSR({ post }: { post: any }) {
  const allPosts = useRouter((s) => s.blogPosts);
  const dataLoaded = useRouter((s) => s.dataLoaded);

  useEffect(() => {
    if (!post) return;
    useRouter.setState({
      page: "blog-single",
      params: { blogSlug: post.slug, blogId: post.id },
    } as any);

    const exists = allPosts.find((p: any) => p.slug === post.slug);
    if (!exists && dataLoaded) {
      useRouter.setState((s) => ({
        blogPosts: [...s.blogPosts, mapApiPost(post)] as any,
      }));
    }
  }, [post, allPosts.length, dataLoaded]);

  return (
    <>
      <StoreInitializer />
      <BlogSinglePage />
    </>
  );
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
