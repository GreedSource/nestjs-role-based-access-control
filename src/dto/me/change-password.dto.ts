import { Match } from '@decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'L3tMe.1n',
  })
  @IsString()
  @IsNotEmpty()
  readonly currentPassword: string;

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

  readonly email: string;
}
