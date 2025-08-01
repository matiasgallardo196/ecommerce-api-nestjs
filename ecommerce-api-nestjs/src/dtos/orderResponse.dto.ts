import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/entities/order.entity';

export class OrderResponseDto {
  @ApiProperty({
    description: 'Orden creada con sus relaciones cargadas',
    type: () => Order,
  })
  order: Order;

  @ApiProperty({
    description: 'Precio total de la orden',
    example: 2599.99,
  })
  total: number;

  @ApiProperty({
    description: 'ID del detalle de la orden',
    example: 'ac12f6e2-8e90-4a1b-bf5c-237fd8f3a6a4',
  })
  idDetail: string;
}
