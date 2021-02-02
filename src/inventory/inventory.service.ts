import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getUserInventory(userId: number) {
    return this.prismaService.userItem.findMany({
      where: { userId },
      include: {
        item: true,
      },
    });
  }

  // TRANSACTION DOESN"T WORK
  async sellItem1(userId: number, itemId: number) {
    // get user inventory
    const userInventory = await this.getUserInventory(userId);
    // check is itemId relate to user inventory
    const inventoryItem = userInventory.find(
      (inventoryElement) => inventoryElement.item.id === itemId,
    );

    if (!inventoryItem) {
      throw new BadRequestException('No item in user inventory');
    }

    let write1;
    if (inventoryItem.amount > 1) {
      write1 = this.prismaService.userItem.update({
        where: { userId_itemId: { userId, itemId } },
        data: {
          amount: {
            decrement: 1,
          },
        },
      });
    } else {
      write1 = this.prismaService.userItem.delete({
        where: { userId_itemId: { userId, itemId } },
      });
    }

    // ERROR
    const write2 = this.userService.addMoney(
      userId + 13123123123,
      inventoryItem.item.salePrice,
    );

    await this.prismaService.$transaction([write1, write2]);

    // only for test
    return this.userService.getUsers();
  }

  // TRANSACTION WORKS PERFECTLY
  async sellItem2(userId: number, itemId: number) {
    // get user inventory
    const userInventory = await this.getUserInventory(userId);
    // check is itemId relate to user inventory
    const inventoryItem = userInventory.find(
      (inventoryElement) => inventoryElement.item.id === itemId,
    );

    if (!inventoryItem) {
      throw new BadRequestException('No item in user inventory');
    }

    let write1;
    if (inventoryItem.amount > 1) {
      write1 = this.prismaService.userItem.update({
        where: { userId_itemId: { userId, itemId } },
        data: {
          amount: {
            decrement: 1,
          },
        },
      });
    } else {
      write1 = this.prismaService.userItem.delete({
        where: { userId_itemId: { userId, itemId } },
      });
    }

    // ERROR
    const write2 = this.prismaService.user.update({
      where: { id: userId + 13123123123 },
      data: {
        money: {
          increment: inventoryItem.item.salePrice,
        },
      },
    });

    await this.prismaService.$transaction([write1, write2]);

    // only for test
    return this.userService.getUsers();
  }
}
