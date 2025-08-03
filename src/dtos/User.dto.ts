import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'Email does not have a valid format.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @ApiProperty({ description: 'Email must have a valid format.', example: 'Example@example.com' })
  email: string;

  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @Length(3, 80, {
    message: 'Name must be between 3 and 80 characters.',
  })
  @ApiProperty({
    description: 'User full name.',
    example: 'John Doe',
    minLength: 3,
    maxLength: 80,
  })
  name: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password must be between 8 and 15 characters, including a lowercase letter, an uppercase letter, a number and a special character (!@#$%^&*).',
  })
  @ApiProperty({
    description: 'User password. Must contain between 8 and 15 characters, including uppercase, lowercase, numbers and special characters (!@#$%^&*).',
    example: 'Password123!',
    minLength: 8,
    maxLength: 15,
  })
  password: string;

  @IsString({ message: 'Address must be a string.' })
  @IsNotEmpty({ message: 'Address is required.' })
  @Length(3, 80, {
    message: 'Address must be between 3 and 80 characters.',
  })
  @ApiProperty({
    description: 'User physical address.',
    example: '123 Main St',
    minLength: 3,
    maxLength: 80,
  })
  address: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Phone must be a number.' })
  @IsNotEmpty({ message: 'Phone is required.' })
  @ApiProperty({
    description: 'User phone number. Must be numeric.',
    example: 1234567890,
    type: Number,
  })
  phone: number;

  @IsString({ message: 'Country must be a string.' })
  @IsNotEmpty({ message: 'Country is required.' })
  @Length(5, 20, {
    message: 'Country must be between 5 and 20 characters.',
  })
  @ApiProperty({
    description: 'User country of residence.',
    example: 'United States',
    minLength: 5,
    maxLength: 20,
  })
  country: string;

  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  @Length(5, 20, {
    message: 'City must be between 5 and 20 characters.',
  })
  @ApiProperty({
    description: 'User city of residence.',
    example: 'New York',
    minLength: 5,
    maxLength: 20,
  })
  city: string;
}
