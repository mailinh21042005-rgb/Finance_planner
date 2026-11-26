import { prisma } from "@/lib/prisma";
import { requireUser } from "../../lib/dal";
import { ProfileViewClient } from "./profile-view";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Hồ sơ",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const [transactionCount, wishlistCount] = await Promise.all([
    prisma.transaction.count({ where: { userId: user.id } }),
    prisma.wishlistItem.count({ where: { userId: user.id } }),
  ]);

  return (
    <ScrollReveal>
      <ProfileViewClient
        user={{ name: user.name ?? "", email: user.email }}
        stats={{ transactionCount, wishlistCount }}
      />
    </ScrollReveal>
  );
}
