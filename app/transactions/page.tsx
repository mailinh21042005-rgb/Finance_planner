import { prisma } from "../../lib/prisma";
import { formatVND, getDateRange } from "../../lib/finance";
import { TransactionForm } from "./transaction-form";
import { TransactionFilters } from "./transaction-filters";
import { transactionFilterSchema } from "../../lib/validation";
import { SignOutButton } from "./sign-out-button";

export default async function TransactionsPage({
  searchParams,
}: PageProps<"/transactions">) {
  const resolvedSearchParams = await searchParams;
  const filters = transactionFilterSchema.parse(resolvedSearchParams);
  const rows = await prisma.transaction.findMany({
    where: {
      date: getDateRange(filters.range),
      type: filters.type,
      category: filters.category,
    },
    orderBy: { date: "desc" },
  });
  return (
    <main className="grid max-w-md gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Giao dịch</h1>
        <SignOutButton />
      </div>
      <TransactionForm />
      <TransactionFilters {...filters} />
      <p>{rows.length} giao dịch</p>
      <ul>
        {rows.map((t) => (
          <li key={t.id}>
            {t.description}: {formatVND(t.amount)}
          </li>
        ))}
      </ul>
    </main>
  );
}