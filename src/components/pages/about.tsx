"use client";

import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, Heart, PawPrint, Truck, ShieldCheck, Users, Award, Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/store";
import { CatIllustration, DogIllustration, FishIllustration, BirdIllustration } from "@/components/site/icons";

export function AboutPage() {
  const navigate = useRouter((s) => s.navigate);

  const stats = [
    { value: "10K+", label: "Happy Pets", icon: PawPrint },
    { value: "500+", label: "Products", icon: Award },
    { value: "8+", label: "Top Brands", icon: ShieldCheck },
    { value: "24/7", label: "Support", icon: Users },
  ];

  const values = [
    { icon: Heart, title: "Pet-First Philosophy", desc: "Every decision we make starts with what's best for your pet. We never compromise on nutrition, safety, or quality — only products we'd give our own pets make it to our shelves." },
    { icon: ShieldCheck, title: "100% Authentic Guarantee", desc: "We source directly from authorized distributors in Bangladesh. Every product is verified for authenticity and freshness, with strict expiration date checks before shipping." },
    { icon: Truck, title: "Fast Nationwide Delivery", desc: "From Dhaka to Chittagong, Sylhet to Khulna — we deliver across all of Bangladesh. Free delivery within 10km of our store, and affordable rates everywhere else." },
    { icon: Leaf, title: "Natural & Sustainable", desc: "We prioritize brands that use natural, responsibly-sourced ingredients. Many of our products are organic, grain-free, or formulated for pets with sensitive dietary needs." },
  ];

  const team = [
    { name: "Founder & CEO", role: "Pet Parent since 2010", emoji: "👨‍💼", bg: "from-terracotta/20 to-amber-glow/20" },
    { name: "Head Vet Consultant", role: "DVM, 12+ years experience", emoji: "👩‍⚕️", bg: "from-sage/20 to-amber-glow/15" },
    { name: "Customer Care Lead", role: "Available 24/7", emoji: "👨‍💻", bg: "from-amber-glow/25 to-sage/15" },
    { name: "Logistics Manager", role: "Fast delivery expert", emoji: "👩‍🚚", bg: "from-cocoa/10 to-sage/15" },
  ];

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-glow/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-sage/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-glow/20 border border-amber-glow/40 px-4 py-1.5 text-sm font-medium text-cocoa mb-5">
                <Heart className="h-4 w-4 text-terracotta" />
                Our Story
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-cocoa leading-tight tracking-tight text-balance">
                Where being a pet is{" "}
                <span className="bg-gradient-to-r from-terracotta to-amber-glow bg-clip-text text-transparent">
                  just the best
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-cocoa/70 leading-relaxed text-pretty">
                BD71 Pet Shop began with a simple mission: to give pet parents in Bangladesh access
                to genuine, premium pet food and care products at fair prices. What started as a
                small online store has grown into a trusted community of pet lovers — but our
                commitment to quality and care has never wavered.
              </p>
              <p className="mt-4 text-base text-cocoa/70 leading-relaxed">
                Every product on our shelves is chosen with love, vetted for authenticity, and
                delivered with the speed your pet deserves. We&apos;re proud to serve thousands of
                happy pets across Bangladesh — and we&apos;re just getting started.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate("shop")}
                  className="bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full px-7 group"
                >
                  Explore Products
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("contact")}
                  className="rounded-full border-2 border-cocoa/15 hover:bg-secondary px-7"
                >
                  Get in Touch
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] sm:h-[480px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] rounded-full bg-gradient-to-br from-amber-glow/40 to-terracotta/20" />
                <div className="absolute h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] rounded-full border-2 border-dashed border-terracotta/30 animate-[spin_60s_linear_infinite]" />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <CatIllustration className="h-40 w-40 sm:h-48 sm:w-48 drop-shadow-2xl" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-4 right-4"
              >
                <div className="bg-card rounded-3xl p-3 shadow-warm border border-border/40">
                  <DogIllustration className="h-20 w-20" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.8 }}
                className="absolute bottom-4 left-4"
              >
                <div className="bg-card rounded-3xl p-3 shadow-warm border border-border/40">
                  <FishIllustration className="h-20 w-20" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 1.2 }}
                className="absolute bottom-12 right-2"
              >
                <div className="bg-card rounded-3xl p-2.5 shadow-warm border border-border/40">
                  <BirdIllustration className="h-16 w-16" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border/60 p-5 text-center"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta mb-3">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl font-semibold text-cocoa">{stat.value}</div>
                <div className="text-sm text-cocoa/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
              Our Values
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
              What we stand for
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cocoa/70 text-pretty">
              The principles that guide every product we curate and every order we ship.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border/60 p-6 flex gap-5 hover:shadow-warm transition-shadow"
              >
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <value.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-cocoa mb-2">{value.title}</h3>
                  <p className="text-sm text-cocoa/70 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
              Our Team
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight text-balance">
              The people behind BD71
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cocoa/70 text-pretty">
              A small, dedicated team of pet lovers committed to serving your furry family.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border/60 p-6 text-center hover:shadow-warm transition-shadow"
              >
                <div className={`h-24 w-24 mx-auto rounded-full bg-gradient-to-br ${member.bg} flex items-center justify-center text-5xl mb-4`}>
                  {member.emoji}
                </div>
                <h3 className="font-display text-base font-semibold text-cocoa">{member.name}</h3>
                <p className="text-xs text-cocoa/60 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta via-terracotta to-cocoa p-8 sm:p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-glow/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sage/15 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance">
                Ready to spoil your pet?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-white/85 max-w-xl mx-auto text-pretty">
                Join thousands of happy pet parents across Bangladesh. Quality products, fast
                delivery, and genuine care — every single time.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("shop")}
                  className="bg-amber-glow hover:bg-amber-glow/90 text-cocoa rounded-full px-7 font-semibold"
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("contact")}
                  className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20 rounded-full px-7"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
