import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, BarChart3, Heart, Wallet } from "lucide-react";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Quản lý tài chính cá nhân",
};

const FEATURES = [
  {
    icon: Wallet,
    title: "Ghi chép thu chi nhanh",
    description:
      "Phân loại khoản thu, khoản chi rõ ràng và lọc nhanh theo thời gian, danh mục.",
  },
  {
    icon: BarChart3,
    title: "Biểu đồ chi tiêu trực quan",
    description:
      "Theo dõi số dư hiện tại và tỷ trọng chi tiêu từng danh mục ngay trong tháng.",
  },
  {
    icon: Heart,
    title: "Theo dõi mục tiêu Wishlist",
    description:
      "Tự động tính phần trăm hoàn thành cho từng món đồ bạn muốn mua dựa trên số dư.",
  },
];

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-4xl flex-col justify-center gap-12 px-6 py-12 md:px-8">
      {/* Hero */}
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <span className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Finance Planner
        </span>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Kiểm soát thu chi và chạm tới mục tiêu tiết kiệm
        </h1>

        <p className="text-base text-muted-foreground sm:text-lg">
          Ghi chép giao dịch hằng ngày, xem biểu đồ chi tiêu theo tháng và theo
          dõi tiến độ Wishlist của bạn ở một nơi duy nhất.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Bắt đầu ngay
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Đăng nhập
          </Link>
        </div>
      </section>

      {/* 3 tính năng chính */}
      <section
        aria-label="Tính năng nổi bật"
        className="grid gap-4 sm:grid-cols-3"
      >
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-2 rounded-xl border p-5 shadow-sm"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}