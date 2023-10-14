import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Book } from './book.entity';
import { Keyword } from './keyword.entity';
import { Publisher } from './publisher.entity';
import { TimestampsEntity } from './timestamps.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends TimestampsEntity {
  @ApiProperty({ example: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' })
  @PrimaryGeneratedColumn('uuid', {
    comment: 'uuid',
  })
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role: Role) => role.users, {
    eager: true,
  })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: Role;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column('integer', {
    nullable: true,
    name: 'avatar_filesize',
  })
  avatarFilesize: number;

  @Column({
    nullable: true,
    name: 'avatar_format',
  })
  avatarFormat: string;

  @Column({
    nullable: true,
    name: 'avatar_public_id',
  })
  avatarPublicId: string;

  @OneToMany(() => Book, (book: Book) => book.createdBy)
  books: Book[];

  @OneToMany(() => Keyword, (keyword: Keyword) => keyword.createdBy)
  keywords: Keyword[];

  @OneToMany(() => Publisher, (publisher: Publisher) => publisher.createdBy)
  publishers: Publisher[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
