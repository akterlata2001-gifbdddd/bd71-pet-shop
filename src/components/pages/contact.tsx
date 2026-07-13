"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, Phone, Mail, MapPin, Clock, Send, Loader2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/lib/store";
import { contactContent, siteInfo } from "@/lib/data";
import { useTurnstile } from "@/components/site/turnstile-widget";

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms-lac-two.vercel.app";
const CMS_SITE_ID = process.env.NEXT_PUBLIC_CMS_SITE_ID ?? "lata-test";
const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

export function ContactPage() {
  const navigate = useRouter((s) => s.navigate);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { token: turnstileToken, widget: turnstileWidget } = useTurnstile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${CMS_API}/api/v1/sites/${CMS_SITE_ID}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": CMS_API_KEY,
          ...(turnstileToken ? { "x-turnstile-token": turnstileToken } : {}),
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        // Success message shows for 10 seconds (was 5s — too short)
        setTimeout(() => setSubmitted(false), 10000);
      } else {
        // Real error from API — show it, don't fake success
        const errMsg = json.data?.error || json.error?.message || "Failed to send message. Please try again.";
        setError(errMsg);
        setTimeout(() => setError(null), 8000);
      }
    } catch (err) {
      // Network error — show friendly message, but indicate it may not have sent
      setError("Network error. Please check your connection and try again, or call us directly.");
      setTimeout(() => setError(null), 8000);
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MapPin,
      label: "Address",
      value: siteInfo.address,
      sub: "Visit our store location",
      color: "bg-terracotta/10 text-terracotta",
      href: "#",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteInfo.phone,
      sub: "Call us anytime, 24/7",
      color: "bg-sage/15 text-sage",
      href: `tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: Mail,
      label: "Mail",
      value: siteInfo.email,
      sub: "We reply within 24 hours",
      color: "bg-amber-glow/20 text-amber-glow",
      href: `mailto:${siteInfo.email}`,
    },
    {
      icon: Clock,
      label: "Opening Time",
      value: "Always Open (24/7)",
      sub: "Monday to Sunday",
      color: "bg-cocoa/10 text-cocoa",
      href: "#",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-secondary/30 to-background min-h-screen">
      <div className="bg-card border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-cocoa/60">
            <button onClick={() => navigate("home")} className="hover:text-terracotta inline-flex items-center gap-1">
              <HomeIcon className="h-3 w-3" /> Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cocoa font-medium">Contact</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cocoa tracking-tight mt-3">
            {contactContent.title}
          </h1>
          <p className="mt-2 text-base text-cocoa/70 max-w-2xl">
            {contactContent.subtitle} We&apos;re here to help with any questions about products, orders, or
            pet care.
          </p>
        </div>
      </div>

      {/* Contact methods */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-warm hover:-translate-y-1 transition-all block"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${method.color} mb-3`}>
                  <method.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cocoa/60 mb-1">
                  {method.label}
                </div>
                <div className="font-semibold text-cocoa break-words">{method.value}</div>
                <div className="text-xs text-cocoa/60 mt-1">{method.sub}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card rounded-3xl border border-border/60 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-cocoa mb-1">
                {contactContent.sectionsTitle}
              </h2>
              <p className="text-sm text-cocoa/60 mb-2">{contactContent.formFields.note}</p>

              {/* Error message — shows for 8 seconds */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Couldn&apos;t send your message</p>
                    <p className="text-xs mt-1">{error}</p>
                  </div>
                </motion.div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-cocoa mb-1">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-sm text-cocoa/60">
                    Thanks for reaching out. We&apos;ll respond as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-cocoa">
                        {contactContent.formFields.name} *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-cocoa">
                        {contactContent.formFields.email} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-cocoa">
                      {contactContent.formFields.subject} *
                    </Label>
                    <Input
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="mt-1.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-cocoa">
                      {contactContent.formFields.message}
                    </Label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="mt-1.5 w-full px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </div>
                  {turnstileWidget}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium"
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />{contactContent.formFields.submit}</>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map + Hours */}
            <div className="space-y-6">
              <div className="bg-card rounded-3xl border border-border/60 overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-sage/20 to-amber-glow/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <MapPin className="h-16 w-16 text-terracotta drop-shadow-lg" fill="currentColor" />
                      <div className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-terracotta/30 animate-ping" />
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 256" preserveAspectRatio="none">
                    {[...Array(8)].map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#8B5A3C" strokeWidth="0.5" />
                    ))}
                    {[...Array(12)].map((_, i) => (
                      <line key={`v${i}`} x1={i * 33} y1="0" x2={i * 33} y2="256" stroke="#8B5A3C" strokeWidth="0.5" />
                    ))}
                  </svg>
                  <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-terracotta mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-cocoa text-sm">{siteInfo.address}</div>
                        <div className="text-xs text-cocoa/60 mt-0.5">Savar, Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl border border-border/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-sage/15 text-sage flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-cocoa">Business Hours</div>
                    <div className="text-sm text-cocoa/60">{siteInfo.hours}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "24 hours open" },
                    { day: "Saturday - Sunday", hours: "24 hours open" },
                    { day: "Holidays", hours: "24 hours open" },
                    { day: "Online Orders", hours: "Available anytime" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                      <span className="text-sm text-cocoa/70">{item.day}</span>
                      <span className="text-sm font-medium text-cocoa">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
