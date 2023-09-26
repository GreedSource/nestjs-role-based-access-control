import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from '@dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '@dto/keywords/update-keyword.dto';
import { Keyword } from '@entities/keyword.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private readonly repository: Repository<Keyword>,
  ) {}
  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    return this.repository.save(createKeywordDto);
  }

  async findAll(): Promise<Keyword[]> {
    return this.repository.find({
      relations: ['books'],
    });
  }

  async findOne(id: string): Promise<Keyword> {
    return this.repository.findOne({ where: { id }, relations: ['books'] });
  }

  async update(id: string, updateKeywordDto: UpdateKeywordDto) {
    return this.repository.update(id, updateKeywordDto);
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
