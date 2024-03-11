import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Role1697236884723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'identity',
          },
          {
            name: 'name',
            type: 'character varying',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'slug',
            type: 'character varying',
            length: '255',
            isNullable: true,
            isUnique: true,
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
    await queryRunner.dropTable('roles');
  }
}
