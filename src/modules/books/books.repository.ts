import { Book } from '@entities/book.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
