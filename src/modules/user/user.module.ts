import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '@entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserModule {}
