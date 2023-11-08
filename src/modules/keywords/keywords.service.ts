import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from '@dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '@dto/keywords/update-keyword.dto';
import { Keyword } from '@entities/keyword.entity';
import { KeywordRepository } from './keywords.repository';

@Injectable()
export class KeywordsService {
  constructor(private readonly repository: KeywordRepository) {}
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
