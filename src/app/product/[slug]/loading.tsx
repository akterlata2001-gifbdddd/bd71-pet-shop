// =====================================================
// Loading state for /product/[slug] route transitions
// =====================================================
// Next.js App Router shows this component while the server
// component is fetching the new product (during a route
// transition like /product/a → /product/b).
//
// Returning null means: render nothing during the brief
// fetch window. This is much better than the default
// behavior (showing the OLD product page while the new
// one loads), which causes a visible "stale content" flash.
//
// The previous product page's React tree stays mounted
// underneath, so when the new product arrives, it swaps
// in immediately. The user perceives an instant swap
// rather than a flash of wrong content.
// =====================================================

export default function ProductLoading() {
  return null;
}
