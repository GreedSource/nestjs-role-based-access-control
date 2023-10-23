import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';

export class File {
  @Column({
    nullable: true,
    name: '_path',
  })
  path: string;

  @Exclude()
  @Column('integer', {
    nullable: true,
    name: '_filesize',
  })
  filesize: number;

  @Exclude()
  @Column({
    nullable: true,
    name: '_format',
  })
  format: string;

  @Exclude()
  @Column({
    nullable: true,
    name: '_public_id',
  })
  publicId: string;
}
