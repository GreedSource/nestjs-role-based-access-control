import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class BooksCreatedBy1697350885065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'books', // Table name
      new TableForeignKey({
        name: 'FK_BOOKS_CREATED_BY_CONSTRAINT',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books', 'FK_BOOKS_CREATED_BY_CONSTRAINT');
  }
}
