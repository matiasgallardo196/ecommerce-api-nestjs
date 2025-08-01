import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El número de página debe ser un número válido.' })
  @Min(1, { message: 'La página mínima permitida es 1.' })
  @ApiPropertyOptional({
    description: 'Número de página (empezando desde 1)',
    example: 1,
    minimum: 1,
  })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El límite debe ser un número válido.' })
  @Min(1, { message: 'El límite mínimo permitido es 1.' })
  @ApiPropertyOptional({
    description: 'Cantidad máxima de elementos por página',
    example: 10,
    minimum: 1,
  })
  limit?: number;
}
