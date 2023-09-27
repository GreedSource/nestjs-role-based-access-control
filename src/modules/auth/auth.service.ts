import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...payload } = user;
      return payload;
    }
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
