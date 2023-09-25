import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = await this.repository.create(createUserDto);
    return this.repository
      .save(entity)
      .then((result) => result)
      .catch((e) => {
        if (e.errno || e.sqlState === '23000') {
          throw new ConflictException('Email is already in use.');
        }
        throw new InternalServerErrorException();
      });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.repository.create(updateUserDto);
    return this.repository
      .update(id, entity)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((e) => {
        console.log(e);
        if (e.errno || e.sqlState === '23000') {
          throw new ConflictException('Email is already in use.');
        }
        throw new InternalServerErrorException();
      });
    return this.repository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.repository.softDelete({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email: email });
  }
}
