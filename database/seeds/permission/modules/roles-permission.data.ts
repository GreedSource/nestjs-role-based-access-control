import { Permission } from '../../../../src/entities/permission.entity';

const prefix = 'roles';

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
