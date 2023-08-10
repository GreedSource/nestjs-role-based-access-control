import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', ctx.getHandler());
    const request = ctx.switchToHttp().getRequest();
    return roles.includes(request.user?.sub?.role);
  }
}
