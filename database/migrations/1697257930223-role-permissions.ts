import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class RolePermissions1697257930223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'permission_id',
            type: 'character',
            length: '36',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'role_permissions', // Table name
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'], // Replace with the primary key of EntityA
        referencedTableName: 'roles', // Replace with the name of EntityA's table
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'role_permissions', // Table name
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'], // Replace with the primary key of EntityA
        referencedTableName: 'permissions', // Replace with the name of EntityA's table
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_permissions');
  }
}
