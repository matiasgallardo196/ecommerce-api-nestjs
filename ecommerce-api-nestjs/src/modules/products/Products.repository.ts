import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsDto } from '../../dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { UpdateProductDto } from 'src/dtos/productUpdate.dto';

const archivo = [
  {
    name: 'Iphone 15',
    description: 'The best smartphone in the world',
    price: 199.99,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'The best smartphone in the world',
    price: 150.0,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Motorola Edge 40',
    description: 'The best smartphone in the world',
    price: 179.89,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Samsung Odyssey G9',
    description: 'The best monitor in the world',
    price: 299.99,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'LG UltraGear',
    description: 'The best monitor in the world',
    price: 199.99,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'Acer Predator',
    description: 'The best monitor in the world',
    price: 150.0,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'Razer BlackWidow V3',
    description: 'The best keyboard in the world',
    price: 99.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Corsair K70',
    description: 'The best keyboard in the world',
    price: 79.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Logitech G Pro',
    description: 'The best keyboard in the world',
    price: 59.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Razer Viper',
    description: 'The best mouse in the world',
    price: 49.99,
    stock: 12,
    category: 'mouse',
  },
  {
    name: 'Logitech G502 Pro',
    description: 'The best mouse in the world',
    price: 39.99,
    stock: 12,
    category: 'mouse',
  },
  {
    name: 'SteelSeries Rival 3',
    description: 'The best mouse in the world',
    price: 29.99,
    stock: 12,
    category: 'mouse',
  },
]; //archivo

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  //   {
  //     id: 1,
  //     name: 'Camiseta',
  //     description: 'Camiseta de algodón',
  //     price: 100,
  //     stock: true,
  //     imgUrl: 'http://img.com/camiseta.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Pantalón',
  //     description: 'Pantalón de jean clásico',
  //     price: 250,
  //     stock: true,
  //     imgUrl: 'http://img.com/pantalon.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Zapatillas',
  //     description: 'Zapatillas deportivas negras',
  //     price: 500,
  //     stock: true,
  //     imgUrl: 'http://img.com/zapatillas.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: 'Buzo',
  //     description: 'Buzo con capucha',
  //     price: 300,
  //     stock: false,
  //     imgUrl: 'http://img.com/buzo.jpg',
  //   },
  //   {
  //     id: 5,
  //     name: 'Gorra',
  //     description: 'Gorra ajustable estilo urbano',
  //     price: 80,
  //     stock: true,
  //     imgUrl: 'http://img.com/gorra.jpg',
  //   },
  //   {
  //     id: 6,
  //     name: 'Campera',
  //     description: 'Campera impermeable para lluvia',
  //     price: 600,
  //     stock: true,
  //     imgUrl: 'http://img.com/campera.jpg',
  //   },
  //   {
  //     id: 7,
  //     name: 'Remera sin mangas',
  //     description: 'Remera deportiva para verano',
  //     price: 90,
  //     stock: false,
  //     imgUrl: 'http://img.com/remera_sin_mangas.jpg',
  //   },
  //   {
  //     id: 8,
  //     name: 'Medias',
  //     description: 'Pack de 3 pares de medias',
  //     price: 50,
  //     stock: true,
  //     imgUrl: 'http://img.com/medias.jpg',
  //   },
  //   {
  //     id: 9,
  //     name: 'Camisa',
  //     description: 'Camisa de vestir blanca',
  //     price: 200,
  //     stock: true,
  //     imgUrl: 'http://img.com/camisa.jpg',
  //   },
  //   {
  //     id: 10,
  //     name: 'Cinturón',
  //     description: 'Cinturón de cuero sintético',
  //     price: 120,
  //     stock: true,
  //     imgUrl: 'http://img.com/cinturon.jpg',
  //   },
  //   {
  //     id: 11,
  //     name: 'Lentes de sol',
  //     description: 'Lentes con protección UV',
  //     price: 180,
  //     stock: false,
  //     imgUrl: 'http://img.com/lentes.jpg',
  //   },
  //   {
  //     id: 12,
  //     name: 'Chaleco',
  //     description: 'Chaleco de abrigo ligero',
  //     price: 270,
  //     stock: true,
  //     imgUrl: 'http://img.com/chaleco.jpg',
  //   },
  //   {
  //     id: 13,
  //     name: 'Pijama',
  //     description: 'Pijama de algodón cómodo',
  //     price: 150,
  //     stock: true,
  //     imgUrl: 'http://img.com/pijama.jpg',
  //   },
  //   {
  //     id: 14,
  //     name: 'Short',
  //     description: 'Short deportivo para hombre',
  //     price: 130,
  //     stock: true,
  //     imgUrl: 'http://img.com/short.jpg',
  //   },
  //   {
  //     id: 15,
  //     name: 'Bufanda',
  //     description: 'Bufanda tejida para invierno',
  //     price: 95,
  //     stock: true,
  //     imgUrl: 'http://img.com/bufanda.jpg',
  //   },
  // ];

  async findAllProducts(page: number, limit: number): Promise<Product[]> {
    const skip: number = (page - 1) * limit;

    return await this.productRepository.find({ skip, take: limit, order: { id: 'ASC' } });
  }

  async findProductsById(id: string): Promise<Product> {
    const productById: Product | null = await this.productRepository.findOneBy({ id });
    if (!productById) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    return productById;
  }

  async createNewProduct(product: ProductsDto): Promise<string> {
    const category = await this.categoryRepository.findOneBy({ name: product.categoryName });
    if (!category) throw new BadRequestException(`Categoría "${product.categoryName}" no encontrada.`);
    const { categoryName, ...productData } = product;

    const newProduct: Product = await this.productRepository.save(this.productRepository.create({ ...productData, category }));
    return newProduct.id;
  }

  async updateProduct(id: string, product: UpdateProductDto): Promise<string> {
    await this.productRepository.update(id, product);
    const updateProduct: Product | null = await this.productRepository.findOneBy({ id });
    if (!updateProduct) throw new NotFoundException(`No se pudo actualizar. Producto con ID ${id} no existe.`);

    return updateProduct.id;
  }

  async deleteProduct(id: string): Promise<string> {
    const product: Product | null = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`No se pudo eliminar. Producto con ID ${id} no encontrado.`);

    await this.productRepository.remove(product);
    return product.id;
  }

  async addProductSeed(): Promise<void> {
    const newProducts: Product[] = [];

    for (const prod of archivo) {
      const category = await this.productRepository.manager.getRepository(Category).findOneBy({ name: prod.category });

      if (!category) {
        console.log(` Categoría no encontrada: ${prod.category}`);
        throw new BadRequestException(`Categoría "${prod.category}" no encontrada.`);
      }
      const newProduct = this.productRepository.create({
        ...prod,
        category,
      });

      newProducts.push(newProduct);
    }
    await this.productRepository.save(newProducts);
    console.log(`Productos agregados: ${newProducts.length}`);
  }
}
