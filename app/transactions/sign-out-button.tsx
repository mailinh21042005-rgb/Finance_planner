"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";
import { LoadingButton } from "../../components/loading-button";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    if (isPending) return;
    setIsPending(true);

    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message ?? "Đăng xuất thất bại");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (cause) {
      toast.error(
        cause instanceof Error ? cause.message : "Đăng xuất thất bại",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <LoadingButton
      type="button"
      onClick={handleSignOut}
      loading={isPending}
      loadingText="Đang đăng xuất..."
      className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      Đăng xuất
    </LoadingButton>
  );
}