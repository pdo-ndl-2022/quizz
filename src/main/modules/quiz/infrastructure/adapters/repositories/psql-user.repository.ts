import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class PsqlUserRepository {
  private readonly logger = new Logger(PsqlUserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper
  ) {}

  async findOne(email: string): Promise<User> {
    this.logger.log(`Retrieving user with email ${email}`);
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return this.userMapper.entityToApi(user);
  }

  async findAll(): Promise<User[]> {
    this.logger.log(`Retrieving users`);
    const users = await this.userRepository.find({ order: { score: "DESC" } });
    return this.userMapper.entitiesToApis(users);
  }

  async save(user: User): Promise<User> {
    this.logger.log(`Saving user with email ${user.email}`);
    const userEntity = this.userMapper.apiToEntity(user);
    const savedUser = await this.userRepository.save(userEntity);
    return this.userMapper.entityToApi(savedUser);
  }

  async remove(email: string): Promise<void> {
    this.logger.log(`Removing user with email ${email}`);
    await this.userRepository.delete({ email });
  }
}
