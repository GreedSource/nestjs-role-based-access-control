import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { Roles } from '@common/decorators/role.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RoleGuard } from '@guards/role.guard';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Owner, Role.Admin)
  @ApiConsumes('multipart/form-data')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Owner, Role.Admin)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.Owner, Role.Admin)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Owner, Role.Admin)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Owner, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
