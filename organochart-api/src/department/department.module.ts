import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/user.schema';
import { Department } from 'src/graphql/models/department.schema';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from 'src/graphql/resolvers/department.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department])],
  providers: [DepartmentService, DepartmentResolver],
  exports: [DepartmentService],
})
export class DepartmentModule {}
