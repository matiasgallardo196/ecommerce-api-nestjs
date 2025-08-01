import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../../dtos/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAllUsers(page: number, limit: number): Promise<User[]> {
    const skip: number = (page - 1) * limit;

    return await this.userRepository.createQueryBuilder('user').select('user').addSelect('user.isAdmin').orderBy('user.id', 'ASC').skip(skip).take(limit).getMany();
  }

  async findUsersById(id: string): Promise<User> {
    const userById: User | null = await this.userRepository.findOne({ where: { id }, relations: { orders: true } });
    if (!userById) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    return userById;
  }

  async createNewUser(user: UserDto): Promise<Omit<User, 'isAdmin' | 'password'>> {
    if (await this.userRepository.findOneBy({ email: user.email })) throw new BadRequestException('Usuario ya registrado');
    const newUser: User = await this.userRepository.save(this.userRepository.create(user));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...returnUser } = newUser;
    return returnUser;
  }

  async updateUsers(id: string, user: UserDto): Promise<string> {
    await this.userRepository.update(id, user);
    const updateUser: User | null = await this.userRepository.findOneBy({ id });
    if (!updateUser) throw new NotFoundException(`No se pudo actualizar. Usuario con ID ${id} no existe.`);

    return updateUser.id;
  }

  async deleteUsers(id: string): Promise<string> {
    const user: User | null = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No se pudo eliminar. Usuario con ID ${id} no encontrado.`);

    await this.userRepository.remove(user);
    return user.id;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isAdmin'],
    });
  }
}
