"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";

const wishlistIdSchema = z.object({
  id: z.string().trim().min(1, { error: "ID không hợp lệ" }),
});

const createWishlistSchema = z.object({
  name: z.string().trim().min(1, { error: "Tên không được để trống" }).max(100, { error: "Tên không được quá 100 ký tự"   }),
  cost: z.coerce.number({ error: "Giá tiền phải là số" }).int({ error: "Giá tiền phải là số nguyên" }).positive({ error: "Giá tiền phải là số dương" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {error: "Mức độ ưu tiên không hợp lệ",}).default("MEDIUM"),
});

const updateWishlistSchema = createWishlistSchema.extend({
  id: z.string().trim().min(1, { error: "ID không hợp lệ" }),
});

export type WishlistField = "id" | "name" | "cost" | "priority";

export type WishlistFormState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<WishlistField, string[]>>;
};

export async function createWishlistItem(
  _prevState: WishlistFormState,
  formData: FormData,
): Promise<WishlistFormState> {
  const user = await requireUser();
  const parsed = createWishlistSchema.safeParse({
    name: formData.get("name"),
    cost: formData.get("cost"),
    priority: formData.get("priority") || "MEDIUM",
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: "Dữ liệu không hợp lệ",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.wishlistItem.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
  return { ok: true, message: "Đã thêm món đồ vào Wishlist" };
}

export async function updateWishlistItem(
  _prevState: WishlistFormState,
  formData: FormData,
): Promise<WishlistFormState> {
  const user = await requireUser();
  const parsed = updateWishlistSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    cost: formData.get("cost"),
    priority: formData.get("priority"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: "Dữ liệu không hợp lệ",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = parsed.data;
  const updated = await prisma.wishlistItem.updateMany({
    where: { id, userId: user.id },
    data,
  });

  if (updated.count === 0) {
    return { ok: false, message: "Không tìm thấy món đồ trong Wishlist" };
  }

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
  return { ok: true, message: "Đã cập nhật món đồ trong Wishlist" };
}

export async function deleteWishlistItem(id: string): Promise<WishlistFormState> {
  const user = await requireUser();
  const parsed = wishlistIdSchema.safeParse({
    id,
  });
  if (!parsed.success) {
    return { ok: false, message: "ID món đồ không hợp lệ" };
  }

  const deleted = await prisma.wishlistItem.deleteMany({
    where: { id: parsed.data.id, userId: user.id },
  });

  if (deleted.count === 0) {
    return { ok: false, message: "Không tìm thấy món đồ hoặc không có quyền xoá" };
  }

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
  return { ok: true, message: "Đã xóa món đồ khỏi Wishlist" };
}