"use client";
import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { StoreInitializer } from "@/components/site/store-initializer";
import { ContactPage } from "@/components/pages/contact";

export function ContactSSR() {
  // Use direct setState — we're already on the right URL
  useEffect(() => { useRouter.setState({ page: "contact", params: {} } as any); }, []);
  return (<><StoreInitializer /><ContactPage /></>);
}
