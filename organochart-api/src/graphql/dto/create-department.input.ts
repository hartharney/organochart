import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  @MinLength(2)
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [GraphQLJSONObject], { nullable: 'items' })
  subDepartments?: { id: string; name: string }[];
}
