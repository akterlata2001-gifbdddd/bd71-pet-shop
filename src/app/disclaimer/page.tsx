import type { Metadata } from "next";
import { LegalPageClient } from "./legal-client";

export const metadata: Metadata = {
  title: "Disclaimer | BD71 Pet Shop",
  description: "Disclaimer for BD71 Pet Shop website content and services.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return <LegalPageClient page="disclaimer" />;
}
