import { Permission } from '@entities/permission.entity';
import { Role } from '@entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class RolePermissionsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
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
