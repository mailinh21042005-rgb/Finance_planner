"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../components/ui/chart";
import { formatVND } from "../../lib/finance";

export type CategoryExpenseItem = {
  category: string;
  label: string;
  amount: number;
  percent: number;
};

const CHART_COLORS = [
  "#38bdf8", 
  "#a78bfa", 
  "#f472b6", 
  "#34d399",
  "#fbbf24", 
  "#818cf8", 
  "#fb7185", 
  "#94a3b8", 
];

export function ExpensePieChart({ data }: { data: CategoryExpenseItem[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        Tháng này bạn chưa có khoản chi tiêu nào để vẽ biểu đồ.
      </div>
    );
  }

  // Tạo cấu hình màu và nhãn chuẩn cho shadcn ChartContainer
  const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
    acc[item.category] = {
      label: item.label,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return acc;
  }, {});

  return (
    <figure className="grid gap-6 rounded-xl border p-4 shadow-sm md:grid-cols-2 md:items-center">
      <div aria-hidden="true" className="w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(value, _name, item) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {item.payload?.label ?? String(_name)}
                      </span>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {formatVND(Number(value ?? 0))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={55}
              outerRadius={90}
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={`var(--color-${entry.category})`}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Bảng số liệu chi tiết (vừa làm chú thích, vừa hỗ trợ trình đọc màn hình) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-2 text-left text-xs font-medium text-muted-foreground">
            Bảng chi tiêu theo danh mục trong tháng hiện tại
          </caption>
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th scope="col" className="py-2 pr-2 font-medium">Danh mục</th>
              <th scope="col" className="py-2 px-2 text-right font-medium">Số tiền</th>
              <th scope="col" className="py-2 pl-2 text-right font-medium">Tỉ lệ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.category} className="border-b last:border-0">
                <td className="flex items-center gap-2 py-2 pr-2 font-medium">
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                    }}
                    aria-hidden="true"
                  />
                  {item.label}
                </td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {formatVND(item.amount)}
                </td>
                <td className="py-2 pl-2 text-right tabular-nums text-muted-foreground">
                  {item.percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}