import { Permission } from '../../../src/entities/permission.entity';
import { Role } from '../../../src/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class RolePermissionsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = await dataSource.getRepository(Role);
    const entity = await repository.findOneBy({ id: 1 });
    if (entity) {
      const perRepository = await dataSource.getRepository(Permission);
      const permissions = await perRepository.find();
      entity.permissions.push(...permissions);
      await repository.save(entity);
    }
  }
}
