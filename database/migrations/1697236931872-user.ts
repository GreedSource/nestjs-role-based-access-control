import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
} from 'typeorm';

export class User1696736231872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_filesize',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'avatar_format',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_public_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
