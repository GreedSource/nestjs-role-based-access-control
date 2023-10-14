import { Book } from './book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TimestampsEntity } from './timestamps.entity';
@Entity('publishers')
export class Publisher extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Book, (book: Book) => book.publisher)
  books: Book[];

  @ManyToOne(() => User, (user: User) => user.publishers)
  @JoinColumn({
    name: 'created_by',
  })
  createdBy: User;
}
