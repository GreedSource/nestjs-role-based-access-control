import { Permission } from '../../../../src/entities/permission.entity';

const prefix = 'keywords';

export const Permissions: Partial<Permission>[] = [
  {
    slug: `${prefix}.create`,
  },
  {
    slug: `${prefix}.find`,
  },
  {
    slug: `${prefix}.findOnes`,
  },
  {
    slug: `${prefix}.update`,
  },
  {
    slug: `${prefix}.delete`,
  },
];

export default Permissions;
