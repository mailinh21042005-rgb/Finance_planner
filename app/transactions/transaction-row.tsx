"use client";

import { useState } from "react";
import { Category, TransactionType } from "../../generated/prisma/enums";
import { formatVND } from "../../lib/finance";
import { LoadingButton } from "../../components/loading-button";
import { CurrencyInput } from "@/components/currency-input";
import { deleteTransaction, updateTransaction } from "./actions";

type TransactionRowProps = {
  transaction: {
    id: string;
    type: keyof typeof TransactionType;
    amount: number;
    description: string;
    category: keyof typeof Category;
    date: Date;
  };
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:w-auto md:min-h-9 md:text-sm";

export function TransactionRow({ transaction: t }: TransactionRowProps) {
  const [editing, setEditing] = useState(false);

  async function save(formData: FormData) {
    await updateTransaction(formData);
    setEditing(false);
  }

  if (!editing) {
    return (
      <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
        <span className="min-w-0 flex-1 break-words">
          {t.description}: {formatVND(t.amount)}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-sm md:min-h-8"
            onClick={() => setEditing(true)}
          >
            Sửa
          </button>
          <form action={deleteTransaction} className="inline">
            <input type="hidden" name="id" value={t.id} />
            <LoadingButton
              type="submit"
              loadingText="Đang xoá..."
              className="min-h-11 px-3 text-sm text-red-600 md:min-h-8"
            >
              Xoá
            </LoadingButton>
          </form>
        </div>
      </li>
    );
  }

  return (
    <li className="grid gap-2 rounded-lg border p-3">
      <form action={save} className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
        <input type="hidden" name="id" value={t.id} />
        <select name="type" defaultValue={t.type} aria-label="Loại" className={fieldClass}>
          {Object.values(TransactionType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <CurrencyInput
          name="amount"
          defaultValue={t.amount}
          required
          aria-label="Số tiền"
          className={fieldClass}
        />
        <input
          name="description"
          defaultValue={t.description}
          aria-label="Mô tả"
          className={fieldClass}
        />
        <select name="category" defaultValue={t.category} aria-label="Danh mục" className={fieldClass}>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          defaultValue={t.date.toISOString().slice(0, 10)}
          aria-label="Ngày"
          className={fieldClass}
        />
        <div className="flex items-center gap-2">
          <LoadingButton type="submit" loadingText="Đang lưu..." className="min-h-11 px-3 text-sm md:min-h-8">
            Lưu
          </LoadingButton>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-sm md:min-h-8"
            onClick={() => setEditing(false)}
          >
            Huỷ
          </button>
        </div>
      </form>
    </li>
  );
}