import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class ProductsDto {
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio.' })
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Café Premium 500g',
  })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Café de origen colombiano con aroma intenso y sabor balanceado.',
  })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @Min(0, { message: 'El precio no puede ser negativo.' })
  @IsNotEmpty({ message: 'El precio es obligatorio.' })
  @ApiProperty({
    description: 'Precio del producto en moneda local',
    example: 1999.99,
    minimum: 0,
  })
  price: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  @IsNotEmpty({ message: 'El stock es obligatorio.' })
  @ApiProperty({
    description: 'Cantidad de unidades disponibles',
    example: 100,
    minimum: 0,
  })
  stock: number;

  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
  @IsUrl({}, { message: 'La URL de la imagen no es válida.' })
  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://ejemplo.com/productos/cafe-premium.jpg',
  })
  imgUrl: string;

  @IsString({ message: 'El nombre de la categoría debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @ApiProperty({
    description: 'Nombre de la categoría asociada al producto',
    example: 'Cafés Premium',
  })
  categoryName: string;
}
