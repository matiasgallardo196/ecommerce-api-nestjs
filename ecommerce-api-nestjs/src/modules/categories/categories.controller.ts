import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Obtener todas las categorías ' })
  @ApiResponse({ status: 200, description: 'Lista de categorías devuelta correctamente' })
  @HttpCode(200)
  @Get('all')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cargar categorías predeterminadas (requiere autenticación)' })
  @ApiResponse({ status: 201, description: 'Categorías cargadas correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @HttpCode(201)
  @Post('seeder')
  @UseGuards(AuthGuard)
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
