import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { BooksModule } from '@modules/books/books.module';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { KeywordsModule } from '@modules/keywords/keywords.module';
import { PublishersModule } from '@modules/publishers/publishers.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_DB_HOST,
      port: Number(process.env.TYPEORM_DB_PORT),
      username: process.env.TYPEORM_DB_USER,
      password: process.env.TYPEORM_DB_PASSWORD,
      database: process.env.TYPEORM_DB_DATABASE,
      entities: ['dist/entities/*.entity{.js,.ts}'],
      synchronize: Boolean(process.env.TYPEORM_DB_SYNC),
      logging: Boolean(process.env.TYPEORM_DB_SYNC) ?? false,
    }),
    AuthModule,
    BooksModule,
    CloudinaryModule,
    KeywordsModule,
    PublishersModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
