"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { PawIcon } from "./icons";
import { useRouter, type PageId } from "@/lib/store";
import { siteInfo } from "@/lib/data";

const footerCompany: { label: string; page: PageId }[] = [
  { label: "About Us", page: "about" },
  { label: "Blog", page: "blog" },
  { label: "Contact", page: "contact" },
  { label: "Shop", page: "shop" },
];

const footerLegal: { label: string; page: PageId }[] = [
  { label: "Home", page: "home" },
  { label: "Disclaimer", page: "disclaimer" },
  { label: "DMCA Policy", page: "dmca" },
  { label: "Privacy Policy", page: "privacy" },
  { label: "Terms of Use", page: "terms" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
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
        {/* 4 columns */}
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-4 mb-12">
          {/* Column 1 — About */}
          <div>
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
          </div>

          {/* Column 2 — Company */}
          <div>
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

          {/* Column 3 — Information */}
          <div>
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

          {/* Column 4 — Contact & Social */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-glow mb-4">
              Follow Us
            </h3>
            <div className="space-y-3 mb-5">
              <a href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-sm text-cream/80 hover:text-amber-glow transition-colors group">
                <div className="h-8 w-8 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-3 text-sm text-cream/80 hover:text-amber-glow transition-colors group">
                <div className="h-8 w-8 rounded-full bg-cream/10 group-hover:bg-terracotta flex items-center justify-center transition-colors shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="break-all">{siteInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-cream/80">
                <div className="h-8 w-8 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="leading-relaxed">
                  {siteInfo.address}
                  <br />
                  <span className="text-cream/60">Delivery nationwide</span>
                </span>
              </div>
            </div>
            <div className="flex gap-2">
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
          <p>
            © 2026 BD71SHOP. Managed by{" "}
            <a
              href="https://cynlex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/80 hover:text-terracotta transition-colors underline-offset-2 hover:underline"
            >
              Cynlex Digital
            </a>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with <span className="text-terracotta">❤</span> for pets in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
