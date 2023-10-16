import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';
import { DateAudit } from './date-audit.entity';
@Entity('keywords')
export class Keyword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  keyword: string;

  @ManyToMany(() => Book, (book: Book) => book.keywords)
  books: Book[];

  @ManyToOne(() => User, (user: User) => user.keywords)
  @JoinColumn({
    name: 'created_by',
  })
  createdBy: User;

  @Column((type) => DateAudit)
  audit: DateAudit;
}
