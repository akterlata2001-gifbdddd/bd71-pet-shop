"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { StoreInitializer } from "@/components/site/store-initializer";
import { BlogPage } from "@/components/pages/blog";

export function BlogSSR() {
  // Use direct setState — we're already on the right URL

  useEffect(() => {
    useRouter.setState({ page: "blog", params: {} } as any);
  }, []);

  return (<><StoreInitializer /><BlogPage /></>);
}
