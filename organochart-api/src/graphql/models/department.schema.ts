import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.schema';

@ObjectType()
@Entity({ name: 'department' })
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

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (dept) => dept.parentDepartment, {
    cascade: true,
  })
  subDepartments: Department[];

  @Field(() => Department, { nullable: true })
  @ManyToOne(() => Department, (dept) => dept.subDepartments, {
    nullable: true,
  })
  @JoinColumn()
  parentDepartment: Department;

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
