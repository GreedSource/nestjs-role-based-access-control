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
  ParseUUIDPipe,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from '@dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '@dto/keywords/update-keyword.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@guards/jwt-auth.guard';
import { RoleBasedAccessControlGuard } from '@guards/role-based-access-control.guard';
import { RoleAccess } from '@decorators/role-access.decorator';
import { CreatedByInterceptor } from '@interceptors/created-by.interceptor';

const prefix = 'keywords';

@Controller(prefix)
@ApiTags(prefix)
@UseGuards(JwtGuard, RoleBasedAccessControlGuard)
@ApiBearerAuth('access-token')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post()
  @RoleAccess(`${prefix}.create`)
  @UseInterceptors(CreatedByInterceptor)
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @Get()
  @RoleAccess(`${prefix}.find`)
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  @RoleAccess(`${prefix}.findOne`)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.keywordsService.findOne(id);
  }

  @Patch(':id')
  @RoleAccess(`${prefix}.update`)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKeywordDto: UpdateKeywordDto,
  ) {
    return this.keywordsService.update(id, updateKeywordDto);
  }

  @Delete(':id')
  @RoleAccess(`${prefix}.delete`)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.keywordsService.remove(id);
  }
}
