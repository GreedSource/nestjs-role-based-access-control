import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { User } from '@entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { UuidRelationshipDto } from '@dto/common/uuid-relashinship.dto';
import { JsonTransfom } from '@utils/data-transfom.utils';
export class CreateBookDto {
  @ApiProperty({ example: 'Rebelión en la granja' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Sátira política' })
  readonly genre: string;

  @ApiProperty({
    example:
      'Publicada en 1945, la obra es una fábula mordaz sobre cómo el régimen soviético de Iósif Stalin corrompe el socialismo llevándolo hacia un tipo de autoritarismo',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'George Orwell' })
  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @ApiProperty({ example: 64 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  readonly pages: number;

  @ApiProperty({ example: 99.99 })
  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  readonly price: number;

  @ApiProperty({
    example: [{ id: '4ca8b463-1cc7-4b8c-b915-344010306272' }],
    required: false,
  })
  @Transform((params) =>
    params.value ? JsonTransfom(params, UuidRelationshipDto) : null,
  )
  @ValidateNested({ each: true })
  @Type(() => UuidRelationshipDto)
  @IsOptional()
  readonly keywords: UuidRelationshipDto[];

  @IsOptional()
  readonly createdBy: User;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  readonly image?: Express.Multer.File;
}
