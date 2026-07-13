import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout | BD71 Pet Shop",
  description: "Secure checkout with cash on delivery and bKash/Nagad support.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
