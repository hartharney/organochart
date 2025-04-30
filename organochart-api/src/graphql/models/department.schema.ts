import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.schema';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@Entity('department')
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  // subDepartments as a jsonb array
  @Field(() => [GraphQLJSONObject], { nullable: true })
  @Column('jsonb', { nullable: true })
  subDepartments: { id: string; name: string }[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.manages, { nullable: true })
  @JoinColumn()
  manager: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.departments, { nullable: true })
  members: User[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
