import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentInput } from 'src/graphql/dto/create-department.input';
import { Department } from 'src/graphql/models/department.schema';
import { User } from 'src/graphql/models/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    const { name, subDepartments } = input;

    const department = this.departmentRepository.create({ name });

    if (subDepartments && subDepartments.length > 0) {
      department.subDepartments = subDepartments.map((sub) =>
        this.departmentRepository.create({ name: sub.name }),
      );
    }

    return this.departmentRepository.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: ['subDepartments'],
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id: id.toString() },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return department;
  }

  async update(id: number, name: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id: id.toString() },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    department.name = name;
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.departmentRepository.findOne({
      where: { id: id.toString() },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    // First remove all sub-departments
    if (department.subDepartments?.length) {
      await this.departmentRepository.remove(department.subDepartments);
    }

    await this.departmentRepository.remove(department);
    return true;
  }

  async joinDepartment(userId: number, departmentId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId.toString() },
      relations: ['departments'],
    });

    if (!user) throw new NotFoundException(`User not found`);

    const department = await this.departmentRepository.findOne({
      where: { id: departmentId.toString() },
    });
    if (!department) throw new NotFoundException(`Department not found`);

    user.departments = [department];
    await this.userRepository.save(user);
    return true;
  }

  async joinSubDepartment(
    userId: number,
    subDepartmentId: number,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId.toString() },
      relations: ['departments'],
    });

    if (!user) throw new NotFoundException('User not found');

    const subDepartment = await this.departmentRepository.findOne({
      where: { id: subDepartmentId.toString() },
    });

    if (!subDepartment) throw new NotFoundException('Sub-department not found');

    subDepartment.members = subDepartment.members || [];
    subDepartment.members.push(user);

    await this.departmentRepository.save(subDepartment);

    return true;
  }
}
