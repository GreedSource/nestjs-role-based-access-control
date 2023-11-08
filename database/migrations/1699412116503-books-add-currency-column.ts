import { CurrencyCode } from '@enum/currency-code.enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class BooksAddCurrencyColumn1699412116503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'currency',
        type: 'enum',
        default: `'${CurrencyCode.MXN}'`,
        enum: Object.values(CurrencyCode),
        enumName: 'currency_code_enum',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('books', 'currency');
  }
}
