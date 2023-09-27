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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from '@dto/books/create-book.dto';
import { UpdateBookDto } from '@dto/books/update-book.dto';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { CreatedByInterceptor } from '@interceptors/created-by.interceptor';

@Controller('books')
@ApiTags('book')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @UseInterceptors(CreatedByInterceptor)
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.service.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.service.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
