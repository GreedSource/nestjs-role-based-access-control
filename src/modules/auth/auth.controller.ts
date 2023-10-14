import {
  Request,
  Controller,
  Post,
  Delete,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  Res,
  HttpStatus,
  HttpCode,
  Get,
  Req,
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
import { GoogleOauthGuard } from '@guards/google-oauth.guard';

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
  async login(
    @Request() req,
    @Res({ passthrough: true }) res,
    @Body() validateUserDto: ValidateUserDto,
  ) {
    const response = await this.authService.login(req.user);
    res.cookie('Authorization', response.accessToken, {
      expires: new Date(
        Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME),
      ),
    });
    return response;
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleOauth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Req() req) {
    return await req.user;
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('Authorization', '', { expires: new Date() });
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
