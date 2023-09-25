import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class ValidateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'john@doe.com' })
  readonly username: string;

  @IsString()
  @ApiProperty({
    example: 'password',
  })
  readonly password: string;
}
