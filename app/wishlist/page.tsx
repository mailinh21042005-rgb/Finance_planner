import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";
import { calculateBalance } from "../../lib/finance";
import { WishlistClient, type WishlistItemDTO } from "./wishlist-client";
import { ScrollReveal } from "@/components/scroll-reveal";

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
    <main className="mx-auto grid w-full max-w-2xl gap-6 p-4 sm:p-8">
      <ScrollReveal>
        <h1 className="text-2xl font-bold">Wishlist</h1>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <WishlistClient
          userId={user.id}
          balance={balance}
          items={wishlistItems}
        />
      </ScrollReveal>
    </main>
  );
}
