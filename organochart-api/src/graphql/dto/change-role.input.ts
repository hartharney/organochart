import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../models/user.schema';

@InputType()
export class ChangeUserRoleInput {
  @Field()
  userId: string;

  @Field(() => UserRole)
  role: UserRole;
}
