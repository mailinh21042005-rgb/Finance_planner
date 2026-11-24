import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";
import { calculateBalance } from "../../lib/finance";
import { SignOutButton } from "../transactions/sign-out-button";
import { WishlistClient, type WishlistItemDTO } from "./wishlist-client";

export const metadata = {
  title: "Wishlist",
};

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const user = await requireUser();

  const [transactions, items] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId: user.id },
      select: { type: true, amount: true },
    }),
    prisma.wishlistItem.findMany({
      where: { userId: user.id },
      orderBy: { cost: "asc" },
    }),
  ]);

  const balance = calculateBalance(transactions);
  const wishlistItems: WishlistItemDTO[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    cost: item.cost,
    priority: item.priority,
  }));

  return (
    <main className="grid max-w-2xl gap-6 p-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <SignOutButton />
      </div>

      <p>Xin chào {user.name} ({user.email})</p>

      <nav className="flex gap-4 text-sm underline">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/transactions">Giao dịch</Link>
        <Link href="/profile">Hồ sơ</Link>
      </nav>

      <WishlistClient
        userId={user.id}
        balance={balance}
        items={wishlistItems}
      />
    </main>
  );
}
