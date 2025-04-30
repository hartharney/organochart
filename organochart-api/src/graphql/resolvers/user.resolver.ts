import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/auth-response.dto';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ChangeUserRoleInput } from '../dto/change-role.input';
import { AddUserToDepartmentInput } from '../dto/add-to-department.input';
import { UserService } from 'src/user/user.service';
import { User } from '../models/user.schema';
import { Department } from '../models/department.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  register(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.register(data);
  }

  @Mutation(() => AuthResponse)
  login(@Args('data') data: LoginInput): Promise<AuthResponse> {
    return this.userService.login(data);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User): Promise<User> {
    return this.userService.findById(user.id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  user(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @CurrentUser() user: User,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(user.id, data);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  addUserToDepartment(
    @Args('data') data: AddUserToDepartmentInput,
  ): Promise<User> {
    return this.userService.addUserToDepartment(data.userId, data.departmentId);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUserFromDepartment(
    @Args('userId') userId: string,
    @Args('departmentId') departmentId: string,
  ): Promise<User> {
    return this.userService.removeUserFromDepartment(userId, departmentId);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  changeUserRole(@Args('data') data: ChangeUserRoleInput): Promise<User> {
    return this.userService.changeUserRole(data.userId, data.role);
  }

  @Query(() => [Department])
  @UseGuards(GqlAuthGuard)
  managedDepartments(@CurrentUser() user: User): Promise<Department[]> {
    return this.userService.getManagedDepartments(user.id);
  }

  @Query(() => [Department])
  @UseGuards(GqlAuthGuard)
  accessibleDepartments(@CurrentUser() user: User): Promise<Department[]> {
    return this.userService.getAccessibleDepartments(user.id);
  }

  @Query(() => [Department])
  @UseGuards(GqlAuthGuard)
  userDepartments(@Args('userId') userId: string): Promise<Department[]> {
    return this.userService.getDepartments(userId);
  }

  @ResolveField(() => [Department], { nullable: true })
  departments(@Parent() user: User): Promise<Department[]> {
    return this.userService.getDepartments(user.id);
  }

  @ResolveField(() => [Department], { nullable: true })
  manages(@Parent() user: User): Promise<Department[]> {
    return this.userService.getManagedDepartments(user.id);
  }

  @ResolveField(() => [Department], { nullable: true })
  accessibleDepartmentsField(@Parent() user: User): Promise<Department[]> {
    return this.userService.getAccessibleDepartments(user.id);
  }
}
