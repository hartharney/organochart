import { InputType, Field, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => Int)
  id: number;

  @Field()
  @MinLength(2)
  name: string;
}
