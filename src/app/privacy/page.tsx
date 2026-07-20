import type { Metadata } from "next";
import { LegalPageClient } from "./legal-client";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BD71 Pet Shop collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPageClient page="privacy" />;
}
