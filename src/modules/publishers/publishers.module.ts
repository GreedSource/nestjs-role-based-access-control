import { Module, forwardRef } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '@entities/publisher.entity';
import { UserModule } from '@modules/user/user.module';
import { BooksModule } from '@modules/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publisher]),
    UserModule,
    forwardRef(() => BooksModule),
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
