import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './Users.service';
import { UserDto } from '../../dtos/User.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { User } from 'src/entities/users.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/decorators/role.enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo Admin)(requiere autenticación)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return await this.usersService.getAllUsers(paginationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por su ID (solo el mismo usuario)(requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 'uuid-válido' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUsersById(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<User> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('No tienes permiso para ver este usuario');
    const user: User = await this.usersService.getUsersById(id);
    return user;
  }

  // @HttpCode(201)
  // /*@Post()*/
  // async postUsers(@Body() user: UserDto): Promise<Omit<User, 'password'>> {
  //   return await this.usersService.postUsers(user);
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un usuario existente por ID(solo el mismo usuario)(requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 'uuid-válido' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUsersById(@Param('id', ParseUUIDPipe) id: string, @Body() user: UserDto, @Req() req: Request): Promise<string> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('No tienes permiso para modificar este usuario');
    return await this.usersService.putUsers(id, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario por ID(solo el mismo usuario)(requiere autenticación)' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 'uuid-válido' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUsersById(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<string> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('No tienes permiso para eliminar este usuario');
    return await this.usersService.deleteUsers(id);
  }
}
