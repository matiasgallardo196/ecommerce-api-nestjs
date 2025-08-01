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

  @ApiOperation({ summary: 'Crear una nueva orden (requiere autenticación)' })
  @ApiBody({ type: OrdersDto })
  @ApiResponse({ status: 200, description: 'Orden creada correctamente' })
  @ApiResponse({ status: 400, description: 'Uno o más productos no fueron encontrados o no tienen stock' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @HttpCode(200)
  @Post()
  async addOrder(@Body() ordersDto: OrdersDto): Promise<OrderResponseDto> {
    return await this.ordersService.addOrder(ordersDto);
  }

  @ApiOperation({ summary: 'Obtener una orden por ID (requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID de la orden', example: 'uuid-válido' })
  @ApiResponse({ status: 200, description: 'Orden obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @HttpCode(200)
  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return await this.ordersService.getOrder(id);
  }
}
