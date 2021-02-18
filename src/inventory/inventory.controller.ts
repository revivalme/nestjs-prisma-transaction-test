import { Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('sell')
  sellItem1() {
    // HARDCODE
    return this.inventoryService.sellItem(1, 777);
  }
}
