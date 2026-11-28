import { ReceiptText } from "lucide-react";
import { prisma } from "../../lib/prisma";
import {
  calculateBalance,
  formatVND,
  getDateRange,
} from "../../lib/finance";
import { TransactionForm } from "./transaction-form";
import { TransactionFilters } from "./transaction-filters";
import { transactionFilterSchema } from "../../lib/validation";
import { requireUser } from "../../lib/dal";
import { TransactionRow } from "./transaction-row";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Giao dịch",
};

export default async function TransactionsPage({
  searchParams,
}: PageProps<"/transactions">) {
  const user = await requireUser();
  const resolvedSearchParams = await searchParams;
  const filters = transactionFilterSchema.catch({ range: "this-month" }).parse(resolvedSearchParams);
  const rows = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      date: getDateRange(filters.range),
      type: filters.type,
      category: filters.category,
    },
    orderBy: { date: "desc" },
  });
  const filteredTotal = calculateBalance(rows);
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <ScrollReveal>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Giao dịch</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ghi nhanh khoản thu chi và theo dõi biến động dòng tiền theo tháng.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-20">
          <ScrollReveal delay={100}>
            <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/85 p-5 shadow-lg shadow-black/[0.03] backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-card/75 dark:shadow-black/25">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-violet-500 to-pink-400"
              />
              <h2 className="mb-4 text-base font-semibold">Thêm giao dịch mới</h2>
              <TransactionForm />
            </section>
          </ScrollReveal>
        </div>

        <div className="min-w-0">
          <ScrollReveal delay={200}>
            <section className="space-y-4 rounded-2xl border border-border/70 bg-card/85 p-5 shadow-lg shadow-black/[0.03] backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-card/75 dark:shadow-black/25">
              {/* Thanh bộ lọc */}
              <div className="border-b border-border/60 pb-4">
                <TransactionFilters {...filters} />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/40 px-3.5 py-2.5 text-xs">
                <span className="text-muted-foreground">
                  Hiển thị{" "}
                  <strong className="text-foreground">{rows.length}</strong>{" "}
                  giao dịch
                </span>
                <span className="font-medium text-muted-foreground">
                  Tổng lọc:{" "}
                  <strong
                    className={
                      filteredTotal >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }
                  >
                    {filteredTotal > 0 ? "+" : ""}
                    {formatVND(filteredTotal)}
                  </strong>
                </span>
              </div>

              {rows.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 py-12 text-center">
                  <ReceiptText className="mb-2.5 h-8 w-8 text-muted-foreground/60" />
                  <p className="text-sm font-medium">Chưa có giao dịch nào</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Thử đổi bộ lọc hoặc thêm giao dịch mới ở khung bên cạnh.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {rows.map((t) => (
                    <TransactionRow key={t.id} transaction={t} />
                  ))}
                </ul>
              )}
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}