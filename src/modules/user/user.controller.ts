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
  UploadedFile,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@dto/users/create-user.dto';
import { UpdateUserDto } from '@dto/users/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { RoleBasedAccessControlGuard } from '@guards/role-based-access-control.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseDto } from '@dto/common/response.dto';
import { User } from '@entities/user.entity';
import { RoleAccess } from '@decorators/role-access.decorator';
import { CreatedByInterceptor } from '@interceptors/created-by.interceptor';

const prefix = 'users';

@Controller(prefix)
@ApiTags(prefix)
@UseGuards(JwtGuard, RoleBasedAccessControlGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @RoleAccess(`${prefix}.create`)
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() image) {
    return {
      status: HttpStatus.CREATED,
      message: 'Users created',
      data: await this.userService.create({
        ...createUserDto,
        image,
      }),
    };
  }

  @Get()
  @RoleAccess(`${prefix}.find`)
  @UseInterceptors(CreatedByInterceptor)
  async findAll(): Promise<ResponseDto<User>> {
    return {
      status: HttpStatus.OK,
      message: 'Users found',
      data: await this.userService.findAll(),
    };
  }

  @Get(':id')
  @RoleAccess(`${prefix}.findOne`)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<User>> {
    return {
      status: HttpStatus.OK,
      message: 'User found',
      data: await this.userService.findOne(id),
    };
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @RoleAccess(`${prefix}.update`)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ResponseDto<User>> {
    return {
      status: HttpStatus.OK,
      message: 'User updated',
      data: await this.userService.update(id, {
        ...updateUserDto,
        image,
      }),
    };
  }

  @Delete(':id')
  @RoleAccess(`${prefix}.delete`)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<User>> {
    const response = await this.userService.remove(id);
    if (response.affected) {
      return {
        status: HttpStatus.OK,
        message: 'User deleted',
      };
    }
  }
}
