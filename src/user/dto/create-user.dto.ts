import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { Role } from '../../common/enum/role.enum';
export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'John Doe',
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({ example: 'john@doe.com' })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'password',
  })
  readonly password: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ example: 'admin' })
  readonly role?: Role;
}
