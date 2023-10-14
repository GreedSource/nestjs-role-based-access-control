import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampsEntity } from './timestamps.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';
import * as slug from 'slug';

@Entity('roles')
export class Role extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles, {
    eager: true,
  })
  permissions: Permission[];

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  async createSlug() {
    this.slug ? slug(this.name) : undefined;
  }
}
