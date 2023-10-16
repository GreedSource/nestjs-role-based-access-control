import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class KeywordCreatedBy1697355810204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'keywords', // Table name
      new TableForeignKey({
        name: 'FK_KEYWORDS_CREATED_BY_CONSTRAINT',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'keywords',
      'FK_KEYWORDS_CREATED_BY_CONSTRAINT',
    );
  }
}
