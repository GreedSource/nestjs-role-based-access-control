import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/user.entity';
import { TokenResponse } from 'src/interfaces/token-response.interface';
import { plainToClass } from 'class-transformer';
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
      return user;
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

  async findByEmail(email: string) {
    const entity = await this.userService.findByEmail(email);
    if (entity)
      return plainToClass(User, {
        ...entity,
        ...(await this.createToken(entity)),
      });
  }

  async login(user: User): Promise<User> {
    const tokens = await this.createToken(user);
    return await plainToClass(User, {
      ...user,
      ...tokens,
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userService.create({
      ...registerUserDto,
      role: {
        id: 2,
      },
    });
    return plainToClass(User, {
      ...user,
      ...(await this.createToken(user)),
    });
  }

  async refreshToken(user: User): Promise<TokenResponse> {
    return await this.createToken(user);
  }
}
