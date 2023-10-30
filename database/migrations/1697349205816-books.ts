import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Books1697349205816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'character varying',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'title',
            type: 'character varying',
            length: '255',
            isNullable: false,
          },
          {
            name: 'genre',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'author',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'pages',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'cover_path',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'cover_filesize',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cover_format',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'cover_public_id',
            type: 'character varying',
            isNullable: true,
          },

          {
            name: 'audit_created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'audit_updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'audit_deleted_at',
            type: 'timestamptz',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_by',
            type: 'character varying',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
