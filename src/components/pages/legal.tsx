"use client";

import { motion } from "framer-motion";
import { Home as HomeIcon, ChevronRight, Shield, FileText, Gavel, Info } from "lucide-react";
import { useRouter, type PageId } from "@/lib/store";

type LegalContent = {
  title: string;
  icon: typeof Shield;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const legalContents: Record<string, LegalContent> = {
  privacy: {
    title: "Privacy Policy",
    icon: Shield,
    lastUpdated: "March 1, 2026",
    intro:
      "At BD71 Pet Shop, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us. We are committed to protecting your personal data and your right to privacy.",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect information that you provide directly to us when you create an account, place an order, subscribe to our newsletter, or contact our customer service. This includes your name, email address, phone number, shipping address, and payment information. We also automatically collect certain information about your device and browsing behavior, including IP address, browser type, operating system, and pages visited.",
      },
      {
        heading: "How We Use Your Information",
        body: "We use your personal information to process and fulfill your orders, communicate with you about your purchases, provide customer support, send promotional materials (with your consent), improve our website and services, prevent fraud, and comply with legal obligations. We never sell your personal information to third parties under any circumstances.",
      },
      {
        heading: "Information Sharing",
        body: "We may share your information with trusted third-party service providers who help us operate our business — such as payment processors (bKash, Nagad, SSL Commerz), delivery companies, and hosting providers. These parties are contractually obligated to protect your information and use it only for the purposes we specify. We may also disclose information when required by law.",
      },
      {
        heading: "Data Security",
        body: "We implement industry-standard security measures to protect your personal information, including SSL encryption for all transactions, secure data storage, and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. We regularly review and update our security practices to address emerging threats.",
      },
      {
        heading: "Your Rights",
        body: "You have the right to access, correct, or delete your personal information at any time. You can also opt out of marketing communications by clicking the unsubscribe link in our emails or contacting us directly. To exercise any of these rights, please email us at privacy@bd71shop.com.bd with your request.",
      },
      {
        heading: "Cookies Policy",
        body: "Our website uses cookies and similar technologies to enhance your browsing experience, remember your preferences, analyze website traffic, and serve personalized content. You can control cookies through your browser settings, but disabling them may affect website functionality.",
      },
      {
        heading: "Children's Privacy",
        body: "Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately so we can delete it.",
      },
      {
        heading: "Changes to This Policy",
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the 'last updated' date. We encourage you to review this policy periodically.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    icon: FileText,
    lastUpdated: "March 1, 2026",
    intro:
      "Welcome to BD71 Pet Shop. These Terms of Use govern your use of our website and the purchase of products from us. By accessing our website or placing an order, you agree to be bound by these terms. Please read them carefully before using our services.",
    sections: [
      {
        heading: "Acceptance of Terms",
        body: "By accessing and using bd71shop.com.bd, you accept and agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. Your continued use of the website constitutes ongoing acceptance of these terms.",
      },
      {
        heading: "Eligibility",
        body: "To make purchases on our website, you must be at least 18 years of age or have parental/guardian consent, and be capable of forming a legally binding contract. By placing an order, you represent and warrant that you meet these requirements.",
      },
      {
        heading: "Products & Pricing",
        body: "We strive to display our products and their colors accurately. However, we cannot guarantee that your device's display will accurately reflect the actual product. All prices are listed in Bangladeshi Taka (৳) and are subject to change without notice. We reserve the right to correct any errors in pricing or product information and to cancel orders resulting from such errors.",
      },
      {
        heading: "Orders & Payment",
        body: "When you place an order, you'll receive an order confirmation email. This confirmation does not constitute acceptance of your order; we may decline to fulfill an order for any reason. We accept Cash on Delivery, bKash, Nagad, Rocket, and major credit/debit cards. By submitting payment, you authorize us to charge the specified amount to your chosen payment method.",
      },
      {
        heading: "Shipping & Delivery",
        body: "We deliver across Bangladesh. Delivery times are estimates and not guaranteed. Within Dhaka, delivery typically takes 1-2 business days; outside Dhaka, 2-4 business days. Risk of loss passes to you upon delivery. If you receive a damaged or incorrect item, contact us within 48 hours for a replacement or refund.",
      },
      {
        heading: "Returns & Refunds",
        body: "We accept returns within 7 days of delivery for unopened products in original packaging. Refunds are processed within 7-14 business days to the original payment method. Certain items, including opened food products and clearance items, are not eligible for return. Detailed return instructions are available on our website.",
      },
      {
        heading: "Intellectual Property",
        body: "All content on this website, including text, graphics, logos, images, and software, is the property of BD71 Pet Shop or its content suppliers and is protected by Bangladesh and international copyright laws. You may not reproduce, distribute, modify, or otherwise use any content without our prior written consent.",
      },
      {
        heading: "Limitation of Liability",
        body: "BD71 Pet Shop shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount you paid for the product(s) giving rise to the claim. Some jurisdictions do not allow limitation of liability, so this provision may not apply to you.",
      },
      {
        heading: "Governing Law",
        body: "These Terms of Use are governed by the laws of the People's Republic of Bangladesh. Any disputes arising from these terms or your use of our website shall be resolved in the courts of Dhaka, Bangladesh.",
      },
    ],
  },
  dmca: {
    title: "DMCA Policy",
    icon: Gavel,
    lastUpdated: "March 1, 2026",
    intro:
      "BD71 Pet Shop respects the intellectual property rights of others and expects users of our website to do the same. This Digital Millennium Copyright Act (DMCA) Policy outlines our procedures for handling claims of copyright infringement.",
    sections: [
      {
        heading: "Filing a Copyright Claim",
        body: "If you believe that content on our website infringes your copyright, please send a written notice to dmca@bd71shop.com.bd with the following information: a physical or electronic signature of the copyright owner, identification of the copyrighted work claimed to have been infringed, identification of the material that is claimed to be infringing, your contact information, a statement that you have a good faith belief that the use is not authorized, and a statement that the information in the notification is accurate.",
      },
      {
        heading: "Counter-Notification",
        body: "If you believe that your content was removed from our website in error, you may file a counter-notification. The counter-notification must include: your physical or electronic signature, identification of the removed material, a statement under penalty of perjury that you have a good faith belief the material was removed in error, your contact information, and your consent to the jurisdiction of the courts in Dhaka, Bangladesh.",
      },
      {
        heading: "Repeat Infringers",
        body: "We will terminate the accounts of users who are found to be repeat infringers of copyright law. We reserve the right to remove infringing content immediately, without prior notice, at our sole discretion.",
      },
      {
        heading: "Response Time",
        body: "We strive to process and respond to all valid DMCA notices within 14 business days of receipt. We may request additional information if your notice is incomplete. Failure to provide required information may result in delayed processing or dismissal of your claim.",
      },
      {
        heading: "False Claims",
        body: "Filing a false DMCA notice may result in legal liability for damages, including costs and attorney fees. Before filing a claim, ensure that you have a good faith belief that the material is infringing and that you own or are authorized to act on behalf of the copyright owner.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    icon: Info,
    lastUpdated: "March 1, 2026",
    intro:
      "The information provided by BD71 Pet Shop on bd71shop.com.bd is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the website.",
    sections: [
      {
        heading: "Pet Care Information",
        body: "Articles and blog posts on our website are provided for general informational and educational purposes only. They are not intended to replace professional veterinary advice, diagnosis, or treatment. Always consult with a qualified veterinarian before making decisions about your pet's health, nutrition, or medical care. Never disregard professional veterinary advice or delay seeking it because of something you have read on our website.",
      },
      {
        heading: "Product Information",
        body: "While we make every effort to ensure product descriptions, images, and nutritional information are accurate and up to date, manufacturers may change formulations, packaging, or other details without notice. We recommend checking the actual product label before use. If you have specific concerns about a product, please contact us before purchasing.",
      },
      {
        heading: "External Links",
        body: "Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any link does not imply endorsement by BD71 Pet Shop.",
      },
      {
        heading: "Allergies & Sensitivities",
        body: "Some pets may have allergies or sensitivities to certain ingredients in pet food. Always introduce new foods gradually and monitor your pet for any adverse reactions. If your pet experiences vomiting, diarrhea, skin irritation, or other concerning symptoms after consuming a product, discontinue use immediately and consult a veterinarian.",
      },
      {
        heading: "No Professional Advice",
        body: "The content on this website is not intended as a substitute for professional advice of any kind, including veterinary, legal, or financial advice. Always seek the advice of a qualified professional with any questions you may have regarding a particular issue. Reliance on any information provided by BD71 Pet Shop is solely at your own risk.",
      },
      {
        heading: "Limitation of Liability",
        body: "Under no circumstances shall BD71 Pet Shop be liable for any loss or damage of any kind incurred as a result of the use of the website or reliance on any information provided. Your use of the website and your reliance on any information is solely at your own risk.",
      },
      {
        heading: "Testimonials & Reviews",
        body: "Testimonials and reviews on our website reflect the individual experiences of our customers and are not necessarily representative of all users. We do not claim that all customers will have the same experiences. Your actual results may vary.",
      },
      {
        heading: "Errors & Omissions",
        body: "While we strive for accuracy, the information on our website may contain typographical errors, inaccuracies, or omissions. We reserve the right to correct any such errors and to change or update information at any time without prior notice.",
      },
    ],
  },
};

export function LegalPage({ page }: { page: PageId }) {
  const navigate = useRouter((s) => s.navigate);
  const content = legalContents[page];

  if (!content) {
    return null;
  }

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
              <content.icon className="h-6 w-6" />
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
                    {section.heading}
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
                We&apos;re here to help. Contact our team and we&apos;ll get back to you within 24 hours.
              </p>
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
