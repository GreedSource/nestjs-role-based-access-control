import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@entities/role.entity';
import { UserModule } from '@modules/user/user.module';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserModule],
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
  exports: [TypeOrmModule.forFeature([Role]), RoleService],
})
export class RoleModule {}
