"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import {
  formatCompactVND,
  formatVND,
  type MonthlySummary,
  type SpendingTrend,
} from "@/lib/finance";

type MonthlyReportProps = {
  data: MonthlySummary[];
  trend: SpendingTrend;
};

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  borderColor: "var(--border)",
  color: "var(--popover-foreground)",
  borderRadius: "8px",
  fontSize: "13px",
};

export function MonthlyReport({ data, trend }: MonthlyReportProps) {
  const hasAnyData = data.some((d) => d.income > 0 || d.expense > 0);

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Báo cáo theo tháng &amp; Xu hướng chi tiêu
        </h2>
        <p className="text-sm text-muted-foreground">
          So sánh thu chi trong {data.length} tháng gần nhất
        </p>
      </div>

      {/* 3 thẻ tóm tắt xu hướng */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Chi tiêu so với tháng trước</p>
          <div className="mt-1 flex items-center gap-1.5 text-lg font-bold">
            {trend.direction === "up" && (
              <TrendingUp className="h-5 w-5 text-rose-500" />
            )}
            {trend.direction === "down" && (
              <TrendingDown className="h-5 w-5 text-emerald-500" />
            )}
            {trend.direction === "flat" && (
              <Minus className="h-5 w-5 text-muted-foreground" />
            )}
            <span
              className={
                trend.direction === "up"
                  ? "text-rose-600 dark:text-rose-400"
                  : trend.direction === "down"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground"
              }
            >
              {trend.percentChange === null
                ? "Mới phát sinh"
                : `${trend.percentChange > 0 ? "+" : ""}${trend.percentChange}%`}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {trend.diff === 0
              ? "Không thay đổi"
              : `${trend.diff > 0 ? "Tăng" : "Giảm"} ${formatVND(Math.abs(trend.diff))}`}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">
            Chi tiêu trung bình ({data.length} tháng)
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {formatVND(trend.averageExpense)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tháng này: {formatVND(trend.currentExpense)}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground">Tháng chi cao nhất</p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {trend.peakMonth ? formatVND(trend.peakMonth.expense) : "Chưa có"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {trend.peakMonth ? `Tháng ${trend.peakMonth.label}` : "—"}
          </p>
        </div>
      </div>

      {!hasAnyData ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Chưa có giao dịch trong {data.length} tháng gần đây để vẽ biểu đồ.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Biểu đồ cột so sánh Thu - Chi */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">
              So sánh Thu – Chi theo tháng
            </h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => formatCompactVND(Number(v ?? 0))}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) => [
                      formatVND(Number(value ?? 0)),
                      name === "income" ? "Thu nhập" : "Chi tiêu",
                    ]}
                    labelFormatter={(label) => `Tháng ${label}`}
                  />
                  <Legend
                    formatter={(value) =>
                      value === "income" ? "Thu nhập" : "Chi tiêu"
                    }
                  />
                  <Bar
                    dataKey="income"
                    name="income"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    name="expense"
                    fill="#f43f5e"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ đường xu hướng chi tiêu */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Xu hướng chi tiêu</h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => formatCompactVND(Number(v ?? 0))}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      formatVND(Number(value ?? 0)),
                      "Chi tiêu",
                    ]}
                    labelFormatter={(label) => `Tháng ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    name="Chi tiêu"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}