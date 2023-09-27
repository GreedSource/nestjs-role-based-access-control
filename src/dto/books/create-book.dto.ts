import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Keyword } from '@entities/keyword.entity';
import { Publisher } from '@entities/publisher.entity';
import { User } from '@entities/user.entity';
export class CreateBookDto {
  @IsString()
  @ApiProperty({ example: 'Rebelión en la granja' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Sátira política' })
  readonly genre: string;

  @IsString()
  @ApiProperty({
    example:
      'Publicada en 1945, la obra es una fábula mordaz sobre cómo el régimen soviético de Iósif Stalin corrompe el socialismo llevándolo hacia un tipo de autoritarismo',
  })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: 'George Orwell' })
  readonly author: string;

  @IsInt()
  @ApiProperty({ example: 64 })
  readonly pages: number;

  @IsString()
  @ApiProperty({
    example:
      'https://fastly.picsum.photos/id/478/400/600.jpg?hmac=t3NBVGe6igULElFULyW9k8uOs_bpBlRC01oaUuTusfc',
  })
  readonly image_url: string;

  @ApiProperty({ example: { id: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' } })
  @IsOptional()
  readonly publisher: Publisher;

  @ApiProperty({ example: [{ id: '3e28d06e-ff8b-44d6-9a44-0540ac44477b' }] })
  @IsOptional()
  readonly keywords: Keyword[];

  @IsOptional()
  readonly createdBy: User;
}
