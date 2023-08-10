import { ApiProperty } from '@nestjs/swagger';
export class CreatePublisherDto {
  @ApiProperty({ example: 'George Orwell' })
  readonly name: string;
}
