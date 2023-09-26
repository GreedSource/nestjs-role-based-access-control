import { HttpStatus } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';

export class ResponseDto<T> {
  @IsEnum(HttpStatus)
  status: HttpStatus;

  @IsString()
  message: string;

  data?: T | T[];
}
