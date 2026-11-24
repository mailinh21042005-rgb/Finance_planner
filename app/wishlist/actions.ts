"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";

const wishlistIdSchema = z.object({
  id: z.string().trim().min(1, { error: "ID không hợp lệ" }),
});

const createWishlistSchema = z.object({
  name: z.string().trim().min(1, { error: "Tên không được để trống" }).max(100),
  cost: z.coerce.number().int().positive({ error: "Giá phải lớn hơn 0" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
});

const updateWishlistSchema = createWishlistSchema.extend({
  id: z.string().trim().min(1, { error: "ID không hợp lệ" }),
});

export async function createWishlistItem(formData: FormData) {
  const user = await requireUser();
  const parsed = createWishlistSchema.safeParse({
    name: formData.get("name"),
    cost: formData.get("cost"),
    priority: formData.get("priority"),
  });
  if (!parsed.success) return;

  await prisma.wishlistItem.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
}

export async function updateWishlistItem(formData: FormData) {
  const user = await requireUser();
  const parsed = updateWishlistSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    cost: formData.get("cost"),
    priority: formData.get("priority"),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  await prisma.wishlistItem.updateMany({
    where: { id, userId: user.id },
    data,
  });

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
}

export async function deleteWishlistItem(formData: FormData) {
  const user = await requireUser();
  const parsed = wishlistIdSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) return;

  await prisma.wishlistItem.deleteMany({
    where: { id: parsed.data.id, userId: user.id },
  });

  revalidatePath("/wishlist");
  revalidatePath("/dashboard");
}