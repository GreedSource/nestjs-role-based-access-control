import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class IdRelationship {
  @ApiProperty({ example: 1 })
  @IsInt()
  readonly id: number;
}
