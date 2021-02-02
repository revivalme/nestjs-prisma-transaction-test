import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // create game item
  await prisma.gameItem.create({
    data: { id: 777, name: 'm4a1', price: 100, salePrice: 50 },
  });
  // create user and attach item
  await prisma.user.create({
    data: {
      inventory: {
        create: { itemId: 777, amount: 10 },
      },
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
