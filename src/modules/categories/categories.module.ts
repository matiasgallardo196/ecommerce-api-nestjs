import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category]), CommonModule],
})
export class CategoryModule {}
