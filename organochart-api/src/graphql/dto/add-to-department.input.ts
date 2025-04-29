import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddUserToDepartmentInput {
  @Field()
  userId: string;

  @Field()
  departmentId: string;
}
