import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '@common/enum/role.enum';
export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'john@doe.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Abcde1!!!!',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ example: 'admin' })
  readonly role?: Role;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  readonly image?: Express.Multer.File;

  profilePic?: string;
  profilePic_format?: string;
  profilePic_size?: number;
}