import { User } from '@entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class ValidateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'john@doe.com' })
  readonly username: string;

  @IsString()
  @ApiProperty({
    example: 'L3tMe.1n',
  })
  readonly password: string;

  readonly createdBy: User;
}
