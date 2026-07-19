// =====================================================
// Loading state for /blog/[slug] route transitions
// =====================================================
// See /product/[slug]/loading.tsx for the full rationale.
// Returning null renders nothing during the brief fetch
// window, preventing "Article not found" or stale-content
// flashes during blog post navigation.
// =====================================================

export default function BlogLoading() {
  return null;
}
