import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Test Page — Should Work",
  description: "If you see this title, dynamic routing is working.",
};

export default function TestPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>SEO Test Page</h1>
      <p>If you see this page with the title "SEO Test Page — Should Work", then Next.js dynamic routing is working correctly.</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  );
}
