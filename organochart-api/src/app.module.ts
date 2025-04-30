import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as dotenv from 'dotenv';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { UserModule } from './user/user.module';
import { User } from './graphql/models/user.schema';
import { Department } from './graphql/models/department.schema';
import { UptimeService } from './uptime.service';
import { UptimeResolver } from './graphql/resolvers/uptime.resolver';
import { DepartmentResolver } from './graphql/resolvers/department.resolver';
import { HttpModule } from '@nestjs/axios';
import { DepartmentModule } from './department/department.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/api/v1/graphql',
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      entities: [User, Department],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
      migrations: ['src/migrations/*.ts'],
      logging: true,
    }),
    // AuthModule,
    UserModule,
    DepartmentModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    UserResolver,
    DepartmentResolver,
    UptimeService,
    UptimeResolver,
    HttpModule,
  ],
  exports: [],
})
export class AppModule {}
