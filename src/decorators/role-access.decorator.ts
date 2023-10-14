import { SetMetadata } from '@nestjs/common';

export const RoleAccess = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
