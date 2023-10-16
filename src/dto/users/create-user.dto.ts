import { Match } from '@decorators/match.decorator';
import { IdRelationship } from '@dto/common/id-relashinship.dto';
import { Role } from '@entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'john@doe.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'L3tMe.1n',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string;

  @ApiProperty({
    example: 'L3tMe.1n',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Match((o) => o.password)
  readonly confirmPassword: string;

  @IsOptional()
  @ApiProperty({ example: 1, type: Number })
  @Type(() => IdRelationship)
  readonly role?: IdRelationship;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  readonly image?: Express.Multer.File;
}
