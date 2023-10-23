import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.ExtractJwt,
        ExtractJwt.fromBodyField('refresh'),
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_REFRESH_SECRET}`,
    });
  }

  private static ExtractJwt(req: Request) {
    if (
      req.cookies &&
      'Refresh' in req.cookies &&
      req.cookies.Refresh.length > 0
    ) {
      return req.cookies.Refresh;
    }
    return null;
  }

  async validate(payload: any) {
    return {
      user: payload.sub,
      username: payload.username,
    };
  }
}
