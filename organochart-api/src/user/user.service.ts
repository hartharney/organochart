import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from '../graphql/dto/create-user.input';
import { UpdateUserInput } from '../graphql/dto/update-user.input';
import { LoginInput } from '../graphql/dto/login.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserRole } from 'src/graphql/models/user.schema';
import { Department } from 'src/graphql/models/department.schema';
import { AuthResponse } from 'src/graphql/dto/auth-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['departments', 'accessibleDepartments', 'manages'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['departments', 'accessibleDepartments', 'manages'],
    });
  }

  async register(input: CreateUserInput): Promise<User> {
    const existing = await this.userRepo.findOne({
      where: { email: input.email },
    });
    if (existing) throw new BadRequestException('Email already in use');

    const hashed = await bcrypt.hash(input.password, 10);
    const user = this.userRepo.create({ ...input, password: hashed });
    return this.userRepo.save(user);
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { email: input.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' },
    );

    return { accessToken: token, user };
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, input);
    return this.userRepo.save(user);
  }

  async remove(id: string): Promise<boolean> {
    await this.userRepo.delete(id);
    return true;
  }

  async getDepartments(userId: string): Promise<Department[]> {
    const user = await this.findById(userId);
    return user.departments || [];
  }

  async getManagedDepartments(userId: string): Promise<Department[]> {
    return this.deptRepo.find({ where: { manager: { id: userId } } });
  }

  async getAccessibleDepartments(userId: string): Promise<Department[]> {
    const user = await this.findById(userId);
    if (!user) return [];
    if (user.role === UserRole.ADMIN) return this.deptRepo.find();
    return [...(user.departments || []), ...(user.accessibleDepartments || [])];
  }

  async addUserToDepartment(
    userId: string,
    departmentId: string,
  ): Promise<User> {
    const user = await this.findById(userId);
    const dept = await this.deptRepo.findOne({ where: { id: departmentId } });
    if (!dept) throw new NotFoundException('Department not found');
    if (!user.departments) user.departments = [];
    user.departments.push(dept);
    return this.userRepo.save(user);
  }

  async removeUserFromDepartment(
    userId: string,
    departmentId: string,
  ): Promise<User> {
    const user = await this.findById(userId);
    user.departments = (user.departments || []).filter(
      (d) => d.id !== departmentId,
    );
    return this.userRepo.save(user);
  }

  async changeUserRole(userId: string, role: UserRole): Promise<User> {
    const user = await this.findById(userId);
    user.role = role;
    return this.userRepo.save(user);
  }
}
