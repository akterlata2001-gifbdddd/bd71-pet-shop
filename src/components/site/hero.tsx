"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CatIllustration, DogIllustration, FishIllustration, BirdIllustration, PawPattern } from "./icons";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-paw-pattern"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-glow/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full bg-sage/15 blur-3xl" />
      </div>

      {/* Floating paws pattern */}
      <PawPattern className="absolute inset-0 w-full h-full text-terracotta/30 -z-10 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left: Copy */}
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
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
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
                asChild
              >
                <a href="#products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-7 rounded-full border-2 border-cocoa/15 bg-card/60 backdrop-blur text-cocoa hover:bg-secondary hover:border-cocoa/25 text-base font-medium"
                asChild
              >
                <a href="#categories">
                  Browse Categories
                </a>
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { value: "10K+", label: "Happy Pets" },
                { value: "500+", label: "Products" },
                { value: "4.9★", label: "Rating" },
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
                  <div className="text-xs sm:text-sm text-cocoa/60 mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Pet illustrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative h-[380px] sm:h-[480px] lg:h-[560px]"
          >
            {/* Center plate / disc */}
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

            {/* Center cat (main subject) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <CatIllustration className="h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64 drop-shadow-2xl" />
            </motion.div>

            {/* Floating dog (top right) */}
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

            {/* Floating fish (bottom left) */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-6 left-2 sm:left-6 z-30"
            >
              <div className="relative bg-card rounded-3xl p-3 shadow-warm border border-border/40">
                <FishIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
              </div>
            </motion.div>

            {/* Floating bird (bottom right) */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute bottom-12 right-0 sm:right-2 z-30"
            >
              <div className="relative bg-card rounded-3xl p-2.5 shadow-warm border border-border/40">
                <BirdIllustration className="h-16 w-16 sm:h-20 sm:w-20" />
              </div>
            </motion.div>

            {/* Discount badge */}
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

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              className="absolute bottom-0 right-1/2 translate-x-1/2 sm:right-auto sm:left-1/2 sm:translate-x-0 sm:top-12 sm:left-2 z-30"
            >
              <div className="bg-card rounded-2xl p-3 shadow-warm border border-border/40 flex items-center gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-amber-glow text-amber-glow" />
                    ))}
                  </div>
                  <div className="text-[10px] text-cocoa/70 mt-0.5">Trusted by 10k+ pet parents</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative">
        <svg
          className="w-full h-12 sm:h-16 text-card"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 40 C 240 80, 480 0, 720 30 C 960 60, 1200 80, 1440 40 L 1440 80 L 0 80 Z" />
        </svg>
      </div>
    </section>
  );
}
