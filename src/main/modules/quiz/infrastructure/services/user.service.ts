import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { User } from "../../domain/entities/user.entity";
import { PsqlUserRepository } from "../adapters/repositories/psql-user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: PsqlUserRepository) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create({ ...createUserDto, score: 0 });
    return await this.userRepository.save(user);
  }

  async incrementScore(email: string): Promise<User> {
    const user = await this.userRepository.findOne(email);
    return await this.userRepository.save({ ...user, score: user.score + 1 });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return await this.userRepository.remove(id);
  }
}
