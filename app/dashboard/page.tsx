import Link from "next/link";
import { formatVND } from "../../lib/finance";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";
import { SignOutButton } from "../transactions/sign-out-button";

// đọc CSDL mỗi lần có request, không đóng băng lúc build
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const user = await requireUser();
  const [thu, chi, theo] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'INCOME', userId: user.id },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'EXPENSE', userId: user.id },
    }),
    prisma.transaction.groupBy({
      by: ['category'],
      _sum: { amount: true },
      where: { type: 'EXPENSE', userId: user.id },
      orderBy: { _sum: { amount: 'desc' } },
    }),
  ]);
  const soDu =
    (thu._sum.amount ?? 0) - (chi._sum.amount ?? 0);
  return (
    <main className="p-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SignOutButton />
      </div>
      <p>Xin chào {user.name} ({user.email})</p>
      <nav className="flex gap-4 text-sm underline">
        <Link href="/transactions">Giao dịch</Link>
        <Link href="/wishlist">Wishlist</Link>
      </nav>
      <p>Tổng thu: {formatVND(thu._sum.amount ?? 0)}</p>
      <p>Tổng chi: {formatVND(chi._sum.amount ?? 0)}</p>
      <p className="font-bold">
        Số dư: {formatVND(soDu)}
      </p>
      <ul className="mt-4">
        {theo.map((d) => (
          <li key={d.category}>
            {d.category}: {formatVND(d._sum.amount ?? 0)}
          </li>
        ))}
      </ul>
    </main>
  );
}