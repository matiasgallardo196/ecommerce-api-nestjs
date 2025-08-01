import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/Users.Repository';
import { AuthDto } from '../../dtos/auth.dto';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { JwtService } from 'src/common/services/jwt.service';
import { Role } from 'src/decorators/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: AuthDto): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user || !(await this.bcryptService.compare(password, user.password))) throw new UnauthorizedException('Email o password incorrectos');

    const userPayload = {
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    return this.jwtService.generateToken(userPayload);
  }
}
