import { Injectable } from '@nestjs/common';
import { UsersRepository } from './Users.Repository';
import { UserDto } from '../../dtos/User.dto';

import { PaginationDto } from 'src/dtos/pagination.dto';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers({ page = 1, limit = 5 }: PaginationDto): Promise<User[]> {
    return this.usersRepository.findAllUsers(page, limit);
  }

  async getUsersById(id: string): Promise<User> {
    return await this.usersRepository.findUsersById(id);
  }

  async postUsers(user: UserDto): Promise<Omit<User, 'isAdmin' | 'password'>> {
    return await this.usersRepository.createNewUser(user);
  }

  async putUsers(id: string, user: UserDto): Promise<string> {
    return await this.usersRepository.updateUsers(id, user);
  }

  async deleteUsers(id: string): Promise<string> {
    return await this.usersRepository.deleteUsers(id);
  }
}
