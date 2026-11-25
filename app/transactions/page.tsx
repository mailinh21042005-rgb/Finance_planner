import { prisma } from "../../lib/prisma";
import { getDateRange } from "../../lib/finance";
import { TransactionForm } from "./transaction-form";
import { TransactionFilters } from "./transaction-filters";
import { transactionFilterSchema } from "../../lib/validation";
import { requireUser } from "../../lib/dal";
import { TransactionRow } from "./transaction-row";

export const metadata = {
  title: "Giao dịch",
};

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
    <main className="mx-auto grid w-full max-w-2xl gap-4 p-4 sm:p-8">
      <h1 className="text-2xl font-bold">Giao dịch</h1>
      <TransactionForm />
      <TransactionFilters {...filters} />
      <p className="text-sm font-medium">{rows.length} giao dịch</p>
      <ul className="space-y-3">
        {rows.map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </ul>
    </main>
  );
}