import { Permission } from '../../src/entities/permission.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const PermissionsFactory = setSeederFactory(
  Permission,
  (faker: Faker) => {
    const permission = new Permission();
    permission.slug = faker.person.jobArea();
    return permission;
  },
);
