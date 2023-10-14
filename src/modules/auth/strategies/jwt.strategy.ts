import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.ExtractJwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  private static ExtractJwt(req: Request) {
    if (
      req.cookies &&
      'Authorization' in req.cookies &&
      req.cookies.Authorization.length > 0
    ) {
      return req.cookies.Authorization;
    }
    return null;
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      sub: payload.sub,
    };
  }
}
