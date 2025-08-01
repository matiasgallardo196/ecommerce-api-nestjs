import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/Auth.module';
import { ProductsModule } from './modules/products/Products.module';
import { UsersModule } from './modules/users/Users.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';

import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
//import { OrderDetail } from './entities/orderDetail.entity'; ////////////////chequear esto si va

@Module({
  imports: [DatabaseModule, AuthModule, ProductsModule, UsersModule, CategoryModule, OrdersModule /*, OrderDetail*/, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
