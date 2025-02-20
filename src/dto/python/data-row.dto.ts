import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class DataRowDto {
  @ApiProperty({
    example: 0,
  })
  @IsInt()
  @Type(() => Number)
  column: number;

  @ApiProperty({
    example: 0,
  })
  @IsInt()
  @Type(() => Number)
  row: number;

  @ApiProperty({
    example: 'cell 0',
  })
  @IsString()
  value: string;

  @ApiProperty({
    example: 'text',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'text',
  })
  @IsString()
  extra: string;
}
