import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UuidRelationshipDto {
  @ApiProperty({ example: 'a554f3ce-2281-40f6-b8e9-b3cdc16b29cc' })
  @IsUUID()
  readonly id: string;
}
