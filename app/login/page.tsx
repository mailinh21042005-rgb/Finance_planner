"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { LoadingButton } from "../../components/loading-button";
import { ScrollReveal } from "@/components/scroll-reveal";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(
    searchParams.get("mode") === "signup",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const label = isSignUp ? "Đăng ký" : "Đăng nhập";
  const isBusy = isSubmitting || isSocialLoading;

  function switchMode(nextSignUp: boolean) {
    setIsSignUp(nextSignUp);
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // không xoá form khi báo lỗi
    if (isBusy) return;

    setIsSubmitting(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const input = {
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
      name: String(data.get("name") ?? "").trim(),
    };

    try {
      const { error: authError } = isSignUp
        ? await authClient.signUp.email(input)
        : await authClient.signIn.email(input);
      if (authError) {
        setError(authError.message ?? `${label} thất bại`);
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // Reload the document so mobile browsers recalculate the viewport after authentication.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/dashboard");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : `${label} thất bại`);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn() {
    if (isBusy) return;

    setIsSocialLoading(true);
    setError("");
    try {
      const { error: authError } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
      if (authError) {
        setError(authError.message ?? "Đăng nhập với GitHub thất bại");
        setIsSocialLoading(false);
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Đăng nhập với GitHub thất bại",
      );
      setIsSocialLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/70 bg-card/85 p-6 shadow-xl backdrop-blur-md sm:p-8 dark:border-white/10 dark:bg-card/80">
      {/* Viền gradient trang trí trên đầu thẻ */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-violet-500 to-pink-400"
      />

      {/* Logo & tiêu đề */}
      <div className="mb-6 text-center">
        <Link
          href="/"
          className="font-script inline-block px-2 text-4xl leading-normal font-normal"
        >
          <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-violet-400 dark:to-pink-400">
            Finance Planner
          </span>
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          {isSignUp ? "Tạo tài khoản mới" : "Chào mừng trở lại"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isSignUp
            ? "Bắt đầu theo dõi thu chi và mục tiêu Wishlist của bạn."
            : "Đăng nhập để tiếp tục quản lý tài chính cá nhân."}
        </p>
      </div>

      {/* Tab chuyển nhanh Đăng nhập / Đăng ký */}
      <div
        role="tablist"
        aria-label="Chọn chế độ tài khoản"
        className="mb-6 grid grid-cols-2 rounded-xl bg-muted/70 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!isSignUp}
          disabled={isBusy}
          onClick={() => switchMode(false)}
          className={`rounded-lg py-2 text-sm font-medium transition-all ${
            !isSignUp
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isSignUp}
          disabled={isBusy}
          onClick={() => switchMode(true)}
          className={`rounded-lg py-2 text-sm font-medium transition-all ${
            isSignUp
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Đăng ký
        </button>
      </div>

      {/* Khung báo lỗi */}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-1.5">
            <label htmlFor="auth-name" className="block text-sm font-medium">
              Họ và tên
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="auth-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Tên của bạn"
                disabled={isBusy}
                className="h-11 w-full rounded-xl border border-input bg-background/80 pr-3.5 pl-10 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 disabled:opacity-60 md:text-sm"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="auth-email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="ban@example.com"
              disabled={isBusy}
              className="h-11 w-full rounded-xl border border-input bg-background/80 pr-3.5 pl-10 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 disabled:opacity-60 md:text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="auth-password" className="block text-sm font-medium">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="auth-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder="Mật khẩu (≥ 8 ký tự)"
              disabled={isBusy}
              className="h-11 w-full rounded-xl border border-input bg-background/80 pr-10 pl-10 text-base transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 disabled:opacity-60 md:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          loadingText={isSignUp ? "Đang đăng ký..." : "Đang đăng nhập..."}
          disabled={isSocialLoading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 px-4 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
        >
          <span>{label}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LoadingButton>
      </form>

      {/* Đường phân cách */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Hoặc tiếp tục với</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Nút GitHub */}
      <LoadingButton
        type="button"
        loading={isSocialLoading}
        loadingText="Đang chuyển đến GitHub..."
        disabled={isSubmitting}
        onClick={handleSocialSignIn}
        className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-input bg-background/80 px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-60"
      >
        <GitHubIcon className="h-4 w-4" />
        <span>Đăng nhập với GitHub</span>
      </LoadingButton>

      {/* Chuyển nhanh ở cuối thẻ */}
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => switchMode(!isSignUp)}
          className="font-medium text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
        >
          {isSignUp ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-4xl items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl border bg-card/80 p-8 text-center text-sm text-muted-foreground">
            Đang tải...
          </div>
        }
      >
        <ScrollReveal className="flex w-full justify-center">
          <LoginForm />
        </ScrollReveal>
      </Suspense>
    </main>
  );
}