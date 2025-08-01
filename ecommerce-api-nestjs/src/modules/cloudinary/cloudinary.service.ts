import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductsRepository } from '../products/Products.repository';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async updateImg(id: string, file: Express.Multer.File): Promise<string> {
    //find product first
    const imgUrl: string = await this.cloudinaryRepository.updateImg(file);

    return await this.productRepository.updateProduct(id, { imgUrl });
  }
}
