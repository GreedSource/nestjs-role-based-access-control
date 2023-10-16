import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleAccess } from '@decorators/role-access.decorator';
import { CreatedByInterceptor } from '@interceptors/created-by.interceptor';
import { CreateRoleDto } from '@dto/roles/create-role.dto';
import { UpdateRoleDto } from '@dto/roles/update-role.dto';
import { RoleBasedAccessControlGuard } from '@guards/role-based-access-control.guard';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const prefix = 'roles';

@Controller(prefix)
@ApiTags(prefix)
@UseGuards(JwtGuard, RoleBasedAccessControlGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  @RoleAccess(`${prefix}.create`)
  @UseInterceptors(CreatedByInterceptor)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.service.create(createRoleDto);
  }

  @Get()
  @RoleAccess(`${prefix}.find`)
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @RoleAccess(`${prefix}.findOne`)
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch(':id')
  @RoleAccess(`${prefix}.update`)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.service.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @RoleAccess(`${prefix}.delete`)
  async remove(@Param('id') id: string) {
    return await this.service.remove(+id);
  }
}
