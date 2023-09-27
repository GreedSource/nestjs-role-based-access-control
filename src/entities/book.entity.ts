import { ApiProperty } from '@nestjs/swagger';
import { Keyword } from './keyword.entity';
import { Publisher } from './publisher.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

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

  @ManyToOne(() => Publisher, (publisher: Publisher) => publisher.books, {
    eager: true,
  })
  publisher: Publisher;

  @ManyToMany(() => Keyword, (keyword: Keyword) => keyword.books, {
    eager: true,
  })
  @JoinTable()
  keywords: Keyword[];

  @ManyToOne(() => User, (user: User) => user.books, {
    eager: true,
  })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
