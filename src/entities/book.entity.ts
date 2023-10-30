import { ApiProperty } from '@nestjs/swagger';
import { Keyword } from './keyword.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DateAudit } from './date-audit.entity';
import { File } from './file.entity';
import { NumericColumnTransformer } from 'src/transformers/numeric-column.transformer';

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

  @Column('decimal', {
    transformer: new NumericColumnTransformer(),
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  pages: number;

  @Column(() => DateAudit)
  audit: DateAudit;

  @Column(() => File)
  cover: File;

  @ManyToMany(() => Keyword, (keyword: Keyword) => keyword.books, {
    eager: true,
  })
  @JoinTable({
    name: 'book_keywords',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'keyword_id',
      referencedColumnName: 'id',
    },
  })
  keywords: Keyword[];

  @ManyToOne(() => User, (user: User) => user.books)
  @JoinColumn({
    name: 'created_by',
  })
  createdBy: User;
}
