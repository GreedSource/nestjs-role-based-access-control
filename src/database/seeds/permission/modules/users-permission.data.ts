import { Permission } from '@entities/permission.entity';

const prefix = 'users';

export const Permissions: Partial<Permission>[] = [
  {
    slug: `${prefix}.create`,
  },
  {
    slug: `${prefix}.find`,
  },
  {
    slug: `${prefix}.findOne`,
  },
  {
    slug: `${prefix}.update`,
  },
  {
    slug: `${prefix}.delete`,
  },
];

export default Permissions;
