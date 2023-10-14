import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { RoleBasedAccessControlGuard } from '@guards/role-based-access-control.guard';
import { UserModule } from '@modules/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
@Module({
  providers: [
    AuthService,
    RoleBasedAccessControlGuard,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}s`,
        },
      }),
    }),
  ],
})
export class AuthModule {}
