import type { Metadata } from "next";
import { AboutSSR } from "./about-ssr-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us | BD71 Pet Shop",
  description:
    "BD71 Pet Shop is Bangladesh's trusted source for premium pet food and supplies since 2021. Genuine products, fair prices, fast delivery.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | BD71 Pet Shop",
    description: "Bangladesh's trusted source for premium pet food and supplies since 2021.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutSSR />;
}
