import { DataSource } from 'typeorm';
import { User } from './graphql/models/user.schema';
import { Department } from './graphql/models/department.schema';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Department],
  migrations: ['src/migrations/*.ts'],
});

module.exports = {
  AppDataSource,
  default: AppDataSource,
};
