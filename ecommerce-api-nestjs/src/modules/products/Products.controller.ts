import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { ProductsDto } from '../../dtos/product.dto';

import { PaginationDto } from 'src/dtos/pagination.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Product } from 'src/entities/products.entity';
import { UpdateProductDto } from 'src/dtos/productUpdate.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/decorators/role.enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Product list retrieved successfully' })
  @HttpCode(200)
  @Get()
  async getProducts(@Query() paginationDto: PaginationDto): Promise<Product[]> {
    return await this.productsService.getAllProducts(paginationDto);
  }

  @ApiOperation({ summary: 'Get a product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 'valid-uuid' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @HttpCode(200)
  @Get(':id')
  async getProductsById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return await this.productsService.getProductsById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (requires authentication)' })
  @ApiBody({ type: ProductsDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  async postProducts(@Body() product: ProductsDto): Promise<string> {
    return await this.productsService.postProducts(product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product (Admin only)(requires authentication)' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 'valid-uuid' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @HttpCode(200)
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProductsById(@Param('id', ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {
    return await this.productsService.putProducts(id, product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 'valid-uuid' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProductsById(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Load test products (requires authentication)' })
  @ApiResponse({ status: 201, description: 'Products loaded successfully' })
  @ApiResponse({ status: 400, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(201)
  @Post('seed')
  @UseGuards(AuthGuard)
  async addProductSeed(): Promise<void> {
    return await this.productsService.addProductSeed();
  }
}
