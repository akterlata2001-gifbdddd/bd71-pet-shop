"use client";
import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { CheckoutPage } from "@/components/pages/checkout";

export function CheckoutClient() {
  useEffect(() => { useRouter.setState({ page: "checkout", params: {} } as any); }, []);
  return <CheckoutPage />;
}
