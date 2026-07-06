"use client";

import { motion } from "framer-motion";
import { Home as HomeIcon, ChevronRight, Shield, FileText, Gavel, Info } from "lucide-react";
import { useRouter, type PageId } from "@/lib/store";
import { legalContent, type LegalDoc } from "@/lib/data";

const pageIcons: Record<string, typeof Shield> = {
  privacy: Shield,
  terms: FileText,
  dmca: Gavel,
  disclaimer: Info,
};

export function LegalPage({ page }: { page: PageId }) {
  const navigate = useRouter((s) => s.navigate);
  const content: LegalDoc | undefined = legalContent[page];

  if (!content) {
    return null;
  }

  const Icon = pageIcons[page] || Shield;

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">{content.title}</span>
          </nav>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-12 w-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa tracking-tight">
                {content.title}
              </h1>
              <p className="text-xs text-cocoa/60 mt-1">Last updated: {content.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-3xl border border-border/60 p-6 sm:p-8 lg:p-10"
        >
          {/* Table of contents */}
          <div className="mb-8 p-4 rounded-2xl bg-secondary/60 border border-border/40">
            <div className="text-xs font-semibold uppercase tracking-wider text-cocoa/60 mb-3">
              Table of Contents
            </div>
            <ol className="space-y-1.5">
              {content.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-sm text-terracotta hover:underline inline-flex items-baseline gap-2"
                  >
                    <span className="text-cocoa/40 font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                    <span className="line-clamp-1">{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Intro */}
          <p className="text-base sm:text-lg text-cocoa/80 leading-relaxed mb-8 pb-8 border-b border-border/60">
            {content.intro}
          </p>

          {/* Sections */}
          <div className="space-y-8">
            {content.sections.map((section, i) => (
              <motion.section
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-cocoa mb-3 flex items-baseline gap-3">
                  <span className="text-terracotta font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base text-cocoa/75 leading-relaxed">{section.body}</p>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-sm sm:text-base text-cocoa/75">
                        <span className="text-terracotta mt-1.5 shrink-0">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-10 pt-8 border-t border-border/60">
            <div className="bg-gradient-to-br from-terracotta/10 to-amber-glow/10 rounded-2xl p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-cocoa mb-2">
                Questions about this policy?
              </h3>
              <p className="text-sm text-cocoa/70 mb-4">
                We&apos;re here to help. Contact our team and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm text-cocoa/70 mb-4">
                <span className="inline-flex items-center gap-1.5 justify-center">
                  <span className="text-terracotta">✉</span>
                  contact@bd71shop.com.bd
                </span>
              </div>
              <button
                onClick={() => navigate("contact")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta/90 text-primary-foreground text-sm font-medium transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
