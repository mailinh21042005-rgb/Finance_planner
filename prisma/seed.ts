import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { ROWS, WISHLIST } from './seed-data';
const EMAIL = 'demo@phy10615.vn';
async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: EMAIL },
    update: {},
    create: { email: EMAIL, name: 'Sinh viên demo' },
  });
  const userId = demoUser.id;

  await prisma.transaction.deleteMany({ where: { userId } });
  await prisma.wishlistItem.deleteMany({ where: { userId } });

  await prisma.transaction.createMany({
    data: ROWS.map((r) => ({ ...r, userId })),
  });
  await prisma.wishlistItem.createMany({
    data: WISHLIST.map((w) => ({ ...w, userId })),
  });
}
main().finally(() => prisma.$disconnect());