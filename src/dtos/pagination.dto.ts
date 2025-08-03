import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page number must be a valid number.' })
  @Min(1, { message: 'Minimum page allowed is 1.' })
  @ApiPropertyOptional({
    description: 'Page number (starting from 1)',
    example: 1,
    minimum: 1,
  })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a valid number.' })
  @Min(1, { message: 'Minimum limit allowed is 1.' })
  @ApiPropertyOptional({
    description: 'Maximum number of elements per page',
    example: 10,
    minimum: 1,
  })
  limit?: number;
}
