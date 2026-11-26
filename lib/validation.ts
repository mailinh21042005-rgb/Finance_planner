import * as z from "zod";
import {
  Category, Priority, TransactionType,
} from "../generated/prisma/enums";

export const transactionSchema = z.object({
  type: z.enum(TransactionType,
    { error: "Chọn loại giao dịch" }),
  amount: z.coerce
    .number({ error: "Số tiền không hợp lệ"})
    .int({ error: "Phải là số nguyên" })
    .positive({ error: "Phải lớn hơn 0" }),
  description: z.string().trim()
    .min(1, { error: "Nhập mô tả" })
    .max(120, { error: "Tối đa 120 ký tự" }),
  category: z.enum(Category,
    { error: "Chọn danh mục" }),
  date: z.iso.date({ error: "Ngày không hợp lệ" })
    .refine((val) => {
      const today = new Date().toLocaleDateString("en-CA");
      return val <= today;
    }, { message: "Ngày không được ở tương lai" }),
});

export const wishlistSchema = z.object({
  name: z.string().trim()
    .min(1, { error: "Nhập tên món đồ: " })
    .max(120, { error: "Tối đa 120 ký tự" }),
  cost: z.coerce
    .number({ error: "Số tiền không hợp lệ"})
    .int({ error: "Giá phải là số nguyên VND" })
    .positive({ error: "Giá phải lớn hơn 0" }),
  priority: z.enum(Priority, { error: "Chọn mức ưu tiên" }).default(Priority.MEDIUM),
});

export const profileNameSchema = z.string()
  .trim()
  .min(1, { error: "Tên hiển thị không được để trống" })
  .max(120, { error: "Tên hiển thị tối đa 120 ký tự" });

type Field = keyof z.infer<typeof transactionSchema>;
type Values = Partial<Record<Field, string>>;

// Kết quả action trả về cho form sau mỗi lần gửi
export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<Field, string[]>>;
  values?: Values;
};

// FormData → object chuỗi (để trả lại form khi lỗi)
export function readValues(data: FormData): Values {
  const fields = Object.keys(transactionSchema.shape);
  return Object.fromEntries(
    fields.map((f) => [f, String(data.get(f) ?? "")]),
  );
}

// Bộ lọc đọc từ URL: /transactions?range=…&type=…
export const RANGES =
  ["this-month", "last-month", "all"] as const;

export const transactionFilterSchema = z.object({
  range: z.enum(RANGES).default("this-month"),
  type: z.enum(TransactionType).optional(),
  category: z.enum(Category).optional(),
});

export type Filters =
  z.infer<typeof transactionFilterSchema>;