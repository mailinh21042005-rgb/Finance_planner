"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requireUser } from "@/lib/dal";
import { profileNameSchema } from "@/lib/validation";

export async function updateProfileName(name: string) {
  await requireUser();

  const parsed = profileNameSchema.safeParse(name);
  if (!parsed.success) {
    return {
      ok: false as const,
      message: parsed.error.issues[0]?.message ?? "Tên hiển thị không hợp lệ.",
    };
  }

  await auth.api.updateUser({
    body: { name: parsed.data },
    headers: await headers(),
  });

  return { ok: true as const };
}
