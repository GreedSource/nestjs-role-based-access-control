import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '@dto/books/create-book.dto';
import { UpdateBookDto } from '@dto/books/update-book.dto';
import { Book } from '@entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const entity = await this.repository.create(createBookDto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<Book[]> {
    return await this.repository.find({
      loadEagerRelations: true,
    });
  }

  async findOne(id: string): Promise<Book> {
    return await this.repository.findOne({
      where: { id },
      loadEagerRelations: true,
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });
    return await this.repository.save(Object.assign(toUpdate, updateBookDto));
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
