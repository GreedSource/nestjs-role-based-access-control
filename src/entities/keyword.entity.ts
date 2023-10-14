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
import { TimestampsEntity } from './timestamps.entity';
@Entity()
export class Keyword extends TimestampsEntity {
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
}
