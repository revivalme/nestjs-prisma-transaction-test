import { Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventory() {
    // HARDCODE
    return this.inventoryService.getUserInventory(1);
  }

  @Post('sell1')
  sellItem1() {
    // HARDCODE
    return this.inventoryService.sellItem1(1, 777);
  }

  @Post('sell2')
  sellItem2() {
    // HARDCODE
    return this.inventoryService.sellItem2(1, 777);
  }
}
