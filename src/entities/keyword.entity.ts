import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';
import { User } from './user.entity';
@Entity()
export class Keyword {
  @ApiProperty({ example: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'NestJS' })
  @Column()
  keyword: string;

  @ManyToMany(() => Book, (book: Book) => book.keywords)
  books: Book[];

  // @ApiProperty({ example: { id: 1 } })
  @ManyToOne(() => User, (user: User) => user.keywords)
  createdBy: User;
}
