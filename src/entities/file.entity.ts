import { Column } from 'typeorm';

export class File {
  @Column({
    nullable: true,
    name: '_path',
  })
  path: string;

  @Column('integer', {
    nullable: true,
    name: '_filesize',
  })
  filesize: number;

  @Column({
    nullable: true,
    name: '_format',
  })
  format: string;

  @Column({
    nullable: true,
    name: '_public_id',
  })
  publicId: string;
}
