"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, ChevronRight, Phone, Mail, MapPin, Clock, Send, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "@/lib/store";

export function ContactPage() {
  const navigate = useRouter((s) => s.navigate);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const contactMethods = [
    { icon: Phone, label: "Call Us", value: "+880 1700-000000", sub: "Mon-Sun, 8am-10pm", color: "bg-terracotta/10 text-terracotta", href: "tel:+8801700000000" },
    { icon: Mail, label: "Email Us", value: "hello@bd71shop.com.bd", sub: "We reply within 24 hours", color: "bg-sage/15 text-sage", href: "mailto:hello@bd71shop.com.bd" },
    { icon: MessageCircle, label: "WhatsApp", value: "+880 1700-000000", sub: "Quick chat support", color: "bg-amber-glow/20 text-amber-glow", href: "#" },
    { icon: MapPin, label: "Visit Us", value: "Dhaka, Bangladesh", sub: "Nationwide delivery", color: "bg-cocoa/10 text-cocoa", href: "#" },
  ];

  const faqs = [
    { q: "How long does delivery take?", a: "Within Dhaka city, delivery typically takes 1-2 business days. Outside Dhaka, expect 2-4 business days depending on your location. We'll send tracking information once your order ships." },
    { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD) nationwide, bKash, Nagad, Rocket, and major credit/debit cards (VISA, Mastercard). All online payments are secured with SSL encryption." },
    { q: "Are your products genuine?", a: "Absolutely. We source directly from authorized distributors in Bangladesh. Every product is verified for authenticity, and we check expiration dates before shipping. If you ever receive a counterfeit product, we'll refund 200% of your money." },
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unopened products in original packaging. If you receive a damaged or incorrect item, contact us immediately for a free replacement or full refund." },
    { q: "Do you offer free delivery?", a: "Yes! Delivery is free for orders over ৳2,000 within Dhaka. For orders under ৳2,000, a nominal delivery fee of ৳60 applies. Outside Dhaka, delivery fees vary by location." },
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
            Get in touch
          </h1>
          <p className="mt-2 text-base text-cocoa/70 max-w-2xl">
            Questions about a product, your order, or just want to say hello? We&apos;d love to hear
            from you. Our team responds within 24 hours.
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
                <div className="font-semibold text-cocoa">{method.value}</div>
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
                Send us a message
              </h2>
              <p className="text-sm text-cocoa/60 mb-6">
                Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>

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
                    Thanks for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-cocoa">Your Name *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahim Uddin"
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-cocoa">Phone *</Label>
                      <Input
                        id="phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-cocoa">Email *</Label>
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
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-cocoa">Subject *</Label>
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
                    <Label htmlFor="message" className="text-sm font-medium text-cocoa">Message *</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="mt-1.5 w-full px-3 py-2 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-terracotta hover:bg-terracotta/90 text-primary-foreground rounded-full text-base font-medium"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
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
                  {/* Grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 256" preserveAspectRatio="none">
                    {[...Array(8)].map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#8B5A3C" strokeWidth="0.5" />
                    ))}
                    {[...Array(12)].map((_, i) => (
                      <line key={`v${i}`} x1={i * 33} y1="0" x2={i * 33} y2="256" stroke="#8B5A3C" strokeWidth="0.5" />
                    ))}
                  </svg>
                  <Badge className="absolute bottom-3 left-3 bg-card/90 text-cocoa border-0">
                    📍 Dhaka, Bangladesh
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-cocoa">Our Location</div>
                      <div className="text-sm text-cocoa/60">Dhaka, Bangladesh</div>
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
                    <div className="text-sm text-cocoa/60">Online support 24/7</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "8:00 AM - 10:00 PM" },
                    { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
                    { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
                    { day: "Online Orders", hours: "24/7" },
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

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3">
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base text-cocoa/70">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for? Reach out above.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card rounded-2xl border border-border/60 overflow-hidden"
              >
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 list-none">
                  <span className="font-display text-base font-semibold text-cocoa">{faq.q}</span>
                  <div className="h-7 w-7 shrink-0 rounded-full bg-secondary group-open:bg-terracotta group-open:text-primary-foreground text-cocoa flex items-center justify-center transition-colors">
                    <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-5 pb-5 text-sm text-cocoa/70 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
