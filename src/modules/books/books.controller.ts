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
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from '@dto/books/create-book.dto';
import { UpdateBookDto } from '@dto/books/update-book.dto';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { CreatedByInterceptor } from '@interceptors/created-by.interceptor';
import { RoleBasedAccessControlGuard } from '@guards/role-based-access-control.guard';
import { RoleAccess } from '@decorators/role-access.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

const prefix = 'books';

@Controller(prefix)
@ApiTags(prefix)
@UseGuards(JwtGuard, RoleBasedAccessControlGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'), CreatedByInterceptor)
  @RoleAccess(`${prefix}.create`)
  async create(@Body() createBookDto: CreateBookDto, @UploadedFile() image) {
    return await this.service.create({ ...createBookDto, image });
  }

  @Get()
  @RoleAccess(`${prefix}.find`)
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @RoleAccess(`${prefix}.findOne`)
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'), CreatedByInterceptor)
  @RoleAccess(`${prefix}.update`)
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() image,
  ) {
    return await this.service.update(id, { ...updateBookDto, image });
  }

  @Delete(':id')
  @RoleAccess(`${prefix}.delete`)
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
