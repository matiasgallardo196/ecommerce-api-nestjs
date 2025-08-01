import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryRepository } from './cloudinary.repository';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { ProductsModule } from '../products/Products.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [CloudinaryService, CloudinaryRepository, cloudinaryConfig],
  controllers: [CloudinaryController],
  imports: [TypeOrmModule.forFeature([Product]), ProductsModule, CommonModule],
})
export class CloudinaryModule {}
