import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../database/main.seed';

ConfigModule.forRoot();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_DB_HOST,
  port: Number(process.env.TYPEORM_DB_PORT),
  username: process.env.TYPEORM_DB_USER,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE,
  entities: [`${__dirname}/../src/entities/*.entity.ts`],
  logging: JSON.parse(process.env.TYPEORM_LOGGING) ?? false,
  synchronize: false,
  seeds: [MainSeeder],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/../database/migrations/*.ts`],
};

export const dataSource = new DataSource(options);
