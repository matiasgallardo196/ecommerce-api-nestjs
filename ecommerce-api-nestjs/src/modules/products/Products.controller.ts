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

  @ApiOperation({ summary: 'Obtener todos los productos ' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida con éxito' })
  @HttpCode(200)
  @Get()
  async getProducts(@Query() paginationDto: PaginationDto): Promise<Product[]> {
    return await this.productsService.getAllProducts(paginationDto);
  }

  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 'uuid-válido' })
  @ApiResponse({ status: 200, description: 'Producto obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @HttpCode(200)
  @Get(':id')
  async getProductsById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return await this.productsService.getProductsById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo producto (requiere autenticación)' })
  @ApiBody({ type: ProductsDto })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  async postProducts(@Body() product: ProductsDto): Promise<string> {
    return await this.productsService.postProducts(product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un producto (solo Admin)(requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 'uuid-válido' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @HttpCode(200)
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProductsById(@Param('id', ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {
    return await this.productsService.putProducts(id, product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto (requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 'uuid-válido' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProductsById(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cargar productos de prueba (requiere autenticación)' })
  @ApiResponse({ status: 201, description: 'Productos cargados correctamente' })
  @ApiResponse({ status: 400, description: 'Categoria no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @HttpCode(201)
  @Post('seed')
  @UseGuards(AuthGuard)
  async addProductSeed(): Promise<void> {
    return await this.productsService.addProductSeed();
  }
}
