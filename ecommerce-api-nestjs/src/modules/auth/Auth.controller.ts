import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthDto } from '../../dtos/auth.dto';
import { UserDto } from 'src/dtos/User.dto';
import { UsersService } from '../users/Users.service';
import { UserSignUpDto } from 'src/dtos/userSignUp.dto';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { User } from 'src/entities/users.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: UserSignUpDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente (sin mostrar isAdmin ni password)' })
  @ApiResponse({ status: 400, description: 'Contraseñas no coinciden o datos inválidos' })
  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() user: UserSignUpDto): Promise<Omit<User, 'isAdmin' | 'password'>> {
    if (user.password !== user.confirmPassword) throw new BadRequestException('Contraseñas diferentes ');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = user;
    const hashedPassword = await this.bcryptService.hash(rest.password);
    const userClean: UserDto = { ...rest, password: hashedPassword };
    return await this.usersService.postUsers(userClean);
  }

  @ApiOperation({ summary: 'Iniciar sesión y obtener token' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, se retorna access_token' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() authDto: AuthDto): Promise<{ access_token: string }> {
    const token = await this.authService.signIn(authDto);
    return { access_token: token };
  }
}
