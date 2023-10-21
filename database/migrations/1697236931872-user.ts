import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1696736231872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'name',
            type: 'character varying',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'character varying',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'avatar_path',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'avatar_filesize',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'avatar_format',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'avatar_public_id',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'int',
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
