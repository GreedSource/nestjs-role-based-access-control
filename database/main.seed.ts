import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, runSeeders } from 'typeorm-extension';
import UserSeeder from './seeds/user/user.seed';
import { UsersFactory } from './factories/user.factory';
import { RolesFactory } from './factories/role.factory';
import RoleSeeder from './seeds/role/role.seed';
import { PermissionsFactory } from './factories/permission.factory';
import PermissionSeeder from './seeds/permission/permission.seed';
import RolePermissionsSeeder from './seeds/role-permissions/role-permissions.seed';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [RoleSeeder, UserSeeder, PermissionSeeder, RolePermissionsSeeder],
      factories: [RolesFactory, UsersFactory, PermissionsFactory],
    });
  }
}

export { MainSeeder };
