import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersDto } from 'src/dtos/order.dto';
import { OrderResponseDto } from 'src/dtos/orderResponse.dto';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(ordersDto: OrdersDto): Promise<OrderResponseDto> {
    return await this.ordersRepository.addOrder(ordersDto);
  }

  async getOrder(id: string): Promise<Order> {
    return await this.ordersRepository.getOrder(id);
  }
}
