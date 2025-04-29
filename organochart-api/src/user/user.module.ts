import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from 'src/graphql/resolvers/user.resolver';
import { User } from 'src/graphql/models/user.schema';
import { Department } from 'src/graphql/models/department.schema';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
