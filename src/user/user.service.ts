import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getUsers() {
    return this.prismaService.user.findMany({
      include: {
        inventory: {
          include: {
            item: true,
          },
        },
      },
    });
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
