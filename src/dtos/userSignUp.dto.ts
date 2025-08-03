import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { UserDto } from './User.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDto extends UserDto {
  @IsString({ message: 'Password confirmation must be a string.' })
  @IsNotEmpty({ message: 'Password confirmation is required.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password confirmation must be between 8 and 15 characters, including a lowercase letter, an uppercase letter, a number and a special character (!@#$%^&*).',
  })
  @ApiProperty({
    description: 'Password confirmation. Must match the "password" field.',
    example: 'Password123!',
    minLength: 8,
    maxLength: 15,
  })
  confirmPassword: string;
}
