import { Keyword } from '@entities/keyword.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordRepository extends Repository<Keyword> {
  constructor(
    @InjectRepository(Keyword)
    private repository: Repository<Keyword>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
