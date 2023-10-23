import { ChangePasswordDto } from '@dto/me/change-password.dto';
import { UpdateProfileDto } from '@dto/me/update-profile.dto';
import { UserService } from '@modules/user/user.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MeService {
  constructor(private readonly userService: UserService) {}

  async me(email: string) {
    return await this.userService.findByEmail(email);
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const user = await this.userService.findByEmail(updateProfileDto.email);
    return await this.userService.update(user.id, updateProfileDto);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findByEmail(changePasswordDto.email);
    if (
      user &&
      (await bcrypt.compare(changePasswordDto.currentPassword, user.password))
    ) {
      return await this.userService.update(user.id, changePasswordDto);
    } else {
      throw new BadRequestException('Given credentials are not valid.');
    }
  }

  async deleteAccount(email: string) {
    const account = await this.me(email);
    return await this.userService.remove(account.id);
  }
}
