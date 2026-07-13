"use client";
import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { AccountPage } from "@/components/pages/account";

export function AccountClient() {
  useEffect(() => { useRouter.setState({ page: "account", params: {} } as any); }, []);
  return <AccountPage />;
}
