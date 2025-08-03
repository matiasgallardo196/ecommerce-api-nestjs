import { PartialType } from '@nestjs/swagger';
import { ProductsDto } from './product.dto';

export class UpdateProductDto extends PartialType(ProductsDto) {}
