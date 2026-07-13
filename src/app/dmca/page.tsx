import type { Metadata } from "next";
import { LegalPageClient } from "./legal-client";

export const metadata: Metadata = {
  title: "DMCA Policy | BD71 Pet Shop",
  description: "Digital Millennium Copyright Act policy for BD71 Pet Shop.",
  alternates: { canonical: "/dmca" },
};

export default function DmcaPage() {
  return <LegalPageClient page="dmca" />;
}
