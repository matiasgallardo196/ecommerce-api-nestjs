import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './orderDetail.entity';
import { v4 as uuid } from 'uuid';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  @JoinColumn()
  orderDetail: OrderDetail;
}
