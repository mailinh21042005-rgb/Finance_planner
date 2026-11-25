"use client";
import { useActionState } from "react";
import { Category } from "../../generated/prisma/enums";
import { LoadingButton } from "../../components/loading-button";
import { createTransaction } from "./actions";

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:min-h-9 md:text-sm";

export function TransactionForm() {
  const [state, formAction, pending] =
    useActionState(createTransaction, {});
  const { values: v = {}, errors: err = {} } = state;
  return (
    <form action={formAction} className="grid gap-2.5">
      <select
        name="type"
        aria-label="Loại"
        defaultValue={v.type ?? "EXPENSE"}
        className={fieldClass}
      >
        <option value="EXPENSE">Chi</option>
        <option value="INCOME">Thu</option>
      </select>
      <input
        name="amount"
        inputMode="numeric"
        placeholder="Số tiền (VND)"
        defaultValue={v.amount}
        className={fieldClass}
      />
      <Err msg={err.amount} />
      <input
        name="description"
        placeholder="Mô tả"
        defaultValue={v.description}
        className={fieldClass}
      />
      <Err msg={err.description} />
      <select
        name="category"
        aria-label="Danh mục"
        defaultValue={v.category ?? "FOOD"}
        className={fieldClass}
      >
        {Object.values(Category).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        aria-label="Ngày"
        defaultValue={v.date}
        className={fieldClass}
      />
      <Err msg={err.date} />
      <LoadingButton
        type="submit"
        loading={pending}
        loadingText="Đang thêm..."
        className="w-full sm:w-auto"
      >
        Thêm
      </LoadingButton>
      {state.ok && <output>{state.message}</output>}
    </form>
  );
}
const Err = ({ msg }: { msg?: string[] }) => msg &&
  <p role="alert" className="text-red-600">{msg[0]}</p>;