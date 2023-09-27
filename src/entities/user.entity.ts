import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@enum/role.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Book } from './book.entity';
import { Keyword } from './keyword.entity';
import { Publisher } from './publisher.entity';

@Entity('users')
export class User {
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
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: 'owner' })
  role: Role;

  @Column({
    nullable: true,
  })
  profilePic: string;

  @Column('integer', {
    nullable: true,
  })
  profilePic_size: number;

  @Column({
    nullable: true,
  })
  profilePic_format: string;

  @Column({
    nullable: true,
  })
  profilePic_publicId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Book, (book: Book) => book.createdBy)
  books: Book[];

  @OneToMany(() => Keyword, (keyword: Keyword) => keyword.createdBy)
  keywords: Keyword[];

  @OneToMany(() => Publisher, (publisher: Publisher) => publisher.createdBy)
  publishers: Publisher[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    if (this.password)
      this.password = await bcrypt.hash(
        this.password,
        Number(process.env.BCRYPT_SALT),
      );
  }
}
