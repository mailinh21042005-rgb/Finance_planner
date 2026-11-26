"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  Mail,
  MoonStar,
  ReceiptText,
  Save,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { authClient } from "@/lib/auth-client";

type ProfileStats = {
  transactionCount: number;
  wishlistCount: number;
};

type ProfileViewProps = {
  user: {
    name: string;
    email: string;
  };
  stats: ProfileStats;
  onSaveName: (nextName: string) => Promise<void>;
};

function getInitials(name: string, email: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return (words[0]?.slice(0, 2) || email.slice(0, 2)).toUpperCase();
}

export function ProfileViewClient({
  user,
  stats,
}: Omit<ProfileViewProps, "onSaveName">) {
  const router = useRouter();

  async function onSaveName(nextName: string) {
    const { error } = await authClient.updateUser({ name: nextName });
    if (error) {
      throw new Error(error.message ?? "Không thể cập nhật tên.");
    }
    router.refresh();
  }

  return (
    <ProfileView user={user} stats={stats} onSaveName={onSaveName} />
  );
}

function ProfileView({ user, stats, onSaveName }: ProfileViewProps) {
  const { setTheme } = useTheme();
  const [name, setName] = useState(user.name);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const initials = getInitials(name || user.name, user.email);
  const hasChanged = name.trim() !== "" && name.trim() !== user.name.trim();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!hasChanged || isSaving) return;

    setIsSaving(true);
    setMessage(null);
    try {
      await onSaveName(name.trim());
      setMessage({ type: "success", text: "Đã cập nhật tên hiển thị." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Cập nhật thất bại.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-2xl border border-border/70 bg-card/85 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-card/75">
        <div className="relative isolate z-0 h-28 overflow-hidden bg-gradient-to-r from-sky-400/80 via-violet-500/80 to-pink-400/80 sm:h-32 dark:from-sky-500/40 dark:via-violet-600/45 dark:to-pink-500/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_50%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.25),transparent_45%)]"
          />
        </div>

        <div className="relative z-10 px-5 pb-6 sm:px-7">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-sky-400 via-violet-500 to-pink-400 text-2xl font-bold text-white shadow-lg sm:h-22 sm:w-22">
                {initials}
              </div>
              <div className="min-w-0 pb-1">
                <h1 className="truncate text-2xl font-bold tracking-tight">
                  {name.trim() || user.name}
                </h1>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-center">
                <p className="text-lg font-bold leading-tight">
                  {stats.transactionCount}
                </p>
                <p className="text-[11px] text-muted-foreground">Giao dịch</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-center">
                <p className="text-lg font-bold leading-tight">
                  {stats.wishlistCount}
                </p>
                <p className="text-[11px] text-muted-foreground">Wishlist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 md:grid-cols-[1.35fr_1fr]">
        <section className="rounded-2xl border border-border/70 bg-card/85 p-5 shadow-lg backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-card/75">
          <div className="mb-5 border-b border-border/60 pb-4">
            <h2 className="text-base font-semibold">Thông tin cá nhân</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="profile-email"
                className="flex items-center justify-between text-sm font-medium"
              >
                <span>Địa chỉ Email</span>
                <span className="inline-flex items-center gap-1 text-xs font-normal text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Đang hoạt động
                </span>
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  disabled
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-border/60 bg-muted/50 pr-3.5 pl-10 text-base text-muted-foreground outline-none md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium"
              >
                Tên hiển thị
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên hiển thị của bạn"
                  disabled={isSaving}
                  className="h-11 w-full rounded-xl border border-input bg-background/80 pr-3.5 pl-10 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 disabled:opacity-60 md:text-sm"
                />
              </div>
            </div>

            {message && (
              <p
                role="status"
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                  message.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
                }`}
              >
                {message.type === "success" && (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                )}
                <span>{message.text}</span>
              </p>
            )}

            <LoadingButton
              type="submit"
              loading={isSaving}
              loadingText="Đang lưu..."
              disabled={!hasChanged}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 px-4 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
            >
              <Save className="h-4 w-4 shrink-0" />
              <span>Lưu thay đổi</span>
            </LoadingButton>
          </form>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border/70 bg-card/85 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-card/75">
            <h2 className="text-base font-semibold">Không gian hiển thị</h2>
            <p className="mt-0.5 mb-4 text-xs text-muted-foreground">
              Chọn nền bầu trời yêu thích khi theo dõi tài chính.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className="flex flex-col items-start gap-2 rounded-xl border border-sky-400 bg-sky-50/80 p-3 text-left transition-all hover:border-sky-400 dark:border-white/10 dark:bg-background/40 dark:hover:border-sky-400/60"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20 text-amber-500">
                  <Sun className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Bình minh</p>
                  <p className="text-[11px] text-muted-foreground">
                    Mây pastel &amp; nắng
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className="flex flex-col items-start gap-2 rounded-xl border border-border/70 bg-background/50 p-3 text-left transition-all hover:border-violet-400 dark:border-violet-400 dark:bg-violet-500/15"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                  <MoonStar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Ngân hà</p>
                  <p className="text-[11px] text-muted-foreground">
                    Đêm sao lấp lánh
                  </p>
                </div>
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/85 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-card/75">
            <h2 className="mb-3 text-base font-semibold">Truy cập nhanh</h2>
            <div className="space-y-2">
              <Link
                href="/transactions"
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span className="inline-flex items-center gap-2.5">
                  <ReceiptText className="h-4 w-4 text-sky-500" />
                  Ghi chép giao dịch
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Mục tiêu Wishlist
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
