"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Headphones, Leaf, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Cheap home delivery to any point in the city and regions",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
  {
    icon: ShieldCheck,
    title: "Easy & Secure Payment",
    desc: "Cash on Delivery available across Bangladesh",
    color: "text-sage",
    bg: "bg-sage/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We are always ready to take your call",
    color: "text-amber-glow",
    bg: "bg-amber-glow/15",
  },
  {
    icon: BadgeCheck,
    title: "100% Authentic",
    desc: "All products are genuine, certified & quality-tested",
    color: "text-cocoa",
    bg: "bg-cocoa/10",
  },
];

export function Features() {
  return (
    <section className="relative -mt-8 z-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-card rounded-2xl p-4 sm:p-6 shadow-soft border border-border/60 hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-semibold text-cocoa leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-cocoa/60 mt-1.5 leading-relaxed hidden sm:block">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const promoBanners = [
  {
    eyebrow: "All Flavour Available",
    title: "Cat Litter",
    desc: "Premium bentonite litter, all flavors in stock. Shop the best for your feline friend.",
    cta: "Shop Now",
    color: "from-terracotta/90 to-terracotta/70",
    accent: "bg-amber-glow",
    icon: "🐱",
    shape: "cat",
  },
  {
    eyebrow: "Quality You Can Trust",
    title: "Premium Cat Food",
    desc: "Balanced nutrition crafted with love. Natural ingredients cats can't resist.",
    cta: "Shop Now",
    color: "from-sage/90 to-sage/70",
    accent: "bg-amber-glow",
    icon: "🐾",
    shape: "paw",
  },
  {
    eyebrow: "Best Quality",
    title: "Quality Dog Food",
    desc: "Help your dog maintain a healthier, happier life with our premium meals.",
    cta: "Shop Now",
    color: "from-amber-glow/90 to-amber-glow/70",
    accent: "bg-terracotta",
    icon: "🐶",
    shape: "dog",
  },
];

export function PromoBanners() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {promoBanners.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.color} p-6 sm:p-8 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between group cursor-pointer hover:shadow-warm transition-all duration-500`}
            >
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 100" fill="white" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="50" cy="50" r="10" fill="white" />
                </svg>
              </div>
              <div className="absolute -bottom-8 -right-8 text-7xl sm:text-8xl opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
                {promo.icon}
              </div>

              <div className="relative z-10">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                  {promo.eyebrow}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  {promo.title}
                </h3>
                <p className="mt-2 text-sm text-white/85 leading-relaxed max-w-xs">
                  {promo.desc}
                </p>
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`relative z-10 mt-6 inline-flex items-center gap-2 self-start ${promo.accent} text-cocoa font-medium text-sm px-5 py-2.5 rounded-full hover:shadow-lg transition-all group-hover:gap-3`}
              >
                {promo.cta}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyChooseItems = [
  { icon: Leaf, title: "100% Organic", desc: "Natural ingredients sourced responsibly for pet wellbeing" },
  { icon: Truck, title: "Free Ship 10km", desc: "Complimentary delivery within 10km radius" },
  { icon: BadgeCheck, title: "Genuine Products", desc: "Certified authentic pet food from trusted brands" },
  { icon: Headphones, title: "Expert Guidance", desc: "Pet care advice from our knowledgeable team" },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-secondary/40 to-amber-glow/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-terracotta/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
            Why BD71 Pet Shop
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
            More than a shop — a partner in pet wellness
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/70 text-pretty">
            We obsess over quality, transparency and care so your furry, feathered and finned
            friends get nothing but the best.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 text-center hover:shadow-warm transition-shadow border border-border/40"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-cocoa mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-cocoa/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
