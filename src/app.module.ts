import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { PublishersModule } from './publishers/publishers.module';
import { Publisher } from './publishers/entities/publisher.entity';
import { KeywordsModule } from './keywords/keywords.module';
import { Keyword } from './keywords/entities/keyword.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Book, Publisher, Keyword],
      synchronize: true,
      // logging: true,
    }),
    UserModule,
    AuthModule,
    BooksModule,
    PublishersModule,
    KeywordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
