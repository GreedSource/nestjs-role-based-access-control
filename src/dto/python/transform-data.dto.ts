import { ApiProperty } from '@nestjs/swagger';
import { DataRowDto } from './data-row.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TransformDataDto {
  @ApiProperty({
    example: [
      { column: 0, row: 0, value: 'John Doe', type: 'text', extra: 'extra1' },
      { column: 1, row: 0, value: 'Jane Smith', type: 'text', extra: 'extra2' },
      { column: 0, row: 1, value: 'Alice', type: 'text', extra: 'extra3' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataRowDto)
  data: DataRowDto[];
}
