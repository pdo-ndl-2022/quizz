import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Qcm } from "../../../domain/entities/qcm.entity";
import { QcmMapper } from "../mappers/qcm.mapper";
import { QcmEntity } from "./entities/qcm.entity";

@Injectable()
export class PsqlQcmRepository {
  private readonly logger = new Logger(PsqlQcmRepository.name);

  constructor(
    @InjectRepository(QcmEntity)
    private questionRepository: Repository<QcmEntity>,
    private questionMapper: QcmMapper
  ) {}

  async findOne(id: string): Promise<Qcm> {
    this.logger.log(`Retrieving question with id ${id}`);
    const question = await this.questionRepository.findOne({ where: { id } });
    if (question) return this.questionMapper.entityToApi(question);
  }

  async findAll(): Promise<Qcm[]> {
    this.logger.log(`Retrieving questions`);
    const questions = await this.questionRepository.find();
    return this.questionMapper.entitiesToApis(questions);
  }

  async save(question: Qcm): Promise<Qcm> {
    this.logger.log(`Saving question with id ${question.id}`);
    const questionEntity = this.questionMapper.apiToEntity(question);
    const savedQcm = await this.questionRepository.save(questionEntity);
    return this.questionMapper.entityToApi(savedQcm);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing question with id ${id}`);
    await this.questionRepository.delete({ id });
  }
}
