"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CatIllustration, DogIllustration, FishIllustration, BirdIllustration } from "./icons";

const categories = [
  {
    name: "For Cats",
    count: "209 Products",
    desc: "Premium cat food, litter & care",
    illustration: CatIllustration,
    bg: "from-amber-glow/30 to-terracotta/15",
    border: "hover:border-terracotta/40",
    text: "text-terracotta",
  },
  {
    name: "For Dogs",
    count: "31 Products",
    desc: "Healthy meals for every breed",
    illustration: DogIllustration,
    bg: "from-sage/25 to-amber-glow/15",
    border: "hover:border-sage/40",
    text: "text-sage",
  },
  {
    name: "For Fish",
    count: "1 Product",
    desc: "Nutritious aquatic food",
    illustration: FishIllustration,
    bg: "from-cocoa/10 to-sage/15",
    border: "hover:border-cocoa/30",
    text: "text-cocoa",
  },
  {
    name: "For Birds",
    count: "2 Products",
    desc: "Quality seeds & bird mixes",
    illustration: BirdIllustration,
    bg: "from-amber-glow/25 to-sage/15",
    border: "hover:border-amber-glow/40",
    text: "text-amber-glow",
  },
];

export function Categories() {
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
            Browse our curated categories — quality nutrition for cats, dogs, fish & birds.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#products"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden bg-card rounded-3xl border-2 border-border/40 ${cat.border} p-6 sm:p-7 transition-all duration-300 hover:shadow-warm hover:-translate-y-1.5`}
            >
              {/* Decorative circle */}
              <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.bg} opacity-60 group-hover:scale-150 transition-transform duration-700`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${cat.text}`}>
                    {cat.count}
                  </span>
                  <div className="h-9 w-9 rounded-full bg-secondary group-hover:bg-terracotta group-hover:text-primary-foreground text-cocoa flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <cat.illustration className="h-28 w-28 sm:h-32 sm:w-32 mx-auto my-4 group-hover:scale-110 transition-transform duration-500" />

                <h3 className="font-display text-lg sm:text-xl font-semibold text-cocoa text-center">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-cocoa/60 text-center mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
