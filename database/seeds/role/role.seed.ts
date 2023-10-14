import { Role } from '../../../src/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import RolesData from './role.data';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = await dataSource.getRepository(Role);

    const entities = await repository.create(RolesData);
    await repository.upsert(entities, {
      skipUpdateIfNoValuesChanged: true, // If true, postgres will skip the update if no values would be changed (reduces writes)
      conflictPaths: ['name'], // column(s) name that you would like to ON CONFLICT
    });
  }
}
