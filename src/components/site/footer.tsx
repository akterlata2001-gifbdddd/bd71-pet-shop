"use client";

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { PawIcon } from "./icons";
import { useRouter, type PageId } from "@/lib/store";

const footerShop = [
  { label: "Cat Food", category: "cat" },
  { label: "Dog Food", category: "dog" },
  { label: "Bird Food", category: "bird" },
  { label: "Fish Food", category: "fish" },
  { label: "Cat Litter", category: "litter" },
  { label: "Pet Care", category: "care" },
];

const footerCompany: { label: string; page: PageId }[] = [
  { label: "About Us", page: "about" },
  { label: "Blog", page: "blog" },
  { label: "Contact", page: "contact" },
  { label: "Categories", page: "shop" },
];

const footerLegal: { label: string; page: PageId }[] = [
  { label: "Home", page: "home" },
  { label: "Shop", page: "shop" },
  { label: "Disclaimer", page: "disclaimer" },
  { label: "DMCA Policy", page: "dmca" },
  { label: "Privacy Policy", page: "privacy" },
  { label: "Terms of Use", page: "terms" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
];

export function SiteFooter() {
  const navigate = useRouter((s) => s.navigate);

  return (
    <footer id="contact" className="relative bg-cocoa text-cream mt-auto">
      <div className="absolute top-0 left-0 right-0 -translate-y-px">
        <svg
          className="w-full h-8 text-cocoa"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 20 C 360 40, 1080 0, 1440 20 L 1440 40 L 0 40 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-8">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-12 mb-12">
          <div className="lg:col-span-4">
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center gap-2.5 mb-5"
            >
              <div className="h-11 w-11 rounded-2xl bg-terracotta flex items-center justify-center shadow-warm">
                <PawIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-semibold text-cream tracking-tight">
                  BD71
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-amber-glow uppercase">
                  Pet Shop
                </span>
              </div>
            </button>
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              Your trusted partner for premium pet food and care in Bangladesh. Genuine products,
              affordable prices, fast delivery — crafted with love for your furry, feathered &amp;
              finned companions.
            </p>

            <div className="mt-6 space-y-3">
              <a href="tel:+8801700000000" className="flex items-center gap-3 text-sm text-cream/80 hover:text-amber-glow transition-colors group">
                <div className="h-9 w-9 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +880 1700-000000
              </a>
              <a href="mailto:hello@bd71shop.com.bd" className="flex items-center gap-3 text-sm text-cream/80 hover:text-amber-glow transition-colors group">
                <div className="h-9 w-9 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                hello@bd71shop.com.bd
              </a>
              <div className="flex items-start gap-3 text-sm text-cream/80">
                <div className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  Dhaka, Bangladesh
                  <br />
                  <span className="text-cream/60">Delivery nationwide</span>
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-cream/80">
                <div className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  Open 24/7 online
                  <br />
                  <span className="text-cream/60">Support always available</span>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-glow mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerShop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate("shop", { category: link.category })}
                    className="text-sm text-cream/70 hover:text-amber-glow transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-0 group-hover:w-3 bg-amber-glow transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-glow mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerCompany.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-cream/70 hover:text-amber-glow transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-0 group-hover:w-3 bg-amber-glow transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-glow mb-4">
              Information
            </h3>
            <ul className="space-y-2.5">
              {footerLegal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-cream/70 hover:text-amber-glow transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-0 group-hover:w-3 bg-amber-glow transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-glow mb-4">
              Follow Us
            </h3>
            <p className="text-sm text-cream/70 mb-4 leading-relaxed">
              Join our community of pet lovers and stay updated.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-cream/10 hover:bg-terracotta flex items-center justify-center text-cream transition-all hover:scale-110 hover:-translate-y-0.5"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-cream/5 border border-cream/10 p-4">
              <div className="text-xs font-semibold text-amber-glow uppercase tracking-wider mb-1">
                Cash on Delivery
              </div>
              <div className="text-xs text-cream/70 leading-relaxed">
                Easy &amp; secure payment options available nationwide.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-xs text-cream/50 uppercase tracking-wider">We Accept:</span>
            {["bKash", "Nagad", "Rocket", "VISA", "Mastercard", "COD"].map((method) => (
              <span
                key={method}
                className="text-xs font-medium text-cream/80 bg-cream/10 px-3 py-1.5 rounded-md border border-cream/10"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-cream/60">
            <span>🔒</span>
            <span>SSL Secured Checkout</span>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <p>© 2026 BD71SHOP. Managed by Cynlex Digital. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <span className="text-terracotta">❤</span> for pets in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
