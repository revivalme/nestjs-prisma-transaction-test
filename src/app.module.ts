import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, InventoryModule],
  providers: [PrismaService],
})
export class AppModule {}
