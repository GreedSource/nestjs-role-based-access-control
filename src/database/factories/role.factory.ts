import { Role } from '@entities/role.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const RolesFactory = setSeederFactory(Role, (faker: Faker) => {
  const role = new Role();
  role.name = faker.person.jobArea();
  return role;
});
