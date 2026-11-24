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
    <main className="grid max-w-md gap-4 p-8">
      <h1 className="text-2xl font-bold">Giao dịch</h1>
      <p>Xin chào {user.name} ({user.email})</p>
      <TransactionForm />
      <TransactionFilters {...filters} />
      <p>{rows.length} giao dịch</p>
      <ul>
        {rows.map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </ul>
    </main>
  );
}