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
import { ValidateUserDto } from './dto/validate-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { UserService } from '@modules/user/user.service';
import { RefreshJwtGuard } from '@guards/refresh-jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from '@modules/user/dto/register-user.dto';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryFolder } from '@common/enum/cloudinary-folder.enum';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
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
    if (image) {
      const cloudinaryImage = await this.cloudinaryService.uploadFile(
        image,
        CloudinaryFolder.Profile,
      );
      registerUserDto.profilePic = cloudinaryImage?.secure_url;
      registerUserDto.profilePic_format = cloudinaryImage?.format;
      registerUserDto.profilePic_size = cloudinaryImage?.bytes;
    }
    return await this.userService.create(registerUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(req.user);
  }
}
