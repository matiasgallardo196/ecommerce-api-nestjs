import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './Products.repository';
import { ProductsDto } from '../../dtos/product.dto';

import { PaginationDto } from 'src/dtos/pagination.dto';
import { Product } from 'src/entities/products.entity';
import { UpdateProductDto } from 'src/dtos/productUpdate.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getAllProducts({ page = 1, limit = 5 }: PaginationDto): Promise<Product[]> {
    return await this.productsRepository.findAllProducts(page, limit);
  }

  async getProductsById(id: string): Promise<Product> {
    return await this.productsRepository.findProductsById(id);
  }

  async postProducts(product: ProductsDto): Promise<string> {
    return await this.productsRepository.createNewProduct(product);
  }

  async putProducts(id: string, product: UpdateProductDto): Promise<string> {
    return await this.productsRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<string> {
    return await this.productsRepository.deleteProduct(id);
  }
  async addProductSeed(): Promise<void> {
    return await this.productsRepository.addProductSeed();
  }
}
