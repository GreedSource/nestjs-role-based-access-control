import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { BooksModule } from '@modules/books/books.module';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { KeywordsModule } from '@modules/keywords/keywords.module';
import { UserModule } from '@modules/user/user.module';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';
import { RoleModule } from './modules/role/role.module';
import { MeModule } from './modules/me/me.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_DB_HOST,
      port: Number(process.env.TYPEORM_DB_PORT),
      username: process.env.TYPEORM_DB_USER,
      password: process.env.TYPEORM_DB_PASSWORD,
      database: process.env.TYPEORM_DB_DATABASE,
      entities: ['dist/entities/*.entity{.js,.ts}'],
      synchronize: JSON.parse(process.env.TYPEORM_DB_SYNC) ?? false,
      logging: JSON.parse(process.env.TYPEORM_LOGGING) ?? false,
    }),
    AuthModule,
    BooksModule,
    CloudinaryModule,
    KeywordsModule,
    UserModule,
    RoleModule,
    MeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
