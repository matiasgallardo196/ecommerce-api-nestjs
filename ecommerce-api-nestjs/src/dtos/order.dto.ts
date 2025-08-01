import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsUUID('4', { message: 'Product ID must be a valid UUID (version 4).' })
  @IsNotEmpty({ message: 'Product ID is required.' })
  @ApiProperty({
    description: 'Unique product ID in UUID v4 format',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

export class OrdersDto {
  @IsUUID('4', { message: 'User ID must be a valid UUID (version 4).' })
  @IsNotEmpty({ message: 'User ID is required.' })
  @ApiProperty({
    description: 'ID of the user making the order (UUID v4)',
    example: 'e32a3f3a-24e1-4a8b-9d8d-84b2b7cba1b5',
  })
  userId: string;

  @IsArray({ message: 'The "products" field must be an array.' })
  @ArrayMinSize(1, { message: 'There must be at least one product in the order.' })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({
    description: 'List of products included in the order. Must contain at least one.',
    type: [ProductDto],
    example: [{ id: 'd290f1ee-6c54-4b01-90e6-d701748f0851' }, { id: 'a6f5e3d2-4b2c-4a9f-bbe3-5349ff354c68' }],
  })
  products: ProductDto[];
}
