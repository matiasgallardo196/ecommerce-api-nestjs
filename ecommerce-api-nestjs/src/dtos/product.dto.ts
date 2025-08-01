import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class ProductsDto {
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name is required.' })
  @ApiProperty({
    description: 'Product name',
    example: 'Premium Coffee 500g',
  })
  name: string;

  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  @ApiProperty({
    description: 'Detailed product description',
    example: 'Colombian origin coffee with intense aroma and balanced flavor.',
  })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price cannot be negative.' })
  @IsNotEmpty({ message: 'Price is required.' })
  @ApiProperty({
    description: 'Product price in local currency',
    example: 1999.99,
    minimum: 0,
  })
  price: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Stock must be a number.' })
  @Min(0, { message: 'Stock cannot be negative.' })
  @IsNotEmpty({ message: 'Stock is required.' })
  @ApiProperty({
    description: 'Available units quantity',
    example: 100,
    minimum: 0,
  })
  stock: number;

  @IsString({ message: 'Image must be a string.' })
  @IsNotEmpty({ message: 'Image URL is required.' })
  @IsUrl({}, { message: 'Image URL is not valid.' })
  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/products/premium-coffee.jpg',
  })
  imgUrl: string;

  @IsString({ message: 'Category name must be a string.' })
  @IsNotEmpty({ message: 'Category name is required.' })
  @ApiProperty({
    description: 'Category name associated with the product',
    example: 'Premium Coffees',
  })
  categoryName: string;
}
