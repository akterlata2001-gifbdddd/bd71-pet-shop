"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { LegalPage } from "@/components/pages/legal";

export function LegalPageClient({ page }: { page: "privacy" | "terms" | "dmca" | "disclaimer" }) {
  useEffect(() => {
    useRouter.setState({ page, params: {} } as any);
  }, [page]);

  return <LegalPage page={page} />;
}
