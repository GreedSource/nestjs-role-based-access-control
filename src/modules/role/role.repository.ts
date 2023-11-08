import { Role } from '@entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
