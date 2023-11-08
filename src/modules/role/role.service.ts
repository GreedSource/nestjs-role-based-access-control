import { CreateRoleDto } from '@dto/roles/create-role.dto';
import { UpdateRoleDto } from '@dto/roles/update-role.dto';
import { Role } from '@entities/role.entity';
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const entity = await this.repository.create(createRoleDto);
      return await this.repository.save(entity);
    } catch (e) {
      switch (e.code) {
        case '23505':
          throw new ConflictException('Role is already exists');

        default:
          throw new InternalServerErrorException(
            'Something went wrong, consult with the administrator',
          );
      }
    }
  }

  async findAll(): Promise<Role[]> {
    return await this.repository.find({
      loadEagerRelations: true,
    });
  }

  async findOne(id: number): Promise<Role> {
    return await this.repository.findOne({
      where: { id },
      loadEagerRelations: true,
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const toUpdate = await this.repository.create({ id, ...updateRoleDto });
      return await this.repository.save(toUpdate);
    } catch (e) {
      switch (e.code) {
        case '23505':
          throw new ConflictException('Role is already exists');

        default:
          throw new InternalServerErrorException(
            'Something went wrong, consult with the administrator',
          );
      }
    }
  }

  async remove(id: number) {
    return await this.repository.softDelete({ id });
  }
}
