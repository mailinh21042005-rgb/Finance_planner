import type { Filters } from "../lib/validation";const vnd = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function formatVND(amount: number) {
  return vnd.format(amount);
}

export function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function getDateRange(
  range: Filters["range"],
  now = new Date(),
) {
  if (range === "all") return undefined;
  const back = range === "last-month" ? 1 : 0;
  const y = now.getFullYear();
  const m = now.getMonth() - back; // 0 - 1 → tháng 12
  return {
    gte: new Date(y, m, 1), // ngày 1 của tháng
    lt: new Date(y, m + 1, 1), // ngày 1 tháng sau
  };
}

export function wishlistProgress(
  balance: number, cost: number,
): number {
  if (cost <= 0) return 100;
  const percent =
    Math.floor((balance / cost) * 100);
  return Math.min(100, Math.max(0, percent));
}

export const MILESTONES = [50, 75, 100] as const;

export function crossedMilestones(
  prev: number, next: number,
): number[] {
  return MILESTONES.filter(
    (m) => prev < m && next >= m);
}

export function calculateBalance(
  transactions: Array<{ type: "INCOME" | "EXPENSE"; amount: number }>,
): number {
  return transactions.reduce((acc, t) => {
    return t.type === "INCOME" ? acc + t.amount : acc - t.amount;
  }, 0);
}

export type MonthlySummary = {
  monthKey: string; 
  label: string;    
  income: number;
  expense: number;
  net: number;
};

export type SpendingTrend = {
  currentExpense: number;
  previousExpense: number;
  diff: number;
  percentChange: number | null; 
  direction: "up" | "down" | "flat";
  averageExpense: number;
  peakMonth: MonthlySummary | null;
};

export function getLastNMonthsStart(months = 6, now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth() - (months - 1), 1, 0, 0, 0, 0);
}

export function formatCompactVND(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1).replace(/\.0$/, "")}tr`;
  }
  if (abs >= 1_000) {
    return `${sign}${Math.round(abs / 1_000)}k`;
  }
  return `${sign}${abs}`;
}

export function buildMonthlyReport(
  transactions: Array<{ type: string; amount: number; date: Date }>,
  months = 6,
  now: Date = new Date(),
): MonthlySummary[] {
  const buckets = new Map<string, MonthlySummary>();

  // Tạo sẵn khung N tháng liên tiếp để biểu đồ không bị khuyết tháng không có giao dịch
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const monthKey = `${y}-${String(m).padStart(2, "0")}`;
    const label = `${String(m).padStart(2, "0")}/${String(y).slice(-2)}`;
    buckets.set(monthKey, { monthKey, label, income: 0, expense: 0, net: 0 });
  }

  for (const tx of transactions) {
    const d = new Date(tx.date);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = buckets.get(monthKey);
    if (!bucket) continue;

    if (tx.type === "INCOME") {
      bucket.income += tx.amount;
    } else if (tx.type === "EXPENSE") {
      bucket.expense += tx.amount;
    }
    bucket.net = bucket.income - bucket.expense;
  }

  return Array.from(buckets.values());
}

export function analyzeSpendingTrend(monthly: MonthlySummary[]): SpendingTrend {
  const currentExpense = monthly.at(-1)?.expense ?? 0;
  const previousExpense = monthly.at(-2)?.expense ?? 0;
  const diff = currentExpense - previousExpense;

  let percentChange: number | null = 0;
  if (previousExpense === 0) {
    percentChange = currentExpense > 0 ? null : 0;
  } else {
    percentChange = Math.round((diff / previousExpense) * 100);
  }

  const direction: SpendingTrend["direction"] =
    diff > 0 ? "up" : diff < 0 ? "down" : "flat";

  const totalExpense = monthly.reduce((sum, item) => sum + item.expense, 0);
  const averageExpense =
    monthly.length > 0 ? Math.round(totalExpense / monthly.length) : 0;

  let peakMonth: MonthlySummary | null = null;
  for (const item of monthly) {
    if (item.expense > 0 && (!peakMonth || item.expense > peakMonth.expense)) {
      peakMonth = item;
    }
  }

  return {
    currentExpense,
    previousExpense,
    diff,
    percentChange,
    direction,
    averageExpense,
    peakMonth,
  };
}