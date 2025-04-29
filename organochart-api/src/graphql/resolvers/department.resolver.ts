import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Department } from '../models/department.schema';
import { DepartmentService } from 'src/department/department.service';
import { CreateDepartmentInput } from '../dto/create-department.input';
import { UpdateDepartmentInput } from '../dto/update-department.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../models/user.schema';

@Resolver(() => Department)
@UseGuards(GqlAuthGuard)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  getDepartments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Query(() => Department)
  getDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('input') input: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.update(input.id, input.name);
  }

  @Mutation(() => Boolean)
  deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.departmentService.remove(id);
  }

  @Mutation(() => Boolean)
  async joinDepartment(
    @Args('departmentId', { type: () => Int }) departmentId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.departmentService.joinDepartment(+user.id, departmentId);
  }

  @Mutation(() => Boolean)
  async joinSubDepartment(
    @Args('subDepartmentId', { type: () => Int }) subDepartmentId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.departmentService.joinSubDepartment(+user.id, subDepartmentId);
  }
}
