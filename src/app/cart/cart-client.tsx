"use client";
import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { CartPage } from "@/components/pages/cart";

export function CartClient() {
  useEffect(() => { useRouter.setState({ page: "cart", params: {} } as any); }, []);
  return <CartPage />;
}
