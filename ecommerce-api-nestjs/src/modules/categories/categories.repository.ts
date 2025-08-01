import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

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
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getCategories() {
    return await this.categoryRepository.find({
      select: ['name'],
    });
  }

  async addCategories() {
    const categoriesDB: Category[] = await this.categoryRepository.find({
      select: ['name'],
    });
    const existingNames = categoriesDB.map((cat) => cat.name);

    const categoriesSeed = [...new Set(archivo.map((product) => product.category))];

    const missingCategories: string[] = categoriesSeed.filter((cat) => !existingNames.includes(cat));

    if (missingCategories.length === 0) {
      console.log('No hay nuevas categorías para agregar.');
      return;
    }

    const newCategories = missingCategories.map((name) => this.categoryRepository.create({ name }));

    await this.categoryRepository.save(newCategories);
    console.log(`Categorias Agregadas ${missingCategories.join(', ')} `);
  }
}
