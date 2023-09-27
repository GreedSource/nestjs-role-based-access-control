import { ApiProperty } from '@nestjs/swagger';
export class CreatePublisherDto {
  @ApiProperty({ example: 'Macmillan' })
  readonly name: string;
}
