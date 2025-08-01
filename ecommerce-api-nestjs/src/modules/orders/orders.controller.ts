import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersDto } from 'src/dtos/order.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { OrderResponseDto } from 'src/dtos/orderResponse.dto';
import { Order } from 'src/entities/order.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order (requires authentication)' })
  @ApiBody({ type: OrdersDto })
  @ApiResponse({ status: 200, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'One or more products were not found or do not have stock' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(200)
  @Post()
  async addOrder(@Body() ordersDto: OrdersDto): Promise<OrderResponseDto> {
    return await this.ordersService.addOrder(ordersDto);
  }

  @ApiOperation({ summary: 'Get an order by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Order ID', example: 'valid-uuid' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @HttpCode(200)
  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return await this.ordersService.getOrder(id);
  }
}
