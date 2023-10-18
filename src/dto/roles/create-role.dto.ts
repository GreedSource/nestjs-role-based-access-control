import { UuidRelationshipDto } from '@dto/common/uuid-relashinship.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Role' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: [{ id: '55165dd1-f090-46e7-844e-d32fde4890e8' }] })
  @ValidateNested({ each: true })
  @Type(() => UuidRelationshipDto)
  @IsOptional()
  readonly permissions: UuidRelationshipDto[];
}
