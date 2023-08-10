import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from 'src/publishers/entities/publisher.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type BookDocument = Book & Document;

@Entity('books')
export class Book {
  @ApiProperty({ example: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' })
  @PrimaryGeneratedColumn('uuid', {
    comment: 'uuid',
  })
  id: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column('text')
  description: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column()
  image_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ example: { id: 1 } })
  @ManyToOne(() => Publisher, (publisher: Publisher) => publisher.books)
  publisher: Publisher;
}
