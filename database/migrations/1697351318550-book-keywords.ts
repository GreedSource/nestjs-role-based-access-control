import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class BookKeywords1697351318550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_keywords',
        columns: [
          {
            name: 'book_id',
            type: 'character varying',
            length: '36',
          },
          {
            name: 'keyword_id',
            type: 'character varying',
            length: '36',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'book_keywords', // Table name
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'], // Replace with the primary key of EntityA
        referencedTableName: 'books', // Replace with the name of EntityA's table
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'book_keywords', // Table name
      new TableForeignKey({
        columnNames: ['keyword_id'],
        referencedColumnNames: ['id'], // Replace with the primary key of EntityA
        referencedTableName: 'keywords', // Replace with the name of EntityA's table
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book_keywords');
  }
}
