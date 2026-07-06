import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Features, PromoBanners, WhyChooseUs } from "@/components/site/features";
import { Products } from "@/components/site/products";
import { Categories } from "@/components/site/categories";
import { Blog, Newsletter } from "@/components/site/blog";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <PromoBanners />
        <Products />
        <Categories />
        <WhyChooseUs />
        <Blog />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
