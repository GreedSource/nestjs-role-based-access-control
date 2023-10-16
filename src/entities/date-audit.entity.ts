import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateAudit {
  @CreateDateColumn({
    name: '_created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: '_updated_at',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: '_deleted_at',
  })
  deletedAt: Date;
}
