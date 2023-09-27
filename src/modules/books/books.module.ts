import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from '@entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { PublishersModule } from '@modules/publishers/publishers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    UserModule,
    forwardRef(() => PublishersModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
