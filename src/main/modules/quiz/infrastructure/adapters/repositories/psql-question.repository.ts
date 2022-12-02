import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "../../../domain/entities/question.entity";
import { QuestionMapper } from "../mappers/question.mapper";
import { QuestionEntity } from "./entities/question.entity";

@Injectable()
export class PsqlQuestionRepository {
  private readonly logger = new Logger(PsqlQuestionRepository.name);

  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    private questionMapper: QuestionMapper
  ) {}

  async findOne(id: string): Promise<Question> {
    this.logger.log(`Retrieving question with id ${id}`);
    const question = await this.questionRepository.findOne({ where: { id } });
    if (question) return this.questionMapper.entityToApi(question);
  }

  async findAll(): Promise<Question[]> {
    this.logger.log(`Retrieving questions`);
    const questions = await this.questionRepository.find();
    return this.questionMapper.entitiesToApis(questions);
  }

  async save(question: Question): Promise<Question> {
    this.logger.log(`Saving question with id ${question.id}`);
    const questionEntity = this.questionMapper.apiToEntity(question);
    const savedQuestion = await this.questionRepository.save(questionEntity);
    return this.questionMapper.entityToApi(savedQuestion);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing question with id ${id}`);
    await this.questionRepository.delete({ id });
  }
}
