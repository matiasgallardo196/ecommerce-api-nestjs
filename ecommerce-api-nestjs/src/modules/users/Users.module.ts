import { Module } from '@nestjs/common';
import { UsersService } from './Users.service';
import { UsersController } from './Users.controller';
import { UsersRepository } from './Users.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
})
export class UsersModule {}
