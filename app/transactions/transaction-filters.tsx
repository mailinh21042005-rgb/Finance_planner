"use client";
import { useRouter, useSearchParams }
  from "next/navigation";
import type { Filters } from "../../lib/validation";

const selectClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:w-auto md:min-h-9 md:text-sm";

export function TransactionFilters(f: Filters) {
  const router = useRouter();
  const params = useSearchParams();
  function pick(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value === "ALL") next.delete(key);
    else next.set(key, value);
    router.replace(`/transactions?${next}`);
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <select
        aria-label="Lọc theo thời gian"
        value={f.range}
        onChange={(e) => pick("range", e.target.value)}
        className={selectClass}
      >
        <option value="this-month">Tháng này</option>
        <option value="last-month">Tháng trước</option>
        <option value="all">Tất cả</option>
      </select>
      <select
        aria-label="Lọc theo loại"
        value={f.type ?? "ALL"}
        onChange={(e) => pick("type", e.target.value)}
        className={selectClass}
      >
        <option value="ALL">Thu và chi</option>
        <option value="INCOME">Thu</option>
        <option value="EXPENSE">Chi</option>
      </select>
    </div>
  );
}