import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.repository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.repository.find({
      relations: ['publisher', 'keywords'],
    });
  }

  async findOne(id: string): Promise<Book> {
    return this.repository.findOne({
      where: { id },
      relations: ['publisher', 'keywords'],
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });
    return this.repository.save(Object.assign(toUpdate, updateBookDto));
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
