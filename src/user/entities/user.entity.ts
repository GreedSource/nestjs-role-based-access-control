import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enum/role.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ApiProperty({ example: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' })
  @PrimaryGeneratedColumn('uuid', {
    comment: 'uuid',
  })
  id: string;

  @Column()
  name: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column('varchar', { default: 'owner' })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, Number(process.env.SALT));
  }
}
