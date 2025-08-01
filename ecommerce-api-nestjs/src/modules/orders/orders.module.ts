import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/products.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([User, Order, Product, OrderDetail]), CommonModule],
})
export class OrdersModule {}
