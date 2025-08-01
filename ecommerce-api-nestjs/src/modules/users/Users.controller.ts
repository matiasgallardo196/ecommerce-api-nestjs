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
  @ApiOperation({ summary: 'Get all users (Admin only)(requires authentication)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'User list returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return await this.usersService.getAllUsers(paginationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by their ID (same user only)(requires authentication)' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'valid-uuid' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUsersById(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<User> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('You do not have permission to view this user');
    const user: User = await this.usersService.getUsersById(id);
    return user;
  }

  // @HttpCode(201)
  // /*@Post()*/
  // async postUsers(@Body() user: UserDto): Promise<Omit<User, 'password'>> {
  //   return await this.usersService.postUsers(user);
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing user by ID(same user only)(requires authentication)' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'valid-uuid' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUsersById(@Param('id', ParseUUIDPipe) id: string, @Body() user: UserDto, @Req() req: Request): Promise<string> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('You do not have permission to modify this user');
    return await this.usersService.putUsers(id, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by ID(same user only)(requires authentication)' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'valid-uuid' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUsersById(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<string> {
    const userFromToken = req['user'];
    if (userFromToken.id !== id && !(userFromToken.roles[0] === Role.Admin)) throw new UnauthorizedException('You do not have permission to delete this user');
    return await this.usersService.deleteUsers(id);
  }
}
