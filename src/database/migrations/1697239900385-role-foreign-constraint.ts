import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class RoleForeignConstraint1697239900385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users', // Table name
      new TableForeignKey({
        name: 'FK_ROLE_CONSTRAINT',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_ROLE_CONSTRAINT');
  }
}
