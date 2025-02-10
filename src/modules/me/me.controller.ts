import { JwtGuard } from '@guards/jwt-auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeService } from './me.service';
import { UpdateProfileDto } from '@dto/me/update-profile.dto';
import { ChangePasswordDto } from '@dto/me/change-password.dto';

@Controller('me')
@ApiTags('Me')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
export class MeController {
  constructor(private readonly service: MeService) {}

  @Get()
  async profile(@Req() req) {
    return this.service.me(req.user.username);
  }

  @Patch()
  async update(@Body() updateProfileDto: UpdateProfileDto, @Req() req) {
    return await this.service.updateProfile({
      ...updateProfileDto,
      email: req.user.username,
    });
  }

  @Patch('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return await this.service.changePassword({
      ...changePasswordDto,
      email: req.user.username,
    });
  }

  @Delete('delete-account')
  async deleteAccount(@Req() req) {
    return await this.service.deleteAccount(req.user.username);
  }
}
