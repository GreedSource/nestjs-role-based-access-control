import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsStrongPassword } from 'class-validator';
import { Match } from '@decorators/match.decorator';

export class RegisterUserDto extends OmitType(CreateUserDto, [
  'role',
] as const) {
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
}
