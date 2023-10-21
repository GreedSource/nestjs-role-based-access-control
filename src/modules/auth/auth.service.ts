import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/user.entity';
import { TokenResponse } from 'src/interfaces/token-response.interface';
import { instanceToInstance } from 'class-transformer';
import * as _ from 'lodash';
import { RegisterUserDto } from '@dto/users/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // private readonly roleService: RoleService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return _.omit(user, ['password', 'role']);
    }
  }

  private async createToken(user: User): Promise<TokenResponse> {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}s`,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  async login(user: User) {
    return instanceToInstance({
      ...user,
      ...(await this.createToken(user)),
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    return await this.userService.create({
      ...registerUserDto,
      role: {
        id: 2,
      },
    });
  }

  async refreshToken(user: User): Promise<TokenResponse> {
    return await this.createToken(user);
  }
}
