"use client";
import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { StoreInitializer } from "@/components/site/store-initializer";
import { AboutPage } from "@/components/pages/about";

export function AboutSSR() {
  // Use direct setState — we're already on the right URL
  useEffect(() => { useRouter.setState({ page: "about", params: {} } as any); }, []);
  return (<><StoreInitializer /><AboutPage /></>);
}
