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
import { DateAudit } from './date-audit.entity';
import { Role } from './role.entity';
import { File } from './file.entity';

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

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @ManyToOne(() => Role, (role: Role) => role.users, {
    eager: true,
  })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: Role;

  @Column(() => DateAudit)
  audit: DateAudit;

  @Column(() => File)
  avatar: File;

  @OneToMany(() => Book, (book: Book) => book.createdBy)
  books: Book[];

  @OneToMany(() => Keyword, (keyword: Keyword) => keyword.createdBy)
  keywords: Keyword[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
