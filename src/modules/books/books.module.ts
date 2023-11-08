import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from '@entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { BookRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UserModule, CloudinaryModule],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class BooksModule {}
