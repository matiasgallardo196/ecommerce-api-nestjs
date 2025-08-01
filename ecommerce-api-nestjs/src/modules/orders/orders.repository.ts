import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDto } from 'src/dtos/order.dto';
import { OrderResponseDto } from 'src/dtos/orderResponse.dto';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
    private dataSource: DataSource,
  ) {}

  async addOrder(ordersDto: OrdersDto): Promise<OrderResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User | null = await queryRunner.manager.findOneBy(User, { id: ordersDto.userId });

      if (!user) throw new NotFoundException('User not found');

      const newProducts: (Product | null)[] = await Promise.all(ordersDto.products.map((prod) => queryRunner.manager.findOneBy(Product, { id: prod.id })));

      const productValid = newProducts.filter((prod): prod is Product => !!prod && prod.stock > 0);

      if (productValid.length !== ordersDto.products.length) throw new BadRequestException('One or more products were not found or do not have stock');

      const totalPrice = productValid.reduce((acu, prod) => acu + Number(prod.price), 0);

      for (const prod of productValid) {
        prod.stock--;
        await queryRunner.manager.save(Product, prod);
      }

      const newOrderDetail = await queryRunner.manager.save(
        queryRunner.manager.create(OrderDetail, {
          price: totalPrice,

          products: productValid,
        }),
      );
      const newOrder = await queryRunner.manager.save(queryRunner.manager.create(Order, { user, orderDetail: newOrderDetail }));

      await queryRunner.commitTransaction();

      return {
        order: newOrder,
        total: newOrderDetail.price,
        idDetail: newOrderDetail.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrder(id: string): Promise<Order> {
    const order: Order | null = await this.orderRepository.findOne({ where: { id }, relations: ['orderDetail', 'orderDetail.products'] });
    if (!order) throw new NotFoundException(`No order found with ID: ${id}`);
    return order;
  }
}
