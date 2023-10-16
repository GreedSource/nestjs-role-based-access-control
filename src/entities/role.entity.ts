import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAudit } from './date-audit.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';
import * as slug from 'slug';

@Entity('roles')
export class Role {
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

  @Column((type) => DateAudit)
  audit: DateAudit;

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles, {
    eager: true,
  })
  permissions: Permission[];

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  async createSlug() {
    console.log('creating slug');
    console.log(this.name);
    this.slug = this.name ? slug(this.name) : undefined;
  }
}
