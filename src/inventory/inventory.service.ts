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

  async sellItem(userId: number, itemId: number) {
    // get user inventory item
    const inventoryItem = await this.prismaService.userItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      include: { item: true },
    });

    if (!inventoryItem) {
      throw new BadRequestException('No item in user inventory');
    }

    /**
     * Scroll to write2 :)
     * Just deciding what we gonna do base on amount, update or delete...
     */
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

    /**
     * Simulate error!
     * Use method from this service
     */
    const write2 = this.addMoney(
      userId + 13123123123,
      inventoryItem.item.salePrice,
    );

    console.log(typeof write2);
    console.log(write2);

    /**
     * TRANSACTION WORKS PERFECTLY!
     * write1 roll back as expected if write2 throws error
     */
    await this.prismaService.$transaction([write1, write2]);

    // /**
    //  * Simulate error!
    //  * Use method from user.service.ts
    //  */
    // const write2 = this.userService.addMoney(
    //   userId + 13123123123,
    //   inventoryItem.item.salePrice,
    // );

    // console.log(typeof write2);
    // console.log(write2);

    // /**
    //  * PROBLEM!
    //  * write1 doesn't roll back if write2 throws error
    //  */
    // await this.prismaService.$transaction([write1, write2]);
  }

  addMoney(userId: number, value: number) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        money: {
          increment: value,
        },
      },
    });
  }
}
