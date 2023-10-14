import { UserService } from '@modules/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Role } from '@enum/role.enum';

@Injectable()
export class RoleBasedAccessControlGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      ctx.getHandler(),
    );

    if (permissions) {
      const request = ctx.switchToHttp().getRequest();
      const auth = await this.userService.findByEmail(request.user.username);
      request.auth = auth;
      const { role } = auth;
      const hasPermission = permissions.some((permissionToCheck) =>
        role.permissions.some(
          (permission) => permission.slug === permissionToCheck,
        ),
      );
      return hasPermission;
    } else {
      return true;
    }
  }
}
