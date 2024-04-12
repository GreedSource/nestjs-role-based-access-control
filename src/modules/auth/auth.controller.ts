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
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res,
    // eslint-disable-next-line
    @Body() validateUserDto: ValidateUserDto,
  ) {
    const response = await this.authService.login(req.user);
    res
      .cookie('Authorization', response['accessToken'], {
        expires: new Date(
          Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      })
      .cookie('Refresh', response['refreshToken'], {
        expires: new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      });
    return response;
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  //eslint-disable-next-line
  //eslint-disable-next-line
  async googleOauth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Req() req, @Res({ passthrough: true }) res) {
    const user = req.user;
    const entity = await this.authService.findByEmail(user.email);

    const response =
      entity ??
      (await this.authService.register({
        email: user.email,
        name: `${user.name} ${user.lastName}`,
      }));

    res
      .cookie('Authorization', response['accessToken'], {
        expires: new Date(
          Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      })
      .cookie('Refresh', response['refreshToken'], {
        expires: new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      });
    res.redirect(`${process.env.FRONTEND_URI}`);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res) {
    res
      .cookie('Authorization', '', { expires: new Date() })
      .cookie('Refresh', '', { expires: new Date() });
  }

  @Post('register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @UploadedFile() image,
  ) {
    return await this.authService.register({
      ...registerUserDto,
      image,
    });
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(
    @Request() req,
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res,
  ) {
    const response = await this.authService.refreshToken(req.user);
    res
      .cookie('Authorization', response.accessToken, {
        expires: new Date(
          Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      })
      .cookie('Refresh', response.refreshToken, {
        expires: new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
        ),
      });
    return response;
  }
}
