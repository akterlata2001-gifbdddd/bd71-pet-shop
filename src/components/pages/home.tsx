"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CatIllustration,
  DogIllustration,
  FishIllustration,
  BirdIllustration,
  PawPattern,
} from "@/components/site/icons";
import { useRouter } from "@/lib/store";
import { Features, PromoBanners, WhyChooseUs } from "@/components/site/sections";
import { ProductCard } from "@/components/site/product-card";

export function HomePage() {
  const navigate = useRouter((s) => s.navigate);
  const products = useRouter((s) => s.products);
  const blogPosts = useRouter((s) => s.blogPosts);
  const featured = products.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-paw-pattern">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-glow/25 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-terracotta/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full bg-sage/15 blur-3xl" />
        </div>
        <PawPattern className="absolute inset-0 w-full h-full text-terracotta/30 -z-10 opacity-40" />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-amber-glow/20 border border-amber-glow/40 px-4 py-1.5 text-sm font-medium text-cocoa mb-6"
              >
                <Sparkles className="h-4 w-4 text-amber-glow" />
                <span>Where Being A Pet Is Just The Best</span>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-cocoa leading-[1.05] tracking-tight text-balance">
                Crafted with love for{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-terracotta to-amber-glow bg-clip-text text-transparent">
                    your feline
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-amber-glow/50"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 8 Q 50 2, 100 6 T 198 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </span>{" "}
                &amp; canine friend.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-cocoa/70 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed">
                Natural ingredients, balanced nutrition, and flavors pets can&apos;t resist.
                Shop premium pet food for cats, dogs, birds &amp; fish — delivered fast across
                Bangladesh.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="h-13 px-7 rounded-full bg-terracotta hover:bg-terracotta/90 text-primary-foreground shadow-warm text-base font-medium group"
                  onClick={() => navigate("shop")}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-7 rounded-full border-2 border-cocoa/15 bg-card/60 backdrop-blur text-cocoa hover:bg-secondary hover:border-cocoa/25 text-base font-medium"
                  onClick={() => navigate("shop")}
                >
                  Browse Categories
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
                {[
                  { value: "315+", label: "Products" },
                  { value: "Since 2021", label: "Trusted" },
                  { value: "100%", label: "Genuine" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="font-display text-2xl sm:text-3xl font-semibold text-terracotta">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-cocoa/60 mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative h-[380px] sm:h-[480px] lg:h-[560px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px] rounded-full border-2 border-dashed border-terracotta/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[260px] w-[260px] sm:h-[330px] sm:w-[330px] lg:h-[380px] lg:w-[380px] rounded-full border border-amber-glow/30"
                />
                <div className="absolute h-[200px] w-[200px] sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px] rounded-full bg-gradient-to-br from-amber-glow/40 to-terracotta/20 backdrop-blur-sm" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <CatIllustration className="h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64 drop-shadow-2xl" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-4 right-2 sm:right-8 z-30"
              >
                <div className="relative bg-card rounded-3xl p-3 shadow-warm border border-border/40">
                  <DogIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
                  <Badge className="absolute -top-2 -left-2 bg-sage text-primary-foreground border-0 text-[10px] px-2">
                    New
                  </Badge>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-6 left-2 sm:left-6 z-30"
              >
                <div className="relative bg-card rounded-3xl p-3 shadow-warm border border-border/40">
                  <FishIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-12 right-0 sm:right-2 z-30"
              >
                <div className="relative bg-card rounded-3xl p-2.5 shadow-warm border border-border/40">
                  <BirdIllustration className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                className="absolute top-12 left-0 sm:left-2 z-40"
              >
                <div className="relative bg-amber-glow text-cocoa rounded-full h-20 w-20 sm:h-24 sm:w-24 flex flex-col items-center justify-center shadow-warm rotate-[-12deg]">
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Up to</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold leading-none">10%</span>
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Off</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                className="absolute bottom-0 right-1/2 translate-x-1/2 sm:right-auto sm:left-1/2 sm:translate-x-0 sm:top-12 sm:left-2 z-30"
              >
                <div className="bg-card rounded-2xl p-3 shadow-warm border border-border/40 flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-glow" />
                      <span className="text-xs font-semibold text-cocoa">100% Genuine</span>
                    </div>
                    <div className="text-[10px] text-cocoa/70 mt-0.5">Trusted since 2021</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative">
          <svg className="w-full h-12 sm:h-16 text-card" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
            <path d="M0 40 C 240 80, 480 0, 720 30 C 960 60, 1200 80, 1440 40 L 1440 80 L 0 80 Z" />
          </svg>
        </div>
      </section>

      <Features />
      <PromoBanners />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
                Our Products
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
                Curated nutrition for every pet
              </h2>
              <p className="mt-3 text-base sm:text-lg text-cocoa/70 text-pretty">
                Hand-picked premium products from brands you trust.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("shop")}
              className="self-start sm:self-end h-11 px-5 rounded-full border-2 border-cocoa/15 text-cocoa hover:bg-secondary text-sm font-medium group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 sm:gap-5 gap-3">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CategoriesSection />
      <WhyChooseUs />
      <BlogPreview />
      <NewsletterSection />
    </>
  );
}

function CategoriesSection() {
  const navigate = useRouter((s) => s.navigate);
  const mainCats = [
    { name: "For Cats", count: "209 Products", desc: "Premium cat food, litter & care", Illustration: CatIllustration, bg: "from-amber-glow/30 to-terracotta/15", text: "text-terracotta", cat: "cat" },
    { name: "For Dogs", count: "31 Products", desc: "Healthy meals for every breed", Illustration: DogIllustration, bg: "from-sage/25 to-amber-glow/15", text: "text-sage", cat: "dog" },
    { name: "For Fish", count: "1 Product", desc: "Nutritious aquatic food", Illustration: FishIllustration, bg: "from-cocoa/10 to-sage/15", text: "text-cocoa", cat: "fish" },
    { name: "For Birds", count: "2 Products", desc: "Quality seeds & bird mixes", Illustration: BirdIllustration, bg: "from-amber-glow/25 to-sage/15", text: "text-amber-glow", cat: "bird" },
  ];

  return (
    <section id="categories" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
            Shop by Categories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
            Find the perfect meal for your companion
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/70 text-pretty">
            Browse our curated categories — quality nutrition for cats, dogs, fish &amp; birds.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mainCats.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate("shop", { category: cat.cat })}
              className="group relative overflow-hidden bg-card rounded-3xl border-2 border-border/40 hover:border-terracotta/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-warm hover:-translate-y-1.5 text-left"
            >
              <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.bg} opacity-60 group-hover:scale-150 transition-transform duration-700`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${cat.text}`}>
                    {cat.count}
                  </span>
                  <div className="h-9 w-9 rounded-full bg-secondary group-hover:bg-terracotta group-hover:text-primary-foreground text-cocoa flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                <cat.Illustration className="h-28 w-28 sm:h-32 sm:w-32 mx-auto my-4 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-display text-lg sm:text-xl font-semibold text-cocoa text-center">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-cocoa/60 text-center mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const navigate = useRouter((s) => s.navigate);
  const blogPosts = useRouter((s) => s.blogPosts);
  const posts = blogPosts.slice(0, 3);
  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
              Our Blog
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
              Latest news &amp; pet care tips
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cocoa/70 text-pretty">
              Expert advice, guides and stories from the BD71 community.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("blog")}
            className="self-start sm:self-end h-11 px-5 rounded-full border-2 border-cocoa/15 text-cocoa hover:bg-secondary text-sm font-medium group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate("blog-single", { blogId: post.id })}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col text-left"
            >
              <div className={`relative h-48 bg-gradient-to-br ${post.bg} overflow-hidden flex items-center justify-center`}>
                <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500 select-none">
                  {post.emoji}
                </span>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/90 text-cocoa border-0 text-[11px] font-semibold px-2.5 py-1">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-cocoa/60 mb-3">
                  <span>{post.date}</span>
                  <span className="text-cocoa/40">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-cocoa leading-tight line-clamp-2 group-hover:text-terracotta transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-cocoa/65 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-medium text-cocoa/50">{post.author}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-terracotta via-terracotta to-cocoa p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-glow/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sage/15 blur-3xl" />
          <div className="absolute top-8 right-8 text-7xl opacity-20 select-none">🐾</div>
          <div className="absolute bottom-8 left-8 text-5xl opacity-15 select-none">🐾</div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium text-white mb-5">
                <span className="text-base">🎁</span>
                <span>Get 10% off your first order</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight text-balance">
                Join the BD71 family for exclusive offers &amp; pet care tips
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/85 max-w-lg text-pretty">
                Subscribe to our newsletter and be the first to know about new arrivals, seasonal
                discounts and expert pet care articles.
              </p>
            </div>

            <div className="lg:justify-end">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/95 backdrop-blur rounded-2xl p-6 text-center max-w-md mx-auto lg:ml-auto"
                >
                  <div className="h-14 w-14 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-3">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-cocoa mb-1">
                    Successfully Subscribed! 🎉
                  </h3>
                  <p className="text-sm text-cocoa/70">
                    Thanks for joining! Check your inbox for a 10% off welcome coupon.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="flex flex-col sm:flex-row gap-3 lg:justify-end"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-13 px-5 rounded-full bg-white/95 backdrop-blur text-cocoa placeholder:text-cocoa/50 border-0 outline-none focus:ring-4 focus:ring-amber-glow/50 min-w-0 sm:min-w-[280px] lg:min-w-[300px] text-sm font-medium"
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    className="h-13 px-7 rounded-full bg-cocoa hover:bg-cocoa/90 text-primary-foreground text-sm font-semibold shadow-warm whitespace-nowrap"
                  >
                    Subscribe Now
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
