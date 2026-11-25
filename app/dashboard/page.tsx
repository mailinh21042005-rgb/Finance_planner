import Link from "next/link";
import {
  analyzeSpendingTrend,
  buildMonthlyReport,
  formatVND,
  getDateRange,
  getLastNMonthsStart,
  wishlistProgress,
} from "../../lib/finance";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";
import {
  ExpensePieChart,
  type CategoryExpenseItem,
} from "./expense-pie-chart";
import { MonthlyReport } from "../../components/monthly-report";

export const metadata = {
  title: "Dashboard",
};

// Đọc CSDL mỗi lần có request, không đóng băng lúc build
export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Ăn uống",
  TRANSPORT: "Di chuyển",
  ENTERTAINMENT: "Giải trí",
  SHOPPING: "Mua sắm",
  BILLS: "Hoá đơn",
  SALARY: "Lương",
  INVESTMENT: "Đầu tư",
  OTHER: "Khác",
};

export default async function DashboardPage() {
  const user = await requireUser();
  const thisMonthRange = getDateRange("this-month");

  const [thu, chi, theoThangNay, wishlistItems, recentTransactions] =
    await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: "INCOME", userId: user.id },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: "EXPENSE", userId: user.id },
      }),
      prisma.transaction.groupBy({
        by: ["category"],
        _sum: { amount: true },
        where: {
          type: "EXPENSE",
          userId: user.id,
          date: thisMonthRange,
        },
        orderBy: { _sum: { amount: "desc" } },
      }),
      prisma.wishlistItem.findMany({
        where: { userId: user.id },
        orderBy: { cost: "asc" },
        select: {
          id: true,
          name: true,
          cost: true,
          priority: true,
        },
      }),
      prisma.transaction.findMany({
        where: {
          userId: user.id,
          date: { gte: getLastNMonthsStart(6) },
        },
        select: {
          type: true,
          amount: true,
          date: true,
        },
        orderBy: { date: "asc" },
      }),
    ]);

  const tongThu = thu._sum.amount ?? 0;
  const tongChi = chi._sum.amount ?? 0;
  const soDu = tongThu - tongChi;

  const tongChiThangNay = theoThangNay.reduce(
    (sum, item) => sum + (item._sum.amount ?? 0),
    0,
  );

  // Chuẩn bị dữ liệu truyền vào biểu đồ tròn + bảng
  const chartData: CategoryExpenseItem[] = theoThangNay
    .map((d) => {
      const amount = d._sum.amount ?? 0;
      const percent =
        tongChiThangNay > 0
          ? Math.round((amount / tongChiThangNay) * 100)
          : 0;
      return {
        category: d.category,
        label: CATEGORY_LABELS[d.category] ?? d.category,
        amount,
        percent,
      };
    })
    .filter((d) => d.amount > 0);

  const monthlyData = buildMonthlyReport(recentTransactions, 6);
  const spendingTrend = analyzeSpendingTrend(monthlyData);

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-8 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Xin chào {user.name} ({user.email})
          </p>
        </div>
      </div>

      <section aria-labelledby="overview-heading" className="grid gap-4 sm:grid-cols-3">
        <h2 id="overview-heading" className="sr-only">Tổng quan tài chính</h2>

        <div className="rounded-xl border p-4 shadow-sm sm:col-span-3 md:col-span-1">
          <p className="text-sm text-muted-foreground">Số dư hiện tại</p>
          <p className={`mt-1 text-2xl font-bold tabular-nums ${soDu < 0 ? "text-red-600" : "text-emerald-600"}`}>
            {formatVND(soDu)}
          </p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Tổng thu nhập</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {formatVND(tongThu)}
          </p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Tổng chi tiêu</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {formatVND(tongChi)}
          </p>
        </div>
      </section>

      <section aria-labelledby="chart-heading" className="grid min-w-0 gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 id="chart-heading" className="text-lg font-semibold">
            Chi tiêu tháng này theo danh mục
          </h2>
          <span className="text-sm text-muted-foreground">
            Tổng: {formatVND(tongChiThangNay)}
          </span>
        </div>
        <ExpensePieChart data={chartData} />
      </section>

      <div className="min-w-0">
        <MonthlyReport data={monthlyData} trend={spendingTrend} />
      </div>

      <section aria-labelledby="wishlist-heading" className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 id="wishlist-heading" className="text-lg font-semibold">
            Tiến độ Wishlist
          </h2>
          <Link href="/wishlist" className="text-sm underline">
            Quản lý Wishlist
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Bạn chưa có món đồ nào trong Wishlist.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {wishlistItems.map((item) => {
              const percent = wishlistProgress(soDu, item.cost);
              return (
                <li key={item.id} className="grid gap-2 rounded-xl border p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {formatVND(item.cost)}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={`Tiến độ cho ${item.name}`}
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="h-2 w-full overflow-hidden rounded-full bg-secondary"
                  >
                    <div
                      className={`h-full transition-all ${percent >= 100 ? "bg-emerald-500" : "bg-primary"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="text-right text-xs font-medium">{percent}%</div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}