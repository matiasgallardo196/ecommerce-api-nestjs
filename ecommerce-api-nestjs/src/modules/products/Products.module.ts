import { Module } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { ProductsController } from './Products.controller';
import { ProductsRepository } from './Products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { CommonModule } from 'src/common/common.module';
import { Category } from 'src/entities/category.entity';

@Module({
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, Category]), CommonModule],
  exports: [ProductsRepository],
})
export class ProductsModule {}
