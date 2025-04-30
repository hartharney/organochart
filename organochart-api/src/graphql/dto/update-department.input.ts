import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateDepartmentInput {
  @Field()
  id: string;

  @Field()
  @MinLength(2)
  name: string;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  subDepartments: { id?: string; name: string }[];
}
