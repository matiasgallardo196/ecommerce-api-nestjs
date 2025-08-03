import { PickType } from '@nestjs/swagger';
import { UserDto } from './User.dto';

export class AuthDto extends PickType(UserDto, ['email', 'password']) {}
