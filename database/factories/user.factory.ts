import { User } from '../../src/entities/user.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  user.email = faker.internet.exampleEmail();
  user.password = faker.internet.password();
  return user;
});
