import type { Metadata } from "next";
import { CartClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Shopping Cart | BD71 Pet Shop",
  description: "Review your cart and proceed to checkout.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
