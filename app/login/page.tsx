"use client";
import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { LoadingButton } from "../../components/loading-button";
import { ScrollReveal } from "@/components/scroll-reveal";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(
    searchParams.get("mode") === "signup",
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const label = isSignUp ? "Đăng ký" : "Đăng nhập";
  const isBusy = isSubmitting || isSocialLoading;

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault(); // không xoá form khi báo lỗi
    if (isBusy) return;

    setIsSubmitting(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const input = {
      email: String(data.get("email")),
      password: String(data.get("password")),
      name: String(data.get("name") ?? ""),
    };
    try {
      const { error: authError } = isSignUp
        ? await authClient.signUp.email(input)
        : await authClient.signIn.email(input);
      if (authError) {
        setError(authError.message ?? `${label} thất bại`);
        return;
      }
      router.push("/dashboard");
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
    <form onSubmit={handleSubmit}
      className="grid max-w-sm gap-2 p-8">
      <h1 className="text-2xl font-bold">{label}</h1>
      {isSignUp && (
        <input name="name" placeholder="Tên" />
      )}
      <input name="email" placeholder="Email" />
      <input name="password" type="password"
        placeholder="Mật khẩu (≥ 8 ký tự)" />
      {error && <p role="alert">{error}</p>}
      <LoadingButton
        type="submit"
        loading={isSubmitting}
        loadingText={isSignUp ? "Đang đăng ký..." : "Đang đăng nhập..."}
        disabled={isSocialLoading}
      >
        {label}
      </LoadingButton>
      <button type="button"
        disabled={isBusy}
        onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Đã có tài khoản" : "Tạo tài khoản"}
      </button>
      <LoadingButton
        type="button"
        loading={isSocialLoading}
        loadingText="Đang chuyển đến GitHub..."
        disabled={isSubmitting}
        onClick={handleSocialSignIn}
      >
        Đăng nhập với GitHub
      </LoadingButton>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm">Đang tải...</div>}>
      <ScrollReveal>
        <LoginForm />
      </ScrollReveal>
    </Suspense>
  );
}