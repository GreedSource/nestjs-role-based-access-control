import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../database/main.seed';
import * as fs from 'fs';

ConfigModule.forRoot();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_DB_HOST,
  port: Number(process.env.TYPEORM_DB_PORT),
  username: process.env.TYPEORM_DB_USER,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE,
  entities: [`${__dirname}/../entities/*.entity.ts`],
  logging: JSON.parse(process.env.TYPEORM_LOGGING) ?? false,
  synchronize: false,
  seeds: [MainSeeder],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/../database/migrations/*.{js,ts}`],
  ssl: JSON.parse(process.env.TYPEORM_LOGGING)
    ? {
        ca: fs.readFileSync(process.env.TYPEORM_CA_CERT),
      }
    : undefined,
};

export const dataSource = new DataSource(options);
