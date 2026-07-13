"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { ShopPage } from "@/components/pages/shop";

export function ShopSSR() {
  // Use direct setState — we're already on the right URL

  useEffect(() => {
    useRouter.setState({ page: "shop", params: {} } as any);
  }, []);

  return <ShopPage />;
}
