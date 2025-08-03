import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Category list returned successfully' })
  @HttpCode(200)
  @Get('all')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Load default categories (requires authentication)' })
  @ApiResponse({ status: 201, description: 'Categories loaded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(201)
  @Post('seeder')
  @UseGuards(AuthGuard)
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
