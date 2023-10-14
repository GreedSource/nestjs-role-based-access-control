import { Permission } from '../../../../src/entities/permission.entity';

const prefix = 'books';

export const Permissions: Partial<Permission>[] = [
  {
    slug: `${prefix}.create`,
  },
  {
    slug: `${prefix}.find`,
  },
  {
    slug: `${prefix}.findAll`,
  },
  {
    slug: `${prefix}.update`,
  },
  {
    slug: `${prefix}.delete`,
  },
];

export default Permissions;