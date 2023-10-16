import { User } from '@entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateKeywordDto {
  @ApiProperty({ example: 'NestJS' })
  @IsString()
  @IsNotEmpty()
  readonly keyword: string;

  @IsOptional()
  readonly createdBy: User;
}
