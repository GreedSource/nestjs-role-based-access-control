import { Role } from '@entities/role.entity';

export const Roles: Partial<Role>[] = [
  {
    name: 'admin',
    slug: 'admin',
  },
  {
    name: 'user',
    slug: 'user',
  },
  {
    name: 'client',
    slug: 'client',
  },
];

export default Roles;
