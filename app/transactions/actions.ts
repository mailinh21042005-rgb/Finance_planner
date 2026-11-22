"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import * as z from "zod";
import {
  readValues, transactionSchema, type FormState,
} from "../../lib/validation";
import { requireUser } from "../../lib/dal";

export async function createTransaction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();
  const values = readValues(formData);
  const parsed = transactionSchema.safeParse(values);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return { errors: flat.fieldErrors, values };
  }

  await prisma.transaction.create({
    data: {
      ...parsed.data,
      date: new Date(parsed.data.date), // chuỗi -> Date
      userId: user.id,
    },
  });
  revalidatePath("/transactions");
  return { ok: true, message: "Đã thêm giao dịch" };
}

export async function deleteTransaction(formData: FormData) {
  const idSchema = z.object({
    id: z.string().trim().min(1),
  });
  const parsed = idSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) return;

  const user = await requireUser();
  await prisma.transaction.deleteMany({
    where: {
      id: parsed.data.id,
      userId: user.id,
    },
  });

  revalidatePath("/transactions");
}

export async function updateTransaction(formData: FormData) {
  const updateSchema = z.object({
    id: z.string().trim().min(1),
  }).extend(transactionSchema.shape);
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    ...readValues(formData),
  });
  if (!parsed.success) return;

  const user = await requireUser();
  await prisma.transaction.updateMany({
    where: {
      id: parsed.data.id,
      userId: user.id,
    },
    data: {
      type: parsed.data.type,
      amount: parsed.data.amount,
      description: parsed.data.description,
      category: parsed.data.category,
      date: new Date(parsed.data.date),
    },
  });

  revalidatePath("/transactions");
}