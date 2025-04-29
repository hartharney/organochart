import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Department } from './department.schema';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field(() => [Department], { nullable: true })
  @ManyToMany(() => Department, (dept) => dept.members, { nullable: true })
  @JoinTable()
  departments: Department[];

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (dept) => dept.manager, { nullable: true })
  manages: Department[];

  @Field(() => [Department], { nullable: true })
  @ManyToMany(() => Department, { nullable: true })
  @JoinTable()
  accessibleDepartments: Department[];

  @Field()
  @CreateDateColumn()
  joinedDate: Date;
}
