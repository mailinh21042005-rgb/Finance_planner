"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";

const wishlistSchema = z.object({
  name: z.string().trim().min(1, "Tên không được để trống"),
  cost: z.coerce.number().int().positive("Giá phải lớn hơn 0"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
});

export async function createWishlistItem(formData: FormData) {
  const user = await requireUser();
  const parsed = wishlistSchema.safeParse({
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
}

export async function updateWishlistItem(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const parsed = wishlistSchema.safeParse({
    name: formData.get("name"),
    cost: formData.get("cost"),
    priority: formData.get("priority"),
  });
  if (!id || !parsed.success) return;

  await prisma.wishlistItem.updateMany({
    where: { id, userId: user.id },
    data: parsed.data,
  });

  revalidatePath("/wishlist");
}

export async function deleteWishlistItem(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.wishlistItem.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/wishlist");
}