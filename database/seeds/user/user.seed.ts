import { User } from '../../../src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import UsersData from './user.data';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = await dataSource.getRepository(User);
    // const userFactory = await factoryManager.get(User);

    const entities = await repository.create(UsersData);
    await repository.upsert(entities, ['email']);
  }
}
