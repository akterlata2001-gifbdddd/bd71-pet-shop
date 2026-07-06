"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    category: "Dog Care",
    title: "Level 2 Dog Bite: What It Means, What to Do, and What It Could Cost You",
    excerpt:
      "A practical guide to understanding level 2 dog bites — from immediate first aid and warning signs to medical costs and legal considerations every pet owner should know.",
    date: "Mar 18, 2026",
    readTime: "6 min read",
    comments: 0,
    emoji: "🦴",
    bg: "from-terracotta/20 to-amber-glow/20",
  },
  {
    id: 2,
    category: "Pet Care",
    title: "Nutrition Strength Cognitive Supplement for Dogs: Does It Actually Work?",
    excerpt:
      "We dig into the science behind cognitive supplements for senior dogs — examining ingredients, dosages, real-world results, and whether they're worth the investment.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    comments: 0,
    emoji: "🧠",
    bg: "from-sage/20 to-amber-glow/15",
  },
  {
    id: 3,
    category: "Pet Foods",
    title: "Fresh Pet Cat Food: Complete Guide to Benefits, Best Brands & Switching",
    excerpt:
      "Everything you need to know about fresh cat food — nutritional advantages, top brands available in Bangladesh, and a step-by-step transition plan for picky eaters.",
    date: "Mar 12, 2026",
    readTime: "10 min read",
    comments: 0,
    emoji: "🐟",
    bg: "from-amber-glow/25 to-sage/15",
  },
];

export function Blog() {
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
            className="self-start sm:self-end h-11 px-5 rounded-full border-2 border-cocoa/15 text-cocoa hover:bg-secondary text-sm font-medium group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Cover */}
              <div className={`relative h-48 bg-gradient-to-br ${post.bg} overflow-hidden flex items-center justify-center`}>
                <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500 select-none" aria-hidden="true">
                  {post.emoji}
                </span>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/90 text-cocoa border-0 text-[11px] font-semibold px-2.5 py-1">
                    {post.category}
                  </Badge>
                </div>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-2 right-2 h-20 w-20 rounded-full border-2 border-dashed border-cocoa/40 group-hover:rotate-90 transition-transform duration-700" />
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-cocoa/60 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.comments}
                  </span>
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
                  <span className="text-xs font-medium text-cocoa/50">bd71shopbd</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
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
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-glow/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sage/15 blur-3xl" />
          <div className="absolute top-8 right-8 text-7xl opacity-20 select-none" aria-hidden="true">🐾</div>
          <div className="absolute bottom-8 left-8 text-5xl opacity-15 select-none" aria-hidden="true">🐾</div>

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

            <form
              className="flex flex-col sm:flex-row gap-3 lg:justify-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
