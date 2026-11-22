import type { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getDateRange } from "../../../lib/finance";
import { transactionFilterSchema } from "../../../lib/validation";
import { getSession } from "../../../lib/dal";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: "Bạn cần đăng nhập để thực hiện hành động này!" },
      { status: 401 },
    );
  }

  const parsed = transactionFilterSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return Response.json(
      { error: "Tham số lọc không hợp lệ" },
      { status: 400 },
    );
  }
  const { range, ...rest } = parsed.data;
  const rows = await prisma.transaction.findMany({
    where: { 
      userId: session.user.id,
      date: getDateRange(range), 
      ...rest },
    orderBy: { date: "desc" },
  });
  return Response.json(rows);
}