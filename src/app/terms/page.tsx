import type { Metadata } from "next";
import { LegalPageClient } from "./legal-client";

export const metadata: Metadata = {
  title: "Terms of Use | BD71 Pet Shop",
  description: "Terms and conditions for using BD71 Pet Shop website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPageClient page="terms" />;
}
