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
  const values = readValues(formData);
  const parsed = transactionSchema.safeParse(values);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return { errors: flat.fieldErrors, values };
  }
  const demo = await prisma.user.findFirstOrThrow({
    where: { email: "demo@phy10615.vn" },
  });

  await prisma.transaction.create({
    data: {
      ...parsed.data,
      date: new Date(parsed.data.date), // chuỗi -> Date
      userId: demo.id,
    },
  });

  revalidatePath("/transactions");
  return { ok: true, message: "Đã thêm giao dịch" };
}

export async function deleteTransaction(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  const user = await requireUser();
  await prisma.transaction.deleteMany({
    where: { id, userId: user.id },
  });
  revalidatePath("/transactions");
}