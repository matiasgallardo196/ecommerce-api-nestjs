import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { UserDto } from './User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDto extends UserDto {
  @IsString({ message: 'La confirmación de la contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La confirmación de la contraseña es obligatoria.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'La confirmación de la contraseña debe tener entre 8 y 15 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  @ApiProperty({
    description: 'Confirmación de la contraseña. Debe coincidir con el campo "password".',
    example: 'Password123!',
    minLength: 8,
    maxLength: 15,
  })
  confirmPassword: string;
}
