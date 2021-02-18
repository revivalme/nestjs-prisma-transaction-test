import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // create item
  await prisma.item.create({
    data: { id: 777, name: 'm4a1', price: 100, salePrice: 50 },
  });
  // create user and attach item to his inventory
  await prisma.user.create({
    data: {
      inventory: {
        create: { itemId: 777, amount: 100 },
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
