import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido (versión 4).' })
  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  @ApiProperty({
    description: 'ID único del producto en formato UUID v4',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

export class OrdersDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido (versión 4).' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  @ApiProperty({
    description: 'ID del usuario que realiza la orden (UUID v4)',
    example: 'e32a3f3a-24e1-4a8b-9d8d-84b2b7cba1b5',
  })
  userId: string;

  @IsArray({ message: 'El campo "products" debe ser un arreglo.' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto en la orden.' })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({
    description: 'Lista de productos incluidos en la orden. Debe contener al menos uno.',
    type: [ProductDto],
    example: [{ id: 'd290f1ee-6c54-4b01-90e6-d701748f0851' }, { id: 'a6f5e3d2-4b2c-4a9f-bbe3-5349ff354c68' }],
  })
  products: ProductDto[];
}
