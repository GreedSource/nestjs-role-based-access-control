import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from '@dto/publishers/create-publisher.dto';
import { UpdatePublisherDto } from '@dto/publishers/update-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from '@entities/publisher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly repository: Repository<Publisher>,
  ) {}
  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return this.repository.save(createPublisherDto);
  }

  async findAll(): Promise<Publisher[]> {
    return this.repository.find({
      relations: ['books'],
    });
  }

  async findOne(id: string): Promise<Publisher> {
    return this.repository.findOne({ where: { id }, relations: ['books'] });
  }

  async update(id: string, updatePublisherDto: UpdatePublisherDto) {
    return this.repository.update(id, updatePublisherDto);
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
