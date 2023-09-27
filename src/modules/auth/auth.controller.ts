import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '@modules/user/user.service';
import { RegisterUserDto } from '@dto/users/register-user.dto';
import { RefreshJwtGuard } from '@guards/refresh-jwt-auth.guard';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { RefreshTokenDto } from '@dto/auth/refresh-token.dto';
import { ValidateUserDto } from '@dto/auth/validate-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() validateUserDto: ValidateUserDto) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @UploadedFile() image,
  ) {
    return await this.userService.create(registerUserDto, image);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(req.user);
  }
}
