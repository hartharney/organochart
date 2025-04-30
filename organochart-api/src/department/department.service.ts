import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentInput } from 'src/graphql/dto/create-department.input';
import { Department } from 'src/graphql/models/department.schema';
import { User } from 'src/graphql/models/user.schema';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    const subDepartments = input.subDepartments || [];

    const updatedSubDepartments = subDepartments.map((subDepartment) => ({
      ...subDepartment,
      id: uuidv4(),
    }));

    const department = this.departmentRepository.create({
      name: input.name,
      description: input.description,
      subDepartments: updatedSubDepartments,
    });

    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return department;
  }

  async update(
    id: string,
    name: string,
    subDepartments: { id?: string; name: string }[],
  ): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    department.name = name;

    const updatedSubDepartments = subDepartments.map((sub) => {
      if (sub.id) {
        const existingSubDept = department.subDepartments.find(
          (s) => s.id === sub.id,
        );
        if (existingSubDept) {
          existingSubDept.name = sub.name;
          return existingSubDept;
        }
      }

      return { id: uuidv4(), name: sub.name };
    });

    department.subDepartments = updatedSubDepartments.filter(
      (sub) => sub.name.trim() !== '',
    );

    return this.departmentRepository.save(department);
  }

  async remove(id: string): Promise<boolean> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    await this.departmentRepository.remove(department);
    return true;
  }

  async joinDepartment(userId: string, departmentId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['departments'],
    });

    if (!user) throw new NotFoundException('User not found');

    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });

    if (!department) throw new NotFoundException('Department not found');

    user.departments = [department];
    await this.userRepository.save(user);
    return true;
  }
}
