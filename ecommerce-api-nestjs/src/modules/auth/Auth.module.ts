import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { UsersRepository } from '../users/Users.Repository';
import { AuthGuard } from './guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { UsersService } from '../users/Users.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [AuthService, AuthGuard, UsersRepository, UsersService],
  controllers: [AuthController],
  exports: [AuthGuard],
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
})
export class AuthModule {}
