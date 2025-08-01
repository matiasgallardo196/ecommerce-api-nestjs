import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @ApiProperty({ description: 'El correo electrónico debe tener un formato válido.', example: 'Example@example.com' })
  email: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(3, 80, {
    message: 'El nombre debe tener entre 3 y 80 caracteres.',
  })
  @ApiProperty({
    description: 'Nombre completo del usuario.',
    example: 'Juan Pérez',
    minLength: 3,
    maxLength: 80,
  })
  name: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  @ApiProperty({
    description: 'Contraseña del usuario. Debe contener entre 8 y 15 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (!@#$%^&*).',
    example: 'Password123!',
    minLength: 8,
    maxLength: 15,
  })
  password: string;

  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  @ApiProperty({
    description: 'Dirección física del usuario.',
    example: 'Av. Siempre Viva 742',
    minLength: 3,
    maxLength: 80,
  })
  address: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'El teléfono debe ser un número.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @ApiProperty({
    description: 'Número de teléfono del usuario. Debe ser numérico.',
    example: 3811234567,
    type: Number,
  })
  phone: number;

  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @Length(5, 20, {
    message: 'El país debe tener entre 5 y 20 caracteres.',
  })
  @ApiProperty({
    description: 'País de residencia del usuario.',
    example: 'Argentina',
    minLength: 5,
    maxLength: 20,
  })
  country: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres.',
  })
  @ApiProperty({
    description: 'Ciudad de residencia del usuario.',
    example: 'Buenos Aires',
    minLength: 5,
    maxLength: 20,
  })
  city: string;
}
