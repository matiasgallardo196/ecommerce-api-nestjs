import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/entities/order.entity';

export class OrderResponseDto {
  @ApiProperty({
    description: 'Created order with its loaded relationships',
    type: () => Order,
  })
  order: Order;

  @ApiProperty({
    description: 'Total price of the order',
    example: 2599.99,
  })
  total: number;

  @ApiProperty({
    description: 'Order detail ID',
    example: 'ac12f6e2-8e90-4a1b-bf5c-237fd8f3a6a4',
  })
  idDetail: string;
}
