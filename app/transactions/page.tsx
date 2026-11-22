import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { formatVND, getDateRange } from "../../lib/finance";
import { TransactionForm } from "./transaction-form";
import { TransactionFilters } from "./transaction-filters";
import { deleteTransaction } from "./actions";
import { transactionFilterSchema } from "../../lib/validation";
import { SignOutButton } from "./sign-out-button";
import { requireUser } from "../../lib/dal";
import { deleteTransaction } from "./actions";

export default async function TransactionsPage({
  searchParams,
}: PageProps<"/transactions">) {
  const user = await requireUser();
  const resolvedSearchParams = await searchParams;
  const filters = transactionFilterSchema.catch({ range: "this-month" }).parse(resolvedSearchParams);
  const rows = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      date: getDateRange(filters.range),
      type: filters.type,
      category: filters.category,
    },
    orderBy: { date: "desc" },
  });
  return (
    <main className="grid max-w-md gap-4 p-8">
      <div className="flex items-center justify-between gap-2">
        <p>Xin chào {user.name} ({user.email})</p>
        <SignOutButton />
      </div>
      <p>Xin chào {user.name} ({user.email})</p>
      <nav className="flex gap-4 text-sm underline">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/wishlist">Wishlist</Link>
      </nav>
      <TransactionForm />
      <TransactionFilters {...filters} />
      <p>{rows.length} giao dịch</p>
      <ul>
        {rows.map((t) => (
          <li key={t.id} className="flex gap-2">
            {t.description}: {formatVND(t.amount)}
            <form action={deleteTransaction} className="inline">
              <input type="hidden" name="id" value={t.id} />
              <button type="submit" className="text-sm text-red-600">
                Xoá
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}