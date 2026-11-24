"use client";

import { useState } from "react";
import { Category, TransactionType } from "../../generated/prisma/enums";
import { formatVND } from "../../lib/finance";
import { LoadingButton } from "../../components/loading-button";
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

export function TransactionRow({ transaction: t }: TransactionRowProps) {
  const [editing, setEditing] = useState(false);

  async function save(formData: FormData) {
    await updateTransaction(formData);
    setEditing(false);
  }

  if (!editing) {
    return (
      <li className="flex items-center gap-2 border p-2">
        <span className="flex-1">
          {t.description}: {formatVND(t.amount)}
        </span>
        <button
          type="button"
          className="text-sm"
          onClick={() => setEditing(true)}
        >
          Sửa
        </button>
        <form action={deleteTransaction} className="inline">
          <input type="hidden" name="id" value={t.id} />
          <LoadingButton
            type="submit"
            loadingText="Đang xoá..."
            className="text-sm text-red-600"
          >
            Xoá
          </LoadingButton>
        </form>
      </li>
    );
  }

  return (
    <li className="grid gap-2 border p-2">
      <form action={save} className="flex flex-wrap gap-2">
        <input type="hidden" name="id" value={t.id} />
        <select name="type" defaultValue={t.type} aria-label="Loại">
          {Object.values(TransactionType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input name="amount" type="number" defaultValue={t.amount} aria-label="Số tiền" />
        <input name="description" defaultValue={t.description} aria-label="Mô tả" />
        <select name="category" defaultValue={t.category} aria-label="Danh mục">
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          defaultValue={t.date.toISOString().slice(0, 10)}
          aria-label="Ngày"
        />
        <LoadingButton type="submit" loadingText="Đang lưu..." className="text-sm">
          Lưu
        </LoadingButton>
        <button type="button" className="text-sm" onClick={() => setEditing(false)}>
          Huỷ
        </button>
      </form>
    </li>
  );
}
